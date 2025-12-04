import app from './app';

const PORT = process.env.PORT || 5000;

// Start server for local / traditional Node deployment
app.listen(PORT, () => {
  console.log(`🔒 SecureNest API running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});

