module.exports.definitions = {
    Report: {
        type: "object",
        description: "Reports object",
        required: ['id', 'date', 'status', 'hours', 'comment', 'projectId', 'taskId', 'featureId', 'userId', 'factorId', 'locationId'],
        properties: {
            'id': {
                type: 'string',
                description: 'Id of the report',
            },
            date: {
                type: 'string',
                description: 'Date of the report',
            },
            status: {
                type: 'string',
                description: 'Date of the report',
            },
            hours: {
                type: 'number',
                description: 'Hours of the report',
            },
            comment: {
                type: 'string',
                description: 'Comment of the report',
            },
            project: {
                $ref: '#/definitions/Project',
            },
            task: {
                $ref: '#/definitions/Task',
            },
            feature: {
                $ref: '#/definitions/Feature',
            },
            user: {
                $ref: '#/definitions/User',
            },
            factor: {
                $ref: '#/definitions/Factor',
            },
            location: {
                $ref: '#/definitions/Location',
            },
        }
    },
    ReportWithoutId: {
        type: "object",
        description: "Report object",
        required: ['date', 'status', 'hours', 'comment', 'projectId', 'taskId', 'featureId', 'userId', 'factorId', 'locationId'],
        properties: {
            date: {
                type: 'string',
                description: 'Date of the report',
            },
            status: {
                type: 'string',
                description: 'Date of the report',
            },
            hours: {
                type: 'number',
                description: 'Hours of the report',
            },
            comment: {
                type: 'string',
                description: 'Comment of the report',
            },
            projectId: {
                type: 'string',
                description: 'Project id of the report',
            },
            taskId: {
                type: 'string',
                description: 'Task id of the report',
            },
            featureId: {
                type: 'string',
                description: 'Feature id of the report',
            },
            userId: {
                type: 'string',
                description: 'User id of the report',
            },
            factorId: {
                type: 'string',
                description: 'Factor id of the report',
            },
            locationId: {
                type: 'string',
                description: 'Location id of the report',
            },
        }
    }
};

module.exports.paths = {
    "/reports": {
        get: {
            summary: 'Get all reports',
            description: 'Get all reports',
            tags: ['Report'],
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
                    description: 'Successful response. All reports are returned.',
                    schema: {
                        type: 'array',
                        items: {
                            $ref: '#/definitions/Report',
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
            summary: 'Create report',
            description: 'Create new report',
            tags: ['Report'],
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
                        $ref: '#/definitions/ReportWithoutId',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Successful response. Report is created',
                    schema: {
                        $ref: '#/definitions/Report'
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
            summary: 'Update report',
            description: 'Update report',
            tags: ['Report'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    name: 'Report',
                    in: 'body',
                    required: true,
                    schema: {
                        $ref: '#/definitions/Report',
                    },
                }
            ],
            responses: {
                201: {
                    description: 'Successful response. Report is updated',
                    schema: {
                        $ref: '#/definitions/Report'
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
    "/reports/{reportId}": {
        get: {
            summary: 'Get report by id',
            description: 'Get report by id',
            tags: ['Report'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'reportId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                200: {
                    description: 'Successful response. Report is returned.',
                    schema: {
                        $ref: '#/definitions/Report',
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
            summary: 'Delete report by id',
            description: 'Delete report by id',
            tags: ['Report'],
            parameters: [
                {
                    type: "string",
                    name: "Authorization",
                    in: "header",
                    required: true,
                },
                {
                    type: 'string',
                    name: 'reportId',
                    in: 'path',
                    required: true,
                },
            ],
            responses: {
                204: {
                    description: 'Successful response. Report is deleted.',
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