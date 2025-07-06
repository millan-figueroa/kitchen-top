# Kitchen Top

An app that takes ingredients you have on hand and makes a recipe from it.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [API Routes](#api-routes)
- [Tech Stack](#tech-stack)
- [Learn More](#learn-more)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

**Kitchen Top** is a web application built with [Next.js](https://nextjs.org), designed to help you find recipes based on the ingredients you have at home. Simply enter your available ingredients, and Kitchen Top will suggest recipes you can make.

## Features

- Input ingredients you have on hand
- Get recipe suggestions based on available ingredients
- Fast, responsive interface
- Built with TypeScript and Next.js
- Leverages a machine learning model (mistralai/Mistral-7B-Instruct-v0.3) from Hugging Face to generate recipe suggestions
- Easily extensible and deployable

## Getting Started

To set up and run the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/millan-figueroa/kitchen-top.git
   cd kitchen-top
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Edit `pages/index.tsx` to customize the main page.
- The app updates automatically as you save changes.

## API Routes

- API routes are located in the `pages/api` directory.
- Example endpoint: [http://localhost:3000/api/hello](http://localhost:3000/api/hello)
- You can add custom API endpoints as needed.

---

## Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Tailwind CSS](https://tailwindcss.com/) – utility-first CSS framework
- [Hugging Face](https://huggingface.co/) – for AI/ML model integration
- [Shell Scripts](https://www.gnu.org/software/bash/)
- [Geist Font](https://vercel.com/font) via `next/font`

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn-pages-router)
- [Next.js GitHub](https://github.com/vercel/next.js)

## Deployment

The easiest way to deploy your Next.js app is via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more deployment options, see the [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying).

## License

This project is licensed under the [MIT License](LICENSE).

---
