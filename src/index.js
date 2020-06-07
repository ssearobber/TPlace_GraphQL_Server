import './env';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import connectDB from './database/mongoDB/util/connectDB';
import { isAuthenticated } from './middlewares/auth';

//DB연결
connectDB();
const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request, isAuthenticated }),
});

server.express.use(logger('dev'));

server.start({ port: PORT }, () => console.log(`sever http://localhost:${PORT}`));
