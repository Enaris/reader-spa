import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import './RDrop.styles.scss';

const RDrop = ({ 
  maxSize, 
  multiple, 
  label, 
  handleAccepted, 
  handleRejected, 
  containerClass,
  acceptTypes = [ '*' ], 
  errorsInside = true
  }) => {
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      return;
    }
     
    handleAccepted(multiple ? acceptedFiles : acceptedFiles[0]);
    
  }, [ handleAccepted, multiple ]);

  const {getRootProps, getInputProps, fileRejections} = useDropzone({
    accept: acceptTypes.length > 1 ? acceptTypes.join(',') : acceptTypes[0],
    onDrop: onDrop,
    multiple: multiple,
    maxSize: maxSize
  }); 
  if (handleRejected && fileRejections.length > 0) {
    handleRejected(fileRejections.map(r => r.errors.join('. ')));
  }


  return (
    <div className={`${containerClass ? containerClass : ''} flex_wh100`}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {
          label 
          ? <p>{ label }</p>
          : <p>Drag 'n' drop some files here, or click to select files</p>
        }
        {
          fileRejections && errorsInside &&
          fileRejections.map(({file, errors}) => {
            return (
              <div key={ file.name } className='errors'>{ errors.map(er => er.message).join('. ') }</div>
            )
          })
        }
      </div>
    </div>
  )

}

export default RDrop;