# A modern, full-stack e-commerce application for Mark Light Ltd products built with React, Node.js, Express, and MongoDB.

# Mark Light Ltd E-commerce Platform

## 🚀 Features

### Frontend (React + Vite)
- **Modern Design**: Beautiful, responsive UI with Tailwind CSS
- **Dark Mode**: Persistent dark/light theme toggle
- **Shopping Cart**: Full cart functionality with localStorage persistence
- **Product Catalog**: Advanced search, filtering, and sorting
- **Authentication**: Secure login/register with JWT tokens
- **Admin Panel**: Comprehensive product management interface
- **Responsive**: Optimized for desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and states
- **Error Handling**: User-friendly error messages and validation

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Clean, well-structured API endpoints
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Authorization**: Role-based access control (admin/user)
- **Data Validation**: Comprehensive input validation and sanitization
- **Error Handling**: Robust error handling with proper HTTP status codes
- **Database**: MongoDB with Mongoose ODM
- **Email Service**: Nodemailer integration for notifications (optional)
- **Security**: CORS configuration, password hashing, JWT tokens

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Context API** - State management for auth and cart

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending service
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd mark-light-ltd
```

### 2. Backend Setup
```bash
cd server
npm install

# Create .env file (already exists with defaults)
# Update MONGO_URI if needed

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install

# Create .env file (already exists)
# Start the development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

## 🔐 Demo Accounts

### Admin Account
- **Username**: admin
- **Email**: admin@luxury.com
- **Password**: asdasd
- **Permissions**: Full admin access, product management

### Regular User Account
- **Email**: user@luxury.com
- **Password**: password123
- **Permissions**: Standard user access, shopping cart

## 📁 Project Structure

```
luxury-lighting/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React contexts (Auth, Cart)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── public/             # Static assets
│   └── ...
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API route handlers
│   ├── utils/              # Utility functions
│   ├── scripts/            # Database seeding scripts
│   └── ...
└── README.md
```
```
mark-light-ltd/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React contexts (Auth, Cart)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   └── ...
│   ├── public/             # Static assets
│   └── ...
├── server/                 # Node.js backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API route handlers
│   ├── utils/              # Utility functions
│   ├── scripts/            # Database seeding scripts
│   └── ...
└── README.md
```

## 🎨 Design Features

### UI/UX Improvements
- **Modern Gradient Effects**: Subtle gradients and shadows
- **Smooth Animations**: Hover effects and transitions
- **Responsive Grid Layout**: Adapts to different screen sizes
- **Clean Typography**: Readable fonts and proper spacing
- **Loading States**: Skeleton loaders and spinners
- **Empty States**: Informative messages for empty lists
- **Error States**: User-friendly error messages

### Color Scheme
- **Primary**: Yellow/Gold (#F59E0B, #D97706)
- **Backgrounds**: White/Gray-50 (light), Gray-900 (dark)
- **Text**: Gray-900 (light), White (dark)
- **Accents**: Blue, Green, Red for various states

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `POST /api/admin/products` - Create product (admin)
- `PUT /api/admin/products/:id` - Update product (admin)
- `DELETE /api/admin/products/:id` - Delete product (admin)

### Orders
- `GET /api/admin/orders` - Get all orders (admin)
- `PUT /api/admin/orders/:id/status` - Update order status (admin)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `POST /api/admin/notify` - Send email notification

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Input Validation**: Server-side validation for all inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Environment Variables**: Sensitive data stored in .env files
- **Role-Based Access**: Admin-only routes protection

## 🚀 Deployment

### Environment Variables

#### Server (.env)
```env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb://localhost:27017/mark-light-ltd
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@luxury.com
CORS_ORIGIN=http://localhost:5173
```

#### Client (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

### Build for Production
```bash
# Build frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

## 🎯 Recent Improvements

### Frontend Enhancements
1. **Modern Layout**: Redesigned navigation with sticky header
2. **Shopping Cart**: Full cart functionality with add/remove/clear
3. **Product Cards**: Enhanced with hover effects and loading states
4. **Search & Filter**: Advanced product filtering and sorting
5. **Authentication UI**: Modern login/register forms with validation
6. **Admin Dashboard**: Comprehensive product management interface
7. **Dark Mode**: Persistent theme toggle with localStorage
8. **Responsive Design**: Mobile-first responsive layout
9. **Error Handling**: User-friendly error messages and states
10. **Loading States**: Smooth loading animations throughout

### Backend Enhancements
1. **Enhanced Models**: Added timestamps and validation
2. **Improved Authentication**: Better error handling and validation
3. **Admin Routes**: Enhanced with proper error handling
4. **Data Seeding**: Sample data for quick setup
5. **Security**: Enhanced password hashing and JWT handling
6. **API Structure**: Clean, RESTful API design
7. **Error Handling**: Comprehensive error responses
8. **Validation**: Server-side input validation

### Bug Fixes
1. **React Imports**: Fixed missing React imports in components
2. **Dark Mode**: Fixed theme persistence and application
3. **Authentication**: Improved token handling and validation
4. **API Errors**: Better error handling and user feedback
5. **Responsive Issues**: Fixed mobile layout problems
6. **Cart Persistence**: Fixed cart data persistence in localStorage

## 🔄 Future Enhancements

### Planned Features
- **Payment Integration**: Stripe/PayPal integration
- **Order Management**: Full order processing workflow
- **Email Templates**: Rich HTML email templates
- **Product Images**: Image upload and management
- **Product Reviews**: Customer review system
- **Wishlist**: Save favorite products
- **Inventory Management**: Stock tracking
- **Analytics Dashboard**: Sales and user analytics
- **Multi-language**: Internationalization support
- **PWA**: Progressive Web App features

### Technical Improvements
- **Testing**: Unit and integration tests
- **Docker**: Containerization for easy deployment
- **CI/CD**: Automated deployment pipeline
- **Caching**: Redis for session and data caching
- **CDN**: Content delivery network for assets
- **Monitoring**: Application performance monitoring
- **Documentation**: API documentation with Swagger

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Unsplash**: For high-quality product images
- **Tailwind CSS**: For the excellent utility-first CSS framework
- **React**: For the powerful frontend library
- **Express.js**: For the robust backend framework
- **MongoDB**: For the flexible NoSQL database

---

**Made with ❤️ for Mark Light Ltd enthusiasts**
