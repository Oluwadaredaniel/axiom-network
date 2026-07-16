import { chromium } from 'playwright';
import { execSync } from 'child_process';
import path from 'path';
import fs from 'fs';

async function runDemo() {
  console.log('--- STARTING AXIOM DEMO ENGINE ---');

  // 1. Data Reset & Seeding
  console.log('Seeding demo data...');
  execSync('npm run seed', { cwd: path.join(process.cwd(), 'demo-engine') });

  // 2. Launch Browser with Recording
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false }); // Show browser during demo
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    recordVideo: {
      dir: path.join(process.cwd(), 'demo-engine/recordings'),
      size: { width: 1920, height: 1080 }
    }
  });

  const page = await context.newPage();

  try {
    // SCENARIO WORKFLOW
    console.log('Step 1: Landing Page');
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(3000); // Let intro breathe

    console.log('Step 2: Login');
    await page.click('text=Login');
    await page.fill('input[type="email"]', 'demo@axiom.network');
    await page.fill('input[type="password"]', 'axiom-demo-2024');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/dashboard');
    await page.waitForTimeout(2000);

    console.log('Step 3: Marketplace Tour');
    await page.click('text=Marketplace');
    await page.waitForTimeout(3000);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(2000);

    console.log('Step 4: The Conductor');
    await page.click('text=Conductor');
    await page.waitForTimeout(2000);

    const prompt = 'Build a landing page for my AI startup called "Axiom Coffee". It needs branding, copy, and SEO.';
    await page.fill('textarea', prompt);
    await page.waitForTimeout(1000);
    await page.click('text=Execute');

    console.log('Step 5: Observe Orchestration');
    // The UI shows steps with delays
    await page.waitForSelector('text=Mission Accomplished', { timeout: 60000 });
    await page.waitForTimeout(5000); // Stay on result page

    console.log('Step 6: Wallet Audit');
    await page.click('text=Wallet');
    await page.waitForTimeout(4000);
    await page.mouse.wheel(0, 300);
    await page.waitForTimeout(2000);

    console.log('Step 7: Ending');
    await page.goto('http://localhost:5173');
    await page.waitForTimeout(3000);

    console.log('Scenario Complete.');

  } catch (error) {
    console.error('Demo failed:', error);
  } finally {
    const videoPath = await page.video()?.path();
    await browser.close();

    if (videoPath) {
      console.log(`Video recorded at: ${videoPath}`);

      // 3. Post-processing with FFmpeg
      const outputDir = path.join(process.cwd(), 'demo-engine/output');
      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

      const outputPath = path.join(outputDir, 'axiom-demo.mp4');
      console.log('Converting to MP4...');
      try {
        execSync(`ffmpeg -i "${videoPath}" -vcodec libx244 -crf 20 -y "${outputPath}"`);
        console.log(`Final demo video: ${outputPath}`);
      } catch (ffmpegErr) {
        console.warn('FFmpeg conversion failed. Raw recording available at:', videoPath);
      }
    }
  }
}

runDemo();
