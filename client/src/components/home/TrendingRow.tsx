/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import RestaurantCard from "../RestaurantCard.tsx";

interface TrendingRowProps {
    trending: any[];
    loading: boolean;
}

export default function TrendingRow({ trending, loading }: TrendingRowProps) {
    return (
        <section className="py-16 sm:py-24 bg-[#0c0d0e] border-b border-[#c5a880]/15 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 bg-[#c5a880]/5 blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 sm:mb-14">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                            <Sparkles size={11} /> POPULAR SELECTIONS
                        </span>
                        <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text tracking-tight">
                            Top Rated Venues
                        </h2>
                    </div>

                    <Link
                        to="/search"
                        className="text-xs font-bold tracking-widest text-[#c5a880] hover:text-stone-100 transition-luxury flex items-center gap-2 group uppercase py-1"
                    >
                        EXPLORE ALL VENUES <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform text-[#c5a880]" />
                    </Link>
                </div>

                {/* Loading Spinner or Grid Render */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <div className="w-10 h-10 border-2 border-stone-800 border-t-[#c5a880] rounded-full animate-spin shadow-[0_0_15px_rgba(197,168,128,0.2)]"></div>
                        <p className="text-[10px] tracking-widest text-stone-500 uppercase font-semibold">Loading Curated Venues...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        {trending.slice(0, 3).map((r) => (
                            <RestaurantCard key={r._id} restaurant={r} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}