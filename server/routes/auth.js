
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
const router = express.Router();
// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ msg: 'Email is required' });
  }
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ msg: 'No user with this email' });
    }
    // Generate token
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 60; // 1 hour
    await user.save();

    // Send email (example with nodemailer, configure for production)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${token}`;
      await transporter.sendMail({
        from: process.env.COMPANY_EMAIL || process.env.SMTP_USER,
        to: user.email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>`
      });
    res.json({ msg: 'Password reset email sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ msg: 'Token and new password are required' });
  }
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired token' });
    }
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    res.json({ msg: 'Password has been reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
});
// Test GET route for /login
router.get('/login', (req, res) => {
  res.json({ msg: 'Login endpoint is working (GET)' });
});

// Logout route
router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ msg: 'Logged out' });
});

// Register route
router.post('/register', async (req, res) => {
  try {
    const { email, username, password, firstName, lastName } = req.body;
    
    // Validation
if (!email || !username || !password) {
  return res.status(400).json({ msg: 'Email, username and password are required' });
}
    
    if (password.length < 6) {
      return res.status(400).json({ msg: 'Password must be at least 6 characters' });
    }

    if (username.length < 3) {
      return res.status(400).json({ msg: 'Username must be at least 3 characters' });
    }
    
    // Check if user exists by email or username
    const existingUser = await User.findOne({ 
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() }
      ]
    });
    
    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        return res.status(409).json({ msg: 'User with this email already exists' });
      } else {
        return res.status(409).json({ msg: 'User with this username already exists' });
      }
    }
    
    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Check if this should be an admin user (by email or username)
    const isAdmin = (
      email.toLowerCase() === (process.env.ADMIN_EMAIL || 'admin@luxury.com').toLowerCase() ||
      username.toLowerCase() === (process.env.ADMIN_USERNAME || 'admin')
    );
    
    // Create user
    const user = new User({
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      password: hashedPassword,
      firstName: firstName || '',
      lastName: lastName || '',
      isAdmin
    });
    
    await user.save();
    
    res.status(201).json({ 
      msg: 'User registered successfully',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ msg: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Позволява логин с username ИЛИ email
    if ((!username && !email) || !password) {
      return res.status(400).json({ msg: 'Username/email and password are required' });
    }
    let user = null;
    if (username) {
      user = await User.findOne({ username: username.toLowerCase() });
    }
    if (!user && email) {
      user = await User.findOne({ email: email.toLowerCase() });
    }
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { 
        id: user._id, 
        email: user.email, 
        username: user.username,
        isAdmin: user.isAdmin,
        firstName: user.firstName,
        lastName: user.lastName
      },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ msg: 'Server error during login' });
  }
});

// Get user profile route
router.get('/profile', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: 'No token provided' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret_key');
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(401).json({ msg: 'Invalid token' });
  }
});


// Временен тестов маршрут за проверка на админ акаунти
router.get('/testadmin', async (req, res) => {
  try {
    const admins = await User.find({ isAdmin: true }).select('-password');
    res.json({ admins });
  } catch (error) {
    res.status(500).json({ msg: 'DB error', error: error.message });
  }
});

export default router;
