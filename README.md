# Singu Technical Challenge

## Project Description

This project is a technical challenge for a Node.js Developer position at Singu. The objective is to develop a restaurant order management system. The application implements the following key features:

1. Order Creation: Generate new orders with unique identifiers, itemized lists, and an initial "pending" status.
2. Order Retrieval: Fetch and display all existing orders in the system.
3. Status Updates: Modify order statuses through the workflow - "in preparation", "ready", and "delivered".

The challenge is designed to showcase proficiency in:

- Test-Driven Development (TDD)
- Domain-Driven Design (DDD)
- Object-Oriented Programming (OOP)
- Advanced Software Architecture and Design
- Implementation of Design Patterns
- Adherence to SOLID Principles

## Design Choices and Considerations

- Enum Value Assignment: The approach of assigning a Portuguese value to the enum items doesn't align with future i18n (internationalization) concepts. However, this was a deliberate simplification made for the technical test, with full awareness of its implications.
- Test Placement Strategy: The decision to place tests alongside the classes they are testing has both pros and cons. I consciously chose this strategy for this project, but I am aware that there are alternative approaches to test organization.
- Validation of Order Items: There is no validation for the fields of the items when adding an item to an order. Currently, it is possible to add an item without a name or quantity. This was intentional, and I wanted to highlight this in the documentation as a design choice for this test.
- Error Handling: The error handling for invalid API calls is also not implemented. Currently, it returns the default Express error. This was intentional for this test, but in a real project, proper error handling would need to be implemented. This should be noted in the documentation.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [First Steps](#first-step)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Tests](#tests)
6. [CI / CD](#ci--cd)
7. [API Docs](#api-docs)

## Prerequisites

This project requires the following to be set up and running:

1. **Node.js 20.16.0** or later.

## First Step

1. Duplicate the [.env.example](./.env.example) file and rename it to `.env`. Update the settings or port 3000 will be used as the default.

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Run development:
   ```bash
   npm run dev
   ```

## Technologies Used

> This template follows some clean architecture principles

1. Node.js
2. TypeScript
3. Express
4. Jest and Supertest (for testing)
5. Eslint and Prettier (for code quality)
6. Husky (for running tests and ESLint before commits)

## Project Structure

```bash
.
├── .github
│   └── workflows
│       └── ci-cd.yml
├── .husky
│   └── pre-commit
├── src
│   ├── application
│   │   ├── errors
│   │   │   ├── appError.test.ts
│   │   │   └── appError.ts
│   │   └── use-cases
│   │       └── orders
│   │           ├── createOrder
│   │           │   ├── createOrder.useCase.test.ts
│   │           │   └── createOrder.useCase.ts
│   │           ├── getAllOrders
│   │           │   ├── getAllOrders.useCase.test.ts
│   │           │   └── getAllOrders.useCase.ts
│   │           └── updateOrderStatus
│   │               ├── updateOrderStatus.useCase.test.ts
│   │               └── updateOrderStatus.useCase.ts
│   ├── constants
│   │   └── messages
│   │       └── responseMessages.ts
│   ├── domain
│   │   └── entities
│   │       ├── order
│   │       │   ├── enums
│   │       │   │   ├── item.enum.ts
│   │       │   │   └── order-status.enum.ts
│   │       │   ├── order.test.ts
│   │       │   └── order.ts
│   │       └── repositories
│   │           └── orderRepository.ts
│   ├── infra
│   │   ├── config
│   │   │   └── expressApp.ts
│   │   ├── database
│   │   │   ├── inMemoryOrderRepository.test.ts
│   │   │   └── inMemoryOrderRepository.ts
│   │   ├── http
│   │   │   ├── controllers
│   │   │   │   └── orders.controller.ts
│   │   │   └── routes
│   │   │       └── order.routes.ts
│   │   ├── middlewares
│   │   │   ├── errorHandler.ts
│   │   │   └── errorHandler.test.ts
│   │   └── environment.ts
│   └── shared
│       └── enums
│           └── httpStatus.ts
├── tests
│   ├── integration
│   │   └── api.test.ts
│   └── mocks
│       └── mockOrderRepository.ts
├── .env.example
├── .eslintignore
├── .eslintrc.js
├── .gitignore
├── .nvmrc
├── .prettierrc
├── jest.config.js
├── package-lock.json
├── package.json
└── tsconfig.json
```

## Tests

To run the tests, use the following command:

```bash
npm run test
```

To run the tests with coverage, you can use the following command:

```bash
npm run test:coverage
```

## CI / CD

This project includes a workflow to ensure build, test, and code quality.
Make changes if necessary to this file [ci-cd.yml](./.github/workflows/ci-cd.yml).

The workflow is triggered on pushes or merges to the main and dev branches.

## API Docs

For detailed API documentation, including endpoint descriptions and usage examples, please refer to the Postman collection linked below:

[API Documentation - Postman Collection](https://www.postman.com/blue-shadow-587025/workspace/singu-technical-challenge/collection/11943822-f7370f57-5e05-487e-8b03-3c8e423e66c3?action=share&creator=11943822&active-environment=11943822-649da25e-f797-4eef-973c-c803e35234a3)

This collection provides comprehensive information about the available API endpoints, their parameters, request and response formats, and example usage.
