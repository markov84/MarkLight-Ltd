
# 1. MARK LIGHT LTD - Admin & User Guide


## 2. 🔐 LOGIN CREDENTIALS

- **Username**: `admin`
- **Password**: `asdasd`
- **Email**: admin@luxury-lighting.bg
- **Permissions**: Full admin access to manage products, users, and orders

### 2.1 Administrator Account
1. **Username**: `admin`
2. **Password**: `asdasd`
3. **Email**: admin@luxury-lighting.bg
4. **Permissions**: Full admin access to manage products, users, and orders
- **Username**: `admin`
- **Password**: `asdasd`
- **Email**: admin@luxury-lighting.bg
- **Permissions**: Full admin access to manage products, users, and orders

- **Username**: `testuser`
- **Password**: `test123`
- **Email**: test@luxury-lighting.bg
- **Permissions**: Regular user access

### 2.2 Test User Account
1. **Username**: `testuser`
2. **Password**: `test123`
3. **Email**: test@luxury-lighting.bg
4. **Permissions**: Regular user access
- **Username**: `testuser`
- **Password**: `test123`
- **Email**: test@luxury-lighting.bg
- **Permissions**: Regular user access


## 3. 🚀 RECENT FIXES & IMPROVEMENTS

### 3.1 Contact Pages Fixed
- **NEW**: Created dedicated `/contact` page with full contact form
- **FIXED**: Contact navigation now shows in browser address bar correctly
- **IMPROVED**: Working contact links in footer with `tel:` and `mailto:` protocols
- **FEATURES**: Contact form with name, email, phone, subject, and message fields

### 3.2 User Authentication Improvements
- **ADDED**: Logout button visible when user is logged in
- **IMPROVED**: Shows username in navigation instead of email
- **FIXED**: Logout redirects to home page as requested
- **REMOVED**: All demo login functionality completely eliminated

### 3.3 Navigation & Routing
- **ADDED**: "Контакти" link in main navigation menu
- **FIXED**: Footer links now properly route to `/contact` page
- **IMPROVED**: All contact functionality working in both footer and dedicated page

### 3.4 Database Setup
- **CREATED**: Admin user with proper username-based authentication
- **FIXED**: Username field properly indexed and unique
- **REMOVED**: Duplicate database index warnings


## 4. 📧 CONTACT INFORMATION

### 4.1 Website Contact Details
- **Phone**: +359 888 123 456 (clickable tel: link)
- **Email**: marklightltd@gmail.com(clickable mailto: link)  
- **Address**: гр. Габрово, ул. Пенчо Постомпиров 35
- **Hours**: Пон-Пет: 9:00-18:00, Съб: 10:00-16:00

### 4.2 Social Media Links (in Footer)
- Facebook: https://www.facebook.com/luxurylighting.bg
- Instagram: https://www.instagram.com/luxurylighting.bg  
- LinkedIn: https://linkedin.com/company/luxury-lighting-bg
- YouTube: https://www.youtube.com/@luxurylightingbg


## 5. 🖥️ APPLICATION URLS

- **Frontend**: http://localhost:5175
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:5175/admin (requires admin login)
- **Contact Page**: http://localhost:5175/contact


## 6. 🎯 HOW TO USE

### 6.1 For Administrators:
1. Visit http://localhost:5175/login
2. Enter username: `admin` and password: `admin123`
3. Access Admin Panel via navigation menu
4. Manage products, categories, and users

### 6.2 For Regular Users:
1. Register at http://localhost:5175/register with email + username
2. Login with username and password
3. Browse catalog, add items to cart
4. Use contact form for inquiries

### 6.3 Contact Form Features:
- Visit http://localhost:5175/contact
- Fill out name, email, phone, subject, and message
- Form submission shows success message
- All contact info displayed with clickable links


## 7. 🔧 TECHNICAL NOTES

- Authentication uses username/password (not email/password)
- Registration requires both email and username
- All demo functionality has been completely removed
- Contact links use proper tel: and mailto: protocols
- Logout automatically redirects to home page
- Navigation shows username when logged in
