export const isNullOrWhitespace = str => !str || !str.trim();

export const getExtension = str => str.substring(str.lastIndexOf('.'), str.length) || str;