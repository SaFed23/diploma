const requireDir = require('require-dir');
const apiSpecPathsAndDefinitions = requireDir('./src/apiSpec');

let paths = {};
let definitions = {};

Object.keys(apiSpecPathsAndDefinitions).forEach(item => {
	if (apiSpecPathsAndDefinitions[item].paths) {
		paths = {
			...paths,
			...apiSpecPathsAndDefinitions[item].paths,
		};
	}

	if (apiSpecPathsAndDefinitions[item].definitions) {
		definitions = {
			...definitions,
			...apiSpecPathsAndDefinitions[item].definitions,
		};
	}
});

const apiSpec = {
	swagger: '2.0',
	info: {
		title: 'Cofe3.0',
		description: 'Description',
		version: '1.0.0',
    },
    schemes: ['http', 'https'],
	basePath: '/',
	responses: {
		// 204 No Content
		NoContent: {
			description: 'Success no content response',
		},
		// Error 401
		UnauthorizedError: {
			description: 'Unauthorized client',
			schema: {
				$ref: '#/definitions/Error',
			},
		},
		// Error 404
		NotFoundError: {
			description: 'Not found error',
			schema: {
				$ref: '#/definitions/Error',
			},
		},
		// Error 500
		UnknownServerError: {
			description: 'Unknown server error',
			schema: {
				$ref: '#/definitions/Error',
			},
		},
	},
    paths,
	definitions,
}

module.exports = apiSpec;