import React from 'react';
import server from '../server';
import WelcomePage from './WelcomePage';
import Preloader from './Preloader';
import Dashboard from './Dashboard';
import SideNav from './SideNav';
import Profile from './Profile';
import Docs from './Docs';
import SchoolManual from './SchoolManual';
import M from 'materialize-css';

class App extends React.Component {
  constructor(props) {
    super(props);

    const gasCookie = localStorage.getItem('gasCookie');
    const currentUser = {};
    let uploadedDocuments = [];
    let smAccepted = false;
    let smUrl = '';
    if(gasCookie!= null && gasCookie.length>0){
      currentUser['email'] = gasCookie;
      currentUser['studentFullName'] = localStorage.getItem('studentFullName');
      currentUser['studentId'] = localStorage.getItem('studentId');
      currentUser['parentContactId'] = localStorage.getItem('parentContactId');
      currentUser['parentContact'] = JSON.parse(localStorage.getItem('parentContact'));
      uploadedDocuments = JSON.parse(localStorage.getItem('uploadedDocuments'));
      smAccepted = JSON.parse(localStorage.getItem('smAccepted'));
      smUrl = localStorage.getItem('smUrl');
      //need to fetch other detail too
    }

    this.state = {
      page: 'dashboard',
      currentUser: currentUser,
      options: [],
      ready: true,
      navIsClosed: false,
      uploadedDocuments:uploadedDocuments,
      smAccepted:smAccepted,
      smUrl:smUrl
    };
  }



  getLoginUserObject = (altId, localId, callback) => {
    const loginResponseData = server.isValidLoginCredentials(altId,localId);
    console.log(loginResponseData);
    this.setState({ready:false});
    loginResponseData
      .then(data => {
        this.setState({ready: true });
        callback(data);
      })
      .catch(err => {
        console.log(err);
        M.toast({html: 'Usuario No Encontrado'});
      });
  };

  uploadDocFile = (docDesc,docFile,callback)=>{

    const fr = new FileReader();
    fr.onload = (e) => {
      const data = e.target.result.split(",");
      const obj = {
        fileName: docFile.name,
        mimeType: data[0].match(/:(\w.+);/)[1],
        data: data[1],
        docDesc:docDesc,
        //studentId:this.state.currentUser.studentId
        studentId:this.state.currentUser.altId
      };

      const uploadResponse = server.uploadDocFile(obj);
      uploadResponse
        .then(res => {
          callback();
          M.toast({html: res.msg,classes: res.status=='success'?"green":"red"});
          if(res.status=='success'){

            const fileId = res.fileId;
            this.setState(state => {
              const newList = state.uploadedDocuments.concat(
                {fileId:fileId,year:(new Date()).getFullYear(),docDesc:docDesc,'date':new Date()}
              );
              localStorage.setItem('uploadedDocuments',JSON.stringify(newList));
              return {
                uploadedDocuments:newList
              };
            });
          }
          return 'success';

        })
        .catch(err => {
          callback();
          console.log(err);
          M.toast({html: 'El Archivo no fue Cargado'});
        });
    };
    fr.readAsDataURL(docFile);
  };

  acceptSchoolManual = (formData)=>{

    const acceptResponse  = server.acceptSchoolManual(formData);
    acceptResponse
      .then(res=>{
        M.toast({html: res.msg,classes: res.status=='success'?"green":"red"});

        if(res.status=='success'){
          localStorage.setItem('smAccepted',true);
          this.setState(state => {
            return {
              smAccepted:true
            };
          });
        }
      })
      .catch(err => {
        callback();
        console.log(err);
        M.toast({html: 'No fue posible guardar su respuesta'});
      });
  };

  changePage = page => {
    console.log('changePage', page);
    this.setState({ page: page.toLowerCase() });
  };

  logoutUser = ()=>{
    console.log('logOut user');
    localStorage.removeItem('gasCookie');
    this.setState({ currentUser: {} });
  };

  loginHandler = (altId,localId) => {

    //check local storage

    const cleanedEmail = altId+'/'+localId+' combination ';
    return this.getLoginUserObject(altId, localId, loginResponse => {
      console.log('callback', loginResponse);
      const currentUser = {};
      if(loginResponse.isValid) {

        const emailAddress = loginResponse.email;
        const uploadedDocuments = loginResponse.uploadedDocuments;
        console.log(loginResponse.uploadedDocuments);
        currentUser['email'] = emailAddress;
        currentUser['studentFullName'] = loginResponse.studentFullName;
        currentUser['studentId'] = loginResponse.studentId;
        const smAccepted = loginResponse.smAccepted;
        const smUrl = loginResponse.smUrl;

        let parentContact = loginResponse.parentObject;
        if(parentContact.parentContactId != undefined){
          currentUser['parentContactId'] = parentContact.parentContactId;
          delete parentContact['parentContactId'];
          currentUser['parentContact'] = parentContact;
        }
        else {
          parentContact['parentContactId'] = null;
          currentUser['parentContact'] = {};
        }


        this.setState({ currentUser: currentUser , uploadedDocuments:JSON.parse(uploadedDocuments),smAccepted:smAccepted,smUrl:smUrl });
        localStorage.setItem('gasCookie',altId+'_'+localId);
        localStorage.setItem('studentFullName',loginResponse.studentFullName);
        localStorage.setItem('studentId',loginResponse.studentId);
        localStorage.setItem('smAccepted',loginResponse.smAccepted);
        localStorage.setItem('smUrl',loginResponse.smUrl);
        localStorage.setItem('parentContact',JSON.stringify(parentContact));
        localStorage.setItem('uploadedDocuments',uploadedDocuments);
        return 'success';
      }
      M.toast({html: 'El usuario no fue encontrado'});
      return `${cleanedEmail} not found in our records.`;
    });
  };

  updateCurrentUser = user => {
    const newUser = {...user};
    this.setState({ currentUser: newUser });
  };

  setBackgroundColor = () => {
    const { page } = this.state;
    switch (page) {
      case 'test':
        return 'dark-grey';
      default:
        return '';
    }
  };

  toggleNav = bool => {
    this.setState({ navIsClosed: bool }, () =>
      console.log('navIsClosed - state', this.state)
    );
  };

  render() {
    const { currentUser, ready, page, navIsClosed , uploadedDocuments,smAccepted,smUrl } = this.state;
    if (!ready) {
      return <Preloader />;
    }
    return (
      <div className={`App ${this.setBackgroundColor()}`}>
        {currentUser.email ? (
          <SideNav
            changePage={this.changePage}
            minimize={this.toggleNav}
            minimized={navIsClosed}
            currentUser={currentUser}
            logoutUser={this.logoutUser}
          />
        ) : (
          <div className="sidenav-placeholder"></div>
        )}
        <div className={`content-page ${navIsClosed ? 'minimized-nav' : ''}`}>
          <div className="row">
            <div className="col s12">
              {!currentUser.email ? (
                <WelcomePage loginHandler={this.loginHandler} />
              ) : page === 'tablero' ? (
                <Dashboard currentUser={currentUser} 
                  updateCurrentUser={this.updateCurrentUser} 
                   />
              )  : page === 'manual_de_convivencia' ? (
                <SchoolManual
                  currentUser={currentUser}
                  smAccepted={smAccepted}
                  smUrl={smUrl}
                  acceptSchoolManual={this.acceptSchoolManual}
                />
              ) : page === 'documentos' ? (
                <Docs
                  currentUser = {currentUser}
                  uploadDocFile = {this.uploadDocFile}
                  uploadedDocuments = {uploadedDocuments}
                />
              ) : page === 'contacto' ? (
                <Profile
                  currentUser = {currentUser}
                  updateCurrentUser = {this.updateCurrentUser}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
