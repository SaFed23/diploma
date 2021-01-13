module.exports.definitions = {
    Role: {
        type: "object",
        description: "Roles object",
        required: ['id', 'title'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the role',
            },
            title: {
                type: 'string',
                description: 'Title of the role',
            }
        }
    },
    RoleWithoutId: {
        type: "object",
        description: "Role object",
        required: ['title'],
        properties: {
            title: {
                type: 'string',
                description: 'Description of the role',
            }
        }
    }
};

module.exports.paths = {
    "/roles": {
        get: {
            summary: 'Get all roles',
            description: 'Get all roles',
            tags: ['Role'],
            responses: {
				200: {
					description: 'Successful response. All roles are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Role',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create role',
            description: 'Create new role',
            tags: ['Role'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/RoleWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Role is created',
					schema: {
						$ref: '#/definitions/Role'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update role',
            description: 'Update role',
            tags: ['Role'],
            parameters: [{
                name: 'Role',
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Role',
                },
            }],
            responses: {
				201: {
					description: 'Successful response. Role is updated',
					schema: {
						$ref: '#/definitions/Role'
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
    "/roles/{roleId}": {
        get: {
            summary: 'Get role by id',
            description: 'Get role by id',
            tags: ['Role'],
            parameters: [
				{
                    type: 'string',
                    name: 'roleId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Role is returned.',
					schema: {
						$ref: '#/definitions/Role',
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
            summary: 'Delete role by id',
            description: 'Delete role by id',
            tags: ['Role'],
            parameters: [
				{
                    type: 'string',
                    name: 'roleId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Role is deleted.',
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