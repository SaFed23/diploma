module.exports.definitions = {
    Project: {
        type: "object",
        description: "Project object",
        required: ['_id', 'name'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the project',
            },
            name: {
                type: 'string',
                description: 'Name of the project',
            }
        }
    },
    ProjectWithoutId: {
        type: "object",
        description: "Project object",
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                description: 'Name of the project',
            }
        }
    }
};

module.exports.paths = {
    "/projects": {
        get: {
            summary: 'Get all projects',
            description: 'Get all projects',
            tags: ['Project'],
            responses: {
				200: {
					description: 'Successful response. All projects are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Project',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create project',
            description: 'Create new project',
            tags: ['Project'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/ProjectWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Project is created',
					schema: {
						$ref: '#/definitions/Project'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update project',
            description: 'Update project',
            tags: ['Project'],
            parameters: [
                {
                    name: 'Project',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/Project',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Project is updated',
					schema: {
						$ref: '#/definitions/Project'
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
    "/projects/{projectId}": {
        get: {
            summary: 'Get project by id',
            description: 'Get project by id',
            tags: ['Project'],
            parameters: [
				{
                    type: "string",
                    name: 'projectId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Project is returned.',
					schema: {
						$ref: '#/definitions/Project',
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
            summary: 'Delete project by id',
            description: 'Delete project by id',
            tags: ['Project'],
            parameters: [
				{
                    type: 'string',
                    name: 'projectId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Project is deleted.',
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