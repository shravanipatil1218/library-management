import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { email, password } = await request.json();
    connection = await mysql.createConnection({ uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } });

    const [rows]: any = await connection.execute(
      'SELECT * FROM Employee WHERE Email = ? AND Password_Hash = ?',
      [email, password]
    );

    if (rows.length > 0) {
      return NextResponse.json({ message: "Admin Verified", name: rows[0].Emp_name }, { status: 200 });
    }
    return NextResponse.json({ error: "Invalid Admin Credentials" }, { status: 401 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}