import { createClient } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, 'utf8');
  envFile.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      process.env[match[1]] = match[2].replace(/^"|"$/g, '').trim();
    }
  });
}

async function cleanMyIp() {
  const ignoredIp = process.env.IGNORED_IP;
  if (!ignoredIp || ignoredIp === "your_ip_here") {
    console.error("Please set IGNORED_IP to your actual IP address in .env.local before running this script.");
    process.exit(1);
  }

  console.log(`Connecting to Postgres to delete events for IP: ${ignoredIp}...`);
  const client = createClient();
  try {
    await client.connect();
    
    // Using parameterized query to prevent SQL injection
    const res = await client.query('DELETE FROM events WHERE ip_address = $1', [ignoredIp]);
    
    console.log("Deleted past events from your IP:", res.rowCount);
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

cleanMyIp();
