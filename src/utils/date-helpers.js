export const toDDMMYYYY = date => {
  
  const dd = date.getUTCDate();
  const mm = +date.getUTCMonth() + 1;
  const yyyy = date.getUTCFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const toHHMM = date => {
  const _hh = date.getUTCHours();
  const _mm = date.getUTCMinutes();

  return `${_hh}:${_mm}`;
}

export const toDDMMYYYY_HHMM = date => {
  const dd = date.getUTCDate();
  const mm = +date.getUTCMonth() + 1;
  const yyyy = date.getUTCFullYear();

  const _hh = date.getUTCHours();
  const _mm = date.getUTCMinutes();

  return `${dd}/${mm}/${yyyy} ${_hh}:${_mm}`;
}

export const msToTimeLabel = ( ms, msInNextLine = false ) => {
  const msAsDate = new Date(ms);
  const hh = msAsDate.getUTCHours();
  const mm = msAsDate.getUTCMinutes();
  const ss = msAsDate.getUTCSeconds();
  const restMs = msAsDate.getUTCMilliseconds();

  var result = `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
  if (hh > 0) {
    result = `${hh.toString().padStart(2, '0')}:${result}`;
  }
  if (mm === 0 && hh === 0 && restMs > 0) {
    result = msInNextLine ? `${result}\n` : `${result}.`;
    result = `${result}${restMs.toString().padStart(3, '0')}`;
    result = msInNextLine ? `${result}ms` : result;
  }
  return result;
}