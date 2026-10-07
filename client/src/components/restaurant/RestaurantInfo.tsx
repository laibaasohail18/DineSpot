/* eslint-disable @typescript-eslint/no-explicit-any */
import { MapPin, Clock, Utensils, ChefHat, Sparkles } from "lucide-react";

interface RestaurantInfoProps {
    restaurant: any;
}

export default function RestaurantInfo({ restaurant }: RestaurantInfoProps) {
    if (!restaurant) return null;

    return (
        <div className="space-y-10 text-left">
            {/* Info Ribbon - Glassmorphic Modular Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 glass-panel rounded-2xl sm:rounded-3xl border border-[#c5a880]/20 shadow-xl">
                <div className="text-center p-3 rounded-2xl bg-[#0c0d0e]/60 border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury">
                    <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto mb-2">
                        <ChefHat size={20} />
                    </div>
                    <span className="block text-[9px] font-bold tracking-[0.2em] text-[#c5a880] uppercase">EXECUTIVE CHEF</span>
                    <span className="text-xs font-serif font-bold text-stone-100 mt-1 block truncate">
                        {restaurant.chef || "Master Culinary Team"}
                    </span>
                </div>

                <div className="text-center p-3 rounded-2xl bg-[#0c0d0e]/60 border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury">
                    <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto mb-2">
                        <Utensils size={20} />
                    </div>
                    <span className="block text-[9px] font-bold tracking-[0.2em] text-[#c5a880] uppercase">CUISINE STYLE</span>
                    <span className="text-xs font-serif font-bold text-stone-100 mt-1 block truncate">
                        {restaurant.cuisine}
                    </span>
                </div>

                <div className="text-center p-3 rounded-2xl bg-[#0c0d0e]/60 border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury">
                    <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto mb-2">
                        <Clock size={20} />
                    </div>
                    <span className="block text-[9px] font-bold tracking-[0.2em] text-[#c5a880] uppercase">SERVICE HOURS</span>
                    <span className="text-xs font-serif font-bold text-stone-100 mt-1 block truncate">
                        5:00 PM - 11:00 PM
                    </span>
                </div>
            </div>

            {/* About Section Card */}
            <section className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#c5a880]/20 space-y-5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
                        <Sparkles size={11} /> THE EXPERIENCE
                    </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
                    About The Dining Room
                </h3>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                    {restaurant.description}
                </p>

                <div className="pt-4 border-t border-stone-800/80 flex items-start gap-3 text-xs sm:text-sm text-stone-300 font-light">
                    <div className="w-8 h-8 rounded-full bg-surface-container-low border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                        <MapPin size={16} />
                    </div>
                    <div>
                        <span className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-0.5">LOCATION ADDRESS</span>
                        <span className="text-stone-200">{restaurant.address}</span>
                    </div>
                </div>
            </section>
        </div>
    );
}