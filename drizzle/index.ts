import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import { usersTable } from './schema';

// here we got our driver
const sql = neon(process.env.DATABASE_URL!);

// and orm (wrapper)
const db = drizzle(sql,{schema : {usersTable}});

export default db;