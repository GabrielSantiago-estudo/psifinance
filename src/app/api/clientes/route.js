import { NextResponse } from 'next/server';
import { Connection } from '@/lib/connection' // Alterar os outros deixando do mermo jeito

// GET: Listar todos os clientes do psicólogo
export async function GET() {
  try {
    const [rows] = await Connection.execute(
      'SELECT * FROM clients WHERE psychologist_id = ?',
      [psychologist_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Criar um novo cliente
export async function POST(request) {
  try {
    const psychologist_id = 1;
    const data = await request.json();

    const { full_name, email, phone, session_type, session_value, payment_status, notes, active_status } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `INSERT INTO clients (psychologist_id, full_name, email, phone, session_type, session_value, payment_status, notes, active_status, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [psychologist_id, full_name, email, phone, session_type, session_value, payment_status, notes, active_status]
    );

    return NextResponse.json({ id: result.insertId, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}