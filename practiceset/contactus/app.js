// import http from 'http'; //core module
import express from 'express'; //third party module


const app = express();
// const  server = http.createServer(app);


//middleware
app.use( "/",(req, res, next) => {
  console.log(req.url, req.method);
  next();
});
app.use( "/api",(req, res, next) => {
  console.log('Middleware 2');
  next();
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
