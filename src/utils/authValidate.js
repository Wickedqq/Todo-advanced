export const validate = (email, password, name) => {
  const valideEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const validePassword = /[a-z0-9]{6,20}/;

  let valid = {
    name: '',
    email: '',
    password: '',
    isValid: true,
  };

  if (name !== undefined && !name.length) {
    valid.name = 'name should have at least 1 character';
    valid.isValid = false;
  }
  if (!valideEmail.test(email)) {
    valid.email = 'wrong email format';
    valid.isValid = false;
  }
  if (!validePassword.test(password)) {
    valid.password = 'password should have between 6 and 20 letters';
    valid.isValid = false;
  }

  return valid;
};
