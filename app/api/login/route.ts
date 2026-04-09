import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;
  try {
    const { email, password } = await request.json();

    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: true }
    });

    // We check if a customer exists with this EXACT email and password
    const [rows]: any = await connection.execute(
      'SELECT * FROM Customer WHERE Email = ? AND Password_Hash = ?',
      [email, password]
    );

    if (rows.length > 0) {
      // Login Success!
      const user = rows[0];
      return NextResponse.json({ 
        message: "Login successful", 
        userName: user.Customer_name 
      }, { status: 200 });
    } else {
      // Login Fail
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}
