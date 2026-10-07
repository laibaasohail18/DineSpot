import { Link, useNavigate } from "react-router-dom";
import { Star, MapPinIcon, Clock, Sparkles } from "lucide-react";

interface RestaurantCardProps {
    restaurant: {
        _id: string;
        name: string;
        slug: string;
        cuisine: string;
        priceRange: string;
        rating: number;
        reviewCount: number;
        location: string;
        image: string;
        availableSlots: string[];
        featured?: boolean;
        exclusive?: boolean;
    };
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
    const navigate = useNavigate();

    const handleSlotClick = (e: React.MouseEvent, slot: string) => {
        e.preventDefault();
        e.stopPropagation();
        const today = new Date().toISOString().split("T")[0];
        navigate(`/booking/${restaurant.slug}?slot=${slot}&date=${today}`);
    };

    return (
        <div className="group relative glass-panel glass-panel-hover rounded-2xl sm:rounded-3xl flex flex-col h-full overflow-hidden border border-[#c5a880]/20 hover:border-[#c5a880]/50 transition-luxury shadow-xl">
            {/* Image Container & Badges */}
            <Link to={`/restaurant/${restaurant.slug}`} className="relative h-52 sm:h-60 overflow-hidden block">
                <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0c0d0e] via-transparent to-black/40" />

                {/* Exclusive & Featured Badges */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap gap-2 z-10">
                    {restaurant.exclusive && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-bold tracking-widest text-[#0c0d0e] bg-linear-to-r from-[#c5a880] to-[#a88a62] py-1 px-2.5 rounded-full uppercase shadow-lg shadow-[#c5a880]/20">
                            <Sparkles size={10} /> VIP CHOICE
                        </span>
                    )}
                    {restaurant.featured && (
                        <span className="text-[9px] font-bold tracking-widest text-stone-200 bg-[#0c0d0e]/80 border border-stone-700/80 backdrop-blur-md py-1 px-2.5 rounded-full uppercase">
                            FEATURED
                        </span>
                    )}
                </div>

                {/* Top Right Rating Badge */}
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10">
                    <div className="flex items-center gap-1 text-[#c5a880] bg-[#0c0d0e]/80 backdrop-blur-md border border-[#c5a880]/30 px-2.5 py-1 rounded-full shadow-md">
                        <Star size={11} fill="currentColor" />
                        <span className="text-[11px] font-bold text-stone-100">
                            {(restaurant.rating || 4.8).toFixed(1)}
                        </span>
                    </div>
                </div>
            </Link>

            {/* Content Body */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                <div>
                    {/* Eyebrow Metadata */}
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-[#c5a880] tracking-widest uppercase bg-[#c5a880]/10 px-2.5 py-0.5 rounded-md border border-[#c5a880]/20">
                            {restaurant.cuisine}
                        </span>
                        <span className="text-[11px] font-medium text-stone-400 tracking-wider">
                            {restaurant.priceRange}
                        </span>
                    </div>

                    {/* Restaurant Title */}
                    <Link to={`/restaurant/${restaurant.slug}`} className="block mb-2 group-hover:translate-x-0.5 transition-transform">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors line-clamp-1">
                            {restaurant.name}
                        </h3>
                    </Link>

                    {/* Location */}
                    <p className="text-xs text-stone-400 mb-4 flex items-center gap-1.5 font-light">
                        <MapPinIcon size={14} className="text-[#c5a880] shrink-0" />
                        <span className="truncate">{restaurant.location}</span>
                    </p>
                </div>

                {/* Instant Slot Picker */}
                <div>
                    <div className="border-t border-stone-800/80 mb-3" />
                    <div className="flex items-center justify-between mb-2">
                        <span className="flex items-center gap-1 text-[9px] font-bold text-stone-400 tracking-widest uppercase">
                            <Clock size={11} className="text-[#c5a880]" /> INSTANT SEATING
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {restaurant.availableSlots
                            .filter((slot) => {
                                const [slotHour, slotMinute] = slot.split(":").map(Number);
                                const now = new Date();
                                const currentHour = now.getHours();
                                const currentMinute = now.getMinutes();
                                return slotHour > currentHour || (slotHour === currentHour && slotMinute > currentMinute);
                            })
                            .slice(0, 3)
                            .map((slot) => (
                                <button
                                    key={slot}
                                    onClick={(e) => handleSlotClick(e, slot)}
                                    className="text-[10px] font-semibold border border-stone-800 hover:border-[#c5a880] rounded-xl px-2.5 py-1.5 transition-luxury cursor-pointer text-stone-300 hover:text-[#c5a880] bg-[#0c0d0e]/60 hover:bg-[#c5a880]/10 shadow-sm"
                                >
                                    {slot}
                                </button>
                            ))}
                        <Link
                            to={`/restaurant/${restaurant.slug}`}
                            className="text-[10px] font-bold border border-[#c5a880]/40 rounded-xl px-3 py-1.5 transition-luxury cursor-pointer text-[#c5a880] hover:bg-[#c5a880] hover:text-[#0c0d0e] ml-auto uppercase tracking-wider"
                        >
                            MORE SLOTS
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}