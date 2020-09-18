export const baseUrl = 'http://localhost:5000';
export const apiUrl = `${baseUrl}/api`;

// ------------------- IMAGES -------------------
export const imageUrl = relativePath => relativePath ? `${baseUrl}/${relativePath}` : null;

// ------------------- AUTH -------------------
export const authUrl = `${apiUrl}/auth`;

export const registerUrl = `${authUrl}/register`;
export const loginUrl = `${authUrl}/login`;
export const checkTokenUrl = token => `${authUrl}/checkToken/${token}`;

// ------------------- READING -------------------
export const readingUrl = `${apiUrl}/reading`;

export const addReadingUrl = `${readingUrl}/addReading`;
export const fetchReadingsUrl = aspUserId => `${readingUrl}/user/${aspUserId}`;
export const fetchReadingUrl = (aspUserId, readingId) => `${readingUrl}/user/${aspUserId}/reading/${readingId}`;
export const updateReadingUrl = `${readingUrl}/updateReading`;

// ------------------- READING SESSION ------------------- 
export const readingSessionUrl = `${apiUrl}/readingSession`;

export const saveSessionUrl = aspUserId => `${readingSessionUrl}/${aspUserId}/saveSession`;

// ------------------- TAGS -------------------
export const tagsUrl = `${apiUrl}/tags`;

export const fetchTagsUrl = aspUserId => `${tagsUrl}/${aspUserId}`;
