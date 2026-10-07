import { useState } from "react";
import toast from "react-hot-toast";
import { Sparkles, Mail, Send } from "lucide-react";

export default function NewsletterCTA() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Welcome to DineSpot Privé. Exclusive access granted.");
        setEmail("");
    };

    return (
        <section className="bg-[#0c0d0e] border-b border-[#c5a880]/15 py-20 sm:py-28 text-center px-4 sm:px-6 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-62.5 bg-[#c5a880]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="max-w-3xl mx-auto relative z-10 glass-panel rounded-3xl p-8 sm:p-14 border border-[#c5a880]/25 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.25em] uppercase mb-4">
                    <Sparkles size={11} /> EXECUTIVE DISPATCH
                </span>

                <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text mb-4 tracking-tight">
                    Join DineSpot Privé
                </h2>

                <p className="text-xs sm:text-sm text-stone-400 mb-8 sm:mb-10 leading-relaxed font-light max-w-lg mx-auto">
                    Get privileged notifications on newly onboarded Michelin-starred venues, chef’s table releases, and secret seasonal seating drops.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <div className="relative flex-1">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                            <Mail size={16} className="text-[#c5a880]" />
                        </span>
                        <input
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 text-xs py-3.5 pl-10 pr-4 rounded-xl sm:rounded-2xl outline-none placeholder:text-stone-600 font-light transition-luxury shadow-inner"
                            placeholder="Enter your VIP email address"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="bg-linear-to-r from-[#c5a880] to-[#a88a62] hover:opacity-90 text-[#0c0d0e] font-bold text-xs tracking-widest uppercase py-3.5 px-7 rounded-xl sm:rounded-2xl transition-luxury shadow-lg shadow-[#c5a880]/15 cursor-pointer shrink-0 flex items-center justify-center gap-2"
                    >
                        JOIN PRIVÉ <Send size={13} />
                    </button>
                </form>
            </div>
        </section>
    );
}