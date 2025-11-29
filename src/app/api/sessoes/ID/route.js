import { NextResponse } from 'next/server';
import Connection from '@/lib/database/connection'; // Corrigido a importação

// GET: Obter sessão por ID
export async function GET(request, { params }) {
  try {
    const psychologist_id = 1;
    const sessionId = params.id;

    const [rows] = await Connection.execute( // Corrigido: pool -> Connection
      'SELECT * FROM sessions WHERE id = ? AND psychologist_id = ?',
      [sessionId, psychologist_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT: Atualizar sessão
export async function PUT(request, { params }) {
  try {
    const psychologist_id = 1;
    const sessionId = params.id;
    const data = await request.json();

    const { client_id, session_date, session_time, session_type, value, session_status, notes, location, reminder_sent } = data;

    const [result] = await Connection.execute( // Corrigido: pool -> Connection
      `UPDATE sessions 
       SET client_id = ?, session_date = ?, session_time = ?, session_type = ?, value = ?, session_status = ?, notes = ?, location = ?, reminder_sent = ?, updated_at = CURRENT_TIMESTAMP 
       WHERE id = ? AND psychologist_id = ?`,
      [client_id, session_date, session_time, session_type, value, session_status, notes, location, reminder_sent, sessionId, psychologist_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sessão atualizada com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: Cancelar sessão
export async function DELETE(request, { params }) {
  try {
    const psychologist_id = 1;
    const sessionId = params.id;

    const [result] = await Connection.execute( // Corrigido: pool -> Connection
      'DELETE FROM sessions WHERE id = ? AND psychologist_id = ?',
      [sessionId, psychologist_id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Sessão não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Sessão cancelada e deletada com sucesso' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}