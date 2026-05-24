/**
 * Centralised API configuration.
 *
 * To change the backend URL for a given environment, update
 * the NEXT_PUBLIC_API_URL variable in the appropriate .env file:
 *   - .env.local          → local development
 *   - .env.production     → production build
 *
 * The NEXT_PUBLIC_ prefix makes the value available in the browser bundle.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
