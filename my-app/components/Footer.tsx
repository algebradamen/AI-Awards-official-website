'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Footer() {
    const pathname = usePathname();

    // Do NOT render on the home page (landing page)
    if (pathname === '/') {
        return null;
    }

    return (
        <footer className="w-full bg-black border-t border-white/5 py-12 px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-900/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                {/* Brand */}
                <div className="flex flex-col items-center md:items-start">
                    <h3 className="text-2xl font-black text-white tracking-widest mb-2">AI-AWARDS</h3>
                    <p className="text-gray-500 text-sm">Empowering the Future of AI</p>
                </div>

                {/* Links */}
                <div className="flex gap-8 text-sm font-medium text-gray-400">
                    <Link href="/teams" className="hover:text-blue-400 transition-colors">Teams</Link>
                    <Link href="/projects" className="hover:text-blue-400 transition-colors">Projects</Link>
                    <Link href="/faq" className="hover:text-blue-400 transition-colors">FAQ</Link>
                </div>

                {/* Copyright / Credits */}
                <div className="flex flex-col items-center md:items-end text-xs text-gray-600 gap-1">
                    <p>&copy; 2026 AI-AWARDS. All rights reserved.</p>
                    <p>Designed by <span className="text-gray-500 font-bold">Tangen VGS</span></p>
                </div>
            </div>
        </footer>
    );
}
