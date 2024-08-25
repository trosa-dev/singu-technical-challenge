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

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [First Steps](#first-step)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)

5. [Development Local](#development-local)
   - [Node Env](#node-environment-node-18)
6. [Tests](#tests)
   - [Unit Test](#unit-test)
   - [E2E Test](#e2e-test)
7. [CI / CD](#ci--cd)
8. [API Docs](#api-docs)

## Prerequisites

This project requires the following to be set up and running:

1. **Node.js 20.16.0** or later.

## First Step

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

Duplicate the [.env.sample](./.env.example) file and rename it to .env. Update the settings or port 3000 will be used as the default.

Run development:

```bash
npm run dev
```

## Tests

```bash
npm run test
```

## CI / CD

This project includes a workflow to ensure build, test, and code quality.
Make changes if necessary to this file [ci-cd.yml](./.github/workflows/ci-cd.yml).

The workflow is triggered on pushes or merges to the main and dev branches.
