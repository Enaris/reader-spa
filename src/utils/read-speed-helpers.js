export const getSpeedIncrease = ({ accelerationPerMin, timeMs }) => {
  var x = (accelerationPerMin / 60000) * timeMs
  console.log('-xxxxxxxxxxx');
  console.log(accelerationPerMin);
  console.log(timeMs);
  console.log(x);
  return x;
}

export const getSpeedIncreaseByTarget = ({ 
  options: { initialSpeed, targetSpeed, accTimeSecs }, 
  timeMs}) => {

  const maxIncrease = targetSpeed - initialSpeed;
  const iniAccTimeToMs = accTimeSecs * 1000;
  const riseLow = maxIncrease/iniAccTimeToMs;
  return riseLow * timeMs;
}

export const doSlowDown = (slowIfLonger, wordLength ) => 
  slowIfLonger > 0 && wordLength > slowIfLonger; 