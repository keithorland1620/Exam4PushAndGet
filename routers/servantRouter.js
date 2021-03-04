const { servantController } = require('../controllers');

exports.handleRequest = (req, res) => {
    switch (req.method) {
        case 'GET':
            return servantController.handleGet(req, res);

        case 'POST':
            return servantController.handlePost(req, res);

        case 'DELETE':
            return servantController.handleDelete(req, res);

        case 'PUT':
            return servantController.handlePut(req, res);

        default:
            res.writeHead(405).end('Ooops method not supported');
    }
};
