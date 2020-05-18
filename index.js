import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import connectDB from './database/util/connectDB';
import path from 'path';
import dotenv from 'dotenv';

//환경변수 설정
dotenv.config({ path: path.join(__dirname, '/.env') });

//DB연결
connectDB();

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });

server.express.use(logger('dev'));

server.start({ port: PORT }, () => console.log(`sever http://localhost:${PORT}`));
