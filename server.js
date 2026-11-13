const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const rootDir = 'C:/Users/Admin/Documents/фото для игры/widget';

const server = http.createServer((req, res) => {
    let filePath = path.join(rootDir, req.url === '/' ? 'index.html' : req.url);
    if (req.url.startsWith('/assets/')) {
        filePath = path.join('C:/Users/Admin/Documents/фото для игры/assets', req.url.replace('/assets/', ''));
    }
    const extname = path.extname(filePath);
    let contentType = 'text/html';
    if (extname === '.png') contentType = 'image/png';
    else if (extname === '.jpg' || extname === '.jpeg') contentType = 'image/jpeg';
    else if (extname === '.css') contentType = 'text/css';
    else if (extname === '.js') contentType = 'application/javascript';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found: ' + filePath);
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:' + PORT + '/');
});
