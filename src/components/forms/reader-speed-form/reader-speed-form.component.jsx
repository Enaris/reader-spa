import React, { useState } from 'react';
import { connect } from 'react-redux';
import './reader-speed-form.styles.scss';
import { RadioGroup, FormControlLabel, Radio, Switch, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';
import validationSchema from './reader-spped-form.validation';
import RFormControlLabel from '../../general/formik/RFormControlLabel/RFormControlLabel.component';
import RRadioGroup from '../../general/formik/RRadioGroup/RRadioGroup.component';
import { setSpeedOptions } from '../../../redux/reader-options/reader-options.actions';

const ReaderSpeedForm = ({ changeOptions }) => {

  const [ speedType, setSpeedType ] = useState('wpm');
  const handleSubmit = ({ speed, 
    targetSpeed, 
    accelerationTime, 
    accelerationConstant, 
    longerThan, 
    slowTo, 
    appendIfShorter, 
    maxAppend, 
    doAccelerateIni, 
    doAccelerateConst, 
    actIfLonger, 
    actionIfLonger, 
    doAppendWords
  }) => {
    var options = {
      initialCPM: speedType === 'wpm' ? speed : -1, 
      initialWPM: speedType === 'cpm' ? speed : -1, 
      targetWPM: doAccelerateIni && speedType === 'wpm' ? targetSpeed : -1, 
      targetCPM: doAccelerateIni && speedType === 'cpm' ? targetSpeed : -1 , 
      breakIfLonger: actIfLonger && actionIfLonger === 'break' ? longerThan : -1, 
      slowIfLonger: actIfLonger && actionIfLonger === 'slow' ? longerThan : -1, 
      appendIfShorter: doAppendWords ? appendIfShorter : -1, 
      maxAppend: doAppendWords ? maxAppend : -1, 
      initialAccelerationTimeSecs: doAccelerateIni ? accelerationTime * 60 : -1, 
      addPerMin: doAccelerateConst ? accelerationConstant : -1, 
      slowTo: actIfLonger && actionIfLonger === 'slow' ? slowTo : -1 
    }
    changeOptions(options);
  }
  return (
    <div className='reader-speed-form'>
      <Formik
        initialValues={{
          speed: 300, 
          targetSpeed: 500, 
          accelerationTime: 10,
          accelerationConstant: 10,

          longerThan: 7,
          slowTo: 200,
          appendIfShorter: 1, 
          maxAppend: 2,

          //---------------------
          doAccelerateIni: false,
          doAccelerateConst: false,
          actIfLonger: false, 
          doAppendWords: false,
          actionIfLonger: 'slow'
        }}
        validationSchema={validationSchema}
        onSubmit={v => handleSubmit(v)}
      >
        { props => (
          <Form className='vw65'>
            <RadioGroup row value={ speedType } onChange={ e => setSpeedType(e.target.value) }>
              <FormControlLabel value='wpm' control={<Radio />} label='WPM' labelPlacement='start' />
              <FormControlLabel value='cpm' control={<Radio />} label='CPM' labelPlacement='start' />
            </RadioGroup>
            <RField 
              className='txt-field-width-primary'
              name='speed' 
              label='Speed' 
              type='number' 
            />
            <div className='flex-column'>
              <RFormControlLabel
                name='doAccelerateIni'
                control={<Switch color='primary' />} 
                label='Initial acceleration'
              />
              <RField 
                className='txt-field-width-primary'
                name='targetSpeed' 
                label={ `Target ${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                type='number'
                disabled={!props.values.doAccelerateIni}
              />
              <span className='mx5'>over</span>
              <RField 
                className='txt-field-width-primary'
                name='accelerationTime' 
                label='minutes' 
                type='number'
                disabled={!props.values.doAccelerateIni}
              />
            </div>
            
            <div className='flex-column'>
              <RFormControlLabel
                name='doAccelerateConst'
                control={<Switch color='primary' />} 
                label='Constant acceleration'
              />
              <div>
                { `Acceleration ${speedType === 'wpm' ? 'WPM' : 'CPM'} per 10min`  }
              </div>
              <RField 
                className='txt-field-width-primary'
                name='accelerationConstant' 
                label={ `${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                type='number' 
                disabled={!props.values.doAccelerateConst}
              />
            </div>
            <div className='flex-column'>
              <RFormControlLabel
                name='actIfLonger'
                control={<Switch color='primary' />} 
                label='Act if word is too long'
              />
              <RRadioGroup 
                row
                name='actionIfLonger' 
              >
                <FormControlLabel disabled={!props.values.actIfLonger} value='break' control={<Radio />} label='Break word' labelPlacement='start' />
                <FormControlLabel disabled={!props.values.actIfLonger} value='slow' control={<Radio />} label='Slow speed' labelPlacement='start' />
              </RRadioGroup>
              <div> Words longer than { props.values.longerThan } characters </div>
              <RField 
                className='txt-field-width-primary'
                name='longerThan' 
                label='Longer than' 
                type='number'
                disabled={!props.values.actIfLonger}
              />
              <RField 
                className='txt-field-width-primary'
                name='slowTo' 
                label={ `Slow to ${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                type='number' 
                disabled={!props.values.actIfLonger || props.values.actionIfLonger !== 'slow'}
              />
            </div>
            <div className='flex-column'>
              <RFormControlLabel
                name='doAppendWords' 
                control={<Switch color='primary' />} 
                label='Append short words to next'
              />
              <RField 
                className='txt-field-width-primary'
                name='appendIfShorter' 
                label='Shorter than' 
                type='number' 
                disabled={!props.values.doAppendWords}
              />
              <RField 
                className='txt-field-width-primary'
                name='maxAppend' 
                label='Append max' 
                type='number' 
                disabled={!props.values.doAppendWords}
              />
            </div>
            <div className='r-s-f-btn-container'>
              <Button type='submit' variant="outlined">SAVE</Button>
            </div>
          </Form>
        )}
        
      </Formik>
      
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  changeOptions: options => dispatch(setSpeedOptions(options))
})

export default connect(null, mapDispatchToProps)(ReaderSpeedForm);