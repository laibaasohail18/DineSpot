import { XIcon, Sparkles, AlertCircle } from "lucide-react";

interface RequestRejectedProps {
    restaurantName: string;
}

export default function RequestRejected({ restaurantName }: RequestRejectedProps) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Ambient Background Glow for Alert State */}
            <div className="absolute w-80 h-80 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-xl w-full glass-panel border border-rose-500/30 p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-2xl sm:rounded-3xl space-y-6 bg-surface-container-low/90">
                {/* Alert Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mx-auto shadow-lg shadow-rose-500/10">
                    <XIcon size={32} />
                </div>

                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
                        <AlertCircle size={11} /> VERIFICATION UNAPPROVED
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100">
                        Listing Request Not Approved
                    </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Regrettably, your application to feature <strong className="text-stone-100 font-bold">{restaurantName || "your venue"}</strong> on the DineSpot VIP Platform was not approved by our verification panel.
                </p>

                {/* Guidelines Box */}
                <div className="border border-stone-800/80 bg-[#0c0d0e]/80 p-5 rounded-2xl text-xs text-stone-400 font-light leading-relaxed space-y-2 text-left shadow-inner">
                    <div className="flex items-center gap-2 text-stone-300 font-semibold mb-1">
                        <Sparkles size={13} className="text-[#c5a880]" />
                        <span>NEXT STEPS & SUPPORT</span>
                    </div>
                    <p>
                        Please review your submission parameters or contact our Concierge Partner Team for detailed documentation guidelines and re-application criteria.
                    </p>
                </div>

                {/* Back / Contact Action CTA */}
                <a
                    href="mailto:support@dinespot.vip"
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold tracking-widest uppercase rounded-2xl transition-luxury shadow-lg"
                >
                    CONTACT CONCIERGE SUPPORT
                </a>
            </div>
        </div>
    );
}