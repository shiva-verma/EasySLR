# Task Management Tool

A modern, full-stack task management application built with Next.js, TypeScript, and Prisma.

## 🚀 Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma with PostgreSQL
- **Authentication**: Supabase Auth
- **State Management**: React Query
- **API Layer**: tRPC
- **Testing**: Cypress
- **Deployment**: SST (Serverless Stack)
- **Code Quality**: ESLint, Prettier

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v10.2.4 or higher)
- PostgreSQL
- Git

## 🛠️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task_management_tool
   ```

2. **Install dependencies**
   ```bash
   cd app
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `app` directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/task_management"
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up the database**
   ```bash
   # Start the database (if using the provided script)
   ./start-database.sh

   # Generate Prisma client
   npm run db:generate

   # Run database migrations
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🎯 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run db:studio` - Open Prisma Studio to manage database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database

## 🧪 Testing

The project uses Cypress for end-to-end testing. To run tests:

```bash
npm run cypress:open  # Opens Cypress test runner
```

## 📁 Project Structure

```
task_management_tool/
├── app/
│   ├── src/           # Source code
│   ├── public/        # Static files
│   ├── prisma/        # Database schema and migrations
│   ├── cypress/       # E2E tests
│   └── appUtils/      # Utility functions
```

## 🔧 Development Tools

- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Database ORM
- **tRPC**: Type-safe API layer
- **React Query**: Data fetching and caching
- **Supabase**: Authentication and real-time features