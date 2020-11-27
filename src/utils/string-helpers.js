export const isNullOrWhitespace = str => !str || !str.trim();

export const getExtension = str => str.substring(str.lastIndexOf('.'), str.length) || str;

export const toTitleCase = str => {
  var result = str.substring(0, 1).toUpperCase();

  for (var i = 1; i < str.length; ++i) {
    result += str[i] === str[i].toUpperCase() ? ` ${str[i]}` : str[i];
  }
  return result;
}