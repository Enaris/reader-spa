const MS_IN_SEC = 1000;

export const wpmToWaitMs = wpm => Math.floor((60.0 / wpm * MS_IN_SEC) + 0.5);

export const cpmToWaitMs = (cpm, characters) => Math.floor((60.0 / cpm * characters * MS_IN_SEC) + 0.5);