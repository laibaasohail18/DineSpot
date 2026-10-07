/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Users, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";

interface BookingSummaryProps {
    restaurant: any;
    date: string;
    slot: string;
    guests: string;
}

export default function BookingSummary({ restaurant, date, slot, guests }: BookingSummaryProps) {
    if (!restaurant) return null;

    return (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#c5a880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-6 text-left relative overflow-hidden bg-surface-container-low/90">
            {/* Header Title */}
            <div className="flex items-center justify-between pb-3 border-b border-[#c5a880]/20">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                        <Sparkles size={11} /> SEATING SUMMARY
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold gold-gradient-text">
                        Reservation Overview
                    </h3>
                </div>
            </div>

            {/* Restaurant Info Header */}
            <div className="flex gap-4 items-center bg-[#0c0d0e]/60 p-3.5 rounded-2xl border border-stone-800/80">
                <div className="w-20 h-20 overflow-hidden rounded-xl border border-[#c5a880]/30 shrink-0 shadow-md">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1 min-w-0">
                    <span className="text-[9px] font-bold text-[#c5a880] tracking-[0.2em] uppercase block truncate">
                        {restaurant.cuisine}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-100 leading-tight truncate">
                        {restaurant.name}
                    </h4>
                    <p className="text-xs text-stone-400 flex items-center gap-1 font-light truncate">
                        <MapPin size={12} className="text-[#c5a880] shrink-0" />
                        <span className="truncate">{restaurant.location}</span>
                    </p>
                </div>
            </div>

            {/* Date/Time/Guests Metadata List */}
            <div className="border-t border-b border-stone-800/80 py-4 space-y-3.5 text-xs text-stone-300 font-light">
                <div className="flex justify-between items-center">
                    <span className="text-stone-400 flex items-center gap-2">
                        <Calendar size={14} className="text-[#c5a880]" /> Date
                    </span>
                    <span className="font-semibold text-stone-100">
                        {new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-stone-400 flex items-center gap-2">
                        <Clock size={14} className="text-[#c5a880]" /> Time
                    </span>
                    <span className="font-semibold text-stone-100">{slot}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-stone-400 flex items-center gap-2">
                        <Users size={14} className="text-[#c5a880]" /> Party Size
                    </span>
                    <span className="font-semibold text-stone-100">{guests} Guests</span>
                </div>
            </div>

            {/* Cancellation Policy Box */}
            <div className="bg-[#0c0d0e]/80 p-4 rounded-xl border border-stone-800 space-y-1.5">
                <h5 className="text-[9px] font-bold tracking-[0.2em] text-[#c5a880] uppercase flex items-center gap-1.5">
                    <ShieldCheck size={12} /> CANCELLATION POLICY
                </h5>
                <p className="text-[11px] text-stone-400 leading-relaxed font-light">
                    Tables are reserved for up to 15 minutes past scheduled arrival. Complimentary modifications or cancellations are allowed up to 24 hours prior.
                </p>
            </div>
        </div>
    );
}