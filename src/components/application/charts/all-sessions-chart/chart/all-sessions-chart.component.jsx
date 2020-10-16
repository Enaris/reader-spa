import React, { useState } from 'react';
import { FormControlLabel, RadioGroup, Radio } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './all-sessions-chart.styles.scss'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel, VictoryZoomContainer } from 'victory';
import WSpinner from '../../../../general/spinner/w-spinner/w-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectReadingGraph } from '../../../../../redux/reading-session/reading-session.selectors';
import randomColor from 'randomcolor';
import { minMaxSpeedsFromGraphData } from '../../../../../utils/chart-helpers';

const AllSessionsChart = ({ isLoading, chartData }) => {

  const toPercent = ( val, max, precision = 2 ) => {
    return `${((val/max) * 100).toFixed(precision)}%`;
  }

  const toXPercent = ( percent, max ) => {
    return Math.floor(((percent / 100)) * max);
  }

  var setsToUse = chartData.sets;
  const [ speedType, setSpeedType ] = useState("wpm");
  const [ showSets, setShowSets ] = useState("all")
  const maxMinSpeeds = minMaxSpeedsFromGraphData(chartData);
  const yDomain = speedType === "wpm" ? [ maxMinSpeeds.minWpm, maxMinSpeeds.maxWpm ] : [ maxMinSpeeds.minCpm, maxMinSpeeds.maxCpm ];

  if (showSets !== "all") {
    setsToUse = chartData.sets.filter(s => s.speedType.toLowerCase() === showSets);
  }
  else {
    setsToUse = chartData.sets;
  }
  
  var colors = randomColor({ count: setsToUse.length });
  return (
    <div className='all-sessions-chart'>
      {
        <>
          <RadioGroup
            value={ showSets }
            onChange={ (e, v) => setShowSets(v) }
            row
          >
            <div className='cpm-wpm-radio-btns'>
              <div> Show sessions: </div>
              <FormControlLabel
                value='all'
                control={<Radio />} 
                label='all' 
                labelPlacement='start' 
              />
              <FormControlLabel
                value='wpm'
                control={<Radio />}
                label='only wpm' 
                labelPlacement='start'
              />
              <FormControlLabel
                value='cpm'
                control={<Radio />}
                label='only cpm' 
                labelPlacement='start'
              />
            </div>
          </RadioGroup>
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
                label='wpm' 
                labelPlacement='start' 
              />
              <FormControlLabel
                value='cpm'
                control={<Radio />}
                label='cpm' 
                labelPlacement='start'
              />
            </div>
          </RadioGroup>
          <VictoryChart 
            theme={ VictoryTheme.material }
            domainPadding={{ y: 5, x: 5 }}
            //domain={{ y: yDomain }}
            width={ 900 }
            height={ 500 }
            containerComponent={ <VictoryZoomContainer
              zoomDomain={{ x: [0, toXPercent(20, chartData.allCharactersCount)], y: yDomain }}
              //allowZoom={ false }
              
              />
            }
          >
            <VictoryAxis
              dependentAxis={ true }
              label='speed'
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
              tickFormat={ t => toPercent(t, chartData.allCharactersCount) }
              label='read progress'
              axisLabelComponent={ 
                <VictoryLabel 
                  dy={ 20 }              
                /> }
              style={{
                axisLabels: { fontSize: 10 },
                tickLabels: { fontSize: 7 }
              }}
            />
            { setsToUse.map((s, i) => <VictoryLine 
              key={ i }
              style={{
                data: { stroke: colors[i] },
                parent: { border: "1px solid #ccc"}
              }}

              data={ s.points }
              y={ speedType }
              x='wordStart'
            />)
            }
          </VictoryChart>
        </>
      }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({

  chartData: selectReadingGraph

})

export default compose(
  connect(mapStateToProps), 
  WSpinner
)(AllSessionsChart);