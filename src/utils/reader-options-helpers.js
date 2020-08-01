export const toSpeedType = speedOptions => {
  return speedOptions.initialCPM > 0 ? 'cpm' : 'wpm';
}

export const toReaderFormData = options => {
  const speed = options.initialCPM > 0 ? options.initialCPM : options.initialWPM;
  const doAccelerateIni = options.targetCPM > 0 || options.targetWPM > 0;
  const targetSpeed = !doAccelerateIni ? 500 
    : options.targetCPM > 0 
    ? options.targetCPM 
    : options.targetWPM;
  const accelerationTime = !doAccelerateIni ? 10 
    : Math.floor((options.initialAccelerationTimeSecs / 60.0) + 0.5) 
  const doAccelerateConst = options.addPerMin > 0;
  const accelerationConstant = !doAccelerateConst ? 10
    : options.addPerMin * 10;  
  const actIfLonger = options.breakIfLonger > 0 || options.slowIfLonger > 0;
  const actionIfLonger = options.breakIfLonger > 0 ? 'break' : 'slow';
  const longerThan = !actIfLonger ? 7
    : options.breakIfLonger > 0 ? options.breakIfLonger : options.slowIfLonger;
  const slowTo = options.slowTo > 0 ? options.slowTo : 200;
  const doAppendWords = options.appendIfShorter > 0;
  const appendIfShorter = !doAppendWords ? 2 : options.appendIfShorter;
  const maxAppend = !doAppendWords ? 2 : options.maxAppend;

  return {
    speed, 
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
    doAppendWords,
    actionIfLonger
  }
}