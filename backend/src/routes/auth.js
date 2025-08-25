import express from 'express';
import jwt from 'jsonwebtoken';
import passport from '../config/passport.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import auth from '../middleware/auth.js';
import { validateLogin, validateRegister } from '../middleware/validation.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

router.post('/register', validateRegister, async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email',
      });
    }

    const user = new User({
      name,
      email,
      password,
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: user.toSafeObject(),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Account has been deactivated',
      });
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: user.toSafeObject(),
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post('/logout', auth, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
});

const isGoogleOAuthConfigured = () => {
  return (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id-here' &&
    process.env.GOOGLE_CLIENT_SECRET !== 'your-google-client-secret-here'
  );
};

router.get('/google', (req, res, next) => {
  if (!isGoogleOAuthConfigured()) {
    return res.status(501).json({
      success: false,
      message:
        'Google OAuth is not configured. Please set up Google credentials in environment variables.',
    });
  }

  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next);
});

router.get('/google/callback', (req, res, next) => {
  if (!isGoogleOAuthConfigured()) {
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    return res.redirect(
      `${frontendURL}/auth/error?message=Google OAuth not configured`
    );
  }

  passport.authenticate('google', { session: false }, async (err, user) => {
    if (err) {
      console.error('Google callback error:', err);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(
        `${frontendURL}/auth/error?message=Authentication failed`
      );
    }

    if (!user) {
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      return res.redirect(
        `${frontendURL}/auth/error?message=Authentication failed`
      );
    }

    try {
      const token = generateToken(user._id);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';

      const userData = encodeURIComponent(JSON.stringify(user.toSafeObject()));

      res.redirect(
        `${frontendURL}/auth/success?token=${token}&user=${userData}`
      );
    } catch (error) {
      console.error('Token generation error:', error);
      const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendURL}/auth/error?message=Authentication failed`);
    }
  })(req, res, next);
});

router.get('/me', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
});

router.put('/profile', auth, async (req, res, next) => {
  try {
    const { name, avatar } = req.body;
    const updates = {};

    if (name) updates.name = name.trim();
    if (avatar !== undefined) updates.avatar = avatar;

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/account', auth, async (req, res, next) => {
  try {
    const userId = req.user.id;

    await Job.deleteMany({ user: userId });

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      message: 'Account deleted successfully',
    });
  } catch (error) {
    next(error);
  }
});

export default router;
