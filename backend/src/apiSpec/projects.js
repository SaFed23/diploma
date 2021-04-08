module.exports.definitions = {
    Project: {
        type: "object",
        description: "Project object",
        required: ['id', 'title', 'description', 'startDate', 'endDate', 'ownerId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the project',
            },
            title: {
                type: 'string',
                description: 'Title of the project',
            },
            description: {
                type: 'string',
                description: 'Description of the project',
            },
            startDate: {
                type: 'string',
                description: 'Start date of the project',
            },
            endDate: {
                type: 'string',
                description: 'End date of the project',
            },
            owner: {
                $ref: '#/definitions/User',
            },
            users: {
                type: 'array',
                items: {
                    $ref: '#/definitions/User',
                }
            },
        }
    },
    ProjectWithoutId: {
        type: "object",
        description: "Project object",
        required: ['title', 'description', 'startDate', 'endDate', 'ownerId'],
        properties: {
            title: {
                type: 'string',
                description: 'Title of the project',
            },
            description: {
                type: 'string',
                description: 'Description of the project',
            },
            startDate: {
                type: 'string',
                description: 'Start date of the project',
            },
            endDate: {
                type: 'string',
                description: 'End date of the project',
            },
            ownerId: {
                type: 'string',
                description: 'Owner id of the project',
            },
            userIds: {
                type: 'array',
                description: 'User ids of the project',
                item: {
                    type: 'string',
                }
            },
        }
    }
};

module.exports.paths = {
    "/projects": {
        get: {
            summary: 'Get all projects',
            description: 'Get all projects',
            tags: ['Project'],
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
                    description: 'Successful response. All projects are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Project',
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
            summary: 'Create project',
            description: 'Create new project',
            tags: ['Project'],
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
                401: {
                    $ref: '#/responses/UnauthorizedError',
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
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
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
    "/projects/{projectId}": {
        get: {
            summary: 'Get project by id',
            description: 'Get project by id',
            tags: ['Project'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
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
            summary: 'Delete project by id',
            description: 'Delete project by id',
            tags: ['Project'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
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
    "/projects/user/{userId}": {
        get: {
            summary: 'Get user projects by userId',
            description: 'Get user projects by userId',
            tags: ['Project'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: "string",
                    name: 'userId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Projects are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Project',
                        },
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