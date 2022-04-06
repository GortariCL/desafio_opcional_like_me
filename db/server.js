const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { registroPost, getPosts, agregarLikes } = require('./queries');
const port = 3000;

http.createServer(async (req, res) => {
    //Disponibiliza HTML
    if (req.url == '/' && req.method == 'GET') {
        fs.readFile(path.join(__dirname, '..', 'index.html'), (err, html) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            }
        });
    }
    //Disponibiliza CSS
    if (req.url == '/style') {
        fs.readFile(path.join(__dirname, '..', '/assets/css/style.css'), (err, css) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/css');
                res.end(css);
            }
        });
    }
    //Disponibiliza JAVASCRIPT
    if (req.url == '/script') {
        fs.readFile(path.join(__dirname, '..', '/assets/js/script.js'), (err, js) => {
            if (err) {
                res.statusCode = 500;
                res.end();
            } else {
                res.setHeader('Content-Type', 'text/javascript');
                res.end(js);
            }
        });
    }
    //Ruta /post POST (Requerimiento 1)
    if (req.url == '/post' && req.method == 'POST') {
        let body;
        req.on('data', (chunk) => {
            body = chunk.toString();
        });
        req.on('end', async () => {
            try {
                const datos = Object.values(JSON.parse(body));
                const result = await registroPost(datos);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (err) {
                res.statusCode = 500;
                res.end('Problema en el servidor => ', err);
            }
        });
    }
    //Ruta /post PUT (Requerimiento 2)
    if (req.url.startsWith('/post') && req.method == 'PUT'){
        let body;
        req.on('data', (chunk) => {
            body = chunk.toString();
        });
        req.on('end', async () => {
            try {
                const { id } = url.parse(req.url, true).query;
                const result = await agregarLikes(id);
                res.statusCode = 201;
                res.end(JSON.stringify(result));
            } catch (err) {
                res.statusCode = 500;
                res.end('Problema en el servidor => ', err);
            }
        });
    }
    //Ruta /posts GET (Requerimiento 3)
    if (req.url == '/posts' && req.method == 'GET') {
        try {
            const posts = await getPosts();
            res.statusCode = 201;
            res.end(JSON.stringify(posts.rows));
        } catch (err) {
            res.statusCode = 500;
            res.end('Problema en el servidor => ', err);
        }
    }
}).listen(port, () => console.log(`Server ON => ${port}`));