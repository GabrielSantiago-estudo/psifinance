import { NextResponse } from 'next/server';
import Connection from '@/lib/database/connection';

// GET: Listar sessões do psicólogo
export async function GET(request) {
  try {
    const psychologist_id = 1;

    const [rows] = await Connection.execute(
      'SELECT * FROM sessions WHERE psychologist_id = ?',
      [psychologist_id]
    );

    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: Agendar nova sessão
export async function POST(request) {
  try {
    const psychologist_id = 1;
    const data = await request.json();

    const { client_id, session_date, session_time, session_type, value, session_status, notes, location, reminder_sent } = data;

    // Corrigido: trocado pool por Connection
    const [result] = await Connection.execute(
      `INSERT INTO sessions (psychologist_id, client_id, session_date, session_time, session_type, value, session_status, notes, location, reminder_sent, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [psychologist_id, client_id, session_date, session_time, session_type, value, session_status, notes, location, reminder_sent]
    );

    return NextResponse.json({ id: result.insertId, ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}