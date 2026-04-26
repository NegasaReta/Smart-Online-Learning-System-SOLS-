export const openApiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'SOLS API',
    version: '1.0.0',
  },
  servers: [{ url: 'http://localhost:5000' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/api/health': {
      get: {
        summary: 'Health check',
        responses: {
          '200': { description: 'OK' },
        },
      },
    },
    '/api/auth/teacher/register': {
      post: {
        summary: 'Register teacher',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                  username: { type: 'string', example: 'teacher1' },
                  email: { type: 'string', example: 'teacher1@test.com' },
                  password: { type: 'string', example: 'Passw0rd!' },
                  languagePreference: { type: 'string', example: 'English' },
                  subjectSpecialization: { type: 'string', example: 'Math' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/api/auth/teacher/login': {
      post: {
        summary: 'Login teacher',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: { type: 'string', example: 'teacher1@test.com' },
                  password: { type: 'string', example: 'Passw0rd!' },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'OK (token returned)' },
          '401': { description: 'Invalid credentials' },
          '403': { description: 'Pending/Rejected' },
          '500': { description: 'Server error' },
        },
      },
    },
    '/api/auth/teacher/logout': {
      post: {
        summary: 'Logout teacher',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': { description: 'OK' },
          '401': { description: 'Missing token' },
          '403': { description: 'Invalid/expired token' },
        },
      },
    },
  },
} as const;

