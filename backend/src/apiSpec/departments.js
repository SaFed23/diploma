module.exports.definitions = {
    Department: {
        type: "object",
        description: "Department object",
        required: ['_id', 'name'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the department',
            },
            name: {
                type: 'string',
                description: 'Name of the department',
            }
        }
    },
    DepartmentWithoutId: {
        type: "object",
        description: "Department object",
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                description: 'Name of the department',
            }
        }
    }
};

module.exports.paths = {
    "/departments": {
        get: {
            summary: 'Get all departments',
            description: 'Get all departments',
            tags: ['Department'],
            responses: {
				200: {
					description: 'Successful response. All departments are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Department',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create department',
            description: 'Create new department',
            tags: ['Department'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/DepartmentWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Department is created',
					schema: {
						$ref: '#/definitions/Department'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update department',
            description: 'Update department',
            tags: ['Department'],
            parameters: [{
                name: 'Department',
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Department',
                },
            }],
            responses: {
				201: {
					description: 'Successful response. Department is updated',
					schema: {
						$ref: '#/definitions/Department'
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
    "/departments/{departmentId}": {
        get: {
            summary: 'Get department by id',
            description: 'Get department by id',
            tags: ['Department'],
            parameters: [
				{
                    type: 'string',
                    name: 'departmentId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Department is returned.',
					schema: {
						$ref: '#/definitions/Department',
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
            summary: 'Delete department by id',
            description: 'Delete department by id',
            tags: ['Department'],
            parameters: [
				{
                    type: 'string',
                    name: 'departmentId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Department is deleted.',
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