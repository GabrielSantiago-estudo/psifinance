"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { Check, ChevronRight, Circle } from "lucide-react";

/* ---------- Context (compartilha estado entre Trigger/Content/...) ---------- */
const DropdownContext = createContext(null);

function useDropdownContext(componentName = "") {
    const ctx = useContext(DropdownContext);
    if (!ctx) throw new Error(`${componentName} must be used inside DropdownMenu`);
    return ctx;
}

/* ---------- DropdownMenu (Provider) ---------- */
export function DropdownMenu({ children, defaultOpen = false }) {
    const [open, setOpen] = useState(defaultOpen);
    const rootRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
        }
        function handleEscape(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <DropdownContext.Provider value={{ open, setOpen, rootRef }}>
            <div className="relative inline-block" ref={rootRef}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

/* ---------- Trigger ---------- */
export function DropdownMenuTrigger({ children, asChild = false, className = "", ...props }) {
    const { open, setOpen } = useDropdownContext("DropdownMenuTrigger");

    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!open);
    };

    if (asChild && React.isValidElement(children)) {
        // passa o onClick para o elemento filho
        return React.cloneElement(children, {
            onClick: (ev) => {
                children.props.onClick?.(ev);
                handleClick(ev);
            },
            "aria-expanded": open,
            ...props,
        });
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-expanded={open}
            className={`inline-flex items-center ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

/* ---------- Content ---------- */
export function DropdownMenuContent({ children, sideOffset = 4, align = "start", className = "" }) {
    const { open } = useDropdownContext("DropdownMenuContent");

    if (!open) return null;

    // Simple alignment handling: start | end | center
    let alignClass = "left-0";
    if (align === "end") alignClass = "right-0";
    if (align === "center") alignClass = "left-1/2 transform -translate-x-1/2";

    return (
        <div
            className={`absolute z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md
        ${alignClass} mt-[${sideOffset}px] ${className}`}
            role="menu"
        >
            {children}
        </div>
    );
}

/* ---------- Item ---------- */
export function DropdownMenuItem({ inset, children, onSelect, className = "" }) {
    return (
        <button
            type="button"
            onClick={(e) => {
                onSelect?.(e);
            }}
            className={`relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground ${inset ? "pl-8" : ""
                } ${className}`}
        >
            {children}
        </button>
    );
}

/* ---------- Checkbox Item ---------- */
export function DropdownMenuCheckboxItem({ checked, children, onChange, className = "" }) {
    return (
        <button
            type="button"
            onClick={() => onChange?.(!checked)}
            className={`relative flex w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground ${className}`}
            aria-checked={checked}
            role="menuitemcheckbox"
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {checked && <Check className="h-4 w-4" />}
            </span>
            {children}
        </button>
    );
}

/* ---------- Radio Item ---------- */
export function DropdownMenuRadioItem({ selected, children, onSelect, className = "" }) {
    return (
        <button
            type="button"
            onClick={() => onSelect?.()}
            className={`relative flex w-full items-center rounded-sm py-1.5 pl-8 pr-2 text-sm hover:bg-accent hover:text-accent-foreground ${className}`}
            role="menuitemradio"
            aria-checked={selected}
        >
            <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                {selected && <Circle className="h-2 w-2 fill-current" />}
            </span>
            {children}
        </button>
    );
}

/* ---------- Label ---------- */
export function DropdownMenuLabel({ inset, children, className = "" }) {
    return (
        <div className={`px-2 py-1.5 text-sm font-semibold ${inset ? "pl-8" : ""} ${className}`}>
            {children}
        </div>
    );
}

/* ---------- Separator ---------- */
export function DropdownMenuSeparator({ className = "" }) {
    return <div className={`-mx-1 my-1 h-px bg-muted ${className}`} role="separator" />;
}

/* ---------- Sub (simple hover submenu) ---------- */
export function DropdownMenuSub({ label, children, inset, className = "" }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className={`flex w-full items-center rounded-sm px-2 py-1.5 text-sm ${inset ? "pl-8" : ""} hover:bg-accent`}
            >
                {label}
                <ChevronRight className="ml-auto h-4 w-4" />
            </button>

            {open && (
                <div className="absolute left-full top-0 z-50 min-w-32 rounded-md border bg-popover p-1 shadow-lg">
                    {children}
                </div>
            )}
        </div>
    );
}

/* ---------- Shortcut (small helper) ---------- */
export function DropdownMenuShortcut({ children, className = "" }) {
    return <span className={`ml-auto text-xs tracking-widest opacity-60 ${className}`}>{children}</span>;
}

/* Export default convenience (if prefer single import) */
export default {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuRadioItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuShortcut,
};
