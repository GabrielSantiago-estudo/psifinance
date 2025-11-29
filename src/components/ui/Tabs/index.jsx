"use client";
import { createContext, useState, useContext } from "react";

const TabsContext = createContext();

export function Tabs({ defaultValue, children, className = "" }) {
    const [active, setActive] = useState(defaultValue);

    return (
        <TabsContext.Provider value={{ active, setActive }}>
            <div className={className}>{children}</div>
        </TabsContext.Provider>
    );
}

export function TabsList({ children, className = "" }) {
    return (
        <div className={`flex gap-2 bg-gray-100 p-1 rounded-md ${className}`}>
            {children}
        </div>
    );
}

export function TabsTrigger({ value, children, className = "" }) {
    const { active, setActive } = useContext(TabsContext);
    const isActive = active === value;

    return (
        <button
            onClick={() => setActive(value)}
            className={`
                px-3 py-1.5 text-sm font-medium rounded-sm transition-all
                ${isActive ? "bg-white shadow text-black" : "text-gray-500"}
                ${className}
            `}
        >
            {children}
        </button>
    );
}

export function TabsContent({ value, children, className = "" }) {
    const { active } = useContext(TabsContext);

    if (active !== value) return null;

    return <div className={`mt-3 ${className}`}>{children}</div>;
}
