export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'your-password';

export function isAuthorized(req: Request): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${ADMIN_PASSWORD}`;
}
