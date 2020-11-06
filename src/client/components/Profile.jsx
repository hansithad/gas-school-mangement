import React, { useState , useEffect } from 'react';
import SectionHeader from './SectionHeader';
import server from '../server';
import M from 'materialize-css';
import _ from "lodash/fp";
import { useForm } from "react-hook-form";
import DuplicateEmailModal from './DuplicateEmailModal';
import ProfileSaveConfirmationModal from './ProfileSaveConfirmationModal';




const Profile = ({ currentUser, updateCurrentUser }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [hasFormSubmit, setHasFormSubmit] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formObject, setFormObject] = useState(currentUser.parentContact|| {});
  const [duplicateParentContact, setDuplicateParentContact] = useState({});


  useEffect(() => {
    const options = {};
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);

  });

  const createParentContactInputs = () => {

    const attrMap = [
      {
        attr:'firstName',
        label:'Nombre',
        rules:{ required: true, maxLength: 100 },
        errorKey:'firstName.type',
        errorMessages:{
          required:'Nombre Es Requerido',
          maxLength:'Nombre No Puede Exceder 100 Caracteres'
        }
      },
      {
        attr:'lastName',
        label:'Apellido',
        rules:{ required: true, maxLength: 100 },
        errorKey:'lastName.type',
        errorMessages:{
          required:'Apellido Es Requerido',
          maxLength:'Apellido No Puede Exceder 100 Caracteres'
        }
      },
      {
        attr:'parentEmail',
        label:'Email',
        rules:{
          required: true,
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email Invalido"
          },
          maxLength: 100
        },
        errorKey:'parentEmail.type',
        errorMessages:{
          required:'Email Es Requerido',
          pattern: "Email Invalido",
          maxLength:'Email No Puede Exceder 100 caracteres'
        }
      },
      {
        attr:'cell',
        label:'Celular',
        rules:{ required: true, maxLength: 100},
        errorKey:'cell.type',
        errorMessages:{
          required:'Celular Es Requerido',
          maxLength:'Celular No Puede Exceder 100 caracteres'
        }
      },
      {
        attr:'address',
        label:'Dirección',
        rules:{ required: true, maxLength: 255 },
        errorKey:'address.type',
        errorMessages:{
          required:'Dirección Es Requerida',
          maxLength:'Dirección No Puede Exceder 255 caracteres'
        }
      },
      {
        attr:'city',
        label:'Ciudad',
        rules:{ required: true, maxLength: 100 },
        errorKey:'city.type',
        errorMessages:{
          required:'Ciudad Es Requerida',
          maxLength:'Ciudad No Puede Exceder 100 caracteres'
        }
      },
      {
        attr:'dept',
        label:'Departamento',
        rules:{ required: true},
        errorKey:'dept.type',
        errorMessages:{
          required:'Departamento Es Requerido',
        },
        options:[
          "Amazonas",
          "Antioquia",
          "Arauca",
          "Atlántico",
          "Bolívar",
          "Boyacá",
          "Caldas",
          "Caquetá",
          "Casanare",
          "Cauca",
          "Cesar",
          "Chocó",
          "Córdoba",
          "Cundinamarca",
          "Guainía",
          "Guaviare",
          "Huila",
          "La Guajira",
          "Magdalena",
          "Meta",
          "Nariño",
          "Norte de Santander",
          "Putumayo",
          "Quindío",
          "Risaralda",
          "San Andrés y Providencia",
          "Santander",
          "Sucre",
          "Tolima",
          "Valle del Cauca",
          "Vaupés",
          "Vichada"
        ]
      },
      {
        attr:'relationship',
        label:'Parentezco',
        rules:{ required: true},
        errorKey:'relationship.type',
        errorMessages:{
          required:'Parentezco Es Requerido',
        },
        options: {
          "Father":"Padre",
          "Mother":"Madre",
          "Step Mother":"Madrastra",
          "Step Father":"Padrastro",
          "Grandmother":"Abuela",
          "Grandfather":"Abuelo",
          "Legal Guardian":"Responsable Legal",
          "Other Family Member":"Otro Familiar"
        }
      },
      {
        attr:'id',
        label:'Número de Identificación',
        rules:{ required: true, maxLength: 50 },
        errorKey:'id.type',
        errorMessages:{
          required:'Número de Identificación Es Requerido',
          maxLength:'Número de Identificación No Puede Exceder 50 Caracteres'
        }
      },
      {
        attr:'idType',
        label:'Tipo de Identificación',
        rules:{ required: true},
        errorKey:'idType.type',
        errorMessages:{
          required:'Tipo de Identificación Es Requerido',
        },
        options:[
          "C.C",
          "R.C.",
          "NUIP",
          "T.I.",
          "C.E.",
          "NP",
          "SED",
          "CCabildo"
        ]
      },
    ];

    const inputTextList =  attrMap.slice(0,6).map((obj)=>{
      return (
        <div key={obj.attr+'_parent'} className="input-field col s6">
          <div key={obj.attr+'_label'} className="sub-text">{obj.label}</div>
          <input  value={formObject[obj.attr] ||''}
                  id={obj.attr}
                  key={obj.attr+'_input'}
                  name={obj.attr}
                  ref={register(obj.rules)}
                  type="text"
                  className="validate"
                  onChange={(e) => {updateFormObject(obj.attr, e.target.value )}} />

          {Object.entries(obj.errorMessages).map(([errType,msg])=>{


            return _.get(obj.errorKey, errors) === errType && (
              <p key={obj.attr+'_'+errType}>{msg}</p>
            )
          })}
        </div>
      )
    });
    const selectInputList =  attrMap.slice(6,7).map((obj)=>{
      return (
        <div key={obj.attr+'_parent'} className="input-field col s6">
          <div key={obj.attr+'_label'} className="sub-text">{obj.label}</div>
          <select  value={obj.options.indexOf(formObject[obj.attr])>-1? formObject[obj.attr] :''}
                   id={obj.attr}
                   key={obj.attr+'_input'}
                   name={obj.attr}
                   ref={register(obj.rules)}
                   className="validate browser-default"
                   onChange={(e) => {updateFormObject(obj.attr, e.target.value )}} >
            <option  value={''} disabled >Seleccione Su Opción</option>
            {obj.options.map(o=>{
              return <option key={o} value={o}>{o}</option>
            })}

          </select>

          {Object.entries(obj.errorMessages).map(([errType,msg])=>{


            return _.get(obj.errorKey, errors) === errType && (
              <p key={obj.attr+'_'+errType}>{msg}</p>
            )
          })}
        </div>
      )
    });
    const relationshipSelectInputList =  attrMap.slice(7,8).map((obj)=>{
      return (
        <div key={obj.attr+'_parent'} className="input-field col s6">
          <div key={obj.attr+'_label'} className="sub-text">{obj.label}</div>
          <select  value={obj.options.hasOwnProperty(formObject[obj.attr])? formObject[obj.attr] :''}
                   id={obj.attr}
                   key={obj.attr+'_input'}
                   name={obj.attr}
                   ref={register(obj.rules)}
                   className="validate browser-default"
                   onChange={(e) => {updateFormObject(obj.attr, e.target.value )}} >
            <option value="" disabled >Seleccione Su Opción</option>
            {Object.entries(obj.options).map(([value,displayValue])=>{
              return <option key={value} value={value}>{displayValue}</option>
            })}

          </select>

          {Object.entries(obj.errorMessages).map(([errType,msg])=>{


            return _.get(obj.errorKey, errors) === errType && (
              <p key={obj.attr+'_'+errType}>{msg}</p>
            )
          })}
        </div>
      )
    });
    const IdInputTextList =  attrMap.slice(8,9).map((obj)=>{
      return (
        <div key={obj.attr+'_parent'} className="input-field col s6">
          <div key={obj.attr+'_label'} className="sub-text">{obj.label}</div>
          <input  value={formObject[obj.attr] ||''}
                  id={obj.attr}
                  key={obj.attr+'_input'}
                  name={obj.attr}
                  ref={register(obj.rules)}
                  type="text"
                  className="validate"
                  onChange={(e) => {updateFormObject(obj.attr, e.target.value )}} />

          {Object.entries(obj.errorMessages).map(([errType,msg])=>{


            return _.get(obj.errorKey, errors) === errType && (
              <p key={obj.attr+'_'+errType}>{msg}</p>
            )
          })}
        </div>
      )
    });
    const IdTypeSelectInput =  attrMap.slice(9,10).map((obj)=>{
      return (
        <div key={obj.attr+'_parent'} className="input-field col s6">
          <div key={obj.attr+'_label'} className="sub-text">{obj.label}</div>
          <select  value={obj.options.indexOf(formObject[obj.attr])>-1? formObject[obj.attr] :''}
                   id={obj.attr}
                   key={obj.attr+'_input'}
                   name={obj.attr}
                   ref={register(obj.rules)}
                   className="validate browser-default"
                   onChange={(e) => {updateFormObject(obj.attr, e.target.value )}} >
            <option value="" disabled >Seleccione Su Opción</option>
            {obj.options.map(o=>{
              return <option key={o} value={o}>{o}</option>
            })}

          </select>

          {Object.entries(obj.errorMessages).map(([errType,msg])=>{


            return _.get(obj.errorKey, errors) === errType && (
              <p key={obj.attr+'_'+errType}>{msg}</p>
            )
          })}
        </div>
      )
    });


    return inputTextList.concat(selectInputList).
    concat(relationshipSelectInputList).concat(IdInputTextList).concat(IdTypeSelectInput);

  };

  const updateHasFormSubmit = (value)=>{
    setHasFormSubmit(value);
  };

  const updateUser = (attr, value) => {
    const userCopy = {...currentUser};

    for(let i=0;i<attr.length;i++){
      userCopy[attr[i]] = value[i];
    }


    updateCurrentUser(userCopy);
  };

  const updateFormObject = (attr, value) => {
    const formObjectCopy = {...formObject};
    formObjectCopy[attr] = value;
    setFormObject(formObjectCopy);
  };

  const updateShowConfirmation = (value)=>{
    setShowConfirmation(value);
  };

  const updateParentContact = () => {
    console.log('updateParentContact called');

    if(currentUser.parentContactId==null || currentUser.parentContact.parentEmail!=formObject.parentEmail){
      //check for duplicate emails
      const formEmailAddress = formObject.parentEmail;
      const duplicateEmailCheckResponse = server.checkForDuplicateEmailAddress(formEmailAddress);
      duplicateEmailCheckResponse.then((res)=>{
        if(res.isDuplicate){
          setHasFormSubmit(true);
          setDuplicateParentContact(res.duplicateParentContact);
        }
        else {
          setShowConfirmation(true);
        }
      });
    }
    else {
      setShowConfirmation(true);
    }

  };

  const copyExistingParentRecordToNewStudent = ()=>{

    const formData = {
      'alreadyMappedStudentId':duplicateParentContact.alreadyMappedStudentId,
      'parentContactId':duplicateParentContact.parentContactId,
      'studentId':currentUser.studentId,
    };

    if(currentUser.parentContactId!=undefined && currentUser.parentContactId != null){
      formData['oldParentContactId']= currentUser.parentContactId;
    }


    const copyContact = server.copyContact(formData);
    copyContact.then((res) => {

      M.toast({html: res.msg,classes: res.status=='success'?"green":"red"});

      if(res.status=='success'){
        const parentContactId = duplicateParentContact.parentContactId;
        updateUser(['parentContact','parentContactId'],[duplicateParentContact,parentContactId]);
        localStorage.setItem('parentContact',JSON.stringify(duplicateParentContact));
        localStorage.setItem('parentContactId',parentContactId);
        updateHasFormSubmit(false);
        setFormObject(duplicateParentContact);


      }

      document.body.style.overflow='';

    })
      .catch((err) => {
        M.toast({html: 'Falló El Copiado del Record de Contacto Existente',classes: "red"});
        updateHasFormSubmit(false);
        document.body.style.overflow='';
      });
  };

  const handleYesButtonClickInProfileSaveConfirmation = ()=>{

    updateShowConfirmation(false);
    document.body.style.overflow='';
    const formData = {...formObject};
    console.log('before sever'+currentUser);
    if(currentUser.parentContactId!=undefined){
      formData['parentContactId'] = currentUser.parentContactId;
    }
    formData['studentId'] = currentUser.studentId;

    const update = server.updateParentContact(formData);
    update.then((res) => {
      M.toast({html: res.msg,classes: res.status=='success'?"green":"red"});

      if(res.status=='success'){

        updateUser(['parentContact','parentContactId'],[formObject,res.parentContactId]);
        localStorage.setItem('parentContact',JSON.stringify(formObject));
        localStorage.setItem('parentContactId',res.parentContactId);
      }

    })
      .catch((err) => {
        M.toast({html: err});
      })
  };



  return (
    <div className="white">
      <SectionHeader title="profile" />
      <div className="container">
        <div className="row">
          <div className="col s12 m12 text-center">
            <div>
              <h3>Información De Contacto Del Acudiente Principal</h3>
            </div>
            <div>
              <form className="col s12 m12" data-target="modal1" onSubmit={handleSubmit(updateParentContact)}>
                <div className="row">
                  {createParentContactInputs()}
                </div>
                <div className="row text-center">
                  <button className="btn" type="submit">Actualizar Perfil</button>
                </div>
              </form>

            </div>


          </div>
        </div>
        <DuplicateEmailModal
          duplicateParentContact={duplicateParentContact}
          hasFormSubmitted={hasFormSubmit}
          updateHasFormSubmit = {updateHasFormSubmit}
          copyExistingParentRecordToNewStudent={copyExistingParentRecordToNewStudent}
        />
        <ProfileSaveConfirmationModal
          formObject = {formObject}
          showConfirmation={showConfirmation}
          updateShowConfirmation = {updateShowConfirmation}
          handleYesButtonClickInProfileSaveConfirmation = {handleYesButtonClickInProfileSaveConfirmation}
        />
      </div>




    </div>
  );
};

export default Profile;