import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';
import { serverPort } from './config';

const app = express();
const port = serverPort;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const startServer = async () =>
  new Promise(resolve => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
      resolve(null);
    });
  }).catch(err => {
    console.log(err);
    process.exit(1);
  });

startServer();
