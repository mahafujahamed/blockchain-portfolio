import express from 'express';
import jwt from 'jsonwebtoken';
import admin from 'firebase-admin';

const router = express.Router();

router.post('/jwt', async (req, res) => {
  const { token } = req.body;

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    const jwtToken = jwt.sign(
      { uid: decoded.uid, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }).json({ success: true });
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
});

export default router;
