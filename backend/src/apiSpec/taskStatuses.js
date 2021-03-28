module.exports.definitions = {
    TaskStatus: {
        type: "object",
        description: "TaskStatuses object",
        required: ['id', 'title', 'color'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the taskStatus',
            },
            title: {
                type: 'string',
                description: 'Title of the taskStatus',
            },
            color: {
                type: 'string',
                description: 'Title of the taskStatus',
            },
        }
    },
    TaskStatusWithoutId: {
        type: "object",
        description: "TaskStatus object",
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                description: 'Description of the TaskStatus',
            },
            color: {
                type: 'string',
                description: 'Title of the taskStatus',
            },
        }
    }
};

module.exports.paths = {
    "/taskStatuses": {
        get: {
            summary: 'Get all taskStatuses',
            description: 'Get all taskStatuses',
            tags: ['TaskStatus'],
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
					description: 'Successful response. All taskStatuses are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/TaskStatus',
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
            summary: 'Create taskStatus',
            description: 'Create new taskStatus',
            tags: ['TaskStatus'],
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
						$ref: '#/definitions/TaskStatusWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. TaskStatus is created',
					schema: {
						$ref: '#/definitions/TaskStatus'
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
            summary: 'Update taskStatus',
            description: 'Update taskStatus',
            tags: ['TaskStatus'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'TaskStatus',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/TaskStatus',
                    },
                }
            ],
            responses: {
				201: {
					description: 'Successful response. TaskStatus is updated',
					schema: {
						$ref: '#/definitions/TaskStatus'
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
    "/taskStatuses/{taskStatusId}": {
        get: {
            summary: 'Get taskStatus by id',
            description: 'Get taskStatus by id',
            tags: ['TaskStatus'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'taskStatusId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. TaskStatus is returned.',
					schema: {
						$ref: '#/definitions/TaskStatus',
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
            summary: 'Delete taskStatus by id',
            description: 'Delete taskStatus by id',
            tags: ['TaskStatus'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
				{
                    type: 'string',
                    name: 'taskStatusId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. TaskStatus is deleted.',
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