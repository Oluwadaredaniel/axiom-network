import app from './app';
import { CapabilityManager } from './services/capabilities/manager';

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`[server]: Axiom API is running at http://localhost:${PORT}`);

  try {
    await CapabilityManager.initialize();
    console.log('[server]: Official AI capabilities initialized.');
  } catch (error) {
    console.error('[server]: Failed to initialize capabilities:', error);
  }
});
