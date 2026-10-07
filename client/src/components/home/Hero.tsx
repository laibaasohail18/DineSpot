import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Users, Sparkles } from "lucide-react";
import { assets } from "../../assets/assets";

export default function Hero() {
    const navigate = useNavigate();

    // Search input states (Unchanged)
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [guests, setGuests] = useState("2");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchQuery) params.append("search", searchQuery);
        if (location) params.append("location", location);
        if (date) params.append("date", date);
        if (guests) params.append("guests", guests);

        navigate(`/search?${params.toString()}`);
    };

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0c0d0e] pt-24 pb-16">
            {/* Background Image & Lighting Orbs */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                    alt="DineSpot Fine Dining" 
                    className="w-full h-full object-cover opacity-20 scale-105 transition-transform duration-1000" 
                    src={assets.hero_bg_img} 
                />
                <div className="absolute inset-0 bg-linear-to-b from-[#0c0d0e]/95 via-[#0c0d0e]/80 to-[#0c0d0e]" />
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-150 h-75 bg-[#c5a880]/10 blur-[150px] rounded-full" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-10 text-center">
                
                {/* Subtle Luxury Badge */}
                <span className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase mb-6 px-4 py-1.5 rounded-full bg-surface-container-low/80 border border-[#c5a880]/30 text-[#c5a880] shadow-lg shadow-[#c5a880]/5 backdrop-blur-md">
                    <Sparkles size={12} /> PREMIUM MULTI-RESTAURANT RESERVATIONS
                </span>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-7xl text-stone-100 mb-6 max-w-5xl mx-auto leading-[1.15] font-serif font-bold tracking-tight">
                    Reserve Your Table At <br className="hidden sm:inline" />
                    <span className="gold-gradient-text font-serif italic">
                        The World's Finest Venues
                    </span>
                </h1>

                <p className="text-stone-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    Explore top-rated restaurants, browse exclusive dining atmospheres, and secure your real-time table reservation with <strong className="text-stone-200 font-normal">DineSpot VIP</strong>.
                </p>

                {/* Search Floating Glass Capsule Component - Mobile Stack & Desktop Pill Layout */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="glass-panel p-2.5 sm:p-3 rounded-2xl md:rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-5xl mx-auto flex flex-col md:flex-row gap-2.5 border border-[#c5a880]/30 backdrop-blur-2xl"
                >
                    {/* Search Term / Cuisine */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-stone-800/80 px-4 py-2.5 bg-[#0c0d0e]/40 rounded-xl md:rounded-none">
                        <Search className="text-[#c5a880] mr-3 shrink-0" size={18} />
                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-xs sm:text-sm text-stone-200 placeholder:text-stone-500 font-light"
                            placeholder="Search restaurants, cuisines..."
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Location */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-stone-800/80 px-4 py-2.5 bg-[#0c0d0e]/40 rounded-xl md:rounded-none">
                        <MapPin className="text-[#c5a880] mr-3 shrink-0" size={18} />
                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-xs sm:text-sm text-stone-200 placeholder:text-stone-500 font-light"
                            placeholder="Location (e.g. Downtown)"
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Date */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-stone-800/80 px-4 py-2.5 bg-[#0c0d0e]/40 rounded-xl md:rounded-none">
                        <Calendar className="text-[#c5a880] mr-3 shrink-0" size={18} />
                        <input
                            className="w-full bg-transparent border-none focus:outline-none text-xs sm:text-sm text-stone-200 cursor-pointer font-light"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>

                    {/* Guests */}
                    <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-stone-800/80 px-4 py-2.5 bg-[#0c0d0e]/40 rounded-xl md:rounded-none">
                        <Users className="text-[#c5a880] mr-3 shrink-0" size={18} />
                        <select
                            className="w-full bg-transparent border-none focus:outline-none text-xs sm:text-sm text-stone-200 cursor-pointer font-light"
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                        >
                            <option value="1" className="bg-surface-container-low text-stone-200">1 Guest</option>
                            <option value="2" className="bg-surface-container-low text-stone-200">2 Guests</option>
                            <option value="4" className="bg-surface-container-low text-stone-200">4 Guests</option>
                            <option value="6" className="bg-surface-container-low text-stone-200">6 Guests</option>
                            <option value="8" className="bg-surface-container-low text-stone-200">8+ Guests</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-[#c5a880] hover:bg-[#b0936b] text-[#0c0d0e] font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-xl md:rounded-full transition-luxury shadow-lg shadow-[#c5a880]/20 cursor-pointer shrink-0"
                    >
                        FIND A TABLE
                    </button>
                </form>
            </div>
        </section>
    );
}