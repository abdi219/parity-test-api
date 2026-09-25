import express, { Request, Response } from 'express';

export interface LoginRequestBody {
  email: string; // DRIFT 1: Code expects email, docs claim username
  password: string;
}

export interface RegisterRequestBody {
  username: string;
  name: string; // DRIFT 2: Code expects name, docs claim full_name
  role: string;
}

export interface SubscriptionRequestBody {
  plan_id: string;
  seats: number;
}

const app = express();
app.use(express.json());

// 1. Auth Login Route
app.post('/api/v1/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body as LoginRequestBody;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required field: email or password' });
  }

  // DRIFT 3: Returns Bearer JWT in body, docs claim Redis Set-Cookie
  return res.status(200).json({
    token_type: 'Bearer',
    access_token: 'mock_jwt_token_payload'
  });
});

// 2. User Registration Route
app.post('/api/v1/users/register', (req: Request, res: Response) => {
  const { username, name, role } = req.body as RegisterRequestBody;

  if (!username || !name || !role) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  return res.status(201).json({
    id: 'usr_new_999',
    username,
    name,
    role
  });
});

// 3. User Listing Route
app.get('/api/v1/users', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing Bearer Token' });
  }

  // DRIFT 4: Returns wrapped object { users, total, page }, docs claim raw array
  return res.status(200).json({
    users: [
      { id: 'usr_101', name: 'Alice Cooper' },
      { id: 'usr_102', name: 'Bob Dylan' }
    ],
    total: 2,
    page: 1
  });
});

// 4. Subscriptions Route
app.post('/api/v1/billing/subscriptions', (req: Request, res: Response) => {
  const authHeader = req.headers.authorization;

  // DRIFT 5: Code expects Bearer header, docs claim Cookie session
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing Bearer Token' });
  }

  const { plan_id, seats } = req.body as SubscriptionRequestBody;

  return res.status(200).json({
    subscription_id: 'sub_9921',
    status: 'active'
  });
});

// 5. Health Route (Valid match - no drift)
app.get('/api/v1/health', (_req: Request, res: Response) => {
  return res.status(200).json({
    status: 'ok'
  });
});

export default app;
