# Product Catalog – Architecture Overview

## Data Flow

- products.json → productService
- UI consumes data via services/hooks
- No direct file access inside components

## Key Decisions

- Custom hooks for reusable logic
- Service layer to simulate real API usage
- Admin dashboard separated from user UI

## Scalability

- Can replace productService with real API
- Admin dashboard can be role-protected later
