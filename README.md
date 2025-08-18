# Kinetic Inventory

Inventory management system for mechanical workshops developed with Angular 14.

## 🚀 Installation and Setup

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (included with Node.js)
- **Angular CLI** (version 14 or higher)

### Dependencies Installation

```bash
# Clone the repository
git clone https://github.com/BraianRosales/kinetic-inventario.git
cd kinetic-inventario

# Install project dependencies
npm install
```

## 🏃‍♂️ Project Execution

```bash
# Start the project
npm run start

# The project will be available at: http://localhost:4200
# The application will automatically reload when you make changes
```

## 🧪 Testing and Coverage

### Run unit tests and coverage

```bash
# Run tests with coverage
npm run test --code-coverage

# Coverage report will be generated in: coverage/
# Open kinetic-inventario/coverage/index.html in browser to see detailed report
```

## 📋 Implemented Features

### ✅ **1. Main Dashboard**
- **Summary view with key indicators:**
  - Total products in inventory
  - Products with low stock (less than 5 units)
  - Total inventory value calculated automatically
- **Product list with pagination** using Angular Material
- **Informative banner** with minimalist industrial design
- **Statistics cards** with icons and gradients

### ✅ **2. Product Management**
- **Product creation** through modal dialog
- **Product editing** of existing items
- **Product deletion** with confirmation
- **Product form with complete validations:**
  - Name (required)
  - Description
  - Price (numeric, required)
  - Stock (numeric, required)
  - Categories (multiple selection)
- **Detailed product view** with complete information
- **Movement history** (structure prepared)

### ✅ **3. Categorization**
- **Filtering by product categories**
- **Tree view of categories** and subcategories
- **Assignment of products to multiple categories**
- **Hierarchical navigation** in sidebar
- **Dynamic filters** in real time

### ✅ **4. State with NgRx**
- **Complete store** implemented with NgRx
- **Actions, Reducers and Effects** for products
- **Loading, success and error states** handled
- **Optimized selectors** for frequent queries
- **DevTools** configured for debugging
- **Basic state persistence**

### ✅ **5. Responsive Design**
- **Works perfectly on mobile and desktop**
- **Optimized breakpoints** for different devices
- **Collapsible sidebar** on mobile
- **Responsive table** with horizontal scroll
- **Floating buttons** adapted for mobile

### ✅ **6. UI Components**
- **Angular Material** as UI framework
- **Custom components:**
  - Kinetic Table (table with actions)
  - Category Tree (category tree)
  - Add Product Dialog (creation modal)
  - Confirm Dialog (confirmations)
- **Consistent iconography** with Material Icons
- **Industrial theme** with professional gray colors

### ✅ **7. Testing**
- **Unit tests** implemented
- **Code coverage** configured
- **Service tests** (Product Service, Category Service)
- **Main component tests**
- **NgRx tests** (Actions, Reducers, Selectors)

### ✅ **8. Additional Features**
- **Well-structured modular architecture**
- **TypeScript strict mode** enabled
- **Code linting and formatting**
- **Conventional Commits** for versioning
- **Complete technical documentation**

## 📸 Screenshots

### Main Dashboard
![Main Dashboard showing inventory management banner and key indicators](/docs/images/dashboard-main.png)
*General view of the control panel showing the inventory management banner, key indicators (Total Products: 10, Low Stock: 5, Total Value: $280,300.00) and the product list.*

### Product List
![Product list section with detailed cards and actions](/docs/images/product-list.png)
*Product list section with detailed cards showing information such as brand, available stock, price, location and categories. Includes view, edit and delete actions.*

### Complete Dashboard
![Complete dashboard with sidebar, header and product table](/docs/images/dashboard-complete.png)
*Complete dashboard view with category sidebar, user profile header, main banner, statistics cards and product table with pagination.*

### Data Analysis
![Data analysis panel with charts and movement history](/docs/images/data-analysis.png)
*Analysis panel with stock evolution charts and movements by type, plus transaction history showing inventory entries and exits.*

### Add Product Modal
![Add product modal form with all required fields](/docs/images/add-product-modal.png)
*Modal form for adding new products with all required fields: name, description, price, stock, brand, location and categories.*

## 📊 Test Coverage Report

### Coverage Summary
![Test coverage report showing excellent code coverage](/docs/images/test-coverage.png)
*Detailed code coverage report showing:*
- **Statements:** 95.55% (344/360)
- **Branches:** 92.53% (62/67)
- **Functions:** 91.5% (140/153)
- **Lines:** 95.65% (330/345)

*Excellent coverage in all main project modules.*

## 📁 Project Structure

```
src/
├── app/
│   ├── core/           # Services, models and interfaces
│   ├── pages/          # Page components
│   ├── shared/         # Shared components
│   └── store/          # Global state (NgRx)
├── assets/             # Static resources
├── environments/       # Environment configurations
└── scss/              # Global variables and styles
```

## 🎨 Features

- **Responsive design** for desktop and mobile
- **Industrial theme** with professional gray colors
- **Complete inventory management**
- **Product categorization**
- **Low stock alerts**
- **Intuitive interface** for mechanical workshops

## 🔧 Technologies Used

- **Angular 14**
- **Angular Material**
- **NgRx** (Global state)
- **SCSS** (Styles)
- **Karma & Jasmine** (Testing)
