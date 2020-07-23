import { createSelector } from 'reselect';

const selectReaderOptions = state => state.readerOptions;

export const selectInitialCMP = createSelector(
  [selectReaderOptions],
  opt => opt.initialCPM
);

export const selectInitialWPM = createSelector(
  [selectReaderOptions], 
  opt => opt.initialWPM
);

export const selectAppendIfShorter = createSelector(
  [selectReaderOptions], 
  opt => opt.appendIfShorter
);

export const selectBreakIfLonger = createSelector(
  [selectReaderOptions], 
  opt => opt.breakIfLonger
);

export const selectInitialSpeeds = createSelector(
  [selectReaderOptions],
  opt => ({ wpm: opt.initialWPM, cpm: opt.initialCPM })
);

export const selectMaxAppend = createSelector(
  [selectReaderOptions], 
  opt => opt.maxAppend
);

export const selectInitialAccelerationTimeSecs = createSelector(
  [selectReaderOptions],
  opt => opt.initialAccelerationTimeSecs
)

export const selectWordOptions = createSelector(
  [selectReaderOptions],
  opt => ({ appendIfShorter: opt.appendIfShorter, breakIfLonger: opt.breakIfLonger, maxAppend: opt.maxAppend })
);