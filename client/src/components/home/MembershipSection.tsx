import { useState } from "react";
import { Sparkles, Check, ArrowRight, Crown, CheckCircle2 } from "lucide-react";
import { useAppContext } from "../../context/AppContext.tsx";

export default function MembershipSection() {
    const { setAuthModalOpen } = useAppContext();
    const [selectedTier, setSelectedTier] = useState<string>("VIP Elite");

    const tiers = [
        {
            name: "Classic Pass",
            price: "Complimentary",
            description: "Essential access to multi-restaurant reservations and instant seatings.",
            features: [
                "Real-time table booking",
                "Instant status confirmations",
                "Standard concierge support",
                "Personal reservation dashboard"
            ],
            badge: "ENTRY PASS",
            popular: false,
        },
        {
            name: "VIP Elite",
            price: "$29 / mo",
            description: "Priority access to prime-time tables and Gemini AI dining recommendations.",
            features: [
                "All Classic Pass features",
                "Priority booking confirmation",
                "Gemini AI personalized concierge",
                "Exclusive weekend slot access",
                "Zero cancellation penalty waivers"
            ],
            badge: "MOST POPULAR",
            popular: true,
        },
        {
            name: "Owner / Partner",
            price: "Custom",
            description: "Full suite for multi-restaurant management, table schemas, and booking controls.",
            features: [
                "Add & manage multiple venues",
                "Custom table seating schemas",
                "Approve or reject pending requests",
                "Cloudinary high-res image hosting",
                "Automated double-booking prevention"
            ],
            badge: "BUSINESS SUITE",
            popular: false,
        }
    ];

    return (
        <section className="py-20 sm:py-28 bg-[#0c0d0e] border-b border-[#c5a880]/15 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#c5a880]/5 blur-[160px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
                        <Sparkles size={11} /> DINESPOT EXCLUSIVES
                    </span>
                    <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-gradient-text tracking-tight mb-4">
                        Elevate Your Dining Access
                    </h2>
                    <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto">
                        Choose the access tier tailored to your epicurean lifestyle or manage your establishment with our partner suite.
                    </p>
                </div>

                {/* Tiers Grid - High Interactive Hover & Select Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                    {tiers.map((tier) => {
                        const isSelected = selectedTier === tier.name;

                        return (
                            <div
                                key={tier.name}
                                onClick={() => setSelectedTier(tier.name)}
                                className={`group relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out border ${
                                    isSelected
                                        ? "bg-[#181a1d] border-[#c5a880] shadow-[0_20px_60px_rgba(197,168,128,0.25)] scale-[1.02] -translate-y-2"
                                        : "bg-surface-container-low/70 border-stone-800/80 hover:border-[#c5a880]/80 hover:bg-[#181a1d] hover:shadow-[0_20px_50px_rgba(197,168,128,0.15)] hover:-translate-y-2.5"
                                }`}
                            >
                                {/* Top Ambient Hover Shimmer Overlay */}
                                <div className="absolute inset-0 bg-linear-to-b from-[#c5a880]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

                                {/* Header & Floating Badges */}
                                <div className="flex justify-between items-center mb-6 relative z-10">
                                    <span
                                        className={`text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full border transition-all ${
                                            isSelected || tier.popular
                                                ? "bg-[#c5a880] text-[#0c0d0e] border-[#c5a880] shadow-md shadow-[#c5a880]/20"
                                                : "bg-[#0c0d0e] text-[#c5a880] border-[#c5a880]/30 group-hover:border-[#c5a880]"
                                        }`}
                                    >
                                        {tier.badge}
                                    </span>
                                    
                                    <div className="flex items-center gap-2">
                                        {isSelected && (
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-[#c5a880] bg-[#c5a880]/10 px-2.5 py-0.5 rounded-full border border-[#c5a880]/30 animate-in fade-in duration-300">
                                                <CheckCircle2 size={12} /> SELECTED
                                            </span>
                                        )}
                                        {tier.popular && (
                                            <Crown size={20} className="text-[#c5a880] group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300" />
                                        )}
                                    </div>
                                </div>

                                {/* Card Core Content */}
                                <div className="relative z-10">
                                    <h3 className="font-serif text-2xl font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors mb-2">
                                        {tier.name}
                                    </h3>

                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text">
                                            {tier.price}
                                        </span>
                                    </div>

                                    <p className="text-xs text-stone-400 font-light leading-relaxed mb-6 border-b border-stone-800/80 pb-6">
                                        {tier.description}
                                    </p>

                                    {/* Features List */}
                                    <ul className="space-y-3.5 mb-8">
                                        {tier.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-xs text-stone-300 font-light">
                                                <div className="w-4 h-4 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 group-hover:border-[#c5a880] flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5 transition-colors">
                                                    <Check size={10} />
                                                </div>
                                                <span className="group-hover:text-stone-200 transition-colors">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Trigger CTA Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedTier(tier.name);
                                        setAuthModalOpen(true);
                                    }}
                                    className={`w-full py-4 text-xs font-bold tracking-widest uppercase rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer relative z-10 ${
                                        isSelected || tier.popular
                                            ? "bg-[#c5a880] hover:bg-[#b0936b] text-[#0c0d0e] shadow-lg shadow-[#c5a880]/20 group-hover:scale-[1.02]"
                                            : "bg-[#0c0d0e] group-hover:bg-[#c5a880] group-hover:text-[#0c0d0e] text-stone-200 border border-stone-800 group-hover:border-[#c5a880]"
                                    }`}
                                >
                                    {isSelected ? "CLAIM THIS PASS" : "SELECT & CONTINUE"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}