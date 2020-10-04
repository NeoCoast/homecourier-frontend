/* eslint-disable import/prefer-default-export */

export const validateEmail = (value, errorMessage) => {
  const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regexEmail.test(value)) {
    return { status: 'error', message: errorMessage('Inserte un email válido') };
  }
  return { status: 'info' };
};

export const validatePassword = (value, errorMessage) => {
  const re = new RegExp(process.env.PASSWORD_POLICY);
  if (!re.test(value)) {
    return {
      status: 'error',
      message: errorMessage('Las contraseñas deben tener al menos 6 caracteres'),
    };
  }
  return { status: 'info' };
};

export const validateRepeatPassword = (value, formValues, errorMessage) => {
  if (value !== formValues.password) {
    return { status: 'error', message: errorMessage('Las contraseñas no coinciden') };
  }
  return { status: 'info' };
};

export const validateDay = (value, errorMessage) => {
  if (Number.isNaN(Number(value)) || Number(value) > 31 || Number(value) <= 0) {
    return { status: 'error', message: errorMessage('No valido') };
  }
  return { status: 'info' };
};

export const validateYear = (value, errorMessage) => {
  if (Number.isNaN(Number(value))) {
    return { status: 'error', message: errorMessage('No valido') };
  }
  return { status: 'info' };
};

export const validateImages = (elem) => {
  const element = elem;

  if (element.size > 15728640) {
    return 'El archivo es demasiado grande!';
  }
  if (!/image\/.*/.test(element.type)) {
    return 'El archivo debe ser una imagen!';
  }
  return null;
};

export const validateImagesGrommetForm = (elem) => {
  let error = null;
  if (elem) error = validateImages(elem);

  if (error) {
    return { status: 'error', message: error };
  }

  return { status: 'info' };
};
