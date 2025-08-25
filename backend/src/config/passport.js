import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

export const initializeGoogleAuth = () => {
  console.log(
    'Google Client ID:',
    process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...'
  );
  console.log(
    'Google Client Secret:',
    process.env.GOOGLE_CLIENT_SECRET?.substring(0, 10) + '...'
  );

  if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CLIENT_ID !== 'your-google-client-id-here' &&
    process.env.GOOGLE_CLIENT_SECRET !== 'your-google-client-secret-here'
  ) {
    console.log('✅ Google OAuth configured successfully');

    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL:
            process.env.GOOGLE_CALLBACK_URL || '/api/v1/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            let user = await User.findOne({ googleId: profile.id });

            if (user) {
              user.lastLogin = new Date();
              await user.save();
              return done(null, user);
            }

            user = await User.findOne({ email: profile.emails[0].value });

            if (user) {
              user.googleId = profile.id;
              user.provider = 'google';
              user.avatar = user.avatar || profile.photos[0]?.value;
              user.lastLogin = new Date();
              await user.save();
              return done(null, user);
            }

            user = await User.create({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0]?.value,
              provider: 'google',
              lastLogin: new Date(),
            });

            return done(null, user);
          } catch (error) {
            console.error('Google OAuth error:', error);
            return done(error, null);
          }
        }
      )
    );

    passport.serializeUser((user, done) => {
      done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
      try {
        const user = await User.findById(id);
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    });
  } else {
    console.log(
      'Google OAuth credentials not configured. Google login will be disabled.'
    );
  }
};

export default passport;
