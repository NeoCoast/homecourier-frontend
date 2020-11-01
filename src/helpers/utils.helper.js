/* eslint-disable import/prefer-default-export */
import { DateTime } from 'luxon';

export const jsonToFormData = (json, formName) => {
  const formData = new FormData();
  Object.keys(json).forEach((key) => {
    formData.set(`${formName}[${key}]`, json[key]);
  });
  return formData;
};

export const dataURItoBlob = (dataURI) => {
  // convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0) byteString = atob(dataURI.split(',')[1]);
  else byteString = unescape(dataURI.split(',')[1]);

  // separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

  // write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i += 1) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

export const dateToPrint = (createdAt) => {
  const dateTime = DateTime.fromISO(createdAt);
  if (dateTime.toFormat('dd/MM/yyyy') === DateTime.local().toFormat('dd/MM/yyyy')) {
    return dateTime.toFormat('HH:mm');
  }
  if (dateTime.toFormat('yyyy') === DateTime.local().toFormat('yyyy')) {
    return dateTime.toFormat('dd/MM HH:mm');
  }
  return dateTime.toFormat('dd/MM/yyyy HH:mm');
};

export const isMinor = (date) => {
  const dateTime = DateTime.fromFormat(date, 'd/M/yyyy');
  if (DateTime.local().diff(dateTime).as('years') < 18) {
    return true;
  }
  return false;
};
