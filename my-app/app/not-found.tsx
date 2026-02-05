import Link from 'next/link';
import Navbar from "@/components/Navbar";

export default function NotFound() {
    return (
        <main className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden selection:bg-blue-500/30">
            <Navbar />

            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

            <div className="relative z-10 text-center px-4">
                <h1 className="text-[150px] md:text-[250px] font-black leading-none bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent select-none">
                    404
                </h1>

                <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 -mt-10 md:-mt-20 relative z-20">
                    <span className="text-blue-400">Error:</span> Hallucination Detected
                </h2>

                <p className="text-gray-400 text-lg mb-12 max-w-lg mx-auto leading-relaxed">
                    Our neural networks are 99% confident this page doesn't exist.
                    It seems you've found a gap in our training data.
                </p>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Return Home
                </Link>
            </div>
        </main>
    );
}
