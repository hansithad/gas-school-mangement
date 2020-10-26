import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class DuplicateEmailModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'keepExistingEmail':false
    }
  }

  changeEmailAddress= ()=>{
    this.props.updateHasFormSubmit(false);
  };

  useExistingContact= ()=>{
    this.setState({ keepExistingEmail: true });
  };

  copyExistingParentRecordToNewStudent = ()=>{
    this.props.copyExistingParentRecordToNewStudent();
    // this.props.updateHasFormSubmit(false);

  };

  handleNoButtonClick = ()=>{
    this.props.updateHasFormSubmit(false);
    this.setState({ keepExistingEmail: false });
  };

  showDuplicateContact =()=>{
    const fieldNameMap = {
      'firstName':'First Name',
      'lastName':'Last Name',
      'parentEmail':'Email',
      'cell':'Cell',
      'address':'Address',
      'city':'City',
      'dept':'Dept',
      'relationship':'Relationship',
      'id':'ID',
      'idType':'ID Type',
    };

    return (
      <table>
        <thead>
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody >{
          Object.entries(this.props.duplicateParentContact).filter(([attr,val])=>fieldNameMap.hasOwnProperty(attr))
            .map(([attr,val])=>{
              return <tr key={attr}>
                <td >{fieldNameMap[attr]}</td>
                <td >{val}</td>
              </tr>
            })}</tbody>
      </table>
    );
  };

  componentDidUpdate(prevProps,prevState) {

    console.log('componentDidUpdate called '+(new Date()));

    if(this.props.hasFormSubmitted){
      const options = {
        onOpenStart: () => {
          console.log("Open Start");
        },
        onOpenEnd: () => {
          console.log("Open End");
        },
        onCloseStart: () => {
          console.log("Close Start");
        },
        onCloseEnd: () => {
          console.log("Close End");
          document.body.style.overflow = '';
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%"
      };


      M.Modal.init(this.DuplicateEmailModal, options);
      let instance = M.Modal.getInstance(this.DuplicateEmailModal);
      instance.open();
      // instance.close();
      // instance.destroy();
    }else {
      console.log('do nothing'+(new Date()));
    }

  }


  render() {
    console.log('render dup'+(new Date()));
    const {keepExistingEmail} = this.state;
    if(this.props.hasFormSubmitted){

      if(!keepExistingEmail){
        return (
          <div>
            <div
              ref={DuplicateEmailModal => {
                this.DuplicateEmailModal = DuplicateEmailModal;
              }}
              id="modal1"
              className="modal"
            >
              <div className="modal-content">
                <h4>Duplicate Email Address</h4>
                <p>Parent Contact is found with same email address</p>
              </div>
              <div className="modal-footer">
                {/*<a className="modal-close waves-effect  btn-flat" onClick={this.changeEmailAddress}>*/}
                  {/*Change Email Address*/}
                {/*</a>*/}
                {/*<a className="modal-close waves-effect  btn-flat" onClick={this.useExistingContact}>*/}
                  {/*Use existing contact*/}
                {/*</a>*/}

                <button className="btn modal-close close" onClick={this.changeEmailAddress}>
                  Change Email Address
                </button>
                &nbsp;
                <button className="btn confirm" onClick={this.useExistingContact}>Use existing contact</button>

              </div>
            </div>
          </div>
        );
      }
      else {
        return (
          <div>
            <div
              ref={DuplicateEmailModal => {
                this.DuplicateEmailModal = DuplicateEmailModal;
              }}
              id="modal1"
              className="modal"
            >
              <div className="modal-content">
                <h4>Existing Account Info</h4>
                <p>Following Information will be used to save as Parent contact</p>
                <div className={'row'}>
                  <div className={'col s12'}>
                    {this.showDuplicateContact()}
                  </div>
                </div>

                <p style={{fontWeight:'bold'}}>Are you ok to continue with details?</p>
              </div>
              <div className="modal-footer">

                <button className="btn confirm waves-effect" style={{width:'100px'}} onClick={this.copyExistingParentRecordToNewStudent}>Yes</button>
                &nbsp;
                <button className="btn modal-close waves-effect close grey" style={{width:'100px'}} onClick={this.handleNoButtonClick}>No</button>


              </div>
            </div>
          </div>
        );
      }






    }
    else {
      return('');
    }


  }
}

export default DuplicateEmailModal;
