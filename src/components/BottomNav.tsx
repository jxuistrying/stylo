"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Upload, Library } from "lucide-react";

export function BottomNav() {
    const pathname = usePathname();

    const navItems = [
        { href: "/", icon: Home, label: "Home" },
        { href: "/upload", icon: Upload, label: "Upload" },
        { href: "/collection", icon: Library, label: "Collection" },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-t border-white/10 pb-safe">
            <div className="flex justify-around items-center h-16">
                {navItems.map(({ href, icon: Icon, label }) => {
                    const isActive = pathname === href;
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-medium">{label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
