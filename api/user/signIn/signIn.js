import User from '../../../database/model/User';
const bcrypt = require('bcrypt');
import createJWT from '../../../util/createJWT';

export default {
  Mutation: {
    signIn: async (_, { email, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
          return {
            success: false,
            error: '해당 이메일이 존재하지 않습니다. ',
            data: null,
          };
        }

        const isCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isCorrect) {
          return {
            success: false,
            error: '패스워드가 일치하지 않습니다. ',
            data: null,
          };
        }

        const token = await createJWT(existingUser);
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
