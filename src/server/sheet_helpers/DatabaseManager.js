import sheetData from './sheetData/sheetData';
import eventLogData from './sheetData/eventLogData';
import SpreadsheetManager from './SpreadsheetManager';

export default class DatabaseManager {

  constructor(){
    this.ssManager = new SpreadsheetManager();
  }
  isValidLoginCredentials =(altId,localId)=>{


    let conn = false;
    Logger.log('Begin : isValidLoginCredentials');
    try {
       conn = Jdbc.getConnection('jdbc:mysql://'+sheetData.DATABASE_HOST+':3306/'+sheetData.DATBASE_NAME,
        sheetData.DATABASE_USER,
        sheetData.DATABASE_PASSWORD);
      if(conn){
        const stmt = conn.createStatement();
        const userQuery = 'SELECT count(*) FROM students  WHERE alt_id ='+altId+' AND CUSTOM_2='+localId;
        Logger.log(userQuery);
        let rs = stmt.executeQuery(userQuery);

        let isValid = false;
        while (rs.next()) {
          isValid = rs.getString(1)=='1';
          break;
        }


        //if login is successful then get student info, parent info
        const studentObject = {
          'studentId':null,
          'studentName':null,
        };
        const parentObject = {};

        if(isValid){
          rs = stmt.executeQuery('SELECT student_id, first_name,last_name FROM students  WHERE alt_id ='+altId+' AND CUSTOM_2='+localId+' LIMIT 1');
          while (rs.next()) {

            studentObject['studentId'] = rs.getString(1);
            studentObject['studentName'] = rs.getString(2)+' '+rs.getString(3);
          }


          if(studentObject['studentId']!=null){
            rs = stmt.executeQuery(`select p.staff_id , p.first_name, p.last_name, p.email, p.cell_phone, 
sa.street_address_1, sa.city , sa.zipcode, sa.street_address_2, sa.state, sjp.relationship

from students_join_people sjp 
left join people p on sjp.person_id  = p.staff_id
left join student_address sa ON (p.staff_id=sa.people_id AND sjp.student_id=sa.student_id)
where sjp.student_id = ${studentObject['studentId']} and emergency_type = 'Primary'`);
            while (rs.next()) {

              parentObject['parentContactId'] = rs.getString(1);
              parentObject['firstName'] = rs.getString(2);
              parentObject['lastName'] = rs.getString(3);
              parentObject['parentEmail'] = rs.getString(4);
              parentObject['cell'] = rs.getString(5);
              parentObject['address'] = rs.getString(6);
              parentObject['city'] = rs.getString(7);
              parentObject['id'] = rs.getString(8);
              parentObject['idType'] = rs.getString(9) !=null && rs.getString(9).split('-').length==3?
                rs.getString(9).split('-')[0]:'';
              parentObject['dept'] = rs.getString(10);
              parentObject['relationship'] = rs.getString(11);
            }
          }


        }

        rs.close();
        stmt.close();
        conn.close();

        const extraDetails = JSON.stringify({
          altId:altId,
          localId:localId
        });
        this.ssManager.addEventLogRecord(eventLogData.LOGIN_ACTION,eventLogData.STATUS_SUCCESS,extraDetails);
        return{ state:true, isValid:isValid, studentObject:studentObject, parentObject:parentObject }
      }

      const detailedError = JSON.stringify({
        altId:altId,
        localId:localId,
        functionName:'isValidLoginCredentials',
        error:'Failed to Create Database connection'
      });
      this.ssManager.addEventLogRecord(eventLogData.LOGIN_ACTION,eventLogData.STATUS_FAILED,detailedError);
      return{
        state:false,
        msg:'Failed to Create Database connection',
        error:null
      }

    }
    catch (e) {

      const detailedError = JSON.stringify({
        altId:altId,
        localId:localId,
        functionName:'isValidLoginCredentials',
        error:e
      });
      this.ssManager.addEventLogRecord(eventLogData.LOGIN_ACTION,eventLogData.STATUS_FAILED,detailedError);

      if(conn){
        conn.rollback();
        conn.close();
      }

      Logger.log('Exception in isValidLoginCredentials');
      Logger.log(e);
      return{
        state:false,
        msg:'Exception in isValidLoginCredentials',
        error:e
      }
    }
  };

  checkForDuplicateEmailAddress =(emailAddress)=>{
    let conn = false;
    Logger.log('Begin : checkForDuplicateEmailAddress');
    try {
       conn = Jdbc.getConnection('jdbc:mysql://'+sheetData.DATABASE_HOST+':3306/'+sheetData.DATBASE_NAME,
        sheetData.DATABASE_USER,
        sheetData.DATABASE_PASSWORD);
      if(conn){
        const stmt = conn.createStatement();
        const parentObject = {};
        let isDuplicate = false;

            const rs = stmt.executeQuery(`select p.staff_id , p.first_name, p.last_name, p.email, p.cell_phone, 
              sa.street_address_1, sa.city , sa.zipcode, sa.street_address_2, sa.state, sjp.relationship , sjp.student_id
              
              from students_join_people sjp 
              left join people p on sjp.person_id  = p.staff_id
              left join student_address sa ON (p.staff_id=sa.people_id AND sjp.student_id=sa.student_id)
              where sjp.person_id = (select staff_id from people where email = '${emailAddress}') and emergency_type = 'Primary'
              LIMIT 1`);
            while (rs.next()) {

              isDuplicate = true;
              parentObject['parentContactId'] = rs.getString(1);
              parentObject['firstName'] = rs.getString(2);
              parentObject['lastName'] = rs.getString(3);
              parentObject['parentEmail'] = rs.getString(4);
              parentObject['cell'] = rs.getString(5);
              parentObject['address'] = rs.getString(6);
              parentObject['city'] = rs.getString(7);
              parentObject['id'] = rs.getString(8);
              parentObject['idType'] = rs.getString(9) !=null && rs.getString(9).split('-').length==3?
                rs.getString(9).split('-')[0]:'';
              parentObject['dept'] = rs.getString(10);
              parentObject['relationship'] = rs.getString(11);
              parentObject['alreadyMappedStudentId'] = rs.getString(12);
            }



        rs.close();
        stmt.close();
        conn.close();

        return{ state:true, isDuplicate:isDuplicate,  duplicateParentContact:parentObject }
      }

      return{
        state:false,
        msg:'Failed to Create Database connection',
        error:null
      }

    }
    catch (e) {
      Logger.log('Exception in isValidLoginCredentials');
      Logger.log(e);
      return{
        state:false,
        msg:'Exception in isValidLoginCredentials',
        error:e
      }
    }
  };

  /**
   * 
   * @param formData
   */
  updateParentContact = (formData)=>{
    let conn = false;
    Logger.log('Begin : updateParentContact');
    try {

      const conn = Jdbc.getConnection('jdbc:mysql://'+sheetData.DATABASE_HOST+':3306/'+sheetData.DATBASE_NAME,
        sheetData.DATABASE_USER,
        sheetData.DATABASE_PASSWORD);


      if(conn){

        //TODO get steeet_address_2 combined value
        let parentContactId = formData.hasOwnProperty('parentContactId')?formData.parentContactId:null;
        const firstName = formData.firstName;
        const lastName = formData.lastName;
        const parentEmail = formData.parentEmail;
        const cell = formData.cell;
        const address = formData.address;
        const relationship = formData.relationship;
        const studentId = formData.studentId;
        const zipcode = formData.id; //zip
        const city = formData.city;
        const dept = formData.dept; //state
        const idType = formData.idType;

        const staffId = parentContactId;
        const address_2 = [idType,city,dept].join('-');

        conn.setAutoCommit(false);
        Logger.log('parentContactId is '+parentContactId);
        let isAdd = false;
        if(parentContactId==null){

          //new parent contact
          Logger.log('new parent contact');
          isAdd = true;
          //insert record to people table
          const peopleTable_InsertQuery = `insert into people (current_school_id, first_name,last_name, cell_phone, email,last_updated)
                values (  1, '${firstName}', '${lastName}', ${cell}, '${parentEmail}', CURRENT_TIMESTAMP )`;
          let stmt = conn.prepareStatement(peopleTable_InsertQuery,Jdbc.Statement.RETURN_GENERATED_KEYS);

          let rowAffected = stmt.executeUpdate();
          //get people id
          let rs = stmt.getGeneratedKeys();
          if(rs.next()){
            parentContactId = rs.getInt(1);
          }

          //if  insert operation successes, assign address to student
          if(rowAffected==1){
            const studentAddress_InsertQuery = `insert into student_address (student_id, syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,last_updated)
                values (${studentId}, YEAR(CURRENT_TIMESTAMP), 1,'${address}', '${address_2}',  '${city}', '${dept}', '${zipcode}', ${parentContactId}, 'Home Address', CURRENT_TIMESTAMP)`;

            const studentJoinPeople_InsertQuery = `insert into students_join_people (student_id, person_id, emergency_type, relationship, last_updated)
                values (${studentId},${parentContactId},'Primary','${relationship}',CURRENT_TIMESTAMP)`;
            stmt = conn.createStatement();
            stmt.addBatch(studentJoinPeople_InsertQuery);
            stmt.addBatch(studentAddress_InsertQuery);
            rs = stmt.executeBatch();
            conn.commit(); // When this returns, this is when changes are actually committed
            conn.close();

          }
          else {
            throw new SQLException('people insert operation failed');
          }

        }
        else {


          //updating existing parent contact
          const peopleTable_UpdateQuery = `update people set first_name = '${firstName}' , last_name = '${lastName}' , email= '${parentEmail}',
                    cell_phone = ${cell}, last_updated= CURRENT_TIMESTAMP
                    where staff_id = ${staffId}`;

          const studentJoinPeople_UpdateQuery = `update students_join_people  set relationship = '${relationship}' , last_updated = CURRENT_TIMESTAMP
                      where student_id = ${studentId} and person_id = ${staffId}`;

          const studentAddress_UpdateQuery = `update student_address set street_address_1 = '${address}', city = '${city}',
                      state = '${dept}', zipcode = '${zipcode}', street_address_2 = '${address_2}', last_updated = CURRENT_TIMESTAMP
                      where student_id = ${studentId} and people_id = ${staffId}`;

          // var stmt = conn.prepareStatement(peopleTable_UpdateQuery);
          var stmt = conn.createStatement();
          stmt.addBatch(studentJoinPeople_UpdateQuery);
          stmt.addBatch(peopleTable_UpdateQuery);
          stmt.addBatch(studentAddress_UpdateQuery);

          var rs = stmt.executeBatch();
          Logger.log(rs);
          conn.commit(); // When this returns, this is when changes are actually committed
          conn.close();

        }

        const extraDetails = JSON.stringify({
          studentId:studentId,
          peopleId:parentContactId
        });
        this.ssManager.addEventLogRecord(isAdd?eventLogData.ADD_ACTION:eventLogData.UPDATE_ACTION,
          eventLogData.STATUS_SUCCESS,extraDetails);
        return {
          state:true,
          parentContactId:parentContactId
        }

      }
      else {

        const detailedError = JSON.stringify({
          studentId:formData.studentId,
          functionName:'isValidLoginCredentials',
          error:'Failed to Create Database connection'
        });
        this.ssManager.addEventLogRecord(eventLogData.LOGIN_ACTION,eventLogData.STATUS_FAILED,detailedError);

        return{
          state:false,
          msg:'Failed to Create Database connection',
          error:null
        }
      }

    }
    catch (e) {

      const detailedError = JSON.stringify({
        studentId:formData.studentId,
        functionName:'updateParentContact',
        error:e
      });
      this.ssManager.addEventLogRecord(eventLogData.UPDATE_ACTION,eventLogData.STATUS_FAILED,detailedError);

      if(conn){
        conn.rollback();
        conn.close();
      }
      Logger.log('Exception in updateParentContact');
      Logger.log(e);
      return{
        state:false,
        msg:'Exception in updateParentContact',
        error:e
      }
    }
  };

  copyContact = (formData)=>{
    let conn = false;
    try {

      const conn = Jdbc.getConnection('jdbc:mysql://'+sheetData.DATABASE_HOST+':3306/'+sheetData.DATBASE_NAME,
        sheetData.DATABASE_USER,
        sheetData.DATABASE_PASSWORD);


      if(conn){

        const parentContactId = formData.parentContactId;
        const alreadyMappedStudentId = formData.alreadyMappedStudentId;
        const studentId = formData.studentId;

        conn.setAutoCommit(false);


        const studentAddress_InsertQuery = `insert into student_address (student_id, syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,last_updated)
            SELECT ${studentId}, syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,CURRENT_TIMESTAMP
            FROM student_address
            WHERE student_id=${alreadyMappedStudentId} AND people_id=${parentContactId} LIMIT 1`;

        const studentJoinPeople_InsertQuery = `INSERT INTO students_join_people (student_id, person_id, emergency_type, relationship,last_updated)
            SELECT ${studentId},${parentContactId},emergency_type,relationship,CURRENT_TIMESTAMP
            FROM students_join_people
            WHERE student_id=${alreadyMappedStudentId} AND person_id=${parentContactId} LIMIT 1`;

        const stmt = conn.createStatement();
        stmt.addBatch(studentJoinPeople_InsertQuery);
        stmt.addBatch(studentAddress_InsertQuery);



        if(formData.hasOwnProperty('oldParentContactId')){

          const oldParentContactId = formData.oldParentContactId;
          const studentJoinPeople_DeleteQuery = `delete from students_join_people
              where student_id = ${studentId} and person_id = ${oldParentContactId} LIMIT 1;`;


          const studentAddress_DeleteQuery = `delete from student_address
              where student_id = ${studentId} and people_id = ${oldParentContactId} LIMIT 1;`;


          stmt.addBatch(studentJoinPeople_DeleteQuery);
          stmt.addBatch(studentAddress_DeleteQuery);

        }


        const rs = stmt.executeBatch();
        conn.commit(); // When this returns, this is when changes are actually committed
        conn.close();

        const extraDetails = JSON.stringify({
          studentId:studentId,
          peopleId:parentContactId
        });
        this.ssManager.addEventLogRecord(eventLogData.UPDATE_ACTION, eventLogData.STATUS_SUCCESS,extraDetails);
        return {
          state:true
        }

      }
      else {

        const detailedError = JSON.stringify({
          studentId:formData.studentId,
          functionName:'copyContact',
          error:'Failed to Create Database connection'
        });
        this.ssManager.addEventLogRecord(eventLogData.UPDATE_ACTION,eventLogData.STATUS_FAILED,detailedError);
        return{
          state:false,
          msg:'Failed to Create Database connection',
          error:null
        }
      }

    }
    catch (e) {

      const detailedError = JSON.stringify({
        studentId:formData.studentId,
        functionName:'copyContact',
        error:e
      });
      this.ssManager.addEventLogRecord(eventLogData.UPDATE_ACTION,eventLogData.STATUS_FAILED,detailedError);


      if(conn){
        conn.rollback();
        conn.close();
      }
      Logger.log('Exception in updateParentContact');
      Logger.log(e);
      return{
        state:false,
        msg:'Exception in updateParentContact',
        error:e
      }
    }
  };



}