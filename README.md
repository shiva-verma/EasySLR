# TaskManagementApp

TaskManagementApp is a comprehensive task management platform designed to streamline project management activities, from task creation to tracking and assignment. Built with the T3 stack, this application integrates a modern frontend built with Next.js and Tailwind CSS, a serverless backend powered by SST on AWS, and a robust database using Supabase.

![Project Diagram](https://i.postimg.cc/8c5FDRhs/Image-25-08-24-at-12-52-AM.jpg)

## Features

### 1. Task Management Interface

- **Task Creation:** Easily create tasks with detailed descriptions.
- **Assignment:** Assign tasks to team members, set deadlines, and prioritize with tags.
- **Tracking:** Monitor task progress and ensure timely completion.
![Project Main](https://i.postimg.cc/QM9Bk9GT/Image-25-08-24-at-8-33-PM.jpg)
![Task Creation](https://i.postimg.cc/QCBnjJRM/Image-25-08-24-at-8-40-PM.jpg)
![Project Task](https://i.postimg.cc/t4PQ3pvg/Image-25-08-24-at-8-31-PM.jpg)

### 2. User Profile and Project Settings

- **User Profile:** Allows team members to manage their personal information and preferences.
- **Project Settings:** Customize project-specific settings to suit team needs.
![Profile Settings](https://i.postimg.cc/HLDJzWpv/Image-25-08-24-at-8-56-PM.jpg)

## Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** SST (Serverless Stack) on AWS
- **Database:** Supabase with Prisma ORM
- **Authentication:** Supabase Authentication
- **Testing:** Cypress for Unit testing

## Installation

### Prerequisites

- **Node.js** (v14 or later) installed on your local machine.
- **npm** (Node Package Manager) or **Yarn**.

### Clone the Repository

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ankitjha2202/task_management_tool.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd task_management_tool
    ```

### Set Up Environment Variables

1. **Create a `.env` file in the root directory.**

2. **Add your Supabase, AWS, and Prisma database credentials to the `.env` file:**
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
    AWS_ACCESS_KEY_ID=your-access-key-id
    AWS_SECRET_ACCESS_KEY=your-secret-access-key
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    ```

### Install Dependencies

1. **Install the necessary dependencies:**
    ```bash
    npm install
    ```
    or, if using Yarn:
    ```bash
    yarn install
    ```

### Set Up Prisma

1. **Initialize Prisma:**
    ```bash
    npx prisma init
    ```

2. **Migrate the Database:**
    Run the migration to set up the database schema:
    ```bash
    npx prisma migrate dev --name init
    ```

3. **Generate Prisma Client:**
    Generate the Prisma client to interact with the database:
    ```bash
    npx prisma generate
    ```

### Run the Development Server

1. **Start the development server:**
    ```bash
    npm run dev
    ```
    or, if using Yarn:
    ```bash
    yarn dev
    ```

2. **Access the application:**
    Open `http://localhost:3000` in your browser.

## Deployed Site

The application is deployed using AWS and SST. You can access the live version of the application at [https://d1mz4vajeg025u.cloudfront.net/](https://d1mz4vajeg025u.cloudfront.net/).

## Testing with Cypress

Cypress is used for end-to-end testing in this project. In addition to testing the main user interface, I have also added tests for utility functions found in the `appUtils` folder.

### Tests for `appUtils`

The `appUtils` folder contains important utility functions like `showSuccess` and `showError`. These functions are used to display success and error messages throughout the application. Here’s how you can run the tests:

### Install Cypress

1. **Install Cypress as a development dependency:**
    ```bash
    npm install cypress --save-dev
    ```
    or, if using Yarn:
    ```bash
    yarn add cypress --dev
    ```

### Run Cypress Tests

1. **Open Cypress Test Runner:**
    ```bash
    npx cypress open
    ```

2. **Run all tests:**
    The Test Runner will display all available tests, including those for the `appUtils` functions. Click on any test to run it.
