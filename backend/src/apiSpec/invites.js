module.exports.definitions = {
    Invite: {
        type: "object",
        description: "Invites object",
        required: ['id', 'title', 'description', 'date', 'userId', 'projectId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the invite',
            },
            title: {
                type: 'string',
                description: 'Title of the invite',
            },
            description: {
                type: 'string',
                description: 'Description of the invite',
            },
            date: {
                type: 'string',
                description: 'Date of the invite',
            },
            user: {
                $ref: '#/definitions/User',
            },
            project: {
                $ref: '#/definitions/Project',
            },
        }
    },
    InviteWithoutId: {
        type: "object",
        description: "Invite object",
        required: ['title', 'description', 'date', 'userId', 'projectId'],
        properties: {
            title: {
                type: 'string',
                description: 'Title of the invite',
            },
            description: {
                type: 'string',
                description: 'Description of the invite',
            },
            date: {
                type: 'string',
                description: 'Date of the invite',
            },
            userId: {
                type: 'string',
                description: 'User id of the invite',
            },
            projectId: {
                type: 'string',
                description: 'Project id of the invite',
            },
        }
    }
};

module.exports.paths = {
    "/invites": {
        get: {
            summary: 'Get all invites',
            description: 'Get all invites',
            tags: ['Invite'],
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
                    description: 'Successful response. All invites are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Invite',
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
            summary: 'Create invite',
            description: 'Create new invite',
            tags: ['Invite'],
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
                        $ref: '#/definitions/InviteWithoutId',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Successful response. Invite is created',
                    schema: {
                        $ref: '#/definitions/Invite'
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
            summary: 'Update invite',
            description: 'Update invite',
            tags: ['Invite'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Invite',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Invite',
                    },
                }
            ],
            responses: {
                201: {
                    description: 'Successful response. Invite is updated',
                    schema: {
                        $ref: '#/definitions/Invite'
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
    "/invites/{inviteId}": {
        get: {
            summary: 'Get invite by id',
            description: 'Get invite by id',
            tags: ['Invite'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'inviteId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Invite is returned.',
                    schema: {
                        $ref: '#/definitions/Invite',
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
            summary: 'Delete invite by id',
            description: 'Delete invite by id',
            tags: ['Invite'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'inviteId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                204: {
                    description: 'Successful response. Invite is deleted.',
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