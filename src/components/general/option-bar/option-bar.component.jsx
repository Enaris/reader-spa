import React, { useState } from 'react';
import './option-bar.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import ReaderOptionsForm from '../../forms/reader-options-form/reader-options-form.component';

const OptionBar = () => {

  const [optExpanded, setOptExpanded] = useState(false);

  console.log(optExpanded);
  return (
    <div className='option-bar-container'>
      <div className='option-bar-shade'></div>
      <motion.div
        animate={{
          x: !optExpanded ? "0vw" : "-75vw"
        }} 
        transition={{ ease: "easeOut", duration: 0.25 }}
        className='option-bar'
      >
        <div className='options-toggle' onClick={() => setOptExpanded(!optExpanded)}>
          <FontAwesomeIcon icon={faCog} />
          <FontAwesomeIcon icon={optExpanded ? faArrowAltCircleRight : faArrowAltCircleLeft} />
          <FontAwesomeIcon icon={faCog} />
        </div>
        <div className='options-reader'>
          <ReaderOptionsForm />
          
        </div>
      </motion.div>
    </div>
      
  )
}

export default OptionBar;