export const runtime = 'nodejs';

import bcryptjs from 'bcryptjs';

const SALT_ROUNDS = 10;

/**
 * Hash a plain text password using bcrypt
 */
export async function hashPassword(password: string) {
  return bcryptjs.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePasswords(
  plainTextPassword: string,
  hashedPassword: string
) {
  return bcryptjs.compare(plainTextPassword, hashedPassword);
}

// Session management is handled by NextAuth (see lib/auth.ts)
