# Hardware Management System - Frontend

A modern React-based frontend for the Hardware Order Management System. Built with React 18, Tailwind CSS, and Axios for seamless integration with the Spring Boot backend.

## 📋 Overview

This is the frontend application for managing hardware products and orders. It provides a user-friendly dashboard with tabbed interface for effortless product and order management. The frontend communicates with the Spring Boot backend API deployed on Render.

## ✨ Features

- ✅ **Product Management** - View, create, update, and delete products
- ✅ **Order Management** - Manage orders with different status types (Pending, Processing, Shipped, Delivered)
- ✅ **Responsive Design** - Mobile-friendly interface using Tailwind CSS
- ✅ **Tabbed Dashboard** - Organized interface with separate tabs for products and orders
- ✅ **Real-time API Integration** - Seamless communication with backend services
- ✅ **Form Validation** - Client-side validation for data integrity
- ✅ **Modern UI Components** - Clean and intuitive user interface

## 🛠️ Technology Stack

| Layer | Technologies |
|-------|--------------|
| **Framework** | React 18.2.0 |
| **Routing** | React Router v6.20.0 |
| **Styling** | Tailwind CSS 3.3.0 |
| **HTTP Client** | Axios 1.6.0 |
| **Build Tool** | React Scripts 5.0.1 |
| **CSS Processing** | PostCSS, Autoprefixer |

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html                 # HTML entry point
├── src/
│   ├── App.js                     # Main App component
│   ├── index.js                   # React root
│   ├── index.css                  # Global styles
│   ├── components/
│   │   ├── OrderForm.js           # Order creation form
│   │   ├── OrderList.js           # Order listing component
│   │   ├── ProductForm.js         # Product creation form
│   │   ├── ProductList.js         # Product listing component
│   │   └── Sidebar.js             # Navigation sidebar
│   ├── pages/
│   │   └── Dashboard.js           # Main dashboard page
│   └── services/
│       └── api.js                 # Axios API configuration
├── tailwind.config.js             # Tailwind CSS config
├── postcss.config.js              # PostCSS config
├── sonar-project.properties       # SonarQube configuration
├── .env                           # Environment variables
└── package.json                   # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/3BCADevops34/ordermanage_frontend.git
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create or update `.env` file with the backend URL:
```env
REACT_APP_API_BASE_URL=https://hardware-management-2-0.onrender.com
```

### Running the Application

**Development mode:**
```bash
npm start
```
The app will open at `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

**Run tests:**
```bash
npm test
```

## 📊 API Integration

The frontend communicates with the backend API endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Fetch all products |
| `/api/products` | POST | Create new product |
| `/api/products/{id}` | GET | Fetch product by ID |
| `/api/products/{id}` | PUT | Update product |
| `/api/products/{id}` | DELETE | Delete product |
| `/api/orders` | GET | Fetch all orders |
| `/api/orders` | POST | Create new order |
| `/api/orders/{id}` | GET | Fetch order by ID |
| `/api/orders/{id}` | PUT | Update order |
| `/api/orders/{id}` | DELETE | Delete order |

**Base URL:** `https://hardware-management-2-0.onrender.com`

## 🔍 Code Quality & CI/CD

### SonarQube Analysis

This project uses SonarQube Cloud for continuous code quality analysis.

**Configuration:**
- Project Key: `3BCADevops34_ordermanage_frontend`
- Organization: `3bcadevops34`
- See [sonar-project.properties](./sonar-project.properties) for details

### GitHub Actions Workflow

Automated CI/CD pipeline runs on:
- **Triggers:** Push to main branch and Pull Requests
- **Analysis:** SonarQube Cloud scan
- **Configuration:** [.github/workflows/build.yml](./.github/workflows/build.yml)

#### crud operations

![added products](./screenshots/Screenshot%20(243).png)

All pull requests are analyzed for code quality before merging.

#### ordered products

![ordered successfully](./screenshots/Screenshot%20(244).png)


#### crud operation

![deleted product](./screenshots/Screenshot%20(245).png)

#### Build Configuration

![Vercel Build Setup](./screenshots/Screenshot%20(258).png)

#### SonarQube

![SonarQube](./screenshots/Screenshot%20(259).png)

#### Pull request

![Pull Request](./screenshots/Screenshot%20(260).png)

**Deployment Link:** https://ordermanage-frontend.vercel.app

## 📈 Key Components

### Dashboard
The main page featuring a tabbed interface with:
- **Products Tab** - Manage all hardware products
- **Orders Tab** - Manage all customer orders

### Product Management
- View all products in a table format
- Add new products with form validation
- Edit existing product details
- Delete products with confirmation

### Order Management
- View all orders with status tracking
- Create new orders linked to products
- Update order status (Pending → Processing → Shipped → Delivered)
- Delete orders

### Sidebar Navigation
Quick navigation and application branding

## 🔐 Environment Configuration

The project uses environment variables for flexible configuration:

```env
# Backend API Base URL
REACT_APP_API_BASE_URL=https://hardware-management-2-0.onrender.com
```

## 📦 Build Optimization

The production build is optimized with:
- Code splitting
- Minification
- Tree shaking
- CSS purging with Tailwind

## 🔧 Development

### ESLint Configuration
```json
{
  "extends": ["react-app"]
}
```

### Tailwind CSS Features
- Utility-first framework
- Auto-prefixing
- PostCSS integration
- Responsive design

## 🚢 Deployment Steps

1. **Push to repository**
   ```bash
   git push origin main
   ```

2. **GitHub Actions triggers** SonarQube analysis and code quality checks

3. **Vercel automatically deploys** on successful checks

4. **Application is live** at https://ordermanage-frontend.vercel.app

## 📝 Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run test suite |
| `npm run eject` | Eject from Create React App |

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend URL is correctly set in `.env`

### Build Failures
Run `npm install` again to ensure all dependencies are properly installed

### Port Already in Use
Change the port: `PORT=3001 npm start`

## 📞 Support

For issues or questions:
1. Check the [main repository README](../README.md)
2. Review the backend API documentation
3. Check GitHub issues

## 📄 License

This project is part of the Hardware Order Management System.

---

**Last Updated:** February 7, 2026  
**Status:** ✅ Production Ready  
**Deployed:** Vercel  
**Code Quality:** Continuously analyzed by SonarQube Cloud
