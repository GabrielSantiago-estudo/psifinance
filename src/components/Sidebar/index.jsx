"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Users,
    Calendar,
    DollarSign,
    BarChart3,
    Settings,
    ChevronLeft
} from "lucide-react";

import { Button } from "../ui/Button";

const navItems = [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Clientes", url: "/clientes", icon: Users },
    { title: "Sessões", url: "/sessoes", icon: Calendar },
    { title: "Financeiro", url: "/financeiro", icon: DollarSign },
    { title: "Relatórios", url: "/relatorios", icon: BarChart3 },
    { title: "Configurações", url: "/configuracoes", icon: Settings },
];

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();

    return (
        <aside
            className={`
                sticky top-0 h-screen transition-all duration-300 flex flex-col
                bg-white border-r border-neutral-200
                dark:bg-neutral-900 dark:border-neutral-800
                ${collapsed ? "w-20" : "w-64"}
            `}
        >
            {/* Logo */}
            <div className="p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center justify-between">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            {/* Ícone com contraste forte */}
                            <div className="
                                w-10 h-10 rounded-xl 
                                bg-indigo-600 
                                dark:bg-indigo-500 
                                shadow-md 
                                flex items-center justify-center
                            ">
                                <span className="text-white font-bold text-lg">
                                    Ψ
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                    PsiFinance
                                </h1>
                                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                                    Gestão Inteligente
                                </p>
                            </div>
                        </div>
                    )}

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                        className={`
                            ${collapsed ? "rotate-180" : ""}
                            transition-transform duration-300 text-neutral-700 dark:text-neutral-300 cursor-pointer
                        `}
                    >
                        <ChevronLeft className="h-4 w-2" />
                    </Button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.url;

                    return (
                        <Link
                            key={item.url}
                            href={item.url}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg 
                                transition-all duration-150

                                ${isActive
                                    ? `
                                        bg-indigo-600 
                                        text-white 
                                        dark:bg-indigo-500 
                                        shadow-md
                                      `
                                    : `
                                        text-neutral-700 
                                        dark:text-neutral-300
                                        hover:bg-neutral-200 
                                        dark:hover:bg-neutral-800
                                      `
                                }
                            `}
                        >
                            <item.icon className="h-5 w-5 shrink-0" />
                            {!collapsed && (
                                <span className="font-medium">{item.title}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            {!collapsed && (
                <div className="p-4 border-t border-neutral-200 dark:border-neutral-800">
                    <div className="rounded-lg p-4 bg-neutral-200 dark:bg-neutral-800">
                        <p className="text-sm font-medium mb-1 dark:text-white">
                            💡 Dica do dia
                        </p>
                        <p className="text-xs text-neutral-700 dark:text-neutral-400">
                            Você está quase atingindo sua meta mensal!
                        </p>
                    </div>
                </div>
            )}
        </aside>
    );
}
