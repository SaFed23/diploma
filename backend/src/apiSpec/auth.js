module.exports.definitions = {
  UserAuth: {
    type: "object",
    description: "User object",
    required: ['username', 'password'],
    properties: {
      username: {
          type: 'string',
          description: 'Username of the user',
      },
      password: {
        type: 'string',
        description: 'Password of the user',
      },
    }
  }
};

module.exports.paths = {
  "/auth/login": {
    post: {
      summary: 'Login user',
      description: 'Login user',
      tags: ['Auth'],
      parameters: [
        {
          name: 'User data',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/UserAuth',
          },
        },
      ],
      responses: {
        201: {
          description: 'Successful response. User is created',
          schema: {
            type: 'object',
            description: 'Token of user',
            properties: {
              id: {
                type: 'string',
                description: 'Id of the user',
              },
              token: {
                type: 'string',
                description: 'Token of the user',
            },
            }
          },
        },
        500: {
          $ref: '#/responses/UnknownServerError',
        },
      },
    },
  }
};