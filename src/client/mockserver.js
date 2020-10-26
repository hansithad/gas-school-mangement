// Convert google script server calls to more familiar promise-based functions
import axios from 'axios';
const BASE_URL = 'http://localhost:9999';
const myServerFunctions = {};



// get all the public/global function names from the server
const myServerFunctionNames = [];




const isValidLoginCredentials = (altId,localId)=>{
    //TODO should pass student info at first login
    const isValid = altId=='1234' && localId=='9999'?true:false;
    const returnObject = {
        'isValid':isValid,
        'email':altId+'_'+localId,
        'studentFullName':'Student Name'
    };
    return returnObject;
};

myServerFunctions['isValidLoginCredentials'] = (altId,localId)=>{


    return new Promise(async resolve => {
        //TODO should pass student info at first login
        const isValid = altId=='1234' && localId=='9999'?true:false;
        const docList = [
          {
            "year":"2020",
            "docDesc":"First Document",
            "date":"2020-09-25"
          },
          {
            "year":"2020",
            "docDesc":"Law Document",
            "date":"2020-09-25"
          },
          {
            "year":"2020",
            "docDesc":"Enroll Document",
            "date":"2020-09-25"
          }
        ];
        const parentContactId = 1;
        const parentObject = {
          'parentContactId':parentContactId,
          'firstName':'first name',
          'lastName':'last name',
          'parentEmail':'sam@gmail.com',
          'cell':'1234',
          'address':'Add 1',
          'city':'city 1',
          'id':'24000',
          'idType':'NUIP',
          'dept':'Amazonas',
          'relationship':'Father',
        };


        const returnObject = {
            'isValid':isValid,
            'email':altId+'_'+localId,
            'studentFullName':'Student Name',
            'studentId':1,
            'uploadedDocuments':JSON.stringify(docList),
            'parentObject':parentObject,
            'smAccepted':false,
            'smUrl':'https://docs.google.com/document/d/e/2PACX-1vRBqqUFDKUer1-RH_jaOSha52jVJqSjC6qLctOUB51CsGZzLxCEtN3gIjOIoMRhVOORiApTjgFYpre0/pub?embedded=true'
        };
        resolve (returnObject);
    })

};

myServerFunctions['uploadDocFile'] = (docFormData)=>{

  console.log('server uploadDocFile called',docFormData);
    return new Promise(async resolve => {
        resolve (docFormData);
    })

};

const getUploadedDocumentList = async ()=>{
  const docList = await getDataFromServer('documents');
  return docList;
};

const getDataFromServer = (urlSuffix)=>{
  return new Promise(resolve => {

    const url = BASE_URL+'/'+urlSuffix;
    axios.get(url,{
      params:{}
    })
      .then(res => {
        console.log('ax response');
        console.log(res.data);
        resolve(res.data)
      })
      .catch(err => {console.log(err)});
  })

};





myServerFunctions['getSheetsData'] = (localId)=>{

  const altId = 1;
  return new Promise(resolve => {
    //TODO should pass student info at first login
    const isValid = altId=='1234' && localId=='9999'?true:false;
    const returnObject = {
      'isValid':isValid,
      'email':altId+'_'+localId,
      'studentFullName':'Student Name'
    };
    resolve (returnObject);
  })



};

myServerFunctions['updateParentContact'] = (formData) => {
  return new Promise(resolve => {
    console.log(formData);
    const returnObject = {
      'data':formData,
      'msg':'Contact updated successfully',
      'parentContactId':2+(new Date()).getTime(),
      'status':'success'
    };
    resolve (returnObject);
  })

};

myServerFunctions['checkForDuplicateEmailAddress'] = (emailAddress) => {
  return new Promise(resolve => {

      const parentContact = {
      'firstName':'dup first name',
      'lastName':'dup last name',
      'parentEmail':'sam@gmail.com',
      'cell':'dup 1234',
      'address':'dup Add 1',
      'city':'dup city 1',
      'id':'NUIP',
      'dept':'Amazonas',
    };

      const isDuplicateEmail = emailAddress=='sam1@gmail.com';

      const results = {
        isDuplicate:isDuplicateEmail,
        duplicateParentContact:parentContact
      };
      resolve(results);
  })

};

myServerFunctions['copyContact'] = (formData) => {
  return new Promise(resolve => {

      const parentContact = {
      'firstName':'dup first name',
      'lastName':'dup last name',
      'parentEmail':'sam@gmail.com',
      'cell':'dup 1234',
      'address':'dup Add 1',
      'city':'dup city 1',
      'id':'NUIP',
      'dept':'Amazonas',
    };

    const returnObject = {
      'msg':'Copied existing parent record to this student',
      'parentContactId':1,
      'status':'success'
    };
    resolve (returnObject);

  })

};

myServerFunctions['acceptSchoolManual'] = (formData) => {
  return new Promise(resolve => {

    const successReturnObject = {
      msg:'Your response saved successfully',
      status:'success',
    };

    const errorReturnObject = {
      msg:'Failed to saved your response',
      status:'error'
    };
    resolve (successReturnObject);

  })

};

// save each function to our new server object using promises
// myServerFunctionNames.forEach(serverFunctionName => {
//   myServerFunctions[serverFunctionName] = (...args) =>
//     new Promise((resolve, reject) => {
//         return  serverFunctionName(...args);
//     });
// });



export default myServerFunctions;