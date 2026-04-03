import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { YEARS } from '@/data/years/index';

export default function YearsPage() {
  const gradients = [
    'bg-gradient-to-r from-[#C9A04E] via-[#D4A843] to-[#8B6914]',
    'bg-gradient-to-r from-[#7B5EA7] via-[#6C7EC7] to-[#4D8EC3]',
  ];

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

        {/* Year buttons — same style as home page */}
        <div className="flex flex-col items-center gap-4 w-full max-w-xs mt-4">
          {YEARS.map((entry, i) => (
            <Link
              key={entry.year}
              href={`/years/${entry.year}`}
              className={`
                w-full py-3 rounded-full text-center text-white font-bold text-sm tracking-widest
                ${gradients[i] || gradients[gradients.length - 1]}
                hover:scale-105 hover:shadow-[0_0_30px_rgba(139,123,196,0.3)]
                transition-all duration-300
              `}
            >
              {entry.label}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
