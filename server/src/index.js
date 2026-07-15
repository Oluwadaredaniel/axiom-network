const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'Axiom API is running', version: '1.0.0' });
});

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/marketplace', require('./routes/marketplace.routes'));
app.use('/api/wallet', require('./routes/wallet.routes'));
app.use('/api/gateway', require('./routes/gateway.routes'));

app.listen(PORT, () => {
  console.log(`Axiom Server running on port ${PORT}`);
});
