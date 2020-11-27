import React from 'react';
import { toTitleCase } from '../../../utils/string-helpers';
import './form-errors.styles.scss';

const FormErrors = ({ errors, containerClass }) => {

  return (
    <div className={ `${containerClass ? containerClass : ''} form-errors` }>
      { errors &&
        <ul className='errors'>
          {
            Object.keys(errors).map(k => {
              return ( 
                errors[k] &&
                <li key={ k }> { toTitleCase(k) }
                  <ul>
                    {
                      errors[k].map(error => {
                        return (
                          <li key={ error }>{ error }</li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  ) 
}

export default FormErrors;