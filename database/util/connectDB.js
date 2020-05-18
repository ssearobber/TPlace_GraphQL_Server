import mongoose from 'mongoose';

// 환경설정 변수
const MONGO_URI = process.env.MONGO_URI;

const MONGO_URI_TEST = '';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI_TEST, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('DB 접속');
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

export default connectDB;
