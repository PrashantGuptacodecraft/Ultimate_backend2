// import http from 'http'; //core module
import express from 'express'; //third party module
import bodyParser from 'body-parser'; //third party module


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
app.get('/contactus', (req, res) => {
  res.send('Contact us page');
  
});
app.use(bodyParser.urlencoded());

app.post('/contactus', (req, res) => {
  console.log(req.method,req.body);
  res.send('Form submitted successfully');
});
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
