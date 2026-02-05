export default function Orb() {
    return (
        <div className="relative w-64 h-64 md:w-96 md:h-96 flex items-center justify-center pointer-events-none select-none">
            {/* Fallback CSS Orb if video is missing */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 opacity-20 blur-3xl animate-pulse"></div>

            {/* Core Orb Container */}
            <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_100px_rgba(59,130,246,0.3)]">
                {/* Try to load video if user provides it later, otherwise show CSS art */}
                <video
                    className="w-full h-full object-cover rounded-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                    // Placeholder gradient if video fails/is missing
                    poster="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzA2YjZkNCIvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzdlMjJceSIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZykiLz48L3N2Zz4="
                >
                    <source src="/orb.mp4" type="video/mp4" />
                    {/* Fallback Animated Divs */}
                    <div className="w-full h-full bg-black relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-slate-900 to-indigo-200 animate-spin-slow blur-md opacity-70"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-blue-200 via-slate-900 to-blue-200 animate-spin-reverse blur-sm mix-blend-overlay"></div>
                    </div>
                </video>

                {/* CSS Fallback (Visible if video tag fails to load source, but video tag wraps content weirdly. Better to have conditional or just overlay) 
             Actually, standard video tag doesn't fallback to HTML content inside easily unless browser doesn't support video.
             I'll just force the CSS background on the container as well.
         */}
            </div>

            {/* Shine/Reflection */}
            <div className="absolute inset-0 rounded-full ring-1 ring-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.1)]"></div>
        </div>
    );
}
