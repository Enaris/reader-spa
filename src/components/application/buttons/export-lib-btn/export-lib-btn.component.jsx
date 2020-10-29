import React from 'react';
import './export-lib-btn.styless.scss';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { selectOfflineLib } from '../../../../redux/offline-library/offline-lib.selectors';

const ExportLibBtn = ({ offlineLib, containerClass }) => {

  var exportedLib;
  const handleClick = () => {
    const libText = JSON.stringify(offlineLib);
    exportedLib = window.URL.createObjectURL(new Blob([ `${libText}` ], { type: 'text/csv' }));
    const aElem = document.createElement('a');
    aElem.href = exportedLib;
    aElem.download = `library${new Date().getTime()}.json`;
    document.body.appendChild(aElem);
    aElem.click();
    document.body.removeChild(aElem);
  }

  return (
    <div className={ `${containerClass ? containerClass : ''} export-lib-btn-container` }>
      <Button 
        variant='outlined'
        color='primary'
        onClick={ () => handleClick() }
      > 
        Export 
      </Button>
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  offlineLib: selectOfflineLib, 
})

export default connect(mapStateToProps)(ExportLibBtn);