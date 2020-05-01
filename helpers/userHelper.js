import * as userService from '../services/userService';

export const userIsValidate = (userObj) => {
  if (!validateEmail(userObj.email)) {
    throw "Email is not validate";
  } else if (userService.checkUserExistByEmail(userObj.email)) {
    throw "Email is be register";
  } else if (!passwordLengthCheck(userObj.password)) {
    throw "Password length less than 8";
  } else if (userObj.password !== userObj.passwordConfirm) {
    throw "password and passwordConfirm different"
  }
  return true
} 

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function passwordLengthCheck(password) {
  return password && password.length >= 8
}