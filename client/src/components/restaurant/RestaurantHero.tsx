/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, Sparkles, MapPin, DollarSign } from "lucide-react";
import { dummyRating, dummyReviewCount } from "../../assets/assets.ts";

interface RestaurantHeroProps {
    restaurant: any;
}

export default function RestaurantHero({ restaurant }: RestaurantHeroProps) {
    if (!restaurant) return null;

    return (
        <section className="relative h-112 sm:h-136 w-full overflow-hidden text-left animate-in fade-in duration-700">
            {/* Cinematic Cover Background Image */}
            <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="w-full h-full object-cover brightness-[0.55] scale-105 transition-transform duration-1000" 
            />
            
            {/* Ambient Dark Gradient & Vignette Overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-[#0c0d0e] via-[#0c0d0e]/50 to-black/40" />
            <div className="absolute inset-0 bg-linear-to-r from-[#0c0d0e]/80 via-transparent to-transparent" />

            {/* Floating Luxury Ambient Lighting Glow */}
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#c5a880]/10 blur-[140px] pointer-events-none" />

            {/* Hero Overlay Info Content */}
            <div className="absolute bottom-0 inset-x-0 pb-10 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 max-w-3xl">
                        {/* Cuisine & Status Badges */}
                        <div className="flex flex-wrap gap-2.5 items-center">
                            <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#0c0d0e] bg-linear-to-r from-[#c5a880] to-[#a88a62] py-1.5 px-3.5 uppercase rounded-full shadow-lg shadow-[#c5a880]/20">
                                {restaurant.cuisine}
                            </span>
                            
                            {restaurant.exclusive && (
                                <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-[0.2em] text-[#c5a880] bg-[#0c0d0e]/80 border border-[#c5a880]/30 backdrop-blur-md py-1.5 px-3.5 uppercase rounded-full">
                                    <Sparkles size={11} /> VIP EXCLUSIVE
                                </span>
                            )}
                        </div>

                        {/* Venue Title */}
                        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold gold-gradient-text tracking-tight leading-none">
                            {restaurant.name}
                        </h1>

                        {/* Metadata Row: Rating, Reviews, Location & Price */}
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-stone-300 text-xs sm:text-sm font-light pt-1">
                            {/* Rating Badge */}
                            <div className="flex items-center gap-1.5 bg-surface-container-low/80 border border-[#c5a880]/30 px-3 py-1 rounded-full backdrop-blur-md">
                                <Star size={14} className="text-[#c5a880]" fill="currentColor" />
                                <span className="font-bold text-stone-100">
                                    {(restaurant.rating || dummyRating).toFixed(1)}
                                </span>
                            </div>

                            <span className="text-stone-700 hidden sm:inline">•</span>

                            <span className="text-stone-400 font-light">
                                {restaurant.reviewCount || dummyReviewCount} Verified Guest Reviews
                            </span>

                            <span className="text-stone-700 hidden sm:inline">•</span>

                            <div className="flex items-center gap-1 text-stone-300">
                                <DollarSign size={13} className="text-[#c5a880]" />
                                <span>Tier: <strong className="text-stone-100 font-bold">{restaurant.priceRange || "$$$$"}</strong></span>
                            </div>

                            {restaurant.location && (
                                <>
                                    <span className="text-stone-700 hidden sm:inline">•</span>
                                    <div className="flex items-center gap-1 text-stone-400">
                                        <MapPin size={13} className="text-[#c5a880]" />
                                        <span>{restaurant.location}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}