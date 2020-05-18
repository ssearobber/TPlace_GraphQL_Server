import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, '이름을 입력해 주세요'],
    },
    email: {
      type: String,
      required: [true, '이메일을 입력해 주세요'],
    },
    password: {
      type: String,
      required: [true, '비밀번호를 입력해 주세요'],
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    console.error(error);
  }
});

export default mongoose.model('User', UserSchema);
