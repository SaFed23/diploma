module.exports.definitions = {
    Error: {
		type: 'object',
		description: 'Error messages',
		required: ['code'],
		properties: {
			code: {
				type: 'integer',
				description: 'Four-digits error code',
			},
			message: {
				type: 'string',
				description: 'Error description',
			},
		},
		example: {
			code: 1000,
			message: 'Unknown error with API',
		},
	},
};