const http = require('http');
const { URL } = require('url');
const { servantRouter } = require('./routers');

const port = process.env.port || 3000;

const server = http.createServer((req, res) => {
    const { pathname } = new URL(req.url, `http://${req.headers.host}`);

    switch (pathname) {
        case '/servants':
            servantRouter.handleRequest(req, res);
            break;

        default:
            res.writeHead(400).end(
                `Ooops! Resource ${pathname} not supported.`
            );
    }
});

server.listen(port, () => {
    console.log(`Server is now listening to port: ${port}`);
});
