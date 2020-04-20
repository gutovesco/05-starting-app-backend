import 'reflect-metadata'
import express, {Request, Response, NextFunction} from 'express';
import 'express-async-errors'
import routes from './routes';
import './database'
import uploadConfig from './config/upload'
import AppError from './errors/AppError'

const app = express();

app.use(express.json())
app.use(routes);
app.use('/files', express.static(uploadConfig.directory))

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof AppError){
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3334, () => {
  // eslint-disable-next-line no-console
  console.log('Server started ༼ つ ◕_◕ ༽つ');
});
