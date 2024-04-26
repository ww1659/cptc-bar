## Hello!

Welcome to this repo. This project is the first I have attempted with Next.js, using the in-built API routes for backend integration.

The project is currently deployed here: https://cptc-bar.vercel.app/

This is a development environment, but this project is running in production and is currently live.

## Features

There is always more to be done, but as of now some of the main aspects of this project are:

- Authentication with Clerk
- Build an order and generate a sale
- View and update Stock List (must be signed in as Admin)
- Export Sales as a CSV (must be signed in as Admin)
- Built in CRUD endpoints for sales, stock, drinks
- Generally styled with Shadcn UI

This is a work in progress! At the moment, my focus is on functionality and there is a long list of ToDos:

- General Styling
- Generating a Sales CSV automatically and sending an email to Admin
- Integrating a payment portal in this app
- Testing (frontend and backend)
- Error Handling
- Managing Loading States more gracefully
- More useability (additional API endpoints for updating stock and sales)

## Getting Started

If you want to run this yourself, firstly, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

And the open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
