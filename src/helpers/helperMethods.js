export const commaFormat = (text) => text.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const isEmailValid = (email) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

export const isNumber = (value) => {
  const numberRegex = /^\d+$/;
  return numberRegex.test(value);
};
