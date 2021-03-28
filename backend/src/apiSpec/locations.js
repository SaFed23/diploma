module.exports.definitions = {
    Location: {
        type: "object",
        description: "Locations object",
        required: ['id', 'title'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the location',
            },
            title: {
                type: 'string',
                description: 'Title of the location',
            }
        }
    },
    LocationWithoutId: {
        type: "object",
        description: "Location object",
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                description: 'Description of the location',
            }
        }
    }
};

module.exports.paths = {
    "/locations": {
        get: {
            summary: 'Get all locations',
            description: 'Get all locations',
            tags: ['Location'],
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
					description: 'Successful response. All locations are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Location',
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
            summary: 'Create location',
            description: 'Create new location',
            tags: ['Location'],
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
						$ref: '#/definitions/LocationWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Location is created',
					schema: {
						$ref: '#/definitions/Location'
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
            summary: 'Update location',
            description: 'Update location',
            tags: ['Location'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Location',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Location',
                    },
                }
            ],
            responses: {
				201: {
					description: 'Successful response. Location is updated',
					schema: {
						$ref: '#/definitions/Location'
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
    "/locations/{locationId}": {
        get: {
            summary: 'Get location by id',
            description: 'Get location by id',
            tags: ['Location'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'locationId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Location is returned.',
					schema: {
						$ref: '#/definitions/Location',
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
            summary: 'Delete location by id',
            description: 'Delete location by id',
            tags: ['Location'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'locationId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Location is deleted.',
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