import React from "react";
import { Sparkles, ArrowRight, User, Mail, Phone, HeartHandshake } from "lucide-react";

interface BookingFormProps {
    name: string;
    setName: (val: string) => void;
    email: string;
    setEmail: (val: string) => void;
    phone: string;
    setPhone: (val: string) => void;
    occasion: string;
    setOccasion: (val: string) => void;
    specialRequests: string;
    setSpecialRequests: (val: string) => void;
    confirming: boolean;
    onSubmit: (e: React.FormEvent) => void;
}

export default function BookingForm({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    occasion,
    setOccasion,
    specialRequests,
    setSpecialRequests,
    confirming,
    onSubmit,
}: BookingFormProps) {
    return (
        <div className="glass-panel p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-[#c5a880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] text-left relative overflow-hidden bg-surface-container-low/90">
            {/* Header Ribbon */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c5a880]/20">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                        <Sparkles size={11} /> GUEST RESERVATION DETAILS
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                        Guest Information
                    </h3>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase items-center gap-1.5">
                            <User size={12} className="text-[#c5a880]" /> FULL NAME
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pb-2 pt-1 text-xs sm:text-sm bg-transparent border-b border-stone-800 focus:border-[#c5a880] text-stone-100 focus:outline-none transition-luxury font-medium"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase items-center gap-1.5">
                            <Mail size={12} className="text-[#c5a880]" /> EMAIL ADDRESS
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pb-2 pt-1 text-xs sm:text-sm bg-transparent border-b border-stone-800 focus:border-[#c5a880] text-stone-100 focus:outline-none transition-luxury font-medium"
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone Number */}
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase items-center gap-1.5">
                            <Phone size={12} className="text-[#c5a880]" /> PHONE NUMBER
                        </label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pb-2 pt-1 text-xs sm:text-sm bg-transparent border-b border-stone-800 focus:border-[#c5a880] text-stone-100 focus:outline-none transition-luxury font-medium"
                            placeholder="+1 (555) 000-0000"
                            required
                        />
                    </div>

                    {/* Special Occasion */}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-stone-400 tracking-widest uppercase flex items-center gap-1.5">
                            <HeartHandshake size={12} className="text-[#c5a880]" /> SPECIAL OCCASION
                        </label>
                        <select
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full pb-2 pt-1 text-xs sm:text-sm bg-transparent border-b border-stone-800 focus:border-[#c5a880] text-stone-100 focus:outline-none cursor-pointer font-medium [&>option]:bg-surface-container-low [&>option]:text-stone-200"
                        >
                            <option value="">None</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Date Night">Date Night</option>
                            <option value="Business Dining">Business Dining</option>
                        </select>
                    </div>
                </div>

                {/* Special Requests */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        SPECIAL REQUESTS (OPTIONAL)
                    </label>
                    <textarea
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        rows={3}
                        placeholder="Allergies, dietary restrictions, table preference..."
                        className="w-full bg-[#0c0d0e]/80 border border-stone-800 rounded-xl p-3.5 text-xs text-stone-100 focus:border-[#c5a880] focus:outline-none font-light placeholder:text-stone-600 transition-luxury"
                    ></textarea>
                </div>

                {/* Privé Invitation Checkbox */}
                <div className="flex items-start gap-3 py-1">
                    <input type="checkbox" id="newsletterOpt" className="mt-1 cursor-pointer accent-[#c5a880]" defaultChecked />
                    <label htmlFor="newsletterOpt" className="text-xs text-stone-400 leading-relaxed cursor-pointer select-none font-light">
                        Send me seasonal tasting invitations and private chef updates from DineSpot Privé.
                    </label>
                </div>

                {/* Endless Shimmer CTA Button */}
                <button
                    type="submit"
                    disabled={confirming}
                    className="relative group overflow-hidden w-full bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] py-4 text-xs font-bold tracking-widest uppercase rounded-2xl shadow-lg shadow-[#c5a880]/20 hover:shadow-[0_10px_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {confirming ? "CONFIRMING TABLE..." : "CONFIRM SEATING"} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </form>
        </div>
    );
}