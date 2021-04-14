module.exports.definitions = {
    Task: {
        type: "object",
        description: "Task object",
        required: ['id', 'title', 'description', 'taskStatusId', 'featureId', 'users'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the task',
            },
            title: {
                type: 'string',
                description: 'Title of the task',
            },
            description: {
                type: 'string',
                description: 'Description of the task',
            },
            taskStatus: {
                $ref: '#/definitions/TaskStatus',
            },
            feature: {
                $ref: '#/definitions/Feature',
            },
            users: {
                type: 'array',
                items: {
                    $ref: '#/definitions/User',
                },
            }
        }
    },
    TaskWithoutId: {
        type: "object",
        description: "Task object",
        required: ['title', 'description', 'taskStatusId', 'featureId', 'userIds'],
        properties: {
            title: {
                type: 'string',
                description: 'Title of the task',
            },
            description: {
                type: 'string',
                description: 'Description of the task',
            },
            taskStatusId: {
                type: 'string',
                description: 'Status task id of the task',
            },
            featureId: {
                type: 'string',
                description: 'Feature id of the task',
            },
            userIds: {
                type: 'array',
                items: {
                    type: "string"
                },
            }
        }
    },
    TaskCard: {
        type: "object",
        description: "Task object for card",
        required: ['id', 'title', 'color', 'tasks'],
        properties: {
            id: {
                type: 'string',
                description: 'Id of the task status',
            },
            title: {
                type: 'string',
                description: 'Title of the task status',
            },
            color: {
                type: 'string',
                description: 'Description of the task status',
            },
            tasks: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'Id of the task',
                        },
                        title: {
                            type: 'string',
                            description: 'Title of the task',
                        },
                        description: {
                            type: 'string',
                            description: 'Description of the task',
                        },
                        taskStatusId: {
                            type: 'string',
                            description: 'Status task id of the task',
                        },
                        featureId: {
                            type: 'string',
                            description: 'Feature id of the task',
                        },
                        userIds: {
                            type: 'array',
                            items: {
                                type: "string"
                            },
                        }
                    }
                },
            },
        }
    },
};

module.exports.paths = {
    "/tasks": {
        get: {
            summary: 'Get all tasks',
            description: 'Get all tasks',
            tags: ['Task'],
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
                    description: 'Successful response. All tasks are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Task',
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
            summary: 'Create task',
            description: 'Create new task',
            tags: ['Task'],
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
                        $ref: '#/definitions/TaskWithoutId',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Successful response. Task is created',
                    schema: {
                        $ref: '#/definitions/Task'
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
            summary: 'Update task',
            description: 'Update task',
            tags: ['Task'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Task',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Task',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Successful response. Task is updated',
                    schema: {
                        $ref: '#/definitions/Task'
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
    "/tasks/{taskId}": {
        get: {
            summary: 'Get task by id',
            description: 'Get task by id',
            tags: ['Task'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: "string",
                    name: 'taskId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Task is returned.',
                    schema: {
                        $ref: '#/definitions/Task',
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
            summary: 'Delete task by id',
            description: 'Delete task by id',
            tags: ['Task'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'taskId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                204: {
                    description: 'Successful response. Task is deleted.',
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
    "/tasks/feature/{featureId}": {
        get: {
            summary: 'Get feature tasks by featureId',
            description: 'Get feature tasks by featureId',
            tags: ['Task'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: "string",
                    name: 'featureId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Tasks are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/TaskCard',
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