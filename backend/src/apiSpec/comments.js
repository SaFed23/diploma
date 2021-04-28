module.exports.definitions = {
    Comment: {
        type: "object",
        description: "Comments object",
        required: ['id', 'description', 'date', 'userId', 'taskId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the comment',
            },
            description: {
                type: 'string',
                description: 'Description of the comment',
            },
            date: {
                type: 'date',
                description: 'Date of the comment',
            },
            user: {
                $ref: '#/definitions/User',
            },
            task: {
                $ref: '#/definitions/Task',
            },
        }
    },
    CommentWithoutId: {
        type: "object",
        description: "Comment object",
        required: ['description', 'date', 'userId', 'taskId'],
        properties: {
            description: {
                type: 'string',
                description: 'Description of the comment',
            },
            date: {
                type: 'date',
                description: 'Date of the comment',
            },
            userId: {
                type: 'string',
                description: 'User id of the comment',
            },
            taskId: {
                type: 'string',
                description: 'Task id of the comment',
            },
        }
    }
};

module.exports.paths = {
    "/comments": {
        get: {
            summary: 'Get all comments',
            description: 'Get all comments',
            tags: ['Comment'],
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
                    description: 'Successful response. All comments are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Comment',
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
            summary: 'Create comment',
            description: 'Create new comment',
            tags: ['Comment'],
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
                        $ref: '#/definitions/CommentWithoutId',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Successful response. Comment is created',
                    schema: {
                        $ref: '#/definitions/Comment'
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
            summary: 'Update comment',
            description: 'Update comment',
            tags: ['Comment'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Comment',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Comment',
                    },
                }
            ],
            responses: {
                201: {
                    description: 'Successful response. Comment is updated',
                    schema: {
                        $ref: '#/definitions/Comment'
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
    "/comments/{commentId}": {
        get: {
            summary: 'Get comment by id',
            description: 'Get comment by id',
            tags: ['Comment'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'commentId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Comment is returned.',
                    schema: {
                        $ref: '#/definitions/Comment',
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
            summary: 'Delete comment by id',
            description: 'Delete comment by id',
            tags: ['Comment'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'commentId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                204: {
                    description: 'Successful response. Comment is deleted.',
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
    "/comments/task/{taskId}": {
        get: {
            summary: 'Get comment by task id',
            description: 'Get comment by task id',
            tags: ['Comment'],
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
                200: {
                    description: 'Successful response. Comments is returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Comment',
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