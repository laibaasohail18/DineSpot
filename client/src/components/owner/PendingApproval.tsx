/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShieldCheck, Sparkles, Building2, MapPin, Utensils, Users } from "lucide-react";

interface PendingApprovalProps {
    restaurant: any;
}

export default function PendingApproval({ restaurant }: PendingApprovalProps) {
    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute w-80 h-80 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-xl w-full glass-panel border border-[#c5a880]/30 p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-2xl sm:rounded-3xl space-y-6 bg-surface-container-low/90">
                {/* Glowing Icon Badge */}
                <div className="w-16 h-16 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto shadow-lg shadow-[#c5a880]/10">
                    <ShieldCheck size={32} className="animate-pulse" />
                </div>

                <div className="space-y-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
                        <Sparkles size={11} /> VERIFICATION IN PROGRESS
                    </span>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
                        Application Under Review
                    </h2>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    Thank you for registering <strong className="text-stone-100 font-bold">{restaurant?.name || "your establishment"}</strong>. Your venue profile and seating capacity parameters are currently being verified by the DineSpot Concierge Panel.
                </p>

                {/* Venue Details Summary Box */}
                <div className="border border-stone-800 bg-[#0c0d0e]/80 p-5 rounded-2xl text-left space-y-3 text-xs text-stone-300 font-light shadow-inner">
                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Building2 size={13} className="text-[#c5a880]" /> Venue
                        </span>
                        <span className="font-semibold text-stone-200">{restaurant?.name}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Utensils size={13} className="text-[#c5a880]" /> Cuisine
                        </span>
                        <span className="font-semibold text-stone-200">{restaurant?.cuisine}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                            <MapPin size={13} className="text-[#c5a880]" /> Location
                        </span>
                        <span className="font-semibold text-stone-200">{restaurant?.location}</span>
                    </div>

                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-2.5">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Users size={13} className="text-[#c5a880]" /> Seating Capacity
                        </span>
                        <span className="font-semibold text-stone-200">{restaurant?.totalSeats} seats</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Listing Status</span>
                        <span className="text-[#c5a880] font-bold tracking-widest uppercase text-[9px] bg-[#c5a880]/10 border border-[#c5a880]/30 px-3 py-1 rounded-full shadow-sm">
                            PENDING APPROVAL
                        </span>
                    </div>
                </div>

                <p className="text-[11px] text-stone-500 italic font-light">
                    Your owner management suite will unlock automatically upon verification approval.
                </p>
            </div>
        </div>
    );
}