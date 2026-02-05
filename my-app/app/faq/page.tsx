'use client';

import { useState } from 'react';
import Navbar from "@/components/Navbar";

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "What is AI-AWARDS?",
        answer: "AI-AWARDS is an annual event where students design, build, and present projects using artificial intelligence, focusing on creativity, problem-solving, and innovation."
    },
    {
        question: "Why do we have AI-AWARDS?",
        answer: "We have AI-AWARDS to motivate students to learn about artificial intelligence, develop problem-solving skills, and showcase innovative ideas using AI."
    },
    {
        question: "How are teams evaluated and selected as winners for each theme?",
        answer: "The winners are evaluated and selected by a jury of five industry professionals from both public and private companies."
    },
    {
        question: "What tools did the teams use?",
        answer: "The teams used a variety of AI tools, mainly from Google’s AI Ultra package, including Gemini, Antigravity, Flow, Whisk, NotebookLM, Nanobanano Pro, and Veo 3.1. They also used other AI tools such as ChatGPT, Suno AI, and ElevenLabs."
    },
    {
        question: "Who arranged AI-AWARDS?",
        answer: "AI-AWARDS was arranged by Tangen High School in Norway, led by Jo Erlend Thunberg."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <main className="min-h-screen w-full bg-black text-white relative font-sans selection:bg-blue-500/30">
            <Navbar />

            {/* Background Glows */}
            <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2"></div>

            <div className="relative z-10 pt-24 pb-20 px-4 md:px-8 container mx-auto max-w-4xl flex flex-col items-center">

                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-white to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(59,130,246,0.5)]">
                        FAQ
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
                        Frequently Asked Questions about the event
                    </p>
                </div>

                {/* FAQ List */}
                <div className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`
                                group border border-white/10 rounded-2xl bg-white/5 backdrop-blur-xl overflow-hidden transition-all duration-300
                                ${openIndex === index ? 'bg-white/10 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'hover:border-white/20'}
                            `}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full md:px-8 px-6 py-6 flex items-center justify-between gap-4 text-left focus:outline-none"
                            >
                                <span className={`text-xl font-medium transition-colors duration-300 ${openIndex === index ? 'text-blue-300' : 'text-gray-200 group-hover:text-white'}`}>
                                    {faq.question}
                                </span>
                                <span className={`
                                    flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300
                                    ${openIndex === index ? 'rotate-180 bg-blue-500/20 border-blue-500/50 text-blue-300' : 'text-gray-400 group-hover:border-white/40 group-hover:text-white'}
                                `}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </span>
                            </button>

                            <div
                                className={`
                                    transition-all duration-300 ease-in-out
                                    ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
                                `}
                            >
                                <div className="px-6 md:px-8 pb-6 text-gray-400 font-light leading-relaxed border-t border-white/5 pt-4">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </main>
    );
}
