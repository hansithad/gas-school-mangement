import sheetData from './sheetData/sheetData';
import eventLogData from './sheetData/eventLogData';
import SpreadsheetManager from './SpreadsheetManager';

export default class DriveManager {

  getDocumentListByStudentId =(altId)=>{

    try {

      const rootFolder = DriveApp.getFolderById(sheetData.rootDriveFolder);
      const folderIterator = rootFolder.getFoldersByName(altId);
      if(folderIterator.hasNext()){
        const studentRootFolder = folderIterator.next();

        //get all files in 'year' based folders
        const yearBasedFolders = studentRootFolder.getFolders();
        const documentObjectList = [];
        while (yearBasedFolders.hasNext()){

           const yearBasedFolder = yearBasedFolders.next();
           const yearBasedFiles = yearBasedFolder.getFiles();
           while (yearBasedFiles.hasNext()) {
             const file = yearBasedFiles.next();

             const documentObject = {
               "fileId":file.getId(),
               "year":file.getDateCreated().getFullYear(),
               "docDesc":file.getName(),
               "date":file.getDateCreated()
             };
             documentObjectList.push(documentObject);
           }
        }

        return documentObjectList;

      }
      else {
        return [];
      }

    }
    catch (e) {
      Logger.log('exception in getDocumentListByStudentId');
      console.log(e);
      return [];
    }
  };

  uploadDocFile = (docFormData)=>{
    const ssManager= new SpreadsheetManager();
    try {

      const studentId = docFormData.studentId;
      const altId = docFormData.altId;

      const rootFolder = DriveApp.getFolderById(sheetData.rootDriveFolder);
      const folderIterator = rootFolder.getFoldersByName(altId);
      let currentYearFolder = null;
      const currentYear = (new Date()).getFullYear();
      if(folderIterator.hasNext()){
        const studentRootFolder = folderIterator.next();
        const yearBasedFolders = studentRootFolder.getFoldersByName(currentYear);
        if(yearBasedFolders.hasNext()){
          currentYearFolder = yearBasedFolders.next();
        }
        else {
          //student does not have a current year folder| create current year folder
          currentYearFolder = studentRootFolder.createFolder(currentYear);
        }

      }
      else {
        //student does not have a student root folder. create student and current year folder
        const studentRootFolder = rootFolder.createFolder(altId);
        currentYearFolder = studentRootFolder.createFolder(currentYear);

      }

      //create a new file
      const blob = Utilities.newBlob(Utilities.base64Decode(docFormData.data), docFormData.mimeType, docFormData.docDesc);
      const fileId = currentYearFolder.createFile(blob).getId();

      const extraDetails = JSON.stringify({
        studentId:studentId,
        altId:altId,
      });
      ssManager.addEventLogRecord(eventLogData.SUBMIT_DOC_ACTION,eventLogData.STATUS_SUCCESS,extraDetails);
      return {
        state:true,
        fileId:fileId
      };

    }
    catch (e) {

      const detailedError = JSON.stringify({
        studentId:docFormData.studentId,
        altId:docFormData.altId,
        functionName:'uploadDocFile',
        error:e
      });
      ssManager.addEventLogRecord(eventLogData.SUBMIT_DOC_ACTION,eventLogData.STATUS_FAILED,detailedError);
      return{
        state:false,
        msg:'Exception in DriveManager:uploadDocFile',
        error:e
      }
    }
  }
}