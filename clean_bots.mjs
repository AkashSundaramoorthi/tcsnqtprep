import { createClient } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1]] = match[2].replace(/^"|"$/g, '').trim();
  }
});

async function cleanBots() {
  console.log("Connecting to Postgres...");
  const client = createClient();
  try {
    await client.connect();
    console.log("Cleaning bots...");
    const res = await client.sql`
      DELETE FROM events 
      WHERE user_agent ILIKE '%bot%' 
         OR user_agent ILIKE '%crawler%' 
         OR user_agent ILIKE '%aws%'
         OR user_agent IS NULL 
         OR ip_address IN ('54.183.149.156', '13.57.148.235', '66.249.70.2', '66.249.70.3');
    `;
    console.log("Deleted rows:", res.rowCount);
  } catch(e) {
    console.error(e);
  } finally {
    await client.end();
  }
}

cleanBots();
