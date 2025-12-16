import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Express } from 'express';

export const setupSecurity = (app: Express): void => {
  app.use(helmet());

  // More reasonable rate limiting for development/production
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 100, // 100 requests per minute per IP
      message: {
        error: 'Too many requests, please try again later.',
        retryAfter: '1 minute'
      }
    })
  );
};
