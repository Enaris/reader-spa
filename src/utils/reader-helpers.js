import { findFromIndex, isCharacter } from './text-helpers';
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

export const findNextEnd = (whitespaces, allText, wordStart) => {
  var wordEnd = findFromIndex(ch => isCharacter(ch, whitespaces), allText, wordStart);
  wordEnd = wordEnd === -1 ? allText.length : wordEnd;

  return wordEnd;
}
