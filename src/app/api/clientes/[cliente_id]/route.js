import { NextResponse } from "next/server";
import { Connection } from "@/lib/connection";

export async function GET(req, context) {
    try {
        const { params } = context;
        const resolved = await params;

        const cliente_id = Number(resolved.cliente_id);

        if (!cliente_id) {
            return NextResponse.json(
                { error: "ID inválido ou não informado" },
                { status: 400 }
            );
        }

        const [rows] = await Connection.query(
            "SELECT * FROM clientes WHERE cliente_id = ?",
            [cliente_id]
        );

        return NextResponse.json(rows[0] || {});

    } catch (err) {
        console.error("Erro ao consultar cliente", err);
        return NextResponse.json(
            { error: "Erro ao consultar cliente" },
            { status: 500 }
        );
    }
}
