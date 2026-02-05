'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const activeClass = "px-4 py-2 md:px-5 md:py-2 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/5 transition-all hover:bg-white/20 whitespace-nowrap";
    const inactiveClass = "text-gray-400 hover:text-white transition-colors px-4 py-2 md:px-5 md:py-2 whitespace-nowrap";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 md:py-6 pointer-events-none px-4">
            {/* Inner container needs pointer-events-auto because nav handles clicks */}
            <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm font-medium tracking-wide pointer-events-auto bg-black/20 backdrop-blur-sm rounded-full p-1 border border-white/5 overflow-x-auto max-w-full">
                <Link
                    href="/"
                    className={isActive("/") ? activeClass : inactiveClass}
                >
                    Home
                </Link>
                <Link
                    href="/teams"
                    className={isActive("/teams") ? activeClass : inactiveClass}
                >
                    Teams
                </Link>
                <Link
                    href="/projects"
                    className={isActive("/projects") ? activeClass : inactiveClass}
                >
                    Projects
                </Link>
                <Link
                    href="/faq"
                    className={isActive("/faq") ? activeClass : inactiveClass}
                >
                    FAQ
                </Link>
            </div>
        </nav>
    );
}
