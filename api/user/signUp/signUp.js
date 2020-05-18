import User from '../../../database/model/User';
import createJWT from '../../../util/createJWT';

export default {
  Mutation: {
    signUp: async (_, { username, email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return {
            success: false,
            error: '해당 이메일이 존재합니다',
            data: null,
          };
        }
        const newUser = await User.create({
          username,
          email,
          password,
        });

        const token = await createJWT(newUser);
        return {
          success: true,
          error: null,
          data: token,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
          data: null,
        };
      }
    },
  },
};
