const jwt = require('jsonwebtoken');

export const isAuthenticated = async (request) => {
  const token = request.headers.authorization;

  try {
    if (token) {
      let userId = await jwt.verify(token, process.env.JWT_SECRET || '');
      userId = userId._id;
      request.userId = userId;
    } else {
      request.userId = null;
    }
    next();
  } catch (error) {
    console.log(error);
  }

  return;
};
