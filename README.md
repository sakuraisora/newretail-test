# NewRetail Item Catalog

A React + TypeScript application that demonstrates a responsive product catalog with advanced filtering, sorting, and pagination capabilities.

## Features

- **Data Handling**: Manages a large dataset (10,000 items) with efficient filtering and pagination
- **Advanced Filtering**:
  - Text search by product name
  - Multi-select category filtering
  - Price range filtering
  - In-stock status filtering
- **Sorting**: Sort products by price (ascending or descending)
- **Pagination**: Navigate through large sets of filtered results
- **Responsive Design**:
  - Desktop: Table view with columns for product attributes
  - Mobile: Card view with responsive grid layout

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- TailwindCSS for styling
- Custom UI components

## Getting Started

### Prerequisites

- Node.js (latest LTS recommended)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [<repository-url>](https://github.com/sakuraisora/newretail-test.git)
cd newretail-test
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser to `http://localhost:5173` (or the URL shown in your terminal)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production-ready application
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally
- `npm run format` - Format code using Prettier

## Project Structure

```
newretail-test/
├── mockData/                   # Mock data for the application
│   └── items.json              # 10,000 product items data
├── src/
│   ├── components/             # React components
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── input.tsx       # Input component
│   │   │   └── table.tsx       # Table component
│   │   ├── CategoryFilter.tsx  # Category filter component
│   │   ├── ItemCards.tsx       # Mobile product card view
│   │   ├── ItemTable.tsx       # Desktop product table view
│   │   ├── Pagination.tsx      # Pagination controls
│   │   ├── PriceRangeFilter.tsx # Price range filter
│   │   ├── SortControl.tsx     # Sort options component
│   │   └── StockFilter.tsx     # Stock filter component
│   ├── interface/              # TypeScript interfaces
│   │   └── item.interface.ts   # Item data interface
│   ├── lib/                    # Utility functions and business logic
│   │   ├── filterReducer.ts    # Filter state reducer
│   │   └── utils.ts            # General utility functions
│   ├── App.tsx                 # Main application component
│   ├── index.css               # Global CSS styles
│   ├── main.tsx                # Application entry point
│   └── vite-env.d.ts           # Vite environment types
├── components.json             # UI component configuration
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Project dependencies and scripts
├── tsconfig.app.json           # TypeScript configuration for app
├── tsconfig.json               # Main TypeScript configuration
├── tsconfig.node.json          # TypeScript config for Node.js
└── vite.config.ts              # Vite build configuration
```

## Performance Considerations

This application demonstrates efficient handling of large datasets through:
- Pagination for limiting rendered items
- Memoization of filtered results
- Responsive design for various screen sizes
- Optimized rendering with React memo
