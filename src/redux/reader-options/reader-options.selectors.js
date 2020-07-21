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

export const selectAppendMin = createSelector(
  [selectReaderOptions], 
  opt => opt.appendMin
);

export const selectBreakFrom = createSelector(
  [selectReaderOptions], 
  opt => opt.breakFrom
);

export const selectInitialSpeeds = createSelector(
  [selectReaderOptions],
  opt => ({ wpm: opt.initialWPM, cpm: opt.initialCPM })
);

export const selectWordOptions = createSelector(
  [selectReaderOptions],
  opt => ({ appendMin: opt.appendMin, breakFrom: opt.breakFrom })
);
