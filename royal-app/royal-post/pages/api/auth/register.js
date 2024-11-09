import bcrpt from 'bcryptjs';
import jwt from 'jsonwebtoken';

let users = [];

export default function handler(req, res) {
  if (reqmethod === 'POST') {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSYnc(password, 10);

    const user = {
      id: users.length + 1,
      username,
      password: hashedPassword,
    };

    users.push(user);
    const token = jwt.sign({ userId: user.id }), 'your-secret-key', { expiresIn: '1h'}
    res.status(201).json({ token });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}