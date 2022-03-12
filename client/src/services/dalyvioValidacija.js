export const setFirstnameError = (dalyvisId, value) => {
  if (value)
    document.getElementById(`firstName_${dalyvisId}`).classList.add('is-danger');
  else
    document.getElementById(`firstName_${dalyvisId}`).classList.remove('is-danger');
};

export const setLastnameError = (dalyvisId, value) => {
  if (value)
    document.getElementById(`lastName_${dalyvisId}`).classList.add('is-danger');
  else
    document.getElementById(`lastName_${dalyvisId}`).classList.remove('is-danger');
};

export const setEmailError = (dalyvisId, value) => {
  if (value)
    document.getElementById(`email_${dalyvisId}`).classList.add('is-danger');
  else
    document.getElementById(`email_${dalyvisId}`).classList.remove('is-danger');
};

export const setBirth_dateError = (dalyvisId, value) => {
  if (value)
    document.getElementById(`birth_date_${dalyvisId}`).classList.add('is-danger');
  else
    document.getElementById(`birth_date_${dalyvisId}`).classList.remove('is-danger');
};