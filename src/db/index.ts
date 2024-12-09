import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from "@libsql/client";
import { playersTable, scoresTable, wordlesTable } from './schema';
import * as schema from './schema';

const client = createClient({
  url: process.env.DB_FILE_NAME!,
});
const db = drizzle(client, {schema});

export async function createWordle(gameNumber: number): Promise<boolean> {
  try {
    await db.insert(wordlesTable).values({ gameNumber }).onConflictDoNothing();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createPlayer(discordId: string, discordName: string): Promise<boolean> {
  try {
    await db.insert(playersTable).values({ discordId, discordName }).onConflictDoNothing();
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function createScore(discordId: string, gameNumber: number, attempts: string, isWin: number = 0, isTie: number = 0): Promise<boolean> {
  try {
    await db.insert(scoresTable).values({ discordId, gameNumber, attempts, isWin, isTie }).onConflictDoNothing();
    return true;    
  } catch (error) {
    console.error(error);
    return false;
  }
}
