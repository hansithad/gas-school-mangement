import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class ProfileSaveConfirmationModal extends Component {

  constructor(props) {
    super(props);
  }

  handleNoButtonClick = ()=>{
    this.props.updateShowConfirmation(false);
  };

  handleYesButtonClick = ()=>{
    this.props.handleYesButtonClickInProfileSaveConfirmation();
  };


  componentDidUpdate(prevProps,prevState) {

    console.log('componentDidUpdate called '+(new Date()));

    if(this.props.showConfirmation){
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
          document.body.style.overflow = '';
          console.log("Close End");
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%"
      };


      M.Modal.init(this.ProfileSaveConfirmationModal, options);
      console.log('M init called');
      let instance = M.Modal.getInstance(this.ProfileSaveConfirmationModal);
      instance.open();
      // instance.close();
      // instance.destroy();
    }else {
      console.log('do nothing'+(new Date()));
    }

  }

  showFormInput =()=>{

    const fieldNameMap = {
      'firstName':'Nombre',
      'lastName':'Apellido',
      'parentEmail':'Email',
      'cell':'Celular',
      'address':'Dirección',
      'city':'Ciudad',
      'dept':'Departamento',
      'relationship':'Parentezco',
      'id':'Número de Identificación',
      'idType':'Tipo de Identificación',
    };

    return (
      <table>
        <thead>
          <tr>
            <th>Campo</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody >{
          Object.entries(this.props.formObject).filter(([attr,val])=>fieldNameMap.hasOwnProperty(attr))
            .map(([attr,val])=>{
              return <tr key={attr}>
                <td >{fieldNameMap[attr]}</td>
                <td >{val}</td>
              </tr>
            })}</tbody>
      </table>
    );

  };

  render() {
    console.log('render profile confirm'+(new Date()));
    if(this.props.showConfirmation){
        return (
          <div>
            <div
              ref={ProfileSaveConfirmationModal => {
                this.ProfileSaveConfirmationModal = ProfileSaveConfirmationModal;
              }}
              id="modal1"
              className="modal"
            >
              <div className="modal-content">
                <h4>Confirmación</h4>
                <p>La Siguiente Información Será Guardada</p>
                <div className={'row'}>
                  <div className={'col s12'}>
                    {this.showFormInput()}
                  </div>
                </div>

                <p style={{fontWeight:'bold'}}>Desea Continuar?</p>
              </div>

              <div className="modal-footer">
                <button className="btn confirm" style={{width:'100px'}} onClick={this.handleYesButtonClick}>Sí</button>
                &nbsp;
                <button className="btn modal-close close grey" style={{width:'100px'}} onClick={this.handleNoButtonClick}>No</button>
              </div>
            </div>
          </div>
        );
    }
    else {
      return('');
    }


  }
}

export default ProfileSaveConfirmationModal;
