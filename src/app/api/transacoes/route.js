import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await Connection.query(
      "SELECT * FROM transacoes"
    );

    return NextResponse.json(rows);

  } catch (err) {
    console.log("Erro ao consultar transações", err);
    return NextResponse.json(
      { error: "Erro ao consultar transações" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      tipo,
      categoria,
      valor,
      data_transacao,
      status
    } = body;

    if (
      !tipo ||
      !categoria ||
      !valor ||
      !data_transacao ||
    ) {
      return NextResponse.json(
        { error: "Dados incompletos!" },
        { status: 400 }
      );
    }

    const [result] = await Connection.query(
      `INSERT INTO transacoes (tipo, categoria, valor, data_transacao, status) VALUES (?, ?, ?, ?, ?)`,
      [tipo, categoria, valor, data_transacao, status]
    );

    const transacao_id = result.insertId;

    return NextResponse.json(
      { success: true, transacao_id },
      { status: 201 }

    );

  } catch (err) {
    console.error("Erro ao criar transação:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor!" },
      { status: 500 }
    );
  }
}