const express = require('express');
const app = express();

app.use(express.json());

// Public Registration Endpoint
app.post('/api/v1/auth/register', (req, res) => {
  const { email, password, fullName } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Missing required registration fields' });
  }

  return res.status(201).json({
    status: 'success',
    user_id: 'usr_' + Date.now(),
    created_at: new Date().toISOString()
  });
});

// Store Catalog Endpoint (Requires API Key)
app.get('/api/v1/store/items', (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'ApiKey authentication required' });
  }

  const { category, limit } = req.query;

  const catalog = [
    { id: 'itm_1', name: 'Standard Widget', category: category || 'general', price: 29.99 },
    { id: 'itm_2', name: 'Premium Widget', category: category || 'general', price: 59.99 }
  ];

  return res.json({
    total: catalog.length,
    items: catalog.slice(0, Number(limit) || catalog.length)
  });
});

// Billing Subscription Endpoint (Requires Bearer Token)
app.post('/api/v1/billing/subscribe', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }

  const { planId, paymentMethodId } = req.body;
  if (!planId || !paymentMethodId) {
    return res.status(400).json({ error: 'Missing subscription details' });
  }

  return res.status(200).json({
    subscriptionId: 'sub_' + Math.random().toString(36).substring(7),
    status: 'active'
  });
});

// Profile Deletion Endpoint (Requires Bearer Token)
app.delete('/api/v1/users/:id', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }

  const { id } = req.params;

  return res.status(200).json({
    message: 'User profile permanently deleted',
    targetId: id
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Audited API server running on port ${PORT}`);
});
