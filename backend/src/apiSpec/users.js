module.exports.definitions = {
    User: {
        type: "object",
        description: "User object",
        required: ['id', 'username', 'departmentId', 'email', 'roleId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the user',
            },
            username: {
                type: 'string',
                description: 'Username of the user',
            },
            email: {
                type: 'string',
                description: 'Email of the user',
            },
            roleId: {
                type: 'string',
                description: 'Role id of the user',
            },
            locationId: {
                type: 'string',
                description: 'Location id of the user',
            },
        }
    },
    UserWithoutId: {
        type: "object",
        description: "User object",
        required: ['username', 'departmentId', 'email', 'roleId'],
        properties: {
            username: {
                type: 'string',
                description: 'Username of the user',
            },
            email: {
                type: 'string',
                description: 'Email of the user',
            },
            roleId: {
                type: 'string',
                description: 'Role id of the user',
            },
            locationId: {
                type: 'string',
                description: 'Location id of the user',
            },
        }
    },
};

module.exports.paths = {
    "/users": {
        get: {
            summary: 'Get all users',
            description: 'Get all users',
            tags: ['User'],
            responses: {
				200: {
					description: 'Successful response. All users are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/User',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create user',
            description: 'Create new user',
            tags: ['User'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/UserWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. User is created',
					schema: {
						$ref: '#/definitions/User'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Change user',
            description: 'Change user',
            tags: ['User'],
            parameters: [
				{
                    name: 'User',
					in: 'body',
                    required: true,
                    schema: {
						$ref: '#/definitions/User'
					},
                },
			],
            responses: {
				201: {
					description: 'Successful response. User was changed',
					schema: {
						$ref: '#/definitions/User',
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
    "/users/{userId}": {
        get: {
            summary: 'Get user by id',
            description: 'Get user by id',
            tags: ['User'],
            parameters: [
				{
                    type: "string",
                    name: 'userId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. User is returned.',
					schema: {
						$ref: '#/definitions/User',
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
            summary: 'Delete user by id',
            description: 'Delete user by id',
            tags: ['User'],
            parameters: [
				{
                    type: 'string',
                    name: 'userId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. User is deleted.',
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