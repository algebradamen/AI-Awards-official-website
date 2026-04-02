import { notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { YEARS } from '@/data/years/index';
import { videos2025, type Video2025 } from '@/data/years/2025/videos';
import { content2026 } from '@/data/years/2026/content';

// Required for Next.js static export
export function generateStaticParams() {
  return YEARS.map((y) => ({ year: String(y.year) }));
}

// ─── Data registries ────────────────────────────────────────────────────────
// To add a new 'videos' year: create data/years/<YEAR>/videos.ts then add here.
const videosByYear: Record<number, Video2025[]> = {
  2025: videos2025,
};

// To add a new 'awards' year: create data/years/<YEAR>/content.ts then add here.
const awardsByYear: Record<number, typeof content2026> = {
  2026: content2026,
};

// ─── Page ───────────────────────────────────────────────────────────────────
export default function YearPage({ params }: { params: { year: string } }) {
  const yearNumber = parseInt(params.year, 10);
  const entry = YEARS.find((y) => y.year === yearNumber);

  if (!entry) notFound();

  // ─── Video gallery ───────────────────────────────────────────────────────
  if (entry.type === 'videos') {
    const videos = videosByYear[entry.year] ?? [];
    return (
      <main className="min-h-[100dvh] bg-black text-white">
        <Navbar />

        <section className="max-w-4xl mx-auto px-4 pt-28 pb-16">
          <Link href="/years" className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-1 transition-colors">
            ← All years
          </Link>

          <div className="mt-4 mb-10">
            <h2 className="font-serif text-2xl md:text-4xl font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
              {entry.year}
            </h2>
            <h1 className="font-sans text-3xl md:text-4xl font-black tracking-widest text-white mt-1">
              TANGEN IM AI PROJECT
            </h1>
            <p className="text-gray-400 text-sm mt-3 max-w-xl">
              Informasjons og medieproduksjonslinja på Tangen VGS samarbeidet med GerviLabs om et AI-prosjekt.
              Her er alle promoteringsvideoene lagd av studentteamene.
            </p>
          </div>

          <div className="flex flex-col gap-10">
            {videos.map((video) => (
              <div key={video.team} className="border border-white/10 rounded-2xl p-5 bg-white/5 backdrop-blur-sm">
                <h3 className="text-white font-semibold text-lg mb-4">{video.title}</h3>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    title={video.title}
                    src={video.embedUrl}
                    className="absolute inset-0 w-full h-full rounded-xl"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    {...(video.embedType === 'makertube'
                      ? { sandbox: 'allow-same-origin allow-scripts allow-popups allow-forms' }
                      : {})}
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // ─── Awards landing ──────────────────────────────────────────────────────
  if (entry.type === 'awards') {
    const content = awardsByYear[entry.year];
    if (!content) {
      return (
        <main className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center px-4">
          <Navbar />
          <Link href="/years" className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-1 transition-colors">
            ← All years
          </Link>
          <h2 className="font-serif text-3xl font-light bg-gradient-to-r from-[#B2A7E7] to-[#4D8EC3] bg-clip-text text-transparent">
            {entry.year}
          </h2>
          <h1 className="font-sans text-4xl font-black tracking-widest text-white mt-1 text-center">
            TANGEN AI-AWARDS
          </h1>
          <p className="text-gray-500 mt-6 text-sm">{entry.description}</p>
          <p className="text-gray-600 mt-4 text-sm italic">Content coming soon.</p>
        </main>
      );
    }

    return (
      <main className="min-h-[100dvh] bg-black text-white flex flex-col">
        <Navbar />

        <section className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
          <Link href="/years" className="text-gray-400 hover:text-white text-sm mb-10 inline-flex items-center gap-1 transition-colors">
            ← All years
          </Link>

          <h2 className="font-serif text-3xl md:text-5xl font-light bg-gradient-to-r from-[#B2A7E7] via-[#93BBE7] to-[#4D8EC3] bg-clip-text text-transparent">
            {entry.year}
          </h2>
          <h1 className="font-sans text-4xl md:text-5xl font-black tracking-widest text-white mt-1">
            TANGEN AI-AWARDS
          </h1>

          <p className="text-gray-400 text-sm mt-5 max-w-lg">{content.tagline}</p>
          <p className="text-blue-200/80 text-base font-serif italic mt-3">"{content.quote}"</p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-10">
            {content.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-6 py-3 rounded-full font-bold text-white bg-gradient-to-r from-[#8B7BC4] via-[#6B9DD4] to-[#3B6FA3] hover:scale-105 hover:shadow-[0_0_30px_rgba(139,123,196,0.5)] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    );
  }

  // Fallback for future types
  return (
    <main className="min-h-[100dvh] bg-black text-white flex flex-col items-center justify-center px-4">
      <Navbar />
      <Link href="/years" className="text-gray-400 hover:text-white text-sm mb-8 inline-flex items-center gap-1 transition-colors">
        ← All years
      </Link>
      <h2 className="font-serif text-3xl font-light bg-gradient-to-r from-[#B2A7E7] to-[#4D8EC3] bg-clip-text text-transparent">
        {entry.year}
      </h2>
      <h1 className="font-sans text-4xl font-black tracking-widest text-white mt-1 text-center">
        TANGEN AI-AWARDS
      </h1>
      <p className="text-gray-500 mt-6 text-sm">{entry.description}</p>
      <p className="text-gray-600 mt-4 text-sm italic">Content coming soon.</p>
    </main>
  );
}
