export const createUser = async (userObj) => {
  const user = await createUserToDatabase(userObj);
  sendRegisterMail(user.email);
  addCouponToUser(user.email);
  return user;
};

export const createUserByGoogle = async (userObj) => {
  const user = await createUserToDatabase(userObj);
  sendRegisterMail(user.email);
  addCouponToUser(user.email);
  return user;
};

export const createUserByFacebook = async (userObj) => {
  const user = await createUserToDatabase(userObj);
  sendRegisterMail(user.email);
  addCouponToUser(user.email);
  return user;
};

const createUserToDatabase = (userObj) => {
  // store user data
  return {
    userId: "userId",
    email: userObj.email,
    name: userObj.name
  }
};

const sendRegisterMail = (email) => {
  // call mail api (sendgird or smtp ...)
};

const addCouponToUser = (email) => {
  // create coupon with userId
};

export const generateUserAuthToken = async (userId) => {
  // regenarator auth token
  return "generateToken";
};

export const checkUserExistByEmail = (email) => {
  // check from database
  const isExist = false;
  return isExist ? {
    userId: "userId",
    email: email
  } : null
}