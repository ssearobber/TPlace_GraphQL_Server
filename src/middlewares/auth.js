const jwt = require('jsonwebtoken');

export const isAuthenticated = async (request) => {
  const token = request.headers.authorization;
  let existingUser = null;

  try {
    if (token) {
      existingUser = await jwt.verify(token, process.env.JWT_SECRET || '');
      existingUser = existingUser._id;
    } else {
      existingUser = null;
    }
  } catch (error) {
    console.log(error);
  }
  return existingUser;
};
