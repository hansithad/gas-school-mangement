import React, { useState } from 'react';
import SectionHeader from './SectionHeader';
import server from '../server';
import M from 'materialize-css';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import moment from "moment";


const DocumentTable = (props)=>{
  return (
    <div >
      <table>
        <thead>
        <tr>
          <th>Año</th>
          <th>Desc. Doc</th>
          <th>Fecha</th>
        </tr>
        </thead>

        <tbody>

        {props.uploadedDocuments.map(doc=>{
          return (<tr key={doc.fileId}>
            <td>{doc.year}</td>
            <td>{doc.docDesc}</td>
            <td>{moment(doc.date).format('YYYY-MM-DD')}</td>
          </tr>)
        })}
        </tbody>
      </table>
    </div>
  );
};


const DocSubmitLoader = ({showLoader})=>{

    if(showLoader){
      return (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      )
    }
    else{
      return ('');
    }


}

const Docs = ({ currentUser, uploadDocFile,uploadedDocuments }) => {
  const [docDesc, setDocDesc] = useState('');
  const [docFile, setDocFile] = useState('');
  const [serverErrors, setServerErrors] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const docInputRef = React.useRef();
  const docPathRef = React.useRef();
  const { register, handleSubmit, watch, errors } = useForm();

  const clickHandler = e => {
    e.preventDefault();
    const result = uploadDocFile(docDesc,docFile);
    setDocDesc('');
    docPathRef.current.value = "";
    setDocFile('');
    if (result !== 'success') {

      setServerErrors(result);
    }
  };

  const onSubmitHandler = () => {
    setShowLoader(true);
    console.log('onSubmitHandler called when form valid');
    const result = uploadDocFile(docDesc,docFile,()=>setShowLoader(false));
    setDocDesc('');
    docPathRef.current.value = "";
    setDocFile('');
    if (result !== 'success') {

      setServerErrors(result);
    }

  };





  return (
    <div className="white">
      <SectionHeader title="docs" />
      <div className="container">
        <DocSubmitLoader
          showLoader={showLoader}
        />
        <div className="row">
          <div className="col s12 m12 text-center">
            <div>
              <h6>Cargar Documentos Requeridos</h6>
            </div>
            <div>
              <form className="col s12 m12" onSubmit={handleSubmit(onSubmitHandler)}>
                <div className="row">

                  <div className="input-field col s12 m12">
                    <textarea
                      id="docDesc"
                      name="docDesc"
                      className="materialize-textarea"
                      onChange={e => setDocDesc(e.target.value)}
                      value = {docDesc}
                      ref={register({ required: true, maxLength: 30 })}
                    ></textarea>
                    <label htmlFor="docDesc">Descripcíon del Documento</label>
                  </div>
                  {_.get("docDesc.type", errors) === "required" && (
                    <p>Descripción de Documento Requerida</p>
                  )}
                  {_.get("docDesc.type", errors) === "maxLength" && (
                    <p>Description No Puede Exceder 30 Caracteres</p>
                  )}

                  <div className="input-field col s12 m12">
                    <div className="file-field input-field">
                      <div className="btn">
                        <span>Seleccione un Archivo</span>
                        <input
                          type="file"
                          id="docfile"
                          name="docfile"
                          // ref={docInputRef}
                          ref={register({
                            required: true,
                            validate: (value)=>{
                              const allowedFileTypes = [
                                "image/jpeg",
                                "image/jpg",
                                "image/pjpeg",
                                "image/png",
                                "image/x-png",
                                "image/bmp",
                                "application/pdf",
                                "application/msword",
                                "application/vnd.oasis.opendocument.text",
                                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                                "text/rtf",
                                "application/rtf"
                              ];
                              return value && allowedFileTypes.indexOf(value[0].type)>-1;
                            }

                          })}
                          onChange={e=>setDocFile(e.target.files[0])}/>
                      </div>
                      {_.get("docfile.type", errors) === "required" && (
                        <p>Un Archivo es Requerido</p>
                      )}
                      {_.get("docfile.type", errors) === "validate" && (
                        <p>El Formato del Archivo No Es Soportado</p>
                      )}
                      <div className="file-path-wrapper">
                        <input
                          className="file-path validate"
                          type="text"
                          id="docpath"
                          ref={docPathRef}
                        />
                      </div>
                    </div>


                  </div>
                </div>
                <div className="row">
                  <button type="submit" className="btn" >
                    Cargar
                  </button>
                  {<div>{serverErrors}</div>}
                </div>
              </form>
            </div>


          </div>
        </div>

        <DocumentTable uploadedDocuments={uploadedDocuments}/>

      </div>
    </div>
  );
};

export default Docs;