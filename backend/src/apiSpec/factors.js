module.exports.definitions = {
    Factor: {
        type: "object",
        description: "Factors object",
        required: ['id', 'title'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the factor',
            },
            title: {
                type: 'string',
                description: 'Title of the factor',
            }
        }
    },
    FactorWithoutId: {
        type: "object",
        description: "Factor object",
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                description: 'Description of the factor',
            }
        }
    }
};

module.exports.paths = {
    "/factors": {
        get: {
            summary: 'Get all factors',
            description: 'Get all factors',
            tags: ['Factor'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
            ],
            responses: {
				200: {
					description: 'Successful response. All factors are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Factor',
                        },
					},
                },
                401: {
					$ref: '#/responses/UnauthorizedError',
				},
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create factor',
            description: 'Create new factor',
            tags: ['Factor'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/FactorWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Factor is created',
					schema: {
						$ref: '#/definitions/Factor'
					},
                },
                401: {
					$ref: '#/responses/UnauthorizedError',
				},
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update factor',
            description: 'Update factor',
            tags: ['Factor'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Factor',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Factor',
                    },
                }
            ],
            responses: {
				201: {
					description: 'Successful response. Factor is updated',
					schema: {
						$ref: '#/definitions/Factor'
					},
                },
                401: {
					$ref: '#/responses/UnauthorizedError',
				},
                404: {
					$ref: '#/responses/NotFoundError',
				},
                500: {
					$ref: '#/responses/UnknownServerError',
				},
            },
        }
    },
    "/factors/{factorId}": {
        get: {
            summary: 'Get factor by id',
            description: 'Get factor by id',
            tags: ['Factor'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'factorId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Factor is returned.',
					schema: {
						$ref: '#/definitions/Factor',
					},
                },
                401: {
					$ref: '#/responses/UnauthorizedError',
				},
                404: {
					$ref: '#/responses/NotFoundError',
				},
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        delete: {
            summary: 'Delete factor by id',
            description: 'Delete factor by id',
            tags: ['Factor'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'factorId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Factor is deleted.',
					schema: {
						$ref: '#/responses/NoContent',
					},
                },
                401: {
					$ref: '#/responses/UnauthorizedError',
				},
                404: {
					$ref: '#/responses/NotFoundError',
				},
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
    },
}