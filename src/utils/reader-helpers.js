import { findFromIndex, isCharacter } from './text-helpers';
import { arrayLast } from './array-helpers.js';
import { whitespaces } from './constants';

export const findNextWord = (oldStart, oldLength, allText, options) => {

  var oldEnd = oldStart + oldLength;
  if (oldEnd >= allText.length)
    return { start: oldEnd, length: -1 };

  const { appendIfShorter, breakIfLonger } = options;
  const oldWordEnded = isCharacter(allText[oldEnd], whitespaces);
  var wordStart = oldEnd;
  var brokenWord = false;
  if (oldWordEnded) {
    wordStart = findFromIndex(ch => !isCharacter(ch, whitespaces), allText, oldEnd);
    if (wordStart === -1)
      return { start: oldEnd + 1, length: -1, broken: brokenWord }
  }
  if (wordStart !== 0 && !oldWordEnded)
    brokenWord = true;

  // var wordEnd = findFromIndex(ch => isCharacter(ch, whitespaces), allText, wordStart);
  // wordEnd = wordEnd === -1 ? allText.length : wordEnd;
  var wordEnd = findNextEnd(whitespaces, allText, wordStart)
  var wordLength = wordEnd - wordStart;
  var wordToAppendLength = wordLength;
  var appended = 0;
  var nextStart = -1;
  var nextEnd = -1;
  while (wordEnd !== allText.length && wordToAppendLength <= appendIfShorter && appended < 3 ) {
    if (breakIfLonger > 0 && wordLength > breakIfLonger)
      break;
      
    nextStart = findFromIndex(ch => !isCharacter(ch, whitespaces), allText, wordEnd);    
    nextEnd = findNextEnd(whitespaces, allText, nextStart);
    wordToAppendLength = nextEnd - nextStart;
    //wordEnd = nextEnd(whitespaces, allText, nextStart);
    
    wordEnd = nextEnd;
    wordLength = wordEnd - wordStart;
    ++appended;
  }
  if (breakIfLonger > 1 && wordStart !== 0 && wordLength > breakIfLonger) {
    wordLength = breakIfLonger;
  }
  
  return { start: wordStart, length: wordLength, broken: brokenWord };
}

const takeWordPartByOldEnd = (word, oldEnd, max, overallLength) => {
  const wordStart = oldEnd;
  const startIndex = wordStart - word.start;
  const lenBeforeBreak = max - overallLength;
  var length = word.end - wordStart;
  if (max > 0) 
    length = overallLength + length > max ? lenBeforeBreak : length; 
  return { wordStr: word.word.slice(startIndex, startIndex + length), end: length + wordStart, length: length };
}

const takeWordPartByMaxLen = (word, max, overallLength) => {
  var end = word.end - word.start;
  const lenBeforeBreak = max - overallLength;
  if (max > 0) 
    end = overallLength + end > max ? lenBeforeBreak : end; 
  return { wordStr: word.word.slice(0, end), end: end + word.start, length: end };
}

export const getNextPart = (oldIndexes, oldEnd, wordsArray, options) => {

  var oldLastIndex = arrayLast(oldIndexes);
  var oldLastWord = oldLastIndex === null ? null : wordsArray[oldLastIndex];

  var broken = oldLastWord !== null && oldLastWord.start !== 0 && oldLastWord.end !== oldEnd;
  if (oldEnd === arrayLast(wordsArray).end && !broken) {
    return { word: null, wordsIndexes: [], end: -1, lengthWithoutSpaces: -1 };
  }
  
  const { breakIfLonger, appendIfShorter, maxAppend } = options;

  var currentWordIndex = 
    oldLastIndex === null 
    ? 0
    : broken 
    ? oldLastIndex 
    : oldLastIndex + 1;
  var currentWord = wordsArray[currentWordIndex];
  
  var wordObj = broken 
    ? takeWordPartByOldEnd(currentWord, oldEnd, breakIfLonger, 0)
    : takeWordPartByMaxLen(currentWord, breakIfLonger, 0);
  var result = { 
    word: `${broken ? '-' : ''}${wordObj.wordStr}`, 
    wordsIndexes: [ currentWordIndex ], 
    end: wordObj.end, 
    lengthWithoutSpaces: wordObj.length 
  }

  if (maxAppend < 0 || (breakIfLonger > 0 && result.end !== currentWord.end)) {
    return result;
  }

  var len = wordObj.length;
  var appended = 0;
  while (currentWordIndex < wordsArray.length 
    && appended < maxAppend
    && len < appendIfShorter) {
    ++currentWordIndex;
    currentWord = wordsArray[currentWordIndex];

    len = currentWord.end - currentWord.start;
    wordObj = takeWordPartByMaxLen(currentWord, breakIfLonger, result.lengthWithoutSpaces);

    result.word += ` ${wordObj.wordStr}`;
    result.wordsIndexes.push(currentWordIndex);
    result.end = wordObj.end;
    result.lengthWithoutSpaces += wordObj.length;
    ++appended;

    if ((breakIfLonger > -1 && breakIfLonger <= result.lengthWithoutSpaces) ||
      result.end !== currentWord.end)
      break;
  }

  return result;
}

export const findNextEnd = (whitespaces, allText, wordStart) => {
  var wordEnd = findFromIndex(ch => isCharacter(ch, whitespaces), allText, wordStart);
  wordEnd = wordEnd === -1 ? allText.length : wordEnd;

  return wordEnd;
}
