export const getTickValues = (amt, min, max) => {
  if (amt <= 2) {
    return [ min, max ];
  }
  var space = max - min;
  var betweenTick = Math.floor(space / (amt - 1));
  var tick = min;
  var result = [ tick ];
  for (var i = 1; i <= amt - 2; ++i) {
    result.push( tick + betweenTick * i );
  }
  result.push(max);
  return result;
} 

export const graphDataToSpeedArray = (data, wpm = true) => {
  var speeds = [];
  for (var i = 0; i < data.sets.length; ++i) {
    data.sets[i].points.forEach(p => {
      if (wpm) {
        speeds.push(p.wpm);
      }
      else {
        speeds.push(p.cpm);
      }
    })
  }
  return speeds;
}

export const minMaxSpeedsFromGraphData = data => {
  
  var minWpm = data.sets[0].points[0].wpm;
  var maxWpm = data.sets[0].points[0].wpm;
  var minCpm = data.sets[0].points[0].cpm;
  var maxCpm = data.sets[0].points[0].cpm;
  
  for (var i = 0; i < data.sets.length; ++i) {
    for (var j = 0; j < data.sets[i].points.length; ++j ) {
      const point = data.sets[i].points[j];
      if (minWpm > point.wpm) {
        minWpm = point.wpm;
      }
      if (maxWpm < point.wpm) {
        maxWpm = point.wpm;
      }
      if (minCpm > point.cpm) {
        minCpm = point.cpm;
      }
      if (maxCpm < point.cpm) {
        maxCpm = point.cpm;
      }
    }
  }

  return { minWpm, maxWpm, minCpm, maxCpm };
}

export const xLessOrMin = ( value, percentLess, min = null ) => {
  var result = value * (1 - percentLess);
  if (min)
    result = result < min ? min : result;
  return result; 
}

export const xMoreOrMax = ( value, percentMore, max = null ) => {
  var result = value * (1 + percentMore);
  if (max)
    result = result > max ? max : result;
  return result;
}