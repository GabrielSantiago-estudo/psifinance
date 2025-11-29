import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const [rows] = await Connection.query(
      "SELECT * FROM clientes"
    );

    return NextResponse.json(rows);

  } catch (err) {
    console.log("Erro ao consultar clientes", err);
    return NextResponse.json(
      { error: "Erro ao consultar clientes" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      nome,
      email,
      telefone,
      tipo_sessao,
      valor_sessao,
      status_pagamento,
      observacoes
    } = body;

    if (
      !nome ||
      !telefone ||
      !tipo_sessao ||
      !valor_sessao ||
      !status_pagamento ||
      observacoes === undefined ||
    ) {
      return NextResponse.json(
        { error: "Dados incompletos!" },
        { status: 400 }
      );
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    const hash = await bcrypt.hashSync(
      process.env.DEFAULT_PASSWORD,
      bcrypt.genSaltSync(10)
    );

    const [result] = await Connection.query(
      `INSERT INTO clientes (nome, email, telefone, tipo_sessao, valor_sessao, status_pagamento, observacoes) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, telefoneLimpo, tipo_sessao, valor_sessao, status_pagamento, observacoes]
    );

    const cliente_Id = result.insertId;

    return NextResponse.json(
      { success: true, cliente_Id },
      { status: 201 }

    );

  } catch (err) {
    console.error("Erro ao criar cliente:", err);
    return NextResponse.json(
      { error: "Erro interno no servidor!" },
      { status: 500 }
    );
  }
}