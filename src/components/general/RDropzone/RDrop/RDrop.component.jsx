import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './RDrop.styles.scss';

const RDrop = ({ 
  maxSize, 
  multiple, 
  acceptType, 
  label, 
  handleAccepted, 
  handleRejected, 
  errorsInside = true }) => {
  const [errors, setErrors] = useState([]);
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (!rejectedFiles || rejectedFiles.length > 0) {
      const errors = rejectedFiles.map(f => {
        console.log(f);
        let error = '';
        const fileName = f.name;
        if (!f.file.type.startsWith(acceptType.slice(0, acceptType.length - 1))) {
          error += 'Wrong file type. ';
        }
        if (f.file.size > maxSize) {
          error += 'File is too big. ';
        }
        return { fileName, error };
      })
      setErrors(errors);
      if (handleRejected)
        handleRejected(errors);
      return;
    }
    
    setErrors([]);
    handleAccepted(multiple ? acceptedFiles : acceptedFiles[0]);
    
  }, [acceptType, maxSize, handleAccepted, multiple, handleRejected]);

  const {getRootProps, getInputProps} = useDropzone({
    accept: acceptType,
    onDrop: onDrop,
    multiple: multiple,
    maxSize: maxSize
  });

  return (
    <div className='flex_wh100'>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        {
          label 
          ? <p>{ label }</p>
          : <p>Drag 'n' drop some files here, or click to select files</p>
        }
        {
          errors && errorsInside &&
          errors.map(e => <div key={e.fileName} className='errors'>{ e.error }</div>)
        }
      </div>
    </div>
  )

}

export default RDrop;