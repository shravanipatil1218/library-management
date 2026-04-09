import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

export async function POST(request: Request) {
  let connection;

  try {
    // 1. Get the data from the website form
    const body = await request.json();
    const { name, email, password, address, phone } = body;

    // 2. Establish a secure connection to TiDB Cloud
    // We use the URL from your .env.local but force SSL for security
    connection = await mysql.createConnection({
      uri: process.env.DATABASE_URL,
      ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true,
      },
    });

    // 3. Generate a unique Customer ID
    // Uses 'C' + a random 4-digit number
    const customerId = `C${Math.floor(Math.random() * 9000) + 1000}`;

    // 4. The SQL Command
    // We use '?' placeholders to prevent SQL Injection (hacking)
    const sql = `
      INSERT INTO Customer (
        Customer_Id, 
        Customer_name, 
        Email, 
        Password_Hash, 
        Customer_address, 
        Phone_number, 
        Reg_date,
        Branch_no
      ) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), 'B001')
    `;

    // 5. Execute the command
    await connection.execute(sql, [
      customerId, 
      name, 
      email, 
      password, 
      address, 
      phone
    ]);

    // 6. Close connection and send success message
    await connection.end();
    return NextResponse.json({ message: "Success" }, { status: 201 });

  } catch (error: any) {
    // This part is crucial: it sends the EXACT error to your terminal
    console.error("--- BRIDGE ERROR LOG ---");
    console.error("Message:", error.message);
    console.error("Code:", error.code);
    
    if (connection) await connection.end();

    return NextResponse.json(
      { error: error.message || "Internal Server Error" }, 
      { status: 500 }
    );
  }
}