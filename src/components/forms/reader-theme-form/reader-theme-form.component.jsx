import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reader-theme-form.styles.scss';
import { CirclePicker } from 'react-color';
import { setTheme } from '../../../redux/reader-theme/reader-theme.actions';
import { Button, Slider } from '@material-ui/core';

const ReaderThemeForm = ({ changeTheme }) => {

  const [ bgColor, setBgColor ] = useState("#000000");
  const [ txtColor, setTxtColor ] = useState("#ffffff");
  const [ fontSize, setFontSize ] = useState(44);
  const colors = ['#000000', '#191919', '#323232', '#4b4b4b', '#646464', '#7d7d7d', '#969696', '#b4b4b4', '#cdcdcd', '#e6e6e6', '#ffffff'];

  return (
    <div className='reader-theme-form'>
      <div className='color-preview' style={{ backgroundColor: bgColor, color: txtColor, padding: "10px" }}>
        Customize color PREVIEW
      </div>
      <div className='color-picker'>
        <div className='color-picker-label'> SELECT BACKGROUND COLOR </div>
        <CirclePicker 
          color={ bgColor }
          onChangeComplete={ c => setBgColor(c.hex) }
          colors={ colors }
          width='auto'
        />
      </div>
      <div className='color-picker'>
        <div className='color-picker-label'> SELECT TEXT COLOR </div>
        <CirclePicker 
          color={ txtColor }
          onChangeComplete={ c => setTxtColor(c.hex) }
          colors={ colors }
          width='auto'
        />
      </div>
      <div className='font-size-container'>
        <div className='font-size-title'>
          { `Font size: ${fontSize}` }
        </div>
        <Slider 
          min={12} 
          max={60} 
          step={1} 
          value={fontSize} 
          onChange={(e, v) => setFontSize(v)} 
        />
      </div>
      
      <Button 
        variant="outlined"
        onClick={() => changeTheme({ wordSize: fontSize, wordColor: txtColor, bgColor: bgColor })} 
      >
        SAVE
      </Button>
      
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  changeTheme: theme => dispatch(setTheme(theme))
});

export default connect(null, mapDispatchToProps)(ReaderThemeForm);