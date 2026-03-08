import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

const dbPath = path.resolve(process.cwd(), 'pages', 'api', 'db.json');

function readDb() {
  const dbRaw = fs.readFileSync(dbPath);
  return JSON.parse(dbRaw);
}

export default function handler(req, res) {
  const db = readDb();

  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ token: `${user.role}-token`, role: user.role });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
