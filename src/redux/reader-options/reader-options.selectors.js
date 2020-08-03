import { createSelector } from 'reselect';
import { toSpeedType, toReaderFormData } from '../../utils/reader-options-helpers';

export const selectReaderOptions = state => state.readerOptions;

export const selectInitialSpeeds = createSelector(
  [selectReaderOptions],
  opt => ({ wpm: opt.initialWPM, cpm: opt.initialCPM })
);

export const selectSpeedOptions = createSelector(
  [selectReaderOptions], 
  opt => ({
    initialCPM: opt.initialCPM, 
    initialWPM: opt.initialWPM, 

    targetWPM: opt.targetWPM, 
    targetCPM: opt.targetCPM,

    slowIfLonger: opt.slowIfLonger, 

    initialAccelerationTimeSecs: opt.initialAccelerationTimeSecs,

    addPerMin: opt.addPerMin,

    slowTo: opt.slowTo,
  })
)

export const selectSpeedType = createSelector(
  [selectReaderOptions], 
  opt => toSpeedType({ initialCPM: opt.initialCPM, initialWPM: opt.initialWPM })
)

export const selectReaderFormData = createSelector(
  [selectReaderOptions], 
  opt => toReaderFormData(opt)
)

export const selectSpeed = createSelector(
  [selectReaderOptions], 
  opt => {
    const useWpm = opt.initialWPM > 0;
    return { 
      speed: useWPM ? speedOptions.initialWPM : speedOptions.initialCPM,
      type: useWPM ? 'wpm' : 'cpm' 
    } 
  }
)

export const selectInitialAccelerationTimeSecs = createSelector(
  [selectReaderOptions],
  opt => opt.initialAccelerationTimeSecs
)

export const selectWordOptions = createSelector(
  [selectReaderOptions],
  opt => ({ appendIfShorter: opt.appendIfShorter, breakIfLonger: opt.breakIfLonger, maxAppend: opt.maxAppend })
);