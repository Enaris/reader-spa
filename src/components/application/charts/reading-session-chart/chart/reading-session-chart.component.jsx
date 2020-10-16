import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './reading-session-chart.styles.scss'
import { selectSessionGraph } from '../../../../../redux/reading-session/reading-session.selectors';
import WSpinner from '../../../../general/spinner/w-spinner/w-spinner.component';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel } from 'victory';
import { createStructuredSelector } from 'reselect';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { msToTimeLabel } from '../../../../../utils/date-helpers';
import { getTickValues } from '../../../../../utils/chart-helpers';

const ReadingSessionChart = ({ chartData, isLoading }) => {

  const [ speedType, setSpeedType ] = useState(chartData ? chartData.sets[0].speedType.toLowerCase() : null);
  
  return (
    <div className='reading-session-chart'>
      
      { chartData && 
        <>
          <RadioGroup
            value={ speedType }
            onChange={ (e, v) => setSpeedType(v) }
            row
          >
            <div className='cpm-wpm-radio-btns'>
              <div> Show as: </div>
              <FormControlLabel
                value='wpm'
                control={<Radio />} 
                label={ `${chartData.sets[0].speedType.toLowerCase() === 'wpm' ? 'wpm (original)' : 'wpm'}` } 
                labelPlacement='start' 
              />
              <FormControlLabel
                value='cpm'
                control={<Radio />}
                label={ `${chartData.sets[0].speedType.toLowerCase() === 'cpm' ? 'cpm (original)' : 'cpm'}` } 
                labelPlacement='start'
              />
            </div>
          </RadioGroup>
          <div className='reading-session-chart-container'>
            <VictoryChart 
              theme={ VictoryTheme.material }
              domainPadding={{ y: 5 }}
              width={ 900 }
              height={ 500 }
            >
              <VictoryAxis
                dependentAxis={true}
                label={ speedType }
                axisLabelComponent={ 
                  <VictoryLabel
                    x={ 30 }
                    y={ 45 } 
                    angle={ 0 }
                  /> }
                style={{
                  axisLabels: { fontSize: 10 },
                  tickLabels: { fontSize: 7 }
                }}
              />
              <VictoryAxis 
                tickFormat={ t => msToTimeLabel(t, true) }
                tickValues={ getTickValues(4, 
                  chartData.sets[0].points[0].msFromStart, 
                  chartData.sets[0].points[chartData.sets[0].points.length - 1].msFromStart) 
                }
                label='time'
                axisLabelComponent={ 
                  <VictoryLabel 
                    dy={ 20 }
                    
                  /> }
                style={{
                  axisLabels: { fontSize: 10 },
                  tickLabels: { fontSize: 7 }
                }}
              />
              <VictoryLine
                style={{
                  data: { stroke: "#c43a31" },
                  parent: { border: "1px solid #ccc"}
                }}
                // padding={{ top: 5, bottom: 5, left: 5, right: 5 }}
                data={ chartData.sets[0].points }
                y={ speedType }
                x="msFromStart"
                
              />
            </VictoryChart>
          </div>
        </>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

  chartData: selectSessionGraph

})

export default compose(
  connect(mapStateToProps), 
  WSpinner
)(ReadingSessionChart);