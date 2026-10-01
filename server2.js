const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    console.log(`Received request for: ${req.method} ${path}`);

    if (path === '/' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.setHeader('X-powered-By', 'plain-node-http');

        res.end('Hello world! Try /greet?name=yourname');

    } else if (path === '/greet' && req.method === 'GET') {
        const name = query.name || 'Guest';

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end(`Hello, ${name}!`);

    } else if (path === '/headers' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(req.headers, null, 2));

    } else if (path === '/data' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            res.statusCode = 201;
            res.setHeader('Content-Type', 'application/json');

            res.end(JSON.stringify({
                message: 'Data received successfully',
                yourData: body
            }));
        });

    } else if (path === '/error') {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Internal Server Error');

    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('404 Not Found');
    }
});



server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});