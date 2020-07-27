import React, { useState } from 'react';
import './reader-speed-form.styles.scss';
import { RadioGroup, FormControlLabel, Radio, Switch } from '@material-ui/core';
import { Formik, Form } from 'formik';
import RField from '../../general/formik/RField/RField.component';

const ReaderSpeedForm = () => {

  const [ speedType, setSpeedType ] = useState('wpm');
  const [ doAccelerateIni, setDoAccelerateIni ] = useState(false);
  const [ doAccelerateConst, setDoAccelerateConst ] = useState(false);
  const [ actIfLonger, setActIfLonger ] = useState(false);
  const [ actionIfLonger, setActionIfLonger ] = useState('none');
  const [ appendWords, setAppendWords ] = useState(false);

  return (
    <div className=''>
      <div className='options-label'> SPEED SETTINGS </div>
      <Formik
        initialValues={{
          speed: 300, 
          targetSpeed: 500, 
          accelerationTime: "10:00",
          accelerationConstant: 10,

          longerThan: 7,
          slowTo: 200,
          appendIfShorter: 1, 
          maxAppend: 2,
        }}
      >
        { props => (
          <Form>
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
            <div>
              <FormControlLabel
                value={doAccelerateIni} 
                onChange={ e => setDoAccelerateIni(e.target.value) } 
                control={<Switch color='primary' />} 
                label='Initial acceleration'
              />
            </div>
            <div className='flex-v-center'>
              <RField 
                className='txt-field-width-primary'
                name='targetSpeed' 
                label={ `Target ${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                type='number' 
              />
              <span className='mx5'>over</span>
              <RField 
                className='txt-field-width-primary'
                name='accelerationTime' 
                label='minutes' 
                type='time'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
            <div>
              <FormControlLabel
                value={doAccelerateConst} 
                onChange={ e => setDoAccelerateConst(e.target.value) } 
                control={<Switch color='primary' />} 
                label='Constant acceleration'
              />
            </div>
            <div>
              <div>
                { `Acceleration ${speedType === 'wpm' ? 'WPM' : 'CPM'} per 10min`  }
              </div>
              <RField 
                className='txt-field-width-primary'
                name='accelerationConstant' 
                label={ `${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                type='number' 
              />
            </div>
            <div>
              <FormControlLabel
                value={ actIfLonger } 
                onChange={ e => setActIfLonger(e.target.value) } 
                control={<Switch color='primary' />} 
                label='Act if word is too long'
              />
              <RadioGroup row value={ actionIfLonger } onChange={ e => setActionIfLonger(e.target.value) }>
                <FormControlLabel value='break' control={<Radio />} label='Break word' labelPlacement='start' />
                <FormControlLabel value='slow' control={<Radio />} label='Slow speed' labelPlacement='start' />
              </RadioGroup>
              <div> Words longer than { props.values.longerThan } characters </div>
              <RField 
                className='txt-field-width-primary'
                name='longerThan' 
                label='Longer than' 
                type='number' 
              />
              <div>
                <RField 
                  className='txt-field-width-primary'
                  name='slowTo' 
                  label={ `Slow to ${speedType === 'wpm' ? 'WPM' : 'CPM'}` } 
                  type='number' 
                />
              </div>
            </div>
            <div>
              <FormControlLabel
                value={ appendWords } 
                onChange={ e => setAppendWords(e.target.value) } 
                control={<Switch color='primary' />} 
                label='Append short words to next'
              />
              <RField 
                className='txt-field-width-primary'
                name='appendIfShorter' 
                label='Shorter than' 
                type='number' 
              />
              <RField 
                className='txt-field-width-primary'
                name='maxAppend' 
                label='Append max' 
                type='number' 
              />
            </div>
          
          </Form>
        )}
        
      </Formik>
      
    </div>
  )
}

export default ReaderSpeedForm;