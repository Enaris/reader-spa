export const getSpeedIncrease = ({ accelerationPerMin, timeMs }) => {
  return (accelerationPerMin / 60000) * timeMs
}

export const getSpeedIncreaseByTarget = ({ 
  options: { initialSpeed, targetSpeed, accTimeSecs }, 
  timeMs}) => {

  const maxIncrease = targetSpeed - initialSpeed;
  const iniAccTimeToMs = accTimeSecs * 1000;
  const riseLow = maxIncrease/iniAccTimeToMs;
  const result = riseLow * timeMs;
  return result > maxIncrease ? maxIncrease : result;
}

export const doSlowDown = (slowIfLonger, wordLength ) => 
  slowIfLonger > 0 && wordLength > slowIfLonger; 