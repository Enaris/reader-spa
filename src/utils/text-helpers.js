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

  while (wEnd < text.length ) {
    wStart = findFromIndex(ch => !isCharacter(ch, whitespaces), text, wEnd);
    wEnd = findNextEnd(whitespaces, text, wStart);

    result.push({ start: wStart, end: wEnd, word: text.slice(wStart, wEnd) });
  }

  return result;
}

export const findNextEnd = (whitespaces, allText, wordStart) => {
  var wordEnd = findFromIndex(ch => isCharacter(ch, whitespaces), allText, wordStart);
  return wordEnd === -1 ? allText.length : wordEnd;
}
