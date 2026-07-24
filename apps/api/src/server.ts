import app from './app';
import { CapabilityManager } from './services/capabilities/manager';
import { env } from './config/env';

const PORT = env.PORT;

app.listen(PORT, async () => {
  console.log(`[server]: Axiom API is running at http://localhost:${PORT}`);
  console.log(`[server]: Environment: ${env.NODE_ENV}`);

  try {
    await CapabilityManager.initialize();
    console.log('[server]: Official AI capabilities initialized.');
  } catch (error) {
    console.error('[server]: Failed to initialize capabilities:', error);
  }
});
