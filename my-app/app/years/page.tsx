import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { YEARS } from '@/data/years/index';

export default function YearsPage() {
  return (
    <main className="min-h-[100dvh] w-full bg-black text-white flex flex-col">
      <Navbar />

      <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 gap-8">
        {/* Header */}
        <div className="text-center flex flex-col items-center gap-2">
          <h2 className="font-serif text-3xl md:text-5xl font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
            IM Tangens
          </h2>
          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-widest text-white">
            AI-AWARDS
          </h1>
        </div>

        {/* Year buttons */}
        <div className="flex flex-col items-center gap-3 w-full max-w-xs mt-4">
          {YEARS.map((entry) => (
            <Link
              key={entry.year}
              href={`/years/${entry.year}`}
              className="w-full text-center py-3 px-6 rounded-full font-bold text-white text-lg tracking-wide bg-gradient-to-r from-[#8B7BC4] via-[#6B9DD4] to-[#3B6FA3] hover:scale-105 hover:shadow-[0_0_30px_rgba(139,123,196,0.5)] transition-all duration-200"
            >
              {entry.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
