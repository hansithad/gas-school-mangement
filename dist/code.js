// Expose public functions by attaching to `global`
function doGet() {
}
function isValidLoginCredentials() {
}
function updateParentContact() {
}
function uploadDocFile() {
}
function checkForDuplicateEmailAddress() {
}
function copyContact() {
}
function acceptSchoolManual() {
}(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ sheets_isValidLoginCredentials; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ sheets_updateParentContact; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ sheets_uploadDocFile; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ sheets_checkForDuplicateEmailAddress; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ sheets_copyContact; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ sheets_acceptSchoolManual; });

// CONCATENATED MODULE: ./src/server/sheet_helpers/sheetData/sheetData.js
var sheetData = {
  masterSheetId: '1JW1PjgbD2ythx8jo-r3XdcpCw78c_0TGRwV91lpTPyQ',
  eventLogSheetName: 'ADA Event Log',
  smAcceptSheetNamePrefix: 'SM Accept-',
  smDocumentLinkSheetName: 'SM Document Map',
  rootDriveFolder: '1RKr1JhOKC6Ceb6Yb0k34CR7dowQdcuGp',
  DATABASE_USER: 'opensisicdevuser',
  DATABASE_PASSWORD: 'Uv94OP40xkHW',
  DATABASE_HOST: '107.170.51.111',
  DATBASE_NAME: 'opensisic'
};
/* harmony default export */ var sheetData_sheetData = (sheetData);
// CONCATENATED MODULE: ./src/server/sheet_helpers/sheetData/eventLogData.js
var eventLogData = {
  LOGIN_ACTION: 'Login',
  UPDATE_ACTION: 'Update',
  ADD_ACTION: 'Update',
  SUBMIT_DOC_ACTION: 'Submit Documentation',
  ACCEPT_SM_ACTION: 'AcceptSM',
  STATUS_SUCCESS: 'Success',
  STATUS_FAILED: 'Failure'
};
/* harmony default export */ var sheetData_eventLogData = (eventLogData);
// CONCATENATED MODULE: ./src/server/sheet_helpers/SpreadsheetManager.js
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SpreadsheetManager_SpreadsheetManager = function SpreadsheetManager() {
  _classCallCheck(this, SpreadsheetManager);

  _defineProperty(this, "addEventLogRecord", function (action, status, details) {
    try {
      var ss = SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
      var eventLogSheet = ss.getSheetByName(sheetData_sheetData.eventLogSheetName);
      var rowContent = [new Date(), action, status, details];
      eventLogSheet.appendRow(rowContent);
      SpreadsheetApp.flush();
    } catch (e) {
      Logger.log('Exception in addEventLogRecord');
      Logger.log(e);
    }
  });

  _defineProperty(this, "checkSMAcceptStatus", function (studentId) {
    try {
      var ss = SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
      var currentYear = new Date().getFullYear();
      var currentYearSheetName = sheetData_sheetData.smAcceptSheetNamePrefix + currentYear;
      var currentYearSheet = ss.getSheetByName(currentYearSheetName);
      var lastRowIndex = currentYearSheet.getLastRow();
      var acceptedStudentList = currentYearSheet.getRange('B2:B' + lastRowIndex).getValues();
      var acceptStatus = acceptedStudentList.flat().indexOf(parseInt(studentId)) > -1;
      var docLinkSheet = ss.getSheetByName(sheetData_sheetData.smDocumentLinkSheetName);
      var smUrl = '';
      var allSheetData = docLinkSheet.getDataRange().getValues();
      Logger.log(allSheetData);

      var _iterator = _createForOfIteratorHelper(allSheetData),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var row = _step.value;

          if (parseInt(row[0]) == currentYear) {
            smUrl = row[1];
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return [acceptStatus, smUrl];
    } catch (e) {
      return [false, ''];
    }
  });

  _defineProperty(this, "acceptSchoolManual", function (formData) {
    var ssManager = new SpreadsheetManager();

    try {
      var studentId = formData.studentId;
      var ss = SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
      var currentYearSheetName = sheetData_sheetData.smAcceptSheetNamePrefix + new Date().getFullYear();
      var currentYearSheet = ss.getSheetByName(currentYearSheetName);
      currentYearSheet.appendRow([new Date(), studentId]);
      var extraDetails = JSON.stringify({
        studentId: studentId
      });
      ssManager.addEventLogRecord(sheetData_eventLogData.ACCEPT_SM_ACTION, sheetData_eventLogData.STATUS_SUCCESS, extraDetails);
      return {
        state: true
      };
    } catch (e) {
      var detailedError = JSON.stringify({
        studentId: formData.studentId,
        functionName: 'SpreadsheetManager:acceptSchoolManual',
        error: e
      });
      ssManager.addEventLogRecord(sheetData_eventLogData.ACCEPT_SM_ACTION, sheetData_eventLogData.STATUS_FAILED, detailedError);
      return {
        state: false,
        msg: 'Exception in SpreadsheetManager.js:acceptSchoolManual',
        error: e
      };
    }
  });
};


// CONCATENATED MODULE: ./src/server/sheet_helpers/DatabaseManager.js
function DatabaseManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DatabaseManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var DatabaseManager_DatabaseManager = function DatabaseManager() {
  var _this = this;

  DatabaseManager_classCallCheck(this, DatabaseManager);

  DatabaseManager_defineProperty(this, "isValidLoginCredentials", function (altId, localId) {
    var conn = false;
    Logger.log('Begin : isValidLoginCredentials');

    try {
      conn = Jdbc.getConnection('jdbc:mysql://' + sheetData_sheetData.DATABASE_HOST + ':3306/' + sheetData_sheetData.DATBASE_NAME, sheetData_sheetData.DATABASE_USER, sheetData_sheetData.DATABASE_PASSWORD);

      if (conn) {
        var stmt = conn.createStatement();
        var userQuery = 'SELECT count(*) FROM students  WHERE alt_id =' + altId + ' AND CUSTOM_2=' + localId;
        Logger.log(userQuery);
        var rs = stmt.executeQuery(userQuery);
        var isValid = false;

        while (rs.next()) {
          isValid = rs.getString(1) == '1';
          break;
        } //if login is successful then get student info, parent info


        var studentObject = {
          'studentId': null,
          'studentName': null
        };
        var parentObject = {};

        if (isValid) {
          rs = stmt.executeQuery('SELECT student_id, first_name,last_name FROM students  WHERE alt_id =' + altId + ' AND CUSTOM_2=' + localId + ' LIMIT 1');

          while (rs.next()) {
            studentObject['studentId'] = rs.getString(1);
            studentObject['studentName'] = rs.getString(2) + ' ' + rs.getString(3);
          }

          if (studentObject['studentId'] != null) {
            rs = stmt.executeQuery("select p.staff_id , p.first_name, p.last_name, p.email, p.cell_phone, \nsa.street_address_1, sa.city , sa.zipcode, sa.street_address_2, sa.state, sjp.relationship\n\nfrom students_join_people sjp \nleft join people p on sjp.person_id  = p.staff_id\nleft join student_address sa ON (p.staff_id=sa.people_id AND sjp.student_id=sa.student_id)\nwhere sjp.student_id = ".concat(studentObject['studentId'], " and emergency_type = 'Primary'"));

            while (rs.next()) {
              parentObject['parentContactId'] = rs.getString(1);
              parentObject['firstName'] = rs.getString(2);
              parentObject['lastName'] = rs.getString(3);
              parentObject['parentEmail'] = rs.getString(4);
              parentObject['cell'] = rs.getString(5);
              parentObject['address'] = rs.getString(6);
              parentObject['city'] = rs.getString(7);
              parentObject['id'] = rs.getString(8);
              parentObject['idType'] = rs.getString(9) != null && rs.getString(9).split('-').length == 3 ? rs.getString(9).split('-')[0] : '';
              parentObject['dept'] = rs.getString(10);
              parentObject['relationship'] = rs.getString(11);
            }
          }
        }

        rs.close();
        stmt.close();
        conn.close();
        var extraDetails = JSON.stringify({
          altId: altId,
          localId: localId
        });

        _this.ssManager.addEventLogRecord(sheetData_eventLogData.LOGIN_ACTION, sheetData_eventLogData.STATUS_SUCCESS, extraDetails);

        return {
          state: true,
          isValid: isValid,
          studentObject: studentObject,
          parentObject: parentObject
        };
      }

      var detailedError = JSON.stringify({
        altId: altId,
        localId: localId,
        functionName: 'isValidLoginCredentials',
        error: 'Failed to Create Database connection'
      });

      _this.ssManager.addEventLogRecord(sheetData_eventLogData.LOGIN_ACTION, sheetData_eventLogData.STATUS_FAILED, detailedError);

      return {
        state: false,
        msg: 'Failed to Create Database connection',
        error: null
      };
    } catch (e) {
      var _detailedError = JSON.stringify({
        altId: altId,
        localId: localId,
        functionName: 'isValidLoginCredentials',
        error: e
      });

      _this.ssManager.addEventLogRecord(sheetData_eventLogData.LOGIN_ACTION, sheetData_eventLogData.STATUS_FAILED, _detailedError);

      if (conn) {
        conn.rollback();
        conn.close();
      }

      Logger.log('Exception in isValidLoginCredentials');
      Logger.log(e);
      return {
        state: false,
        msg: 'Exception in isValidLoginCredentials',
        error: e
      };
    }
  });

  DatabaseManager_defineProperty(this, "checkForDuplicateEmailAddress", function (emailAddress) {
    var conn = false;
    Logger.log('Begin : checkForDuplicateEmailAddress');

    try {
      conn = Jdbc.getConnection('jdbc:mysql://' + sheetData_sheetData.DATABASE_HOST + ':3306/' + sheetData_sheetData.DATBASE_NAME, sheetData_sheetData.DATABASE_USER, sheetData_sheetData.DATABASE_PASSWORD);

      if (conn) {
        var stmt = conn.createStatement();
        var parentObject = {};
        var isDuplicate = false;
        var rs = stmt.executeQuery("select p.staff_id , p.first_name, p.last_name, p.email, p.cell_phone, \n              sa.street_address_1, sa.city , sa.zipcode, sa.street_address_2, sa.state, sjp.relationship , sjp.student_id\n              \n              from students_join_people sjp \n              left join people p on sjp.person_id  = p.staff_id\n              left join student_address sa ON (p.staff_id=sa.people_id AND sjp.student_id=sa.student_id)\n              where sjp.person_id = (select staff_id from people where email = '".concat(emailAddress, "') and emergency_type = 'Primary'\n              LIMIT 1"));

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
          parentObject['idType'] = rs.getString(9) != null && rs.getString(9).split('-').length == 3 ? rs.getString(9).split('-')[0] : '';
          parentObject['dept'] = rs.getString(10);
          parentObject['relationship'] = rs.getString(11);
          parentObject['alreadyMappedStudentId'] = rs.getString(12);
        }

        rs.close();
        stmt.close();
        conn.close();
        return {
          state: true,
          isDuplicate: isDuplicate,
          duplicateParentContact: parentObject
        };
      }

      return {
        state: false,
        msg: 'Failed to Create Database connection',
        error: null
      };
    } catch (e) {
      Logger.log('Exception in isValidLoginCredentials');
      Logger.log(e);
      return {
        state: false,
        msg: 'Exception in isValidLoginCredentials',
        error: e
      };
    }
  });

  DatabaseManager_defineProperty(this, "updateParentContact", function (formData) {
    var conn = false;
    Logger.log('Begin : updateParentContact');

    try {
      var _conn = Jdbc.getConnection('jdbc:mysql://' + sheetData_sheetData.DATABASE_HOST + ':3306/' + sheetData_sheetData.DATBASE_NAME, sheetData_sheetData.DATABASE_USER, sheetData_sheetData.DATABASE_PASSWORD);

      if (_conn) {
        //TODO get steeet_address_2 combined value
        var parentContactId = formData.hasOwnProperty('parentContactId') ? formData.parentContactId : null;
        var firstName = formData.firstName;
        var lastName = formData.lastName;
        var parentEmail = formData.parentEmail;
        var cell = formData.cell;
        var address = formData.address;
        var relationship = formData.relationship;
        var studentId = formData.studentId;
        var zipcode = formData.id; //zip

        var city = formData.city;
        var dept = formData.dept; //state

        var idType = formData.idType;
        var staffId = parentContactId;
        var address_2 = [idType, city, dept].join('-');

        _conn.setAutoCommit(false);

        Logger.log('parentContactId is ' + parentContactId);
        var isAdd = false;

        if (parentContactId == null) {
          //new parent contact
          Logger.log('new parent contact');
          isAdd = true; //insert record to people table

          var peopleTable_InsertQuery = "insert into people (current_school_id, first_name,last_name, cell_phone, email,last_updated)\n                values (  1, '".concat(firstName, "', '").concat(lastName, "', ").concat(cell, ", '").concat(parentEmail, "', CURRENT_TIMESTAMP )");

          var _stmt = _conn.prepareStatement(peopleTable_InsertQuery, Jdbc.Statement.RETURN_GENERATED_KEYS);

          var rowAffected = _stmt.executeUpdate(); //get people id


          var _rs = _stmt.getGeneratedKeys();

          if (_rs.next()) {
            parentContactId = _rs.getInt(1);
          } //if  insert operation successes, assign address to student


          if (rowAffected == 1) {
            var studentAddress_InsertQuery = "insert into student_address (student_id, syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,last_updated)\n                values (".concat(studentId, ", YEAR(CURRENT_TIMESTAMP), 1,'").concat(address, "', '").concat(address_2, "',  '").concat(city, "', '").concat(dept, "', '").concat(zipcode, "', ").concat(parentContactId, ", 'Home Address', CURRENT_TIMESTAMP)");
            var studentJoinPeople_InsertQuery = "insert into students_join_people (student_id, person_id, emergency_type, relationship, last_updated)\n                values (".concat(studentId, ",").concat(parentContactId, ",'Primary','").concat(relationship, "',CURRENT_TIMESTAMP)");
            _stmt = _conn.createStatement();

            _stmt.addBatch(studentJoinPeople_InsertQuery);

            _stmt.addBatch(studentAddress_InsertQuery);

            _rs = _stmt.executeBatch();

            _conn.commit(); // When this returns, this is when changes are actually committed


            _conn.close();
          } else {
            throw new SQLException('people insert operation failed');
          }
        } else {
          //updating existing parent contact
          var peopleTable_UpdateQuery = "update people set first_name = '".concat(firstName, "' , last_name = '").concat(lastName, "' , email= '").concat(parentEmail, "',\n                    cell_phone = ").concat(cell, ", last_updated= CURRENT_TIMESTAMP\n                    where staff_id = ").concat(staffId);
          var studentJoinPeople_UpdateQuery = "update students_join_people  set relationship = '".concat(relationship, "' , last_updated = CURRENT_TIMESTAMP\n                      where student_id = ").concat(studentId, " and person_id = ").concat(staffId);
          var studentAddress_UpdateQuery = "update student_address set street_address_1 = '".concat(address, "', city = '").concat(city, "',\n                      state = '").concat(dept, "', zipcode = '").concat(zipcode, "', street_address_2 = '").concat(address_2, "', last_updated = CURRENT_TIMESTAMP\n                      where student_id = ").concat(studentId, " and people_id = ").concat(staffId); // var stmt = conn.prepareStatement(peopleTable_UpdateQuery);

          var stmt = _conn.createStatement();

          stmt.addBatch(studentJoinPeople_UpdateQuery);
          stmt.addBatch(peopleTable_UpdateQuery);
          stmt.addBatch(studentAddress_UpdateQuery);
          var rs = stmt.executeBatch();
          Logger.log(rs);

          _conn.commit(); // When this returns, this is when changes are actually committed


          _conn.close();
        }

        var extraDetails = JSON.stringify({
          studentId: studentId,
          peopleId: parentContactId
        });

        _this.ssManager.addEventLogRecord(isAdd ? sheetData_eventLogData.ADD_ACTION : sheetData_eventLogData.UPDATE_ACTION, sheetData_eventLogData.STATUS_SUCCESS, extraDetails);

        return {
          state: true,
          parentContactId: parentContactId
        };
      } else {
        var detailedError = JSON.stringify({
          studentId: formData.studentId,
          functionName: 'isValidLoginCredentials',
          error: 'Failed to Create Database connection'
        });

        _this.ssManager.addEventLogRecord(sheetData_eventLogData.LOGIN_ACTION, sheetData_eventLogData.STATUS_FAILED, detailedError);

        return {
          state: false,
          msg: 'Failed to Create Database connection',
          error: null
        };
      }
    } catch (e) {
      var _detailedError2 = JSON.stringify({
        studentId: formData.studentId,
        functionName: 'updateParentContact',
        error: e
      });

      _this.ssManager.addEventLogRecord(sheetData_eventLogData.UPDATE_ACTION, sheetData_eventLogData.STATUS_FAILED, _detailedError2);

      if (conn) {
        conn.rollback();
        conn.close();
      }

      Logger.log('Exception in updateParentContact');
      Logger.log(e);
      return {
        state: false,
        msg: 'Exception in updateParentContact',
        error: e
      };
    }
  });

  DatabaseManager_defineProperty(this, "copyContact", function (formData) {
    var conn = false;

    try {
      var _conn2 = Jdbc.getConnection('jdbc:mysql://' + sheetData_sheetData.DATABASE_HOST + ':3306/' + sheetData_sheetData.DATBASE_NAME, sheetData_sheetData.DATABASE_USER, sheetData_sheetData.DATABASE_PASSWORD);

      if (_conn2) {
        var parentContactId = formData.parentContactId;
        var alreadyMappedStudentId = formData.alreadyMappedStudentId;
        var studentId = formData.studentId;

        _conn2.setAutoCommit(false);

        var studentAddress_InsertQuery = "insert into student_address (student_id, syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,last_updated)\n            SELECT ".concat(studentId, ", syear, school_id, street_address_1, street_address_2, city, state, zipcode, people_id, type,CURRENT_TIMESTAMP\n            FROM student_address\n            WHERE student_id=").concat(alreadyMappedStudentId, " AND people_id=").concat(parentContactId, " LIMIT 1");
        var studentJoinPeople_InsertQuery = "INSERT INTO students_join_people (student_id, person_id, emergency_type, relationship,last_updated)\n            SELECT ".concat(studentId, ",").concat(parentContactId, ",emergency_type,relationship,CURRENT_TIMESTAMP\n            FROM students_join_people\n            WHERE student_id=").concat(alreadyMappedStudentId, " AND person_id=").concat(parentContactId, " LIMIT 1");

        var stmt = _conn2.createStatement();

        stmt.addBatch(studentJoinPeople_InsertQuery);
        stmt.addBatch(studentAddress_InsertQuery);

        if (formData.hasOwnProperty('oldParentContactId')) {
          var oldParentContactId = formData.oldParentContactId;
          var studentJoinPeople_DeleteQuery = "delete from students_join_people\n              where student_id = ".concat(studentId, " and person_id = ").concat(oldParentContactId, " LIMIT 1;");
          var studentAddress_DeleteQuery = "delete from student_address\n              where student_id = ".concat(studentId, " and people_id = ").concat(oldParentContactId, " LIMIT 1;");
          stmt.addBatch(studentJoinPeople_DeleteQuery);
          stmt.addBatch(studentAddress_DeleteQuery);
        }

        var rs = stmt.executeBatch();

        _conn2.commit(); // When this returns, this is when changes are actually committed


        _conn2.close();

        var extraDetails = JSON.stringify({
          studentId: studentId,
          peopleId: parentContactId
        });

        _this.ssManager.addEventLogRecord(sheetData_eventLogData.UPDATE_ACTION, sheetData_eventLogData.STATUS_SUCCESS, extraDetails);

        return {
          state: true
        };
      } else {
        var detailedError = JSON.stringify({
          studentId: formData.studentId,
          functionName: 'copyContact',
          error: 'Failed to Create Database connection'
        });

        _this.ssManager.addEventLogRecord(sheetData_eventLogData.UPDATE_ACTION, sheetData_eventLogData.STATUS_FAILED, detailedError);

        return {
          state: false,
          msg: 'Failed to Create Database connection',
          error: null
        };
      }
    } catch (e) {
      var _detailedError3 = JSON.stringify({
        studentId: formData.studentId,
        functionName: 'copyContact',
        error: e
      });

      _this.ssManager.addEventLogRecord(sheetData_eventLogData.UPDATE_ACTION, sheetData_eventLogData.STATUS_FAILED, _detailedError3);

      if (conn) {
        conn.rollback();
        conn.close();
      }

      Logger.log('Exception in updateParentContact');
      Logger.log(e);
      return {
        state: false,
        msg: 'Exception in updateParentContact',
        error: e
      };
    }
  });

  this.ssManager = new SpreadsheetManager_SpreadsheetManager();
};


// CONCATENATED MODULE: ./src/server/sheet_helpers/DriveManager.js
function DriveManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DriveManager_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var DriveManager_DriveManager = function DriveManager() {
  DriveManager_classCallCheck(this, DriveManager);

  DriveManager_defineProperty(this, "getDocumentListByStudentId", function (studentId) {
    try {
      var rootFolder = DriveApp.getFolderById(sheetData_sheetData.rootDriveFolder);
      var folderIterator = rootFolder.getFoldersByName(studentId);

      if (folderIterator.hasNext()) {
        var studentRootFolder = folderIterator.next(); //get all files in 'year' based folders

        var yearBasedFolders = studentRootFolder.getFolders();
        var documentObjectList = [];

        while (yearBasedFolders.hasNext()) {
          var yearBasedFolder = yearBasedFolders.next();
          var yearBasedFiles = yearBasedFolder.getFiles();

          while (yearBasedFiles.hasNext()) {
            var file = yearBasedFiles.next();
            var documentObject = {
              "fileId": file.getId(),
              "year": file.getDateCreated().getFullYear(),
              "docDesc": file.getName(),
              "date": file.getDateCreated()
            };
            documentObjectList.push(documentObject);
          }
        }

        return documentObjectList;
      } else {
        return [];
      }
    } catch (e) {
      Logger.log('exception in getDocumentListByStudentId');
      console.log(e);
      return [];
    }
  });

  DriveManager_defineProperty(this, "uploadDocFile", function (docFormData) {
    var ssManager = new SpreadsheetManager_SpreadsheetManager();

    try {
      var studentId = docFormData.studentId;
      var rootFolder = DriveApp.getFolderById(sheetData_sheetData.rootDriveFolder);
      var folderIterator = rootFolder.getFoldersByName(studentId);
      var currentYearFolder = null;
      var currentYear = new Date().getFullYear();

      if (folderIterator.hasNext()) {
        var studentRootFolder = folderIterator.next();
        var yearBasedFolders = studentRootFolder.getFoldersByName(currentYear);

        if (yearBasedFolders.hasNext()) {
          currentYearFolder = yearBasedFolders.next();
        } else {
          //student does not have a current year folder| create current year folder
          currentYearFolder = studentRootFolder.createFolder(currentYear);
        }
      } else {
        //student does not have a student root folder. create student and current year folder
        var _studentRootFolder = rootFolder.createFolder(studentId);

        currentYearFolder = _studentRootFolder.createFolder(currentYear);
      } //create a new file


      var blob = Utilities.newBlob(Utilities.base64Decode(docFormData.data), docFormData.mimeType, docFormData.docDesc);
      var fileId = currentYearFolder.createFile(blob).getId();
      var extraDetails = JSON.stringify({
        studentId: studentId
      });
      ssManager.addEventLogRecord(sheetData_eventLogData.SUBMIT_DOC_ACTION, sheetData_eventLogData.STATUS_SUCCESS, extraDetails);
      return {
        state: true,
        fileId: fileId
      };
    } catch (e) {
      var detailedError = JSON.stringify({
        studentId: docFormData.studentId,
        functionName: 'uploadDocFile',
        error: e
      });
      ssManager.addEventLogRecord(sheetData_eventLogData.SUBMIT_DOC_ACTION, sheetData_eventLogData.STATUS_FAILED, detailedError);
      return {
        state: false,
        msg: 'Exception in DriveManager:uploadDocFile',
        error: e
      };
    }
  });
};


// CONCATENATED MODULE: ./src/server/sheets.js





var sheets_getMasterSheet = function getMasterSheet() {
  return SpreadsheetApp.openById(sheetData_sheetData.masterSheetId);
};

var getSheets = function getSheets() {
  return SpreadsheetApp.getActive().getSheets();
};

var getActiveSheetName = function getActiveSheetName() {
  return SpreadsheetApp.getActive().getSheetName();
};
/****
 *
 *  code begins here
 *
 */


var sheets_isValidLoginCredentials = function isValidLoginCredentials(altId, localId) {
  var databaseManager = new DatabaseManager_DatabaseManager();
  var dbResponse = databaseManager.isValidLoginCredentials(altId, localId);

  if (dbResponse.state) {
    var uploadedDocuments = [];
    var smAccepted = false;
    var smUrl = '';

    if (dbResponse.studentObject.studentId != null) {
      var driveManager = new DriveManager_DriveManager();
      uploadedDocuments = driveManager.getDocumentListByStudentId(dbResponse.studentObject.studentId);
      var sheetManger = new SpreadsheetManager_SpreadsheetManager();
      var results = sheetManger.checkSMAcceptStatus(dbResponse.studentObject.studentId);
      smAccepted = results[0];
      smUrl = results[1];
    }

    var successReturnObject = {
      'isValid': dbResponse.isValid,
      'email': altId + '_' + localId,
      'studentFullName': dbResponse.studentObject.studentName,
      'studentId': dbResponse.studentObject.studentId,
      'parentObject': dbResponse.parentObject,
      'uploadedDocuments': JSON.stringify(uploadedDocuments),
      'smAccepted': smAccepted,
      'smUrl': smUrl
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      'isValid': dbResponse.isValid,
      'msg': dbResponse.msg,
      'error': dbResponse.error
    };
    return errorReturnObject;
  }
};
var sheets_updateParentContact = function updateParentContact(formData) {
  Logger.log('updateParentContact started in sheet');
  var databaseManager = new DatabaseManager_DatabaseManager();
  var dbResponse = databaseManager.updateParentContact(formData);

  if (dbResponse.state) {
    var successReturnObject = {
      msg: 'Contact updated successfully',
      status: 'success',
      parentContactId: dbResponse.parentContactId
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      msg: 'Failed to update parent contact',
      status: 'error',
      error: dbResponse.msg
    };
    return errorReturnObject;
  }
};
var sheets_uploadDocFile = function uploadDocFile(docFormData) {
  var driveManager = new DriveManager_DriveManager();
  var driveResponse = driveManager.uploadDocFile(docFormData);

  if (driveResponse.state) {
    var successReturnObject = {
      msg: 'File uploaded successfully',
      status: 'success',
      fileId: driveResponse.fileId
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      msg: 'Failed to upload file',
      status: 'error',
      error: driveResponse.msg,
      serverError: driveResponse.error
    };
    return errorReturnObject;
  }
};
var sheets_checkForDuplicateEmailAddress = function checkForDuplicateEmailAddress(emailAddress) {
  var databaseManager = new DatabaseManager_DatabaseManager();
  var dbResponse = databaseManager.checkForDuplicateEmailAddress(emailAddress);

  if (dbResponse.state) {
    var successReturnObject = {
      msg: '',
      status: 'success',
      isDuplicate: dbResponse.isDuplicate,
      duplicateParentContact: dbResponse.duplicateParentContact
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      msg: '',
      status: 'error',
      error: dbResponse.msg
    };
    return errorReturnObject;
  }
};
var sheets_copyContact = function copyContact(formData) {
  var databaseManager = new DatabaseManager_DatabaseManager();
  var dbResponse = databaseManager.copyContact(formData);

  if (dbResponse.state) {
    var successReturnObject = {
      msg: 'Copied existing parent record to this student',
      status: 'success'
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      msg: 'Failed to Copy Existing Parent Record',
      status: 'error',
      error: dbResponse.msg
    };
    return errorReturnObject;
  }
};
var sheets_acceptSchoolManual = function acceptSchoolManual(formData) {
  var sheetManager = new SpreadsheetManager_SpreadsheetManager();
  var sheetResponse = sheetManager.acceptSchoolManual(formData);

  if (sheetResponse.state) {
    var successReturnObject = {
      msg: 'Your response saved successfully',
      status: 'success'
    };
    return successReturnObject;
  } else {
    var errorReturnObject = {
      msg: 'Failed to saved your response',
      status: 'error',
      error: sheetResponse.msg,
      serverError: sheetResponse.error
    };
    return errorReturnObject;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return doGet; });
var doGet = function doGet(e) {
  var html = HtmlService.createHtmlOutputFromFile('main');
  html.addMetaTag('viewport', 'width=device-width, initial-scale=1');
  return html;
};

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony import */ var _sheets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);

 // Expose public functions by attaching to `global`

global.doGet = _routes__WEBPACK_IMPORTED_MODULE_1__[/* doGet */ "a"];
global.isValidLoginCredentials = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* isValidLoginCredentials */ "d"];
global.updateParentContact = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* updateParentContact */ "e"];
global.uploadDocFile = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* uploadDocFile */ "f"];
global.checkForDuplicateEmailAddress = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* checkForDuplicateEmailAddress */ "b"];
global.copyContact = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* copyContact */ "c"];
global.acceptSchoolManual = _sheets__WEBPACK_IMPORTED_MODULE_0__[/* acceptSchoolManual */ "a"];
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(3)))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ])));