module.exports.definitions = {
    UserCompetence: {
        type: "object",
        description: "User object",
        required: ['_id', 'name', 'level'],
        properties: {
            competenceId: {
                type: 'string',
                description: 'Id of the competence',
            },
            level: {
                type: 'integer',
                description: 'Level of the competence',
            },
        }
    },
    User: {
        type: "object",
        description: "User object",
        required: ['email', 'departmentId'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the user',
            },
            email: {
                type: 'string',
                description: 'Email of the user',
            },
            departmentId: {
                type: 'string',
                description: 'Department id of the user',
            },
            projectIds: {
                type: 'array',
                description: 'Project ids of the user',
                items: {
                    type: "string"
                }
            },
            competencies: {
                type: 'array',
                description: 'Competencies of the user',
                items: {
                    type: "object",
                    $ref: '#/definitions/Competence',
                }
            },
            isAdmin: {
                type: 'boolean',
                description: 'User is admin',
            },
            isManager: {
                type: 'boolean',
                description: 'User is manager',
            },
        }
    },
    UserWithoutId: {
        type: "object",
        description: "User object",
        required: ['email', 'departmentId'],
        properties: {
            email: {
                type: 'string',
                description: 'Email of the user',
            },
            departmentId: {
                type: 'string',
                description: 'Department id of the user',
            },
            projectIds: {
                type: 'array',
                description: 'Project ids of the user',
                items: {
                    type: "string"
                }
            },
            competencies: {
                type: 'array',
                description: 'Competencies of the user',
                items: {
                    type: "object",
                    $ref: '#/definitions/Competence',
                }
            },
            isAdmin: {
                type: 'boolean',
                description: 'User is admin',
            },
            isManager: {
                type: 'boolean',
                description: 'User is manager',
            },
        }
    },
    UserDepartment: {
        type: "object",
        description: "User department",
        required: ['_id', 'departmentId'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the user',
            },
            departmentId: {
                type: 'string',
                description: 'Department id of the user',
            },
        }
    },
    UserProjects: {
        type: "object",
        description: "User projects",
        required: ['_id', 'projectIds'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the user',
            },
            projectIds: {
                type: 'array',
                description: 'Project ids of the user',
                items: {
                    type: "string"
                }
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
    "/users/changeDepartment": {
        put: {
            summary: 'Change user department',
            description: 'Change user department',
            tags: ['User'],
            parameters: [
				{
                    name: 'User department',
					in: 'body',
                    required: true,
                    schema: {
						$ref: '#/definitions/UserDepartment'
					},
                },
			],
            responses: {
				201: {
					description: 'Successful response. Department of user was changed',
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
    "/users/changeProjects": {
        put: {
            summary: 'Change user projects',
            description: 'Change user projects',
            tags: ['User'],
            parameters: [
				{
                    name: 'User projects',
					in: 'body',
                    required: true,
                    schema: {
						$ref: '#/definitions/UserProjects'
					},
                },
			],
            responses: {
				201: {
					description: 'Successful response. Department of user was changed',
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
    "/users/changeManagerRole/{userId}": {
        put: {
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
				201: {
					description: 'Successful response. Manager role of user was changed',
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
    }
}