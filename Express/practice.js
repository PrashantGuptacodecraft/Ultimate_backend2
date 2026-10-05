import fs from 'fs';
import testingSyntax from './syntex.js';
import runtime from './runtime.js';

const reqHandler = (req, res) => {
  console.log('Testing syntax function:', testingSyntax());
  // console.log('Testing runtime function:', runtime());

  res.setHeader('Content-Type', 'text/html');

  console.log(req.url, req.method);

  if (req.url === '/' && req.method === 'GET') {
    res.write(`
      <form action="/submit-details" method="POST">
        <input type="text" name="name" placeholder="Enter your name">
        <input type="email" name="email" placeholder="Enter your email">
        <input type="submit" value="Submit">
      </form>
    `);
    return res.end();
  }

  if (req.url === '/home' && req.method === 'GET') {
    res.write('<h1>Home Page</h1>');
    return res.end();
  }

  if (req.url === '/about' && req.method === 'GET') {
    res.write('<h1>About Page</h1>');
    return res.end();
  }

  if (req.url === '/contact' && req.method === 'GET') {
    res.write('<h1>Contact Page</h1>');
    return res.end();
  }

  if (req.url === '/submit-details' && req.method === 'POST') {
    const body = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parseBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(parseBody);
      const bodyObject = Object.fromEntries(params.entries());

      fs.writeFileSync('data.txt', JSON.stringify(bodyObject, null, 2));

      res.write(`
        <h1>Details Submitted Successfully</h1>
        <p>Name: ${bodyObject.name}</p>
        <p>Email: ${bodyObject.email}</p>
      `);
      res.end();
    });

    return;
  }

  res.statusCode = 404;
  res.write('<h1>404 - Page Not Found</h1>');
  return res.end();
};

export default reqHandler;
