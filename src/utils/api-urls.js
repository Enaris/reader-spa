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
export const deleteReadingUrl = (aspUserId, readingId) => `${readingUrl}/user/${aspUserId}/delete/${readingId}`;

// ------------------- READING SESSION ------------------- 
export const readingSessionUrl = `${apiUrl}/readingSession`;

export const saveSessionUrl = aspUserId => `${readingSessionUrl}/${aspUserId}/saveSession`;
export const getSessionGraphUrl = (aspUserId, sessionId, readingId) => 
  `${readingSessionUrl}/user/${aspUserId}/reading/${readingId}/session/${sessionId}/graph`;
export const getReadingGraphUrl = (aspUserId, readingId) => 
  `${readingSessionUrl}/user/${aspUserId}/reading/${readingId}/graph`;
export const getSessionsForDropdownUrl = (aspUserId, readingId) => 
  `${readingSessionUrl}/user/${aspUserId}/reading/${readingId}/dropdown`;

// ------------------- TAGS -------------------
export const tagsUrl = `${apiUrl}/tags`;

export const fetchTagsUrl = aspUserId => `${tagsUrl}/${aspUserId}`;
