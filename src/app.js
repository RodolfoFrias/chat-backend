const express = require('express');
const morgan = require('morgan');
const expressWinston = require('express-winston')
const winston = require('winston')
const { parseServer, parseDashboard } = require('./parseServer')()

const sessionRoutes = require('./entities/session/session.route')
const userRoutes = require('./entities/user/user.route')
const chatRoutes = require('./entities/chat/chat.route')

const setUpApp = (app, container) => {
  app.use((req, res, next) => {
    req.scope = container.createScope()
    return next()
  })
  
  // Parse Dashboard set-up
  app.use('/dashboard', parseDashboard);
  
  // Serve the Parse API on the /parse URL prefix
  const mountPath = process.env.PARSE_MOUNT || '/parse';
  parseServer.start()
  app.use(mountPath, parseServer.app);
  
  //Cors
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, responseType');  
    next();
  });
  
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  
  // express-winston logger makes sense BEFORE the router
  app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  }))
  
  app.use(sessionRoutes);
  app.use(userRoutes);
  app.use(chatRoutes)
  
  // error handler
  app.use((err, req, res) => {
    console.log(err)
    // set locals, only providing error in development
    res.locals.message = err?.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.json(err);
  });
  
  return app
}


module.exports = ({ container }) => {
  const app = express();
  return setUpApp(app, container)
};
