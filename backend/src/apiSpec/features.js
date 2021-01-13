module.exports.definitions = {
    Feature: {
        type: "object",
        description: "Features object",
        required: ['id', 'title', 'description', 'projectId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the feature',
            },
            title: {
                type: 'string',
                description: 'Title of the feature',
            },
            description: {
                type: 'string',
                description: 'Description of the feature',
            },
            projectId: {
                type: 'string',
                description: 'Project id of the feature',
            },
        }
    },
    FeatureWithoutId: {
        type: "object",
        description: "Feature object",
        required: ['title', 'description', 'projectId'],
        properties: {
            title: {
                type: 'string',
                description: 'Title of the feature',
            },
            description: {
                type: 'string',
                description: 'Description of the feature',
            },
            projectId: {
                type: 'string',
                description: 'Project id of the feature',
            },
        }
    }
};

module.exports.paths = {
    "/features": {
        get: {
            summary: 'Get all features',
            description: 'Get all features',
            tags: ['Feature'],
            responses: {
				200: {
					description: 'Successful response. All features are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Feature',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create feature',
            description: 'Create new feature',
            tags: ['Feature'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/FeatureWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Feature is created',
					schema: {
						$ref: '#/definitions/Feature'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update feature',
            description: 'Update feature',
            tags: ['Feature'],
            parameters: [{
                name: 'Feature',
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Feature',
                },
            }],
            responses: {
				201: {
					description: 'Successful response. Feature is updated',
					schema: {
						$ref: '#/definitions/Feature'
					},
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
    "/features/{featureId}": {
        get: {
            summary: 'Get feature by id',
            description: 'Get feature by id',
            tags: ['Feature'],
            parameters: [
				{
                    type: 'string',
                    name: 'featureId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Feature is returned.',
					schema: {
						$ref: '#/definitions/Feature',
					},
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
            summary: 'Delete feature by id',
            description: 'Delete feature by id',
            tags: ['Feature'],
            parameters: [
				{
                    type: 'string',
                    name: 'featureId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Feature is deleted.',
					schema: {
						$ref: '#/responses/NoContent',
					},
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