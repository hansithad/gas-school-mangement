import sheetData from './sheetData/sheetData';
import eventLogData from './sheetData/eventLogData';


export default class SpreadsheetManager{


  addEventLogRecord = (action,status,details)=>{
    try {
      const ss = SpreadsheetApp.openById(sheetData.masterSheetId);
      const eventLogSheet = ss.getSheetByName(sheetData.eventLogSheetName);
      const rowContent = [new Date(),action,status,details];
      eventLogSheet.appendRow(rowContent);
      SpreadsheetApp.flush();
    }
    catch (e) {
      Logger.log('Exception in addEventLogRecord');
      Logger.log(e)
    }

  };

  checkSMAcceptStatus = (studentId)=>{
    try {
      const ss = SpreadsheetApp.openById(sheetData.masterSheetId);
      const currentYear = (new Date()).getFullYear();
      const currentYearSheetName = sheetData.smAcceptSheetNamePrefix+currentYear;
      const currentYearSheet = ss.getSheetByName(currentYearSheetName);
      const lastRowIndex = currentYearSheet.getLastRow();
      const acceptedStudentList = currentYearSheet.getRange('B2:B'+lastRowIndex).getValues();
      const acceptStatus =  acceptedStudentList.flat().indexOf(parseInt(studentId))>-1;

      const docLinkSheet = ss.getSheetByName(sheetData.smDocumentLinkSheetName);
      let smUrl = '';
      const allSheetData = docLinkSheet.getDataRange().getValues();
      Logger.log(allSheetData);
      for(let row of allSheetData){
        if(parseInt(row[0])==currentYear){
          smUrl = row[1];
          break;
        }
      }

      return [acceptStatus,smUrl];

    }
    catch (e) {
      return [false,''];
    }
  };

  acceptSchoolManual = (formData)=>{
    const ssManager= new SpreadsheetManager();
    try {

      const studentId = formData.studentId;
      const ss = SpreadsheetApp.openById(sheetData.masterSheetId);
      const currentYearSheetName = sheetData.smAcceptSheetNamePrefix+(new Date()).getFullYear();
      const currentYearSheet = ss.getSheetByName(currentYearSheetName);
      currentYearSheet.appendRow([new Date(),studentId]);

      const extraDetails = JSON.stringify({
        studentId:studentId,
      });
      ssManager.addEventLogRecord(eventLogData.ACCEPT_SM_ACTION,eventLogData.STATUS_SUCCESS,extraDetails);
      return {
        state:true
      };

    }
    catch (e) {

      const detailedError = JSON.stringify({
        studentId:formData.studentId,
        functionName:'SpreadsheetManager:acceptSchoolManual',
        error:e
      });
      ssManager.addEventLogRecord(eventLogData.ACCEPT_SM_ACTION,eventLogData.STATUS_FAILED,detailedError);
      return{
        state:false,
        msg:'Exception in SpreadsheetManager.js:acceptSchoolManual',
        error:e
      }
    }
  }





}