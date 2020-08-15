export const baseUrl = 'http://localhost:5000/api';

// ------------------- AUTH -------------------
export const authUrl = `${baseUrl}/auth`;

export const registerUrl = `${authUrl}/register`;
export const loginUrl = `${authUrl}/login`;
export const checkTokenUrl = token => `${authUrl}/checkToken/${token}`;

// ------------------- READING -------------------
export const readingUrl = `${baseUrl}/reading`;

export const addReadingUrl = `${readingUrl}/addReading`;