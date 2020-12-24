module.exports.definitions = {
    Competence: {
        type: "object",
        description: "Competencies object",
        required: ['_id', 'name'],
        properties: {
            '_id': {
                type: 'string',
                description: 'Id of the competence',
            },
            name: {
                type: 'string',
                description: 'Name of the competence',
            }
        }
    },
    CompetenceWithoutId: {
        type: "object",
        description: "Competence object",
        required: ['name'],
        properties: {
            name: {
                type: 'string',
                description: 'Name of the competence',
            }
        }
    }
};

module.exports.paths = {
    "/competencies": {
        get: {
            summary: 'Get all competencies',
            description: 'Get all competencies',
            tags: ['Competence'],
            responses: {
				200: {
					description: 'Successful response. All competencies are returned.',
					schema: {
						type: 'array',
						items: {
                            $ref: '#/definitions/Competence',
                        },
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        post: {
            summary: 'Create competence',
            description: 'Create new competence',
            tags: ['Competence'],
            parameters: [
				{
                    name: 'name',
					in: 'body',
					required: true,
					schema: {
						$ref: '#/definitions/CompetenceWithoutId',
                    },
				},
			],
            responses: {
				201: {
					description: 'Successful response. Competence is created',
					schema: {
						$ref: '#/definitions/Competence'
					},
                },
                500: {
					$ref: '#/responses/UnknownServerError',
				},
			},
        },
        put: {
            summary: 'Update competence',
            description: 'Update competence',
            tags: ['Competence'],
            parameters: [{
                name: 'Competence',
                in: 'body',
                required: true,
                schema: {
                    $ref: '#/definitions/Competence',
                },
            }],
            responses: {
				201: {
					description: 'Successful response. Competence is updated',
					schema: {
						$ref: '#/definitions/Competence'
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
    "/competencies/{competenceId}": {
        get: {
            summary: 'Get competence by id',
            description: 'Get competence by id',
            tags: ['Competence'],
            parameters: [
				{
                    type: 'string',
                    name: 'competenceId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				200: {
					description: 'Successful response. Competence is returned.',
					schema: {
						$ref: '#/definitions/Competence',
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
            summary: 'Delete competence by id',
            description: 'Delete competence by id',
            tags: ['Competence'],
            parameters: [
				{
                    type: 'string',
                    name: 'competenceId',
					in: 'path',
					required: true,
				},
			],
            responses: {
				204: {
					description: 'Successful response. Competence is deleted.',
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