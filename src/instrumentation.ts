import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
// eslint-disable-next-line prefer-destructuring
const APP_ENV = process.env.APP_ENV;

// eslint-disable-next-line import/prefer-default-export
export function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: APP_ENV,
      integrations: [Sentry.captureConsoleIntegration()],
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: SENTRY_DSN,
      tracesSampleRate: 1.0,
      environment: APP_ENV,
    });
  }
}
