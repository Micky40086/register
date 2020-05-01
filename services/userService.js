
export const createUser = async (userObj) => {
  const user = await createUserToDatabase(userObj);
  sendRegisterMail(user.email);
  addCouponToUser(user.email);
  return generateUserAuthToken(user.email)
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

export const generateUserAuthToken = async (email) => {
  // regenarator auth token
  return "generateToken"
};