import { NextRequest, NextResponse } from "next/server";
import { findPlayerByName, createPlayer, getPlayersByAccountId } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { accountId, characterName, server, starterPokemon } = body;

    if (!accountId) {
      return NextResponse.json(
        { success: false, message: "ID da conta não informado ou sessão expirada." },
        { status: 400 }
      );
    }

    if (!characterName || !String(characterName).trim()) {
      return NextResponse.json(
        { success: false, message: "Informe um nome para o personagem." },
        { status: 400 }
      );
    }

    const trimmedName = String(characterName).trim();

    if (trimmedName.length < 3 || trimmedName.length > 25) {
      return NextResponse.json(
        { success: false, message: "O nome do personagem deve ter entre 3 e 25 caracteres." },
        { status: 400 }
      );
    }

    // Validação básica de caracteres válidos para nomes de RPG
    const validNameRegex = /^[a-zA-Z0-9 ]+$/;
    if (!validNameRegex.test(trimmedName)) {
      return NextResponse.json(
        { success: false, message: "O nome do personagem deve conter apenas letras e números." },
        { status: 400 }
      );
    }

    // 1. Verifica se já existe um personagem com esse nome
    const existing = await findPlayerByName(trimmedName);
    if (existing) {
      return NextResponse.json(
        { success: false, message: `O nome de personagem "${trimmedName}" já está em uso. Escolha outro nome.` },
        { status: 409 }
      );
    }

    const chosenServer = server ? String(server).toLowerCase() : "valaria";
    const chosenStarter = starterPokemon ? String(starterPokemon) : "Charmander";

    // 2. Cria o personagem
    const newPlayer = await createPlayer({
      accountId: Number(accountId),
      name: trimmedName,
      server: chosenServer,
      pokemon: chosenStarter,
    });

    // 3. Busca a lista atualizada de personagens da conta
    const updatedPlayers = await getPlayersByAccountId(Number(accountId));

    return NextResponse.json({
      success: true,
      message: `Personagem "${trimmedName}" criado com sucesso no servidor ${chosenServer.toUpperCase()} com o inicial ${chosenStarter}!`,
      player: newPlayer,
      players: updatedPlayers,
    });
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao criar personagem:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocorreu um erro interno ao criar o personagem.",
        error: errorMsg,
      },
      { status: 500 }
    );
  }
}
