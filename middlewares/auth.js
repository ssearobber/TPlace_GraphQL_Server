const jwt = require('jsonwebtoken');

export const isAuthenticated = async (request) => {
  const token = request.headers.authorization;

  try {
    if (token) {
      let existingUser = await jwt.verify(token, process.env.JWT_SECRET || '');
      existingUser = existingUser._id;
      request.userId = existingUser;
    } else {
      request.userId = null;
    }
  } catch (error) {
    console.log(error);
  }
  return;
};
