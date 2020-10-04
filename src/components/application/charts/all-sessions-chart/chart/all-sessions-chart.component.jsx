import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import './all-sessions-chart.styles.scss'
import { VictoryChart, VictoryAxis, VictoryLine, VictoryTheme, VictoryLabel, VictoryZoomContainer } from 'victory';
import WSpinner from '../../../../general/spinner/w-spinner/w-spinner.component';
import { createStructuredSelector } from 'reselect';
import { selectReadingGraph } from '../../../../../redux/reading-session/reading-session.selectors';
import randomColor from 'randomcolor';

const AllSessionsChart = ({ isLoading, chartData }) => {

  const toPercent = ( val, max, precision = 2 ) => {
    return `${((val/max) * 100).toFixed(precision)}%`;
  }

  const toXPercent = ( percent, max ) => {
    return Math.floor(((percent / 100)) * max);
  }

  var colors = randomColor({ count: chartData.sets.length });
  return (
    <div className='all-sessions-chart'>
      <VictoryChart 
        theme={ VictoryTheme.material }
        domainPadding={{ y: 5, x: 5 }}
        width={ 900 }
        height={ 500 }
        containerComponent={<VictoryZoomContainer
          zoomDomain={{ x: [0, toXPercent(20, chartData.allCharactersCount)] }}
          allowZoom={ false }
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
          // tickValues={ getTickValues(4, 
          //   chartData.sets[0].points[0].msFromStart, 
          //   chartData.sets[0].points[chartData.sets[0].points.length - 1].msFromStart) 
          // }
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
        { chartData.sets.map((s, i) => <VictoryLine 
          key={ i }
          style={{
            data: { stroke: colors[i] },
            parent: { border: "1px solid #ccc"}
          }}

          data={ s.points }
          y='wpm'
          x='wordStart'
        />)
        }
      </VictoryChart>
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