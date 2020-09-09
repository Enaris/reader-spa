import { whitespaces } from "./constants";

export const findFromIndex = (predicate, arr, fromIndex) => {
  if (fromIndex > arr.length)
  throw new Error ({ Error: "fromIndex cannot be larger than array size" });
  
  for (let i = fromIndex; i < arr.length; ++i) {
    if (predicate(arr[i]))
    return i;
  }
  return -1;
}

export const isCharacter = (ch, characters) => {
  for (let i = 0; i < characters.length; ++i) {
    if (ch === characters[i]) 
      return true;
  }
  return false;
};

export const textToArray = text => {
  var result = [];
  var wStart = 0;
  var wEnd = 0;

  while (wEnd < text.length) {
    wStart = findFromIndex(ch => !isCharacter(ch, whitespaces), text, wEnd);
    if (wStart === -1)
      break;
    wEnd = findNextEnd(whitespaces, text, wStart);

    result.push({ start: wStart, end: wEnd, word: text.slice(wStart, wEnd) });
  }

  return result;
}

export const textArrayToArrayOfRows = (textArray, maxCharsInRow) => {
  var result = [];

  var currentRowChars = 0;
  var row = [];
  for (var i = 0; i < textArray.length; ++i) {
    const len = textArray[i].word.length;
    if (currentRowChars + len < maxCharsInRow) {
      row.push(i);
      currentRowChars += len + 1;
    }
    if (currentRowChars + len >= maxCharsInRow || i + 1 >= textArray.length ) {
      result.push(row);
      row = [];
      currentRowChars = 0;
    }
  }
  return result;
}

export const findNextEnd = (whitespaces, allText, wordStart) => {
  var wordEnd = findFromIndex(ch => isCharacter(ch, whitespaces), allText, wordStart);
  return wordEnd === -1 ? allText.length : wordEnd;
}
