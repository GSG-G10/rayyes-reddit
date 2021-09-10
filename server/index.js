const express = require('express');
const cookieParser = require('cookie-parser');
const router = require('./controller');
const path = require('path');
const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// static files
app.use(express.static(path.join(__dirname, '..', 'public')));
// api endpoints
app.use('/api/v1', router);
// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});
// 500 handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message || 'Internal server error' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
