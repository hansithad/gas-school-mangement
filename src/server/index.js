import * as publicSheetFunctions from './sheets';
import * as publicRouterFunctions from './routes';

// Expose public functions by attaching to `global`
global.doGet = publicRouterFunctions.doGet;

global.isValidLoginCredentials = publicSheetFunctions.isValidLoginCredentials;
global.updateParentContact = publicSheetFunctions.updateParentContact;
global.uploadDocFile = publicSheetFunctions.uploadDocFile;
global.checkForDuplicateEmailAddress = publicSheetFunctions.checkForDuplicateEmailAddress;
global.copyContact = publicSheetFunctions.copyContact;
global.acceptSchoolManual = publicSheetFunctions.acceptSchoolManual;
