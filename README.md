# Music Library with Micro Frontend Architecture

## Overview

This project is a React-based music library application built with a micro frontend architecture. It allows users to view, filter, sort, and group a collection of songs by album, artist, or title. The app implements role-based authentication and authorization using JSON Web Tokens (JWT) with two roles: **admin** and **user**.

The architecture separates the core application from the music library micro frontend, demonstrating dynamic integration using **Vite** with a compatible micro frontend solution.

## Features

- View a collection of songs grouped, filtered, or sorted by album, artist, or title.
- Role-based access control:
  - **Admin**: Can add or remove songs and access all features.
  - **User**: Can only view and filter the music library.
- Dynamic loading of the music library micro frontend.
- State management with React hooks (`useState`, `contextAPI`).
- JavaScript array methods (`map`, `filter`, `reduce`) used for collection manipulation.
- Unit tests covering core functionalities with over 80% code coverage.
- Lazy loading of micro frontend for performance optimization.

## Tech Stack

- React (functional components with hooks)
- Vite as build tool and bundler
- Vitest & Testing Library for unit testing
- CSS and Bootstrap for styling
- In-memory JWT for authentication & authorization

## Installation and Running the Project

1. Clone the repository:  
   git clone https://github.com/Prajwal-Mogaveera/Music-hub.git  
   cd music-library-mf

2. Install dependencies:  
   npm install

3. Run micro app:  
   npm run preview

4. Open new terminal, go to core-app and install dependencies:  
   cd core-app  
   npm install

5. Run the core-app(host app):  
   npm run dev

## Running Tests and Viewing Coverage

1. Run test:  
   npm run test

2. View test coverage:  
   npm run coverage

## Credentials to login as admin and user

1. Admin:  
   Email: admin@gmail.com  
   Password: admin123
2. User:  
   Email:user@gmail.com  
   Password: user123  
   Above are the credentials that can be used to login as admin or user, the details are stored in-memory /utils/userInfo.ts

## Key Design Decisions and Trade-offs

- Micro Frontend Integration: Chose Vite due to its fast build times and modern developer experience. Used a Vite-compatible micro frontend integration method to dynamically load the music library frontend.

- State Management: Used React’s built-in hooks (useState) and contextApi to keep dependencies minimal and maintain simplicity.

- Authentication: Implemented a simple in-memory JWT system for demonstration.

- Performance: Implemented lazy loading of micro frontend components to reduce initial bundle size and improve load times.

- Testing: Used Vitest combined with Testing Library for unit testing, focusing on core functionalities to achieve over 80% coverage.
