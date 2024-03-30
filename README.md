# Food Delivery Backend API

This is a backend API built with Express, Prisma, and TypeScript. It also includes Swagger documentation for the available endpoints.

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/sd1p/Food-Delivery-Backend-Assignment.git
    ```

2. Install the dependencies:

    ```bash
    pnpm install
    ```

3. Create a `.env` file in the root directory of the project and add the following environment variables:

    ```dotenv
    # Postgres database url
    DIRECT_URL="postgres://postgres.czgzccxpnvpwuccicxtj:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"
    # Deployment api for swagger docs
    API_URL="https://food-delivery-backend-assignment.onrender.com"
    ```

4. Generate Prisma client:

    ```bash
    npx prisma generate
    ```

5. Start the development server:

    ```bash
    pnpm run dev
    ```

    This will start the server and you can access it at `http://localhost:4000`.

## API Documentation

The API documentation is generated using Swagger. And can accessed at [`https://food-delivery-backend-assignment.onrender.com/api-docs`](https://food-delivery-backend-assignment.onrender.com/api-docs).
