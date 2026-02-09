# CatalogIQ

CatalogIQ is a production-ready React product catalogue application with a built-in admin analytics dashboard.  
It is designed to demonstrate clean component architecture, derived state management, and data-driven UI patterns commonly used in real-world frontend applications.

🔗 **Live Demo:** https://catalogiq.vercel.app/

---

## What This Project Demonstrates

- Loading and managing product data from a static JSON source (production-safe)
- Rendering a responsive product catalogue using reusable React components
- Category-based filtering and price sorting with derived state
- Pagination with correct UX behavior on filter and sort changes
- An admin dashboard that derives analytics from the same product data
- Clean, incremental Git commit history reflecting real development workflow

---

## Product Catalogue Features

- **Product Grid**
  - Displays a list of products with name, price, rating, and details
  - Responsive layout for mobile, tablet, and desktop

- **Filtering & Sorting**
  - Filter products by category
  - Sort products by price (low → high, high → low)
  - Filtering and sorting are implemented using derived state (no duplicated or hardcoded data)

- **Pagination**
  - Paginated product listing
  - Automatically resets to page 1 when filters or sorting options change (correct UX pattern)

---

## Admin Dashboard

The admin dashboard is built on top of the same product data and simulates internal reporting features:

- Total product metrics
- Category-level distribution insights
- Average pricing calculations
- Simulated live sales updates
- CSV export for analytics and reporting

All analytics are computed dynamically using JavaScript array operations (`map`, `filter`, `reduce`).

---

## Engineering Focus

- Clear separation of concerns between UI, state, and data logic
- Centralized derived product state via a reusable custom hook
- Defensive UI patterns and runtime validation
- Accessibility improvements using semantic HTML and ARIA attributes
- Performance-aware React patterns (`useMemo` for derived data)
- Production-safe asset loading using `PUBLIC_URL`

---

## Tech Stack

- **Frontend:** React (functional components & hooks)
- **State Management:** React hooks with derived state
- **Styling:** CSS Grid, Flexbox
- **Data Handling:** JavaScript array methods
- **Deployment:** Vercel
- **Version Control:** Git & GitHub

---

## Local Development

```bash
npm install
npm start

```
The application will be available at http://localhost:3000.
---



## Project Status

- Feature complete
- Deployed and production-tested
- Documentation aligned with visible functionality

This project is intentionally frontend-focused and does not include a backend API.

## Author

**Jeswanth John**

Frontend-focused Full Stack Developer with hands-on experience in React, state-heavy UI development, and data-driven dashboards.  
Comfortable building end-to-end applications, with this project intentionally scoped to the frontend to demonstrate React architecture, derived state management, and analytics-oriented UI design.

GitHub: https://github.com/jeswanthjohn
