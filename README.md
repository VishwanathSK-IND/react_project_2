# React + Vite

This project is an e-commerce product explorer and cart management application built with React and Vite.

It showcases a full shopping workflow where users can browse a catalog of products, search by keyword, filter by category and price, add items to the cart, and maintain a wishlist.

The app emphasizes modern front-end practices: reusable components, context-driven state management, custom hooks, and responsive UI design. It is ideal for learning how to build a polished online store experience without a backend.

Features:

- Responsive product grid with interactive product cards.
- Search functionality with debounced input for better performance.
- Filters for categories, ratings, and price ranges.
- Cart management with add/remove actions and quantity controls.
- Wishlist support for saving favorite products.
- Checkout-style review page with order totals and item summaries.

Primary project uses:

- Prototyping e-commerce interfaces and shopping flows.
- Demonstrating React context, hooks, and component composition.
- Practicing product search, filtering, and cart state handling.
- Creating a modular codebase with pages, components, utilities, and services.

This template also includes a minimal React + Vite setup with HMR and ESLint for a smooth development workflow.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
