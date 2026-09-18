"use client";

import React, { useState } from "react";

interface StarterPokemon {
  id: string;
  name: string;
  gen: number;
  region: string;
  type: "Fogo" | "Água" | "Grama";
  elementIcon: string;
  image: string;
}

const STARTER_POKEMON: StarterPokemon[] = [
  // 1ª Geração - Kanto
  { id: "bulbasaur", name: "Bulbasaur", gen: 1, region: "Kanto", type: "Grama", elementIcon: "🌿", image: "/starters/bulbasaur.png" },
  { id: "charmander", name: "Charmander", gen: 1, region: "Kanto", type: "Fogo", elementIcon: "🔥", image: "/starters/charmander.png" },
  { id: "squirtle", name: "Squirtle", gen: 1, region: "Kanto", type: "Água", elementIcon: "💧", image: "/starters/squirtle.png" },

  // 2ª Geração - Johto
  { id: "chikorita", name: "Chikorita", gen: 2, region: "Johto", type: "Grama", elementIcon: "🌿", image: "/starters/chikorita.png" },
  { id: "cyndaquil", name: "Cyndaquil", gen: 2, region: "Johto", type: "Fogo", elementIcon: "🔥", image: "/starters/cyndaquil.png" },
  { id: "totodile", name: "Totodile", gen: 2, region: "Johto", type: "Água", elementIcon: "💧", image: "/starters/totodile.png" },

  // 3ª Geração - Hoenn
  { id: "treecko", name: "Treecko", gen: 3, region: "Hoenn", type: "Grama", elementIcon: "🌿", image: "/starters/treecko.png" },
  { id: "torchic", name: "Torchic", gen: 3, region: "Hoenn", type: "Fogo", elementIcon: "🔥", image: "/starters/torchic.png" },
  { id: "mudkip", name: "Mudkip", gen: 3, region: "Hoenn", type: "Água", elementIcon: "💧", image: "/starters/mudkip.png" },

  // 4ª Geração - Sinnoh
  { id: "turtwig", name: "Turtwig", gen: 4, region: "Sinnoh", type: "Grama", elementIcon: "🌿", image: "/starters/turtwig.png" },
  { id: "chimchar", name: "Chimchar", gen: 4, region: "Sinnoh", type: "Fogo", elementIcon: "🔥", image: "/starters/chimchar.png" },
  { id: "piplup", name: "Piplup", gen: 4, region: "Sinnoh", type: "Água", elementIcon: "💧", image: "/starters/piplup.png" },

  // 5ª Geração - Unova
  { id: "snivy", name: "Snivy", gen: 5, region: "Unova", type: "Grama", elementIcon: "🌿", image: "/starters/snivy.png" },
  { id: "tepig", name: "Tepig", gen: 5, region: "Unova", type: "Fogo", elementIcon: "🔥", image: "/starters/tepig.png" },
  { id: "oshawott", name: "Oshawott", gen: 5, region: "Unova", type: "Água", elementIcon: "💧", image: "/starters/oshawott.png" },

  // 6ª Geração - Kalos
  { id: "chespin", name: "Chespin", gen: 6, region: "Kalos", type: "Grama", elementIcon: "🌿", image: "/starters/chespin.png" },
  { id: "fennekin", name: "Fennekin", gen: 6, region: "Kalos", type: "Fogo", elementIcon: "🔥", image: "/starters/fennekin.png" },
  { id: "froakie", name: "Froakie", gen: 6, region: "Kalos", type: "Água", elementIcon: "💧", image: "/starters/froakie.png" },

  // 7ª Geração - Alola
  { id: "rowlet", name: "Rowlet", gen: 7, region: "Alola", type: "Grama", elementIcon: "🌿", image: "/starters/rowlet.png" },
  { id: "litten", name: "Litten", gen: 7, region: "Alola", type: "Fogo", elementIcon: "🔥", image: "/starters/litten.png" },
  { id: "popplio", name: "Popplio", gen: 7, region: "Alola", type: "Água", elementIcon: "💧", image: "/starters/popplio.png" },
];

interface GameServer {
  id: "valaria" | "orten" | "zertiros";
  name: string;
  type: string;
  online: number;
  description: string;
  pvpType: "Open PvP" | "PvP-Enforced" | "No-PvP (RPG)";
  topPlayers: {
    first: { name: string; initials: string; guild: string; level: number; pokemon: string; wins: number };
    second: { name: string; initials: string; guild: string; level: number; pokemon: string; wins: number };
    third: { name: string; initials: string; guild: string; level: number; pokemon: string; wins: number };
    runnersUp: Array<{ rank: number; name: string; guild: string; level: number; pokemon: string; wins: number }>;
  };
}

const SERVERS: Record<"valaria" | "orten" | "zertiros", GameServer> = {
  valaria: {
    id: "valaria",
    name: "Valaria",
    type: "Open PvP",
    online: 412,
    description: "Servidor Principal • Guerras de Guildas e Torneios Diários",
    pvpType: "Open PvP",
    topPlayers: {
      first: { name: "Red Master", initials: "RM", guild: "Elite Four", level: 465, pokemon: "Shiny Charizard", wins: 389 },
      second: { name: "Blue Oak", initials: "BO", guild: "Pallet Champions", level: 438, pokemon: "Shiny Blastoise", wins: 312 },
      third: { name: "Cynthia", initials: "CY", guild: "Sinnoh Legends", level: 421, pokemon: "Garchomp", wins: 284 },
      runnersUp: [
        { rank: 4, name: "Steven Stone", guild: "Hoenn League", level: 412, pokemon: "Metagross", wins: 265 },
        { rank: 5, name: "Lance Dragon", guild: "Dragon Clan", level: 405, pokemon: "Dragonite", wins: 248 },
        { rank: 6, name: "Misty Cerulean", guild: "Water Masters", level: 398, pokemon: "Starmie", wins: 230 },
        { rank: 7, name: "Brock Pewter", guild: "Boulder Gym", level: 391, pokemon: "Steelix", wins: 215 },
      ],
    },
  },
  orten: {
    id: "orten",
    name: "Orten",
    type: "PvP-Enforced",
    online: 285,
    description: "Servidor Hardcore • Batalhas Frequentes e Foco em PvP",
    pvpType: "PvP-Enforced",
    topPlayers: {
      first: { name: "Gabigordo", initials: "SEILA", guild: "Dark Vanguard", level: 452, pokemon: "Shiny Gengar", wins: 410 },
      second: { name: "Garibal", initials: "Tranquiilo", guild: "Kanto Elite", level: 440, pokemon: "Arcanine", wins: 335 },
      third: { name: "Leon King", initials: "Lalele", guild: "Galar Monarchs", level: 429, pokemon: "Dragapult", wins: 295 },
      runnersUp: [
        { rank: 4, name: "Raihan Storm", guild: "Dragon Stadium", level: 415, pokemon: "Duraludon", wins: 270 },
        { rank: 5, name: "Piers Dark", guild: "Spikemuth Punk", level: 408, pokemon: "Obstagoon", wins: 252 },
        { rank: 6, name: "Bea Strike", guild: "Fighting Spirit", level: 399, pokemon: "Machamp", wins: 238 },
        { rank: 7, name: "Allister Ghost", guild: "Spooky Night", level: 390, pokemon: "Cursola", wins: 220 },
      ],
    },
  },
  zertiros: {
    id: "zertiros",
    name: "Zertiros",
    type: "No-PvP (RPG)",
    online: 340,
    description: "Servidor Cooperativo • Quests Lendárias, Puzzles e Caçadas",
    pvpType: "No-PvP (RPG)",
    topPlayers: {
      first: { name: "Aurora Trainer", initials: "AT", guild: "Mystic Guardians", level: 448, pokemon: "Shiny Gardevoir", wins: 260 },
      second: { name: "Wallace Ocean", initials: "WO", guild: "Sootopolis Clan", level: 435, pokemon: "Milotic", wins: 245 },
      third: { name: "Diantha Star", initials: "DS", guild: "Kalos Nobles", level: 419, pokemon: "Goodra", wins: 230 },
      runnersUp: [
        { rank: 4, name: "Kukui Professor", guild: "Alola Haven", level: 410, pokemon: "Incineroar", wins: 218 },
        { rank: 5, name: "Gladion Null", guild: "Aether Syndicate", level: 402, pokemon: "Silvally", wins: 205 },
        { rank: 6, name: "Lillie Snow", guild: "Sun & Moon", level: 395, pokemon: "Alolan Ninetales", wins: 190 },
        { rank: 7, name: "Hau Alola", guild: "Malasada Crew", level: 388, pokemon: "Alolan Raichu", wins: 182 },
      ],
    },
  },
};

interface LoggedInAccount {
  id: number;
  name: string;
  email: string;
  premdays: number;
  created_at?: string;
}

interface CharacterPlayer {
  id: number;
  name: string;
  server: string;
  pokemon: string;
  level: number;
  vocation: number;
  created_at?: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"home" | "conta" | "download" | "info">("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMode, setAccountMode] = useState<"register" | "login">("register");
  const [selectedServer, setSelectedServer] = useState<"valaria" | "orten" | "zertiros">("valaria");
  const [selectedStarterId, setSelectedStarterId] = useState<string>("charmander");
  const [isStarterMenuOpen, setIsStarterMenuOpen] = useState<boolean>(false);
  const [starterGenFilter, setStarterGenFilter] = useState<number | "all">("all");

  // Sessão do Usuário Logado
  const [currentUser, setCurrentUser] = useState<LoggedInAccount | null>(null);
  const [userCharacters, setUserCharacters] = useState<CharacterPlayer[]>([]);

  // Formulário de Conta (Cadastro / Login)
  const [accountForm, setAccountForm] = useState({ account: "", email: "", password: "", confirmPassword: "" });
  const [formFeedback, setFormFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "warning">("success");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Formulário de Criação de Personagem Adicional (Dentro da Conta)
  const [newCharName, setNewCharName] = useState<string>("");
  const [newCharServer, setNewCharServer] = useState<"valaria" | "orten" | "zertiros">("valaria");
  const [newCharStarterId, setNewCharStarterId] = useState<string>("charmander");
  const [isNewCharStarterOpen, setIsNewCharStarterOpen] = useState<boolean>(false);
  const [charFeedback, setCharFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isCreatingChar, setIsCreatingChar] = useState<boolean>(false);

  const currentStarter = STARTER_POKEMON.find((p) => p.id === selectedStarterId) || STARTER_POKEMON[1];
  const newCharCurrentStarter = STARTER_POKEMON.find((p) => p.id === newCharStarterId) || STARTER_POKEMON[1];
  const activeServerData = SERVERS[selectedServer];

  // Cálculo de Mundos onde o usuário possui personagens
  const serverCounts: Record<string, number> = {
    valaria: userCharacters.filter((c) => c.server.toLowerCase() === "valaria").length,
    orten: userCharacters.filter((c) => c.server.toLowerCase() === "orten").length,
    zertiros: userCharacters.filter((c) => c.server.toLowerCase() === "zertiros").length,
  };

  // Envio do Formulário de Conta (Registro ou Login)
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!accountForm.account || !accountForm.password) {
      setFeedbackType("error");
      setFormFeedback("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (accountMode === "register" && accountForm.confirmPassword && accountForm.password !== accountForm.confirmPassword) {
      setFeedbackType("error");
      setFormFeedback("As senhas digitadas não coincidem.");
      return;
    }

    setIsSubmitting(true);
    setFormFeedback(null);

    try {
      if (accountMode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account: accountForm.account,
            email: accountForm.email,
            password: accountForm.password,
            server: selectedServer,
            starterPokemon: currentStarter.name,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setFeedbackType("success");
          setFormFeedback(data.message || "Conta criada com sucesso! Faça login abaixo para acessar o painel.");
          setAccountMode("login");
          setAccountForm({ account: accountForm.account, email: "", password: "", confirmPassword: "" });
        } else {
          setFeedbackType("error");
          setFormFeedback(data.message || "Não foi possível criar a conta.");
        }
      } else {
        // Modo Login
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            account: accountForm.account,
            password: accountForm.password,
            server: selectedServer,
          }),
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setCurrentUser(data.account);
          setUserCharacters(data.players || []);
          setFormFeedback(null);
        } else {
          setFeedbackType("error");
          setFormFeedback(data.message || "Conta ou senha incorretos.");
        }
      }
    } catch {
      setFeedbackType("error");
      setFormFeedback("Erro de conexão ao tentar se comunicar com o servidor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Criação de Personagem Adicional (Dentro da Conta Logada)
  const handleCreateExtraCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!newCharName.trim()) {
      setCharFeedback({ type: "error", message: "Informe um nome para o seu personagem." });
      return;
    }

    setIsCreatingChar(true);
    setCharFeedback(null);

    try {
      const res = await fetch("/api/players/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accountId: currentUser.id,
          characterName: newCharName.trim(),
          server: newCharServer,
          starterPokemon: newCharCurrentStarter.name,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setCharFeedback({
          type: "success",
          message: `Personagem "${newCharName.trim()}" criado com sucesso no servidor ${newCharServer.toUpperCase()} com o inicial ${newCharCurrentStarter.name}!`,
        });
        setNewCharName("");
        if (data.players) {
          setUserCharacters(data.players);
        }
      } else {
        setCharFeedback({
          type: "error",
          message: data.message || "Não foi possível criar o personagem.",
        });
      }
    } catch {
      setCharFeedback({
        type: "error",
        message: "Erro de comunicação ao criar o personagem.",
      });
    } finally {
      setIsCreatingChar(false);
    }
  };

  // Logout do Treinador
  const handleLogout = () => {
    setCurrentUser(null);
    setUserCharacters([]);
    setAccountForm({ account: "", email: "", password: "", confirmPassword: "" });
    setFormFeedback(null);
    setCharFeedback(null);
    setAccountMode("login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030509] text-zinc-100 selection:bg-purple-600 selection:text-white">
      {/* ========================================================================= */}
      {/* 1. CABEÇALHO / NAVBAR (PALETA: ROXO, AZUL E PRETO)                         */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-900/40 bg-[#030509]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Marca (Estilo Master Ball / Místico) */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-full bg-gradient-to-b from-purple-500 via-indigo-600 to-blue-500 p-[2px] shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full rounded-full bg-[#070a14] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-r from-purple-600 to-indigo-700" />
                <div className="absolute top-1 left-1.5 w-2 h-2 rounded-full bg-blue-400/80 blur-[0.5px]" />
                <div className="absolute top-1 right-1.5 w-2 h-2 rounded-full bg-blue-400/80 blur-[0.5px]" />
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[3px] bg-black z-10" />
                <div className="relative z-20 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                PokéTibia
              </span>
              <span className="block text-[10px] tracking-widest text-indigo-300 font-semibold uppercase">
                Online MMORPG
              </span>
            </div>
          </a>

          {/* Menu Principal (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-[#090d1a]/80 p-1.5 rounded-full border border-purple-900/50 shadow-inner">
            <a
              href="#home"
              onClick={() => setActiveTab("home")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "home"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/40"
                  : "text-zinc-300 hover:text-cyan-300 hover:bg-purple-950/40"
              }`}
            >
              Home
            </a>
            <a
              href="#minha-conta"
              onClick={() => setActiveTab("conta")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === "conta"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/40"
                  : "text-zinc-300 hover:text-cyan-300 hover:bg-purple-950/40"
              }`}
            >
              <span>Minha Conta</span>
              {currentUser && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
              )}
            </a>
            <a
              href="#download"
              onClick={() => setActiveTab("download")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "download"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/40"
                  : "text-zinc-300 hover:text-cyan-300 hover:bg-purple-950/40"
              }`}
            >
              Download
            </a>
            <a
              href="#informacao"
              onClick={() => setActiveTab("info")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeTab === "info"
                  ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-lg shadow-purple-600/40"
                  : "text-zinc-300 hover:text-cyan-300 hover:bg-purple-950/40"
              }`}
            >
              Informação
            </a>
          </nav>

          {/* Status do Servidor + Botão Rápido / Usuário */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/50 border border-cyan-500/30 text-xs font-medium text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
              <span>{activeServerData.name}: <strong className="text-white">{activeServerData.online}</strong> Online</span>
            </div>

            {currentUser ? (
              <div className="flex items-center gap-3">
                <a
                  href="#minha-conta"
                  onClick={() => setActiveTab("conta")}
                  className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-[#090e1f] border border-cyan-500/40 text-xs font-bold text-white hover:border-cyan-400 transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-xs">
                    🎮
                  </div>
                  <span>{currentUser.name}</span>
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-xl bg-red-950/40 border border-red-800/40 hover:bg-red-900/60 text-red-300 text-xs font-bold transition-all"
                >
                  Sair
                </button>
              </div>
            ) : (
              <a
                href="#minha-conta"
                onClick={() => {
                  setActiveTab("conta");
                  setAccountMode("register");
                }}
                className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-purple-900/40 hover:shadow-cyan-500/30 transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Jogar Agora
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>
            )}
          </div>

          {/* Botão Hambúrguer (Mobile) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#0a0f1d] border border-purple-900/60 text-zinc-300 hover:text-cyan-300 focus:outline-none"
            aria-label="Abrir Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-purple-900/40 bg-[#060913] px-4 pt-3 pb-5 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <a
              href="#home"
              onClick={() => {
                setActiveTab("home");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-zinc-200 hover:bg-purple-950/40 hover:text-cyan-300"
            >
              Home
            </a>
            <a
              href="#minha-conta"
              onClick={() => {
                setActiveTab("conta");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-zinc-200 hover:bg-purple-950/40 hover:text-cyan-300"
            >
              Minha Conta {currentUser ? `(${currentUser.name})` : ""}
            </a>
            <a
              href="#download"
              onClick={() => {
                setActiveTab("download");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-zinc-200 hover:bg-purple-950/40 hover:text-cyan-300"
            >
              Download
            </a>
            <a
              href="#informacao"
              onClick={() => {
                setActiveTab("info");
                setMobileMenuOpen(false);
              }}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold text-zinc-200 hover:bg-purple-950/40 hover:text-cyan-300"
            >
              Informação
            </a>
            <div className="pt-2 border-t border-purple-900/40 flex items-center justify-between">
              <span className="text-xs text-cyan-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Servidor {activeServerData.name} ({activeServerData.online} Online)
              </span>
              <a
                href="#minha-conta"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold uppercase tracking-wider"
              >
                Entrar / Cadastrar
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* 2. SEÇÃO HOME / HERO                                                      */}
      {/* ========================================================================= */}
      <section id="home" className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-purple-700/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-36 right-10 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-10 w-[400px] h-[400px] bg-indigo-700/15 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0e1c]/90 border border-purple-500/30 text-xs font-semibold text-zinc-300 mb-6 shadow-lg shadow-purple-950/40">
              <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-[10px] font-bold uppercase tracking-wider">
                Temporada 2026
              </span>
              <span className="text-zinc-300">Novas Quests, Pokémons Shiny & Sistema de Torneios!</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
              O Maior Servidor de{" "}
              <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">
                PokéTibia
              </span>{" "}
              do Brasil
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-zinc-300 leading-relaxed">
              Explore um mundo aberto repleto de mistérios, batalhas táticas em tempo real,
              ginásios desafiadores e torneios com prêmios reais. Junte-se a centenas de treinadores agora mesmo!
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#download"
                onClick={() => setActiveTab("download")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-base shadow-xl shadow-purple-600/30 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar Cliente Oficial
              </a>

              <a
                href="#minha-conta"
                onClick={() => {
                  setActiveTab("conta");
                  setAccountMode("register");
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#080d1a] border border-purple-800/60 hover:border-cyan-400 text-zinc-200 hover:text-white font-bold text-base hover:bg-purple-950/30 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Criar Conta Grátis
              </a>
            </div>
          </div>

          {/* Cards de Métricas / Status Rápido */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#060914]/90 border border-purple-900/40 backdrop-blur-sm text-center shadow-lg shadow-black/60">
              <div className="text-3xl font-black text-cyan-400">400+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Jogadores Online</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#060914]/90 border border-purple-900/40 backdrop-blur-sm text-center shadow-lg shadow-black/60">
              <div className="text-3xl font-black text-purple-400">800+</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Pokémons & Shinies</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#060914]/90 border border-purple-900/40 backdrop-blur-sm text-center shadow-lg shadow-black/60">
              <div className="text-3xl font-black text-blue-400">5x</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Rate de EXP Equilibrada</div>
            </div>
            <div className="p-5 rounded-2xl bg-[#060914]/90 border border-purple-900/40 backdrop-blur-sm text-center shadow-lg shadow-black/60">
              <div className="text-3xl font-black text-indigo-300">99.9%</div>
              <div className="text-xs font-medium text-zinc-400 uppercase tracking-wider mt-1">Uptime & Proteção DDoS</div>
            </div>
          </div>

          {/* Destaques do Servidor */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0e1c] to-[#04060c] border border-purple-900/50 hover:border-purple-500/60 transition-all group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/40 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Batalhas e Ginásios</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Derrote os 8 Líderes de Ginásio oficiais de Kanto e Johto, dispute as insígnias e ganhe acesso à Elite Four.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0e1c] to-[#04060c] border border-blue-900/50 hover:border-blue-500/60 transition-all group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V4a2 2 0 10-2 2h2m0 0h4m-4 0H8" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Quests Lendárias</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Dungeons temáticas com puzzles, Bosses de raid como Mewtwo, Lugia e Rayquaza, com recompensas raras.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-[#0a0e1c] to-[#04060c] border border-indigo-900/50 hover:border-cyan-500/60 transition-all group shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Torneios PvP & Clãs</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                Participe de ligas semanais com sistema de ELO, guerras de territórios e guildas de treinadores competitivos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SEÇÃO: MINHA CONTA / PAINEL (PALETA: ROXO, AZUL E PRETO)               */}
      {/* ========================================================================= */}
      <section id="minha-conta" className="py-20 bg-[#04060d] border-t border-purple-950/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Painel do Treinador</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
              {currentUser ? `Bem-vindo, Treinador ${currentUser.name}` : "Minha Conta"}
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mt-2 text-sm">
              {currentUser
                ? "Gerencie seus personagens, crie novos heróis e acompanhe o progresso em cada servidor."
                : "Crie sua conta para iniciar sua jornada ou faça login para gerenciar seus personagens e pontos VIP."}
            </p>
          </div>

          {/* ===================================================================== */}
          {/* CASO 1: USUÁRIO LOGADO - PAINEL COMPLETO COM PERSONAGENS E MUNDOS     */}
          {/* ===================================================================== */}
          {currentUser ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Card de Informações da Conta & Resumo */}
              <div className="bg-[#070b16]/95 border border-purple-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-purple-950">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-500 p-0.5 shadow-lg shadow-purple-600/30">
                      <div className="w-full h-full rounded-[14px] bg-[#070a14] flex items-center justify-center text-3xl">
                        🧢
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-2xl font-black text-white">{currentUser.name}</h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-700/50 text-[11px] font-bold text-purple-300 uppercase">
                          Conta Ativa
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {currentUser.email ? currentUser.email : "Sem e-mail cadastrado"} • {currentUser.premdays} Dias VIP
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-5 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-red-300 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
                  >
                    <span>Encerrar Sessão</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>

                {/* Métricas: Quantos Personagens e em Quais Mundos */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                  {/* Card 1: Quantos Personagens Tem */}
                  <div className="p-4 rounded-2xl bg-[#03050a] border border-purple-950">
                    <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Total de Personagens
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-black text-cyan-400">{userCharacters.length}</span>
                      <span className="text-xs text-zinc-500">personagem(ns) criado(s)</span>
                    </div>
                  </div>

                  {/* Card 2: Em quais Mundos tem Personagens */}
                  <div className="p-4 rounded-2xl bg-[#03050a] border border-purple-950 sm:col-span-2">
                    <span className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-2">
                      Mundos Onde Possui Personagens
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {(["valaria", "orten", "zertiros"] as const).map((srvKey) => {
                        const count = serverCounts[srvKey];
                        const hasChar = count > 0;
                        const srv = SERVERS[srvKey];
                        return (
                          <div
                            key={srvKey}
                            className={`px-3 py-1.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
                              hasChar
                                ? "bg-purple-950/60 border-cyan-500/40 text-white font-bold"
                                : "bg-[#050812] border-purple-950/40 text-zinc-500 font-medium"
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full ${hasChar ? "bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-zinc-700"}`} />
                            <span className="capitalize">{srv.name} ({srv.pvpType})</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${hasChar ? "bg-cyan-950 text-cyan-300 font-bold" : "bg-zinc-900 text-zinc-600"}`}>
                              {count} {count === 1 ? "char" : "chars"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid: Meus Personagens (Esquerda) & Criar Novo Personagem (Direita) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* LISTA DE PERSONAGENS EXISTENTES (7 COLUNAS) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Meus Personagens</span>
                      <span className="px-2 py-0.5 rounded-md bg-purple-950 text-xs text-cyan-300 font-semibold">
                        {userCharacters.length}
                      </span>
                    </h3>
                  </div>

                  {userCharacters.length === 0 ? (
                    <div className="p-8 rounded-3xl bg-[#070b16]/60 border border-purple-950 text-center space-y-3">
                      <div className="text-4xl">🎒</div>
                      <h4 className="text-base font-bold text-white">Nenhum personagem criado ainda</h4>
                      <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                        Crie seu primeiro personagem no formulário ao lado escolhendo seu servidor e seu Pokémon inicial!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {userCharacters.map((char) => {
                        const starterObj = STARTER_POKEMON.find(
                          (p) => p.name.toLowerCase() === char.pokemon.toLowerCase()
                        );
                        return (
                          <div
                            key={char.id}
                            className="p-4 rounded-2xl bg-[#070b16]/90 border border-purple-900/40 hover:border-cyan-500/50 transition-all flex items-center justify-between gap-4 group shadow-lg"
                          >
                            <div className="flex items-center gap-3.5">
                              {/* Foto do Pokémon Inicial */}
                              <div className="w-14 h-14 rounded-xl bg-purple-950/80 border border-purple-800/60 p-1 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform overflow-hidden shrink-0">
                                {starterObj ? (
                                  <img
                                    src={starterObj.image}
                                    alt={starterObj.name}
                                    className="w-full h-full object-contain drop-shadow"
                                  />
                                ) : (
                                  <span className="text-2xl">⚡</span>
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-white text-base group-hover:text-cyan-300 transition-colors">
                                    {char.name}
                                  </span>
                                  <span className="px-2 py-0.5 rounded-md bg-purple-950 border border-purple-800/50 text-[10px] font-bold text-cyan-300 uppercase">
                                    Lvl {char.level || 1}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                                  <span>Mundo: <strong className="text-indigo-300 capitalize">{char.server}</strong></span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <span>{starterObj?.elementIcon}</span>
                                    <span>{char.pokemon}</span>
                                  </span>
                                </div>
                              </div>
                            </div>

                            <span className="px-3 py-1 rounded-full bg-blue-950/60 border border-cyan-500/30 text-cyan-300 text-[11px] font-semibold">
                              Pronto para Jogar
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* FORMULÁRIO DE CRIAÇÃO DE PERSONAGEM ADICIONAL (5 COLUNAS) */}
                <div className="lg:col-span-5 bg-[#070b16]/95 border border-purple-900/60 rounded-3xl p-6 shadow-2xl">
                  <div className="mb-5 pb-4 border-b border-purple-950">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                      Disponível na sua conta
                    </span>
                    <h3 className="text-xl font-black text-white mt-0.5">Criar Novo Personagem</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Escolha o servidor e o seu Pokémon inicial até a 7ª geração.
                    </p>
                  </div>

                  {charFeedback && (
                    <div
                      className={`mb-4 p-3.5 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${
                        charFeedback.type === "success"
                          ? "bg-emerald-950/80 border-emerald-500/40 text-emerald-300"
                          : "bg-red-950/80 border-red-500/40 text-red-300"
                      }`}
                    >
                      <span className="shrink-0 text-sm">
                        {charFeedback.type === "success" ? "✓" : "✕"}
                      </span>
                      <span className="leading-relaxed">{charFeedback.message}</span>
                    </div>
                  )}

                  <form onSubmit={handleCreateExtraCharacter} className="space-y-4">
                    {/* Nome do Personagem */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Nome do Personagem (Char)
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Red Champion"
                        value={newCharName}
                        onChange={(e) => setNewCharName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-[#03050a] border border-purple-900/50 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-sm transition-all"
                      />
                    </div>

                    {/* Escolha do Servidor */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
                        Selecione o Mundo
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(["valaria", "orten", "zertiros"] as const).map((srvKey) => {
                          const srv = SERVERS[srvKey];
                          const isSelected = newCharServer === srvKey;
                          return (
                            <button
                              key={srvKey}
                              type="button"
                              onClick={() => setNewCharServer(srvKey)}
                              className={`p-2.5 rounded-xl border text-left transition-all ${
                                isSelected
                                  ? "border-cyan-400 bg-purple-950/70 ring-2 ring-cyan-400/40 text-white shadow"
                                  : "border-purple-950 bg-[#03050a] text-zinc-400 hover:border-purple-800 hover:text-zinc-200"
                              }`}
                            >
                              <span className="block text-xs font-bold text-white capitalize">{srv.name}</span>
                              <span className="block text-[9px] text-cyan-300 font-semibold">{srv.pvpType}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Aba Expansível: Escolha do Pokémon Inicial */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                          Pokémon Inicial (Gen 1 ao 7)
                        </label>
                        <span className="text-[10px] text-cyan-400 font-medium">21 Opções com Foto</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsNewCharStarterOpen(!isNewCharStarterOpen)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#03050a] border border-purple-900/60 hover:border-cyan-400 text-left flex items-center justify-between transition-all group focus:outline-none"
                      >
                        <div className="flex items-center gap-3">
                          {/* FOTO DO POKÉMON */}
                          <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-800/60 p-1 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
                            <img
                              src={newCharCurrentStarter.image}
                              alt={newCharCurrentStarter.name}
                              className="w-full h-full object-contain drop-shadow"
                            />
                          </div>
                          <div>
                            {/* NOME COM SÍMBOLO PEQUENO DO ELEMENTO */}
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs">{newCharCurrentStarter.elementIcon}</span>
                              <span className="text-white font-bold text-xs group-hover:text-cyan-300">
                                {newCharCurrentStarter.name}
                              </span>
                            </div>
                            <span className="block text-[10px] text-zinc-400">
                              {newCharCurrentStarter.gen}ª Geração ({newCharCurrentStarter.region}) • {newCharCurrentStarter.type}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-indigo-300 font-semibold">
                          <span>{isNewCharStarterOpen ? "Fechar" : "Trocar"}</span>
                          <span className={`transition-transform duration-200 ${isNewCharStarterOpen ? "rotate-180 text-cyan-400" : ""}`}>
                            ▼
                          </span>
                        </div>
                      </button>

                      {/* Dropdown com os 21 Iniciais com Fotos */}
                      {isNewCharStarterOpen && (
                        <div className="mt-2 rounded-2xl bg-[#040712] border border-purple-800/80 p-3 shadow-2xl animate-in fade-in duration-200">
                          {/* Grid dos Iniciais */}
                          <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                            {[1, 2, 3, 4, 5, 6, 7].map((gen) => {
                              const genStarters = STARTER_POKEMON.filter((p) => p.gen === gen);
                              return (
                                <div key={gen}>
                                  <span className="text-[10px] font-bold text-indigo-300 uppercase px-1">
                                    {gen}ª Gen ({genStarters[0]?.region})
                                  </span>
                                  <div className="grid grid-cols-3 gap-1.5 mt-1">
                                    {genStarters.map((pokemon) => {
                                      const isSelected = newCharStarterId === pokemon.id;
                                      return (
                                        <button
                                          key={pokemon.id}
                                          type="button"
                                          onClick={() => {
                                            setNewCharStarterId(pokemon.id);
                                            setIsNewCharStarterOpen(false);
                                          }}
                                          className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center justify-center group/poke ${
                                            isSelected
                                              ? "border-cyan-400 bg-purple-950/80 text-white shadow ring-1 ring-cyan-400/40"
                                              : "border-purple-950 bg-[#03050a] text-zinc-300 hover:border-purple-700 hover:bg-purple-950/30"
                                          }`}
                                        >
                                          {/* FOTO DO POKÉMON */}
                                          <div className="w-12 h-12 p-0.5 mb-1 flex items-center justify-center">
                                            <img
                                              src={pokemon.image}
                                              alt={pokemon.name}
                                              className="w-full h-full object-contain drop-shadow group-hover/poke:scale-110 transition-transform"
                                            />
                                          </div>
                                          {/* NOME COM SÍMBOLO DO ELEMENTO PEQUENO */}
                                          <span className="text-[11px] font-bold truncate w-full flex items-center justify-center gap-1">
                                            <span className="text-[10px]">{pokemon.elementIcon}</span>
                                            <span>{pokemon.name}</span>
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isCreatingChar}
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {isCreatingChar ? (
                        <>
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          <span>Criando Personagem...</span>
                        </>
                      ) : (
                        "Criar Personagem & Adicionar à Conta"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            /* ===================================================================== */
            /* CASO 2: USUÁRIO DESLOGADO - FORMULÁRIO DE CONTA COM ESCOLHA DE INICIAL*/
            /* ===================================================================== */
            <div className="bg-[#070b16]/90 border border-purple-900/50 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-black/80 backdrop-blur-md max-w-xl mx-auto">
              {/* Abas Criar Conta / Entrar */}
              <div className="flex rounded-xl bg-[#020409] p-1.5 border border-purple-950 mb-8">
                <button
                  type="button"
                  onClick={() => {
                    setAccountMode("register");
                    setFormFeedback(null);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    accountMode === "register"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-950/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Criar Nova Conta
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAccountMode("login");
                    setFormFeedback(null);
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${
                    accountMode === "login"
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md shadow-purple-950/40"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Entrar na Conta
                </button>
              </div>

              {/* Mensagem de Feedback Dinâmica */}
              {formFeedback && (
                <div
                  className={`mb-6 p-4 rounded-xl border text-sm flex items-start gap-3 transition-all ${
                    feedbackType === "success"
                      ? "bg-emerald-950/70 border-emerald-500/40 text-emerald-300"
                      : feedbackType === "warning"
                      ? "bg-amber-950/70 border-amber-500/40 text-amber-300"
                      : "bg-red-950/70 border-red-500/40 text-red-300"
                  }`}
                >
                  <span className="text-base shrink-0">
                    {feedbackType === "success" ? "✓" : feedbackType === "warning" ? "⚠️" : "✕"}
                  </span>
                  <span className="leading-relaxed">{formFeedback}</span>
                </div>
              )}

              <form onSubmit={handleAccountSubmit} className="space-y-5">
                {/* Escolha do Servidor / Mundo (Valaria, Orten, Zertiros) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                      Selecione o Servidor / Mundo
                    </label>
                    <span className="text-[11px] text-cyan-400 font-semibold">
                      {activeServerData.name} ({activeServerData.pvpType})
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    {(["valaria", "orten", "zertiros"] as const).map((srvKey) => {
                      const srv = SERVERS[srvKey];
                      const isSelected = selectedServer === srvKey;
                      return (
                        <button
                          key={srvKey}
                          type="button"
                          onClick={() => setSelectedServer(srvKey)}
                          className={`p-3 rounded-xl border text-left transition-all relative ${
                            isSelected
                              ? "border-cyan-400 bg-purple-950/70 ring-2 ring-cyan-400/40 text-white shadow-lg shadow-purple-900/30"
                              : "border-purple-950 bg-[#03050a] text-zinc-400 hover:border-purple-800 hover:text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-bold text-white">{srv.name}</span>
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          </div>
                          <span className="block text-[10px] text-cyan-300 font-semibold">{srv.pvpType}</span>
                          <span className="block text-[10px] text-zinc-400 mt-0.5">{srv.online} online</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Nome da Conta (Username)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: AshKetchum"
                    value={accountForm.account}
                    onChange={(e) => setAccountForm({ ...accountForm, account: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#03050a] border border-purple-900/50 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
                  />
                </div>

                {accountMode === "register" && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                      E-mail do Treinador
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="treinador@exemplo.com"
                      value={accountForm.email}
                      onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#03050a] border border-purple-900/50 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={accountForm.password}
                    onChange={(e) => setAccountForm({ ...accountForm, password: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#03050a] border border-purple-900/50 text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-purple-500/20 text-sm transition-all"
                  />
                </div>

                {/* Escolha do Pokémon Inicial ao Registrar (Com Fotos Oficiais e Símbolo do Elemento) */}
                {accountMode === "register" && (
                  <div className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Escolha seu Pokémon Inicial (1ª à 7ª Geração)
                      </label>
                      <span className="text-[11px] text-cyan-400 font-medium">21 Iniciais com Foto</span>
                    </div>

                    {/* Barra / Aba de Texto que abre e fecha com Foto do Inicial */}
                    <button
                      type="button"
                      onClick={() => setIsStarterMenuOpen(!isStarterMenuOpen)}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#03050a] border border-purple-900/60 hover:border-cyan-400/80 text-left flex items-center justify-between transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
                    >
                      <div className="flex items-center gap-3.5">
                        {/* FOTO DO POKÉMON ATUAL */}
                        <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 p-1 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
                          <img
                            src={currentStarter.image}
                            alt={currentStarter.name}
                            className="w-full h-full object-contain drop-shadow group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          {/* SÍMBOLO PEQUENO DO ELEMENTO NA FRENTE DO NOME */}
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                              <span className="text-xs">{currentStarter.elementIcon}</span>
                              <span>{currentStarter.name}</span>
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                                currentStarter.type === "Fogo"
                                  ? "bg-orange-950/80 text-orange-400 border border-orange-500/30"
                                  : currentStarter.type === "Água"
                                  ? "bg-blue-950/80 text-cyan-400 border border-cyan-500/30"
                                  : "bg-emerald-950/80 text-emerald-400 border border-emerald-500/30"
                              }`}
                            >
                              {currentStarter.type}
                            </span>
                          </div>
                          <span className="block text-[11px] text-zinc-400">
                            {currentStarter.gen}ª Geração • Região de {currentStarter.region}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-indigo-300 font-semibold hidden sm:inline">
                          {isStarterMenuOpen ? "Fechar Lista" : "Trocar Inicial"}
                        </span>
                        <div
                          className={`w-8 h-8 rounded-lg bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-xs transition-transform duration-200 ${
                            isStarterMenuOpen ? "rotate-180 text-cyan-400 border-cyan-500/40" : "text-zinc-400"
                          }`}
                        >
                          ▼
                        </div>
                      </div>
                    </button>

                    {/* Painel que abre com os Pokémons da 1ª à 7ª Geração (FOTOS + SÍMBOLO NA FRENTE DO NOME) */}
                    {isStarterMenuOpen && (
                      <div className="mt-2 rounded-2xl bg-[#050813] border border-purple-800/80 p-4 shadow-2xl shadow-black animate-in fade-in duration-200">
                        {/* Filtros rápidos por Geração */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 border-b border-purple-950 text-xs no-scrollbar">
                          <button
                            type="button"
                            onClick={() => setStarterGenFilter("all")}
                            className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
                              starterGenFilter === "all"
                                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                                : "bg-[#03050a] text-zinc-400 hover:text-white border border-purple-950"
                            }`}
                          >
                            Todas
                          </button>
                          {[1, 2, 3, 4, 5, 6, 7].map((gen) => (
                            <button
                              key={gen}
                              type="button"
                              onClick={() => setStarterGenFilter(gen)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold shrink-0 transition-all ${
                                starterGenFilter === gen
                                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow"
                                  : "bg-[#03050a] text-zinc-400 hover:text-white border border-purple-950"
                              }`}
                            >
                              Gen {gen}
                            </button>
                          ))}
                        </div>

                        {/* Lista rolável de Pokémons Iniciais com FOTOS */}
                        <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
                          {[1, 2, 3, 4, 5, 6, 7]
                            .filter((gen) => starterGenFilter === "all" || starterGenFilter === gen)
                            .map((gen) => {
                              const genStarters = STARTER_POKEMON.filter((p) => p.gen === gen);
                              const regionName = genStarters[0]?.region || "";

                              return (
                                <div key={gen} className="space-y-1.5">
                                  <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider flex items-center justify-between px-1">
                                    <span>{gen}ª Geração ({regionName})</span>
                                    <span className="text-zinc-500 font-normal">3 Iniciais</span>
                                  </div>

                                  <div className="grid grid-cols-3 gap-2">
                                    {genStarters.map((pokemon) => {
                                      const isSelected = selectedStarterId === pokemon.id;
                                      return (
                                        <button
                                          key={pokemon.id}
                                          type="button"
                                          onClick={() => {
                                            setSelectedStarterId(pokemon.id);
                                            setIsStarterMenuOpen(false);
                                          }}
                                          className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center relative group/poke ${
                                            isSelected
                                              ? "border-cyan-400 bg-purple-950/80 ring-2 ring-cyan-400/40 text-white shadow-lg shadow-cyan-500/20"
                                              : "border-purple-950 bg-[#03050a] text-zinc-300 hover:border-purple-700 hover:bg-purple-950/30"
                                          }`}
                                        >
                                          {/* FOTO DO POKÉMON */}
                                          <div className="w-14 h-14 p-1 mb-1 flex items-center justify-center">
                                            <img
                                              src={pokemon.image}
                                              alt={pokemon.name}
                                              className="w-full h-full object-contain drop-shadow group-hover/poke:scale-110 transition-transform"
                                            />
                                          </div>

                                          {/* NOME COM SÍMBOLO DO ELEMENTO PEQUENO NA FRENTE */}
                                          <span className="text-xs font-bold block truncate w-full flex items-center justify-center gap-1">
                                            <span className="text-[11px]">{pokemon.elementIcon}</span>
                                            <span>{pokemon.name}</span>
                                          </span>

                                          <span
                                            className={`text-[9px] font-semibold uppercase mt-0.5 px-1.5 py-0.2 rounded ${
                                              pokemon.type === "Fogo"
                                                ? "text-orange-400 bg-orange-950/50"
                                                : pokemon.type === "Água"
                                                ? "text-cyan-400 bg-blue-950/50"
                                                : "text-emerald-400 bg-emerald-950/50"
                                            }`}
                                          >
                                            {pokemon.type}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                        </div>

                        <div className="mt-3 pt-2 border-t border-purple-950 flex items-center justify-between text-[11px] text-zinc-400">
                          <span>Clique na foto do Pokémon para selecioná-lo</span>
                          <button
                            type="button"
                            onClick={() => setIsStarterMenuOpen(false)}
                            className="text-cyan-400 font-semibold hover:underline"
                          >
                            Concluir Escolha
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-purple-900/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                      <span>Processando...</span>
                    </>
                  ) : accountMode === "register" ? (
                    "Concluir Cadastro & Jogar"
                  ) : (
                    "Entrar no Painel"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SEÇÃO: DOWNLOAD (WINDOWS - PALETA ROXO, AZUL E PRETO)                   */}
      {/* ========================================================================= */}
      <section id="download" className="py-20 border-t border-purple-950/60 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Comece a Jogar</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Download do Cliente</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mt-2 text-sm">
              Baixe o cliente oficial do PokéTibia para computador Windows e jogue gratuitamente com alto desempenho.
            </p>
          </div>

          <div className="max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-[#090d1c] via-[#060913] to-[#020409] border border-purple-900/50 shadow-2xl shadow-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 mb-6 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-700 to-blue-600 p-0.5 shadow-lg shadow-purple-600/30 flex items-center justify-center text-white">
                  <div className="w-full h-full rounded-[14px] bg-[#070a14] flex items-center justify-center text-cyan-400">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-extrabold text-white">Cliente Oficial Windows</h3>
                  <p className="text-xs text-indigo-300">Versão 2026 • 60 FPS • Auto-Updater</p>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full bg-blue-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                Recomendado
              </span>
            </div>

            <p className="text-zinc-300 text-sm leading-relaxed mb-6 relative z-10">
              Cliente otimizado com suporte a som estéreo, efeitos de iluminação remasterizados, hotkeys personalizáveis e compatibilidade nativa com DirectX e OpenGL.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#03050a] border border-purple-950 mb-8 text-xs text-zinc-300 relative z-10">
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Windows 10 / 11
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> DirectX 11 / OpenGL
              </div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-bold">✓</span> Tamanho: ~120 MB
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 relative z-10">
              <a
                href="#download"
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar Instalador (.exe)
              </a>

              <a
                href="#download"
                className="py-4 px-6 rounded-xl bg-[#03050a] border border-purple-900/60 text-zinc-300 hover:text-cyan-300 hover:border-cyan-500/50 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Versão Portátil (.zip)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SEÇÃO: INFORMAÇÃO & PÓDIO (PALETA ROXO, AZUL E PRETO)                   */}
      {/* ========================================================================= */}
      <section id="informacao" className="py-20 bg-[#04060d] border-t border-purple-950/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">Hall da Fama</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white mt-2">Pódio dos Melhores Treinadores</h2>
            <p className="text-zinc-400 max-w-xl mx-auto mt-3 text-sm">
              Os maiores mestres de PokéTibia por servidor. Escolha o mundo para ver a liderança da temporada!
            </p>

            {/* Seletor de Servidor para o Ranking (Valaria, Orten, Zertiros) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {(["valaria", "orten", "zertiros"] as const).map((srvKey) => {
                const srv = SERVERS[srvKey];
                const isSelected = selectedServer === srvKey;
                return (
                  <button
                    key={srvKey}
                    type="button"
                    onClick={() => setSelectedServer(srvKey)}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl shadow-purple-900/40 ring-2 ring-cyan-400/50 scale-105"
                        : "bg-[#060914] text-zinc-400 hover:text-white border border-purple-950 hover:border-purple-800"
                    }`}
                  >
                    <span>Mundo {srv.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-black/40 text-[10px] font-semibold text-cyan-300">
                      {srv.pvpType}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-xs text-indigo-300 font-medium">
              Exibindo ranking do servidor: <strong className="text-white">{activeServerData.name}</strong> • {activeServerData.description}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* PÓDIO TOP 3 (1º, 2º e 3º LUGAR) - DINÂMICO                            */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end max-w-4xl mx-auto mb-16">
            {/* 2º LUGAR (AZUL / PRATA) */}
            <div className="order-2 md:order-1 flex flex-col items-center">
              <div className="relative mb-3 flex flex-col items-center">
                <span className="text-3xl mb-1">🥈</span>
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-400 via-indigo-300 to-cyan-300 p-1 shadow-lg shadow-blue-500/30">
                  <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center text-2xl font-black text-cyan-300">
                    {activeServerData.topPlayers.second.initials}
                  </div>
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-blue-950 text-[10px] font-bold text-cyan-300 uppercase tracking-wide border border-cyan-500/40">
                  #2 Lugar
                </span>
              </div>

              <div className="w-full p-6 rounded-2xl bg-gradient-to-b from-[#080d1a] to-[#03050a] border border-blue-800/50 text-center shadow-lg pt-8">
                <h4 className="text-lg font-bold text-white">{activeServerData.topPlayers.second.name}</h4>
                <div className="text-xs font-semibold text-cyan-400/90 mt-0.5">Guild: {activeServerData.topPlayers.second.guild}</div>

                <div className="mt-4 pt-4 border-t border-blue-950 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Nível:</span>
                    <strong className="text-cyan-300 font-bold">Level {activeServerData.topPlayers.second.level}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Principal:</span>
                    <strong className="text-blue-400 font-semibold">{activeServerData.topPlayers.second.pokemon}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>PvP:</span>
                    <strong className="text-cyan-400 font-bold">{activeServerData.topPlayers.second.wins} Vitórias</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 1º LUGAR (ROXO & AZUL MASTER - CAMPEÃO) */}
            <div className="order-1 md:order-2 flex flex-col items-center -mt-6">
              <div className="relative mb-3 flex flex-col items-center">
                <span className="text-4xl animate-bounce mb-1">👑</span>
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-300 to-cyan-400 p-1.5 shadow-2xl shadow-purple-500/40">
                  <div className="w-full h-full rounded-full bg-[#0a071c] flex items-center justify-center text-3xl font-black text-cyan-300">
                    {activeServerData.topPlayers.first.initials}
                  </div>
                </div>
                <span className="absolute -bottom-2 px-3 py-0.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-[10px] font-extrabold text-white uppercase tracking-wider shadow">
                  #1 Campeão
                </span>
              </div>

              <div className="w-full p-7 rounded-2xl bg-gradient-to-b from-[#0e0924] via-[#080a18] to-[#020409] border-2 border-purple-500/60 text-center shadow-2xl shadow-purple-900/30 pt-9 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-purple-950/80 border border-purple-400/50 text-[10px] font-bold text-purple-300 uppercase tracking-widest">
                  Mestre de {activeServerData.name}
                </div>
                <h4 className="text-2xl font-black text-white">{activeServerData.topPlayers.first.name}</h4>
                <div className="text-xs font-semibold text-purple-300 mt-0.5">Guild: {activeServerData.topPlayers.first.guild}</div>

                <div className="mt-5 pt-4 border-t border-purple-900/50 space-y-2.5 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Nível:</span>
                    <strong className="text-cyan-300 font-black text-sm">Level {activeServerData.topPlayers.first.level}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Principal:</span>
                    <strong className="text-purple-400 font-bold">{activeServerData.topPlayers.first.pokemon}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>PvP:</span>
                    <strong className="text-blue-400 font-bold">{activeServerData.topPlayers.first.wins} Vitórias</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 3º LUGAR (ROXO / ÍNDIGO) */}
            <div className="order-3 flex flex-col items-center">
              <div className="relative mb-3 flex flex-col items-center">
                <span className="text-3xl mb-1">🥉</span>
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-purple-900 p-1 shadow-lg shadow-purple-800/30">
                  <div className="w-full h-full rounded-full bg-[#0b081a] flex items-center justify-center text-2xl font-black text-purple-300">
                    {activeServerData.topPlayers.third.initials}
                  </div>
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full bg-purple-950 text-[10px] font-bold text-purple-300 uppercase tracking-wide border border-purple-800">
                  #3 Lugar
                </span>
              </div>

              <div className="w-full p-6 rounded-2xl bg-gradient-to-b from-[#0b081a] to-[#03050a] border border-purple-900/50 text-center shadow-lg pt-8">
                <h4 className="text-lg font-bold text-white">{activeServerData.topPlayers.third.name}</h4>
                <div className="text-xs font-semibold text-indigo-300 mt-0.5">Guild: {activeServerData.topPlayers.third.guild}</div>

                <div className="mt-4 pt-4 border-t border-purple-950 space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Nível:</span>
                    <strong className="text-indigo-300 font-bold">Level {activeServerData.topPlayers.third.level}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Principal:</span>
                    <strong className="text-purple-400 font-semibold">{activeServerData.topPlayers.third.pokemon}</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>PvP:</span>
                    <strong className="text-cyan-400 font-bold">{activeServerData.topPlayers.third.wins} Vitórias</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* TABELA TOP 4 AO TOP 7 - DINÂMICA                                      */}
          {/* ===================================================================== */}
          <div className="max-w-4xl mx-auto rounded-2xl bg-[#060914]/90 border border-purple-900/40 overflow-hidden shadow-xl shadow-black/80">
            <div className="px-6 py-4 border-b border-purple-950 flex items-center justify-between">
              <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" /> Outros Destaques • Servidor {activeServerData.name}
              </h4>
              <span className="text-xs text-zinc-500">Atualizado a cada 1 hora</span>
            </div>

            <div className="divide-y divide-purple-950/60">
              {activeServerData.topPlayers.runnersUp.map((runner) => (
                <div
                  key={runner.rank}
                  className="px-6 py-3.5 flex items-center justify-between hover:bg-purple-950/20 transition-colors text-xs"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-6 font-bold text-indigo-400">#{runner.rank}</span>
                    <div>
                      <span className="font-bold text-white text-sm">{runner.name}</span>
                      <span className="block text-[11px] text-zinc-400">Guild: {runner.guild}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden sm:inline text-zinc-400">{runner.pokemon}</span>
                    <span className="px-2.5 py-1 rounded-full bg-purple-950/80 border border-purple-800/60 text-cyan-300 font-bold">
                      Lvl {runner.level}
                    </span>
                    <span className="text-cyan-400 font-semibold hidden sm:inline">{runner.wins} vitórias</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Discord / Comunidade (Azul & Roxo) */}
          <div className="mt-10 p-8 rounded-3xl bg-gradient-to-r from-[#0e0a24] via-[#090e1f] to-[#04060d] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h3 className="text-2xl font-bold text-white">Participe da Nossa Comunidade no Discord</h3>
              <p className="text-zinc-300 text-sm mt-1">
                Tire dúvidas com a Staff, negocie itens com outros jogadores e participe de sorteios diários!
              </p>
            </div>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5865F2] to-blue-600 hover:from-[#4752C4] hover:to-blue-700 text-white font-bold text-sm tracking-wide flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 shrink-0"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Entrar no Discord
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. RODAPÉ (FOOTER)                                                        */}
      {/* ========================================================================= */}
      <footer className="border-t border-purple-950/60 bg-[#020307] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-3">
            <span className="font-bold text-zinc-300">PokéTibia MMORPG</span>
            <span>•</span>
            <span>© 2026 Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-6 text-zinc-400">
            <a href="#home" className="hover:text-cyan-400 transition-colors">Home</a>
            <a href="#minha-conta" className="hover:text-cyan-400 transition-colors">Minha Conta</a>
            <a href="#download" className="hover:text-cyan-400 transition-colors">Download</a>
            <a href="#informacao" className="hover:text-cyan-400 transition-colors">Informação</a>
          </div>

          <div className="text-center md:text-right text-[11px] text-zinc-600">
            Pokémon é marca registrada da Nintendo/Game Freak. Este é um servidor feito por e para fãs.
          </div>
        </div>
      </footer>
    </div>
  );
}
