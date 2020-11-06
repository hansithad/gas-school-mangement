import sheetData from './sheet_helpers/sheetData/sheetData';
import SpreadsheetManager from './sheet_helpers/SpreadsheetManager'
import DatabaseManager from './sheet_helpers/DatabaseManager'
import DriveManager from './sheet_helpers/DriveManager'
const getMasterSheet = () => SpreadsheetApp.openById(sheetData.masterSheetId);

const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();


/****
 *
 *  code begins here
 *
 */

export const isValidLoginCredentials = (altId,localId)=>{

  const databaseManager = new DatabaseManager();
  const dbResponse = databaseManager.isValidLoginCredentials(altId,localId);
  if(dbResponse.state){

    let uploadedDocuments = [];
    let smAccepted = false;
    let smUrl = '';
    if(dbResponse.studentObject.studentId != null){
      const driveManager = new DriveManager();
      uploadedDocuments = driveManager.getDocumentListByStudentId(dbResponse.studentObject.studentId);

      const sheetManger = new SpreadsheetManager();
      const results = sheetManger.checkSMAcceptStatus(dbResponse.studentObject.studentId);
      smAccepted = results[0];
      smUrl = results[1];
    }

    const successReturnObject = {
      'isValid':dbResponse.isValid,
      'email':altId+'_'+localId,
      'studentFullName':dbResponse.studentObject.studentName,
      'studentId':dbResponse.studentObject.studentId,
      'parentObject':dbResponse.parentObject,
      'uploadedDocuments':JSON.stringify(uploadedDocuments),
      'smAccepted':smAccepted,
      'smUrl':smUrl
    };
    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      'isValid':dbResponse.isValid,
      'msg':dbResponse.msg,
      'error':dbResponse.error
    };
    return errorReturnObject;
  }
};

export const updateParentContact = (formData) => {

  Logger.log('updateParentContact started in sheet');
  const databaseManager = new DatabaseManager();
  const dbResponse = databaseManager.updateParentContact(formData);
  if(dbResponse.state){
    const successReturnObject = {
      msg:'Contacto Actualizado Exitosamente!',
      status:'success',
      parentContactId : dbResponse.parentContactId
    };

    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      msg:'La Actualización Del Contacto Ha Fallado!',
      status:'error',
      error:dbResponse.msg
    };
    return errorReturnObject;
  }
};

export const uploadDocFile = (docFormData)=>{

  const driveManager = new DriveManager();
  const driveResponse = driveManager.uploadDocFile(docFormData);
  if(driveResponse.state){
    const successReturnObject = {
      msg:'Archivo Cargado Exitosamente!',
      status:'success',
      fileId : driveResponse.fileId,
    };

    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      msg:'La Carga Del Archivo Ha Fallado!',
      status:'error',
      error:driveResponse.msg,
      serverError:driveResponse.error
    };
    return errorReturnObject;
  }











};

export const checkForDuplicateEmailAddress = (emailAddress) => {

  const databaseManager = new DatabaseManager();
  const dbResponse = databaseManager.checkForDuplicateEmailAddress(emailAddress);
  if(dbResponse.state){
    const successReturnObject = {
      msg:'',
      status:'success',
      isDuplicate : dbResponse.isDuplicate,
      duplicateParentContact : dbResponse.duplicateParentContact,
    };

    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      msg:'',
      status:'error',
      error:dbResponse.msg
    };
    return errorReturnObject;
  }





};

export const copyContact = (formData) => {

  const databaseManager = new DatabaseManager();
  const dbResponse = databaseManager.copyContact(formData);
  if(dbResponse.state){
    const successReturnObject = {
      msg:'Se Ha Copiado El Record De Contacto Existente Para El/La EstudianteCopied existing parent record to this student',
      status:'success',
    };

    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      msg:'La Copia del Record De Contacto Ha Fallado',
      status:'error',
      error:dbResponse.msg
    };
    return errorReturnObject;
  }





};

export const acceptSchoolManual = (formData) => {

  const sheetManager = new SpreadsheetManager();
  const sheetResponse = sheetManager.acceptSchoolManual(formData);
  if(sheetResponse.state){
    const successReturnObject = {
      msg:'Su Respuesta Se Ha Guardado Exitosamente!',
      status:'success',
    };

    return successReturnObject;
  }
  else {
    const errorReturnObject = {
      msg:'Su Respuesta No Fue Guardada!',
      status:'error',
      error:sheetResponse.msg,
      serverError:sheetResponse.error
    };
    return errorReturnObject;
  }





};

