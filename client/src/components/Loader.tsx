import { Sparkles } from "lucide-react";

export default function Loader({ text }: { text: string }) {
    return (
        <div className="min-h-screen w-full bg-[#0c0d0e] flex flex-col justify-center items-center relative overflow-hidden px-4">
            {/* Ambient Background Glow */}
            <div className="absolute w-72 h-72 bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Glowing Dual-Ring Loader Spinner */}
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-stone-800 border-t-[#c5a880] border-r-[#c5a880]/40 rounded-full animate-spin shadow-[0_0_25px_rgba(197,168,128,0.25)]" />
                <div className="absolute w-10 h-10 sm:w-12 sm:h-12 border border-stone-800 border-b-[#c5a880] rounded-full animate-spin [animation-direction:reverse]" />
                <Sparkles size={16} className="text-[#c5a880] animate-pulse absolute" />
            </div>

            {/* Dynamic Loading Text */}
            <div className="mt-8 text-center space-y-2 max-w-xs sm:max-w-md">
                <p className="font-serif text-sm sm:text-base font-semibold tracking-widest text-stone-200 uppercase gold-gradient-text">
                    DineSpot VIP
                </p>
                <p className="text-[11px] sm:text-xs font-light tracking-widest text-stone-400 uppercase animate-pulse leading-relaxed">
                    {text}
                </p>
            </div>
        </div>
    );
}