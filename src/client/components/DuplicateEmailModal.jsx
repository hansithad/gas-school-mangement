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
      'firstName':'Nombre',
      'lastName':'Apellido',
      'parentEmail':'Email',
      'cell':'Celular',
      'address':'Direccion',
      'city':'Ciudad',
      'dept':'Departamento',
      'relationship':'Relacíon',
      'id':'Número de Identificacíon',
      'idType':'Tipo de Identificacion',
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
                <h4>Correo Electrónico Duplicado</h4>
                <p>Un Contacto Fue Encontrado Con El Mismo Correo Electrónico</p>
              </div>
              <div className="modal-footer">
                {/*<a className="modal-close waves-effect  btn-flat" onClick={this.changeEmailAddress}>*/}
                  {/*Change Email Address*/}
                {/*</a>*/}
                {/*<a className="modal-close waves-effect  btn-flat" onClick={this.useExistingContact}>*/}
                  {/*Use existing contact*/}
                {/*</a>*/}

                <button className="btn modal-close close" onClick={this.changeEmailAddress}>
                  Cambiar Correo Electrónico
                </button>
                &nbsp;
                <button className="btn confirm" onClick={this.useExistingContact}>Usar Contacto Existente</button>

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
                <h4>Informacion de Contacto Existente</h4>
                <p>La Siguiente Información Sera Usada Para Guardar como Contacto</p>
                <div className={'row'}>
                  <div className={'col s12'}>
                    {this.showDuplicateContact()}
                  </div>
                </div>

                <p style={{fontWeight:'bold'}}>Desea Continuar?</p>
              </div>
              <div className="modal-footer">

                <button className="btn confirm waves-effect" style={{width:'100px'}} onClick={this.copyExistingParentRecordToNewStudent}>Sí</button>
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
