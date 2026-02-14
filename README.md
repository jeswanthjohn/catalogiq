# CatalogIQ

CatalogIQ is a production‑ready React product catalogue application with a built‑in admin analytics dashboard.

It demonstrates scalable derived state management, performance‑aware rendering, runtime resilience, and business‑metric computation patterns commonly used in real‑world frontend systems.

🔗 **Live Demo:** [https://catalogiq.vercel.app/](https://catalogiq.vercel.app/)

---

## Overview

CatalogIQ simulates a real‑world e‑commerce frontend built with clean architecture principles and intentional separation of concerns. The project focuses on predictable state management, performance optimization, and production‑grade UI resilience.

The application loads product data from a static JSON source and derives all user‑facing and administrative insights from that single source of truth.

---

## Product Catalogue

### Product Grid

- Displays products with name, price, rating, and metadata  
- Fully responsive layout using CSS Grid and Flexbox  
- Semantic HTML for accessibility  

### Filtering and Sorting

- Filter products by category  
- Sort products by price (low to high and high to low)  
- Filtering and sorting implemented using derived state  
- No duplicated or redundant state storage  

### Pagination

- Paginated product listing  
- Automatically resets to page one when filters or sorting change  
- Prevents stale pagination state  

All product derivation logic is centralized inside:

`src/hooks/useProducts.js`

This ensures predictable rendering and scalability.

---

## Admin Dashboard

The admin dashboard is built on top of the same product dataset and simulates internal reporting tools used by business teams.

It includes:

- Total product count  
- Total revenue calculation  
- Average rating computation  
- Simulated live sales updates  
- CSV export for reporting  
- Defensive empty‑state handling  

All analytics are computed through a centralized pure utility:

`src/utils/analytics.js`

Business logic is intentionally separated from UI components.

---

## Engineering Approach

### Derived State Architecture

Filtered and sorted products are computed rather than stored.

Key principle:

> Compute derived data, do not store redundant state.

This prevents stale UI, improves maintainability, and scales cleanly to larger datasets.

---

### Performance Optimization

Memoization using `useMemo` is applied to:

- Product derivation  
- Analytics aggregation  

This prevents unnecessary recalculation during re‑renders and ensures efficient updates even with large product collections.

---

### Runtime Resilience

The application includes a React `ErrorBoundary` that isolates rendering failures.

If a component fails, the rest of the application remains functional. This mirrors production‑grade frontend resilience patterns.

---

### Testing Strategy

Business logic is unit‑tested.

Test files are located in:

`src/__tests__/`

Coverage includes:

- Category filtering  
- Price sorting  
- Revenue calculation  
- Average rating calculation  
- Edge case handling  

Tests validate business logic independently from UI rendering.

Run tests with:

```bash
npm test

```
---

## Project Structure

```src/
  
    components/        # UI components

    hooks/             # Derived state logic

    utils/             # Pure business logic utilities

    __tests__/         # Unit tests

    App.js
  
    ARCHITECTURE.md
```

- Separation of concerns is strictly maintained:

  -  Components handle rendering

  - Hooks manage derived state

  - Utilities compute business metrics

  - Tests validate logic

## Tech Stack

- React (functional components and hooks)

- Derived state via custom hooks

- Memoization using useMemo

- Jest and React Testing Library

- CSS Grid and Flexbox

- JavaScript array methods (map, filter, reduce)

- Vercel deployment

- Git and GitHub

## Local Development
Install dependencies:

```bash
npm install

```
Start development server:

```bash
npm start
Application runs at:

http://localhost:3000

Run test suite:
```

```bash
npm test
```

## Deployment
- The project is deployed on Vercel.

- Pushes to the main branch automatically trigger production builds.

## Project Status
- Feature complete
- Production‑tested
- Performance optimized
- Runtime resilient
- Unit‑tested
- Fully deployed
- This project is intentionally frontend‑focused and does not include a backend API. It is designed to demonstrate advanced React architecture and state‑heavy UI patterns prior to fullstack integration.

## Author
**Jeswanth Reddy B.** 

Frontend‑focused Full Stack Developer with hands‑on experience in React, state‑heavy UI development, performance optimization, and analytics‑driven dashboards.

GitHub: https://github.com/jeswanthjohn


