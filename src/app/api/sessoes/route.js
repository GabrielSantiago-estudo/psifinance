import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await Connection.query(
      "SELECT * FROM sessoes"
    );

    return NextResponse.json(rows);

  } catch (err) {
    console.log("Erro ao consultar sessões", err);
    return NextResponse.json(
      { error: "Erro ao consultar sessões" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      data_sessao,
      horario,
      tipo,
      valor,
      status,
      local_atendimento,
      lembrete_enviado,
      observacoes
    } = body;

    if (
      !data_sessao ||
      !horario ||
      !tipo ||
      !valor ||
      !status ||
      !local_atendimento ||
      !lembrete_enviado ||
      !observacoes === undefined
    ) {
      return NextResponse.json(
        { error: "Dados incompletos!" },
        { status: 400 }
      );
    }

    const [result] = await Connection.query(
      `INSERT INTO sessoes (data_sessao, horario, tipo, valor, status, local_atendimento, lembrete_enviado, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [data_sessao, horario, tipo, valor, status, local_atendimento, lembrete_enviado, observacoes]
    );

    const sessaoId = result.insertId;
    return NextResponse.json(
      { success: true, sessaoId },
      { status: 201 }

    );

  } catch (err) {
    console.error("Erro ao criar sessão:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor!" },
      { status: 500 }
    );
  }
}