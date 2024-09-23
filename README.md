# Quickbet Movies

Quickbet Movies is a Next.js application that allows users to search and filter movies by genre, view ratings, trailers, and additional information. The application is fully responsive and supports both dark and light modes.

## Features

- **Dark/Light Mode**: Toggle between dark and light viewing modes.
- **Responsive Design**: Adapts to different screen sizes.
- **Search Filter**: Search for movies by name and filter by genre.
- **Detailed Information**: View trailers and additional information for each movie.
- **Error Handling**: Manage errors in case the TMDB API fails or no results are found.
- **Dynamic Image Loader**: Displays a loader while images are loading and handles loading errors.
- **Incremental Static Generation (ISG)**: Generates static HTML pages for each movie, regenerating them every 2 days.

## Installation

1. Install `pnpm` using `npm`:

   ```bash
   npm install -g pnpm
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure the TMDB API key:
   - Create a `.env` file in the root of the project.
   - Add the following line with your TMDB API key:
     ```env
     NEXT_PUBLIC_API_KEY_TMDB=YOUR_API_KEY
     ```
   - You can obtain your API key by creating an account on [TMDB](https://www.themoviedb.org/signup) and then accessing the API section at TMDB API.

## Usage

- Start the application in development mode:

  ```bash
  pnpm dev
  ```

- Build the application for production:

  ```bash
  pnpm build
  ```

- Start the application in production mode:
  ```bash
  pnpm start
  ```

## Tools

- **Next.js**
- **React**
- **TypeScript**
- **React Icons**
- **Sharp**

## Website Preview

You can visit the live site to explore all the features and functionalities of Quickbet Movies:

[Quickbet Movies](https://quickbet-movies.vercel.app)
