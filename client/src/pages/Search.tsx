/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import RestaurantCard from "../components/RestaurantCard.tsx";
import AuthModal from "../components/AuthModal.tsx";
import { SlidersHorizontal, Search as SearchIcon, X, Check, MapPin, SearchXIcon, Sparkles } from "lucide-react";
import api from "../lib/api.ts";
import toast from "react-hot-toast";

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // UI Layout states
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    // Filter states initialized from URL params
    const searchVal = searchParams.get("search") || "";
    const locationVal = searchParams.get("location") || "";
    const cuisinesSelected = searchParams.getAll("cuisine");
    const pricesSelected = searchParams.getAll("priceRange");
    const sortVal = searchParams.get("sort") || "";

    // Temp text inputs for immediate user typing (submit on enter/click)
    const [tempSearch, setTempSearch] = useState(searchVal);
    const [tempLocation, setTempLocation] = useState(locationVal);

    useEffect(() => {
        // Sync inputs with URL params on navigation
        (() => {
            setTempSearch(searchVal);
            setTempLocation(locationVal);
        })();
    }, [searchVal, locationVal]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                // Construct query string directly from searchParams
                const res = await api.get(`/restaurants?${searchParams.toString()}`);
                setRestaurants(res.data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, [searchParams]);

    const handleTextSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const nextParams = new URLSearchParams(searchParams);
        if (tempSearch) nextParams.set("search", tempSearch);
        else nextParams.delete("search");

        if (tempLocation) nextParams.set("location", tempLocation);
        else nextParams.delete("location");

        setSearchParams(nextParams);
    };

    const handleCuisineToggle = (cuisine: string) => {
        const nextParams = new URLSearchParams(searchParams);
        const current = nextParams.getAll("cuisine");

        if (current.includes(cuisine)) {
            // Remove
            const updated = current.filter((c) => c !== cuisine);
            nextParams.delete("cuisine");
            updated.forEach((u) => nextParams.append("cuisine", u));
        } else {
            // Add
            nextParams.append("cuisine", cuisine);
        }
        setSearchParams(nextParams);
    };

    const handlePriceToggle = (price: string) => {
        const nextParams = new URLSearchParams(searchParams);
        const current = nextParams.getAll("priceRange");

        if (current.includes(price)) {
            const updated = current.filter((p) => p !== price);
            nextParams.delete("priceRange");
            updated.forEach((u) => nextParams.append("priceRange", u));
        } else {
            nextParams.append("priceRange", price);
        }
        setSearchParams(nextParams);
    };

    const handleSortChange = (sort: string) => {
        const nextParams = new URLSearchParams(searchParams);
        if (sort) {
            nextParams.set("sort", sort);
        } else {
            nextParams.delete("sort");
        }
        setSearchParams(nextParams);
    };

    const clearAllFilters = () => {
        setSearchParams(new URLSearchParams());
        setTempSearch("");
        setTempLocation("");
    };

    const priceOptions = ["$", "$$", "$$$", "$$$$"];
    const cuisineOptions = ["Italian", "French", "Japanese", "Steakhouse", "Vegetarian"];

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20 relative overflow-hidden text-left">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c5a880]/5 blur-[180px] pointer-events-none" />

            <Navbar />
            <AuthModal />

            {/* Sticky Search Filter Sub-header */}
            <div className="bg-surface-container-low/90 backdrop-blur-xl border-b border-[#c5a880]/20 py-4 z-20 sticky top-16 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <form onSubmit={handleTextSubmit} className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <div className="relative grow sm:grow-0 min-w-50">
                            <SearchIcon size={15} className="absolute left-3.5 top-3 text-[#c5a880]" />
                            <input
                                type="text"
                                placeholder="Search cuisine or name..."
                                value={tempSearch}
                                onChange={(e) => setTempSearch(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-xs border border-stone-800 rounded-xl focus:border-[#c5a880] focus:outline-none bg-[#0c0d0e]/80 text-stone-100 placeholder:text-stone-500 font-light transition-luxury"
                            />
                        </div>
                        <div className="relative grow sm:grow-0 min-w-50">
                            <MapPin size={15} className="absolute left-3.5 top-3 text-[#c5a880]" />
                            <input
                                type="text"
                                placeholder="City or location..."
                                value={tempLocation}
                                onChange={(e) => setTempLocation(e.target.value)}
                                className="w-full pl-10 pr-3 py-2.5 text-xs border border-stone-800 rounded-xl focus:border-[#c5a880] focus:outline-none bg-[#0c0d0e]/80 text-stone-100 placeholder:text-stone-500 font-light transition-luxury"
                            />
                        </div>
                        <button
                            type="submit"
                            className="relative group overflow-hidden bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-[0_5px_20px_rgba(197,168,128,0.3)]"
                        >
                            <span className="relative z-10">SEARCH</span>
                        </button>
                    </form>

                    <div className="flex gap-3 w-full md:w-auto justify-end">
                        <button
                            onClick={() => setShowMobileFilters(true)}
                            className="md:hidden flex items-center gap-2 border border-stone-800 hover:border-[#c5a880] text-stone-200 hover:text-[#c5a880] text-xs font-semibold px-4 py-2.5 bg-surface-container-low rounded-xl cursor-pointer transition-luxury shadow-md"
                        >
                            <SlidersHorizontal size={14} className="text-[#c5a880]" />
                            <span>Filters</span>
                        </button>
                    </div>
                </div>
            </div>

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-10 flex gap-8 lg:gap-10 relative z-10">
                {/* Desktop Sidebar Filters */}
                <aside className="hidden md:block w-64 shrink-0">
                    <div className="sticky top-44 space-y-7 glass-panel border border-stone-800/80 p-6 rounded-2xl shadow-2xl bg-surface-container-low/80">
                        <div className="flex justify-between items-center pb-4 border-b border-[#c5a880]/20">
                            <h3 className="font-serif text-lg font-bold gold-gradient-text flex items-center gap-1.5">
                                <Sparkles size={14} /> Refine Search
                            </h3>
                            <button
                                onClick={clearAllFilters}
                                className="text-[10px] font-bold text-[#c5a880] hover:underline tracking-widest uppercase cursor-pointer"
                            >
                                Reset
                            </button>
                        </div>

                        {/* Cuisine Filter */}
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Cuisine Type</h4>
                            <div className="space-y-2">
                                {cuisineOptions.map((c) => {
                                    const active = cuisinesSelected.includes(c);
                                    return (
                                        <button
                                            key={c}
                                            onClick={() => handleCuisineToggle(c)}
                                            className="w-full flex items-center justify-between text-left text-xs text-stone-300 hover:text-[#c5a880] transition-colors cursor-pointer py-1 font-light"
                                        >
                                            <span>{c}</span>
                                            <div
                                                className={`w-4 h-4 border rounded-md flex items-center justify-center transition-colors ${
                                                    active ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e]" : "border-stone-700 bg-[#0c0d0e]"
                                                }`}
                                            >
                                                {active && <Check size={10} strokeWidth={3} />}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Price Range Filter */}
                        <div className="space-y-3 pt-3 border-t border-stone-800">
                            <h4 className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Price Tier</h4>
                            <div className="grid grid-cols-4 gap-1.5">
                                {priceOptions.map((p) => {
                                    const active = pricesSelected.includes(p);
                                    return (
                                        <button
                                            key={p}
                                            onClick={() => handlePriceToggle(p)}
                                            className={`py-2 text-center text-xs transition-luxury cursor-pointer border rounded-xl font-medium ${
                                                active
                                                    ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e] font-bold shadow-sm"
                                                    : "bg-[#0c0d0e]/60 border-stone-800 text-stone-300 hover:border-[#c5a880]/50"
                                            }`}
                                        >
                                            {p}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Results Main View */}
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#c5a880]/20">
                        <p className="text-xs sm:text-sm text-stone-400 font-light">
                            Showing <strong className="text-stone-100 font-bold">{restaurants.length}</strong> {restaurants.length === 1 ? "Establishment" : "Establishments"}
                        </p>

                        <div className="flex items-center gap-2">
                            <span className="text-[10px] text-stone-400 tracking-widest uppercase font-bold">SORT BY:</span>
                            <select
                                value={sortVal}
                                onChange={(e) => handleSortChange(e.target.value)}
                                className="text-xs bg-surface-container-low text-stone-200 border border-stone-800 px-3 py-1.5 focus:border-[#c5a880] focus:outline-none cursor-pointer rounded-xl font-medium [&>option]:bg-surface-container-low"
                            >
                                <option value="">Default (Featured)</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="grow flex justify-center items-center py-24">
                            <div className="w-10 h-10 border-2 border-stone-800 border-t-[#c5a880] rounded-full animate-spin shadow-[0_0_15px_rgba(197,168,128,0.2)]"></div>
                        </div>
                    ) : restaurants.length === 0 ? (
                        <div className="grow flex flex-col items-center justify-center py-20 text-center glass-panel border border-stone-800/80 rounded-3xl shadow-2xl p-8 bg-surface-container-low/60">
                            <SearchXIcon size={40} className="text-stone-600 mb-4" />
                            <h3 className="font-serif text-xl font-bold text-stone-100 mb-2">No Establishments Found</h3>
                            <p className="text-xs text-stone-400 max-w-sm mb-6 font-light">
                                We couldn't find any dining venues matching your filters. Try resetting your criteria.
                            </p>
                            <button
                                onClick={clearAllFilters}
                                className="bg-[#c5a880] hover:bg-[#b5976f] text-[#0c0d0e] text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition-luxury cursor-pointer"
                            >
                                CLEAR ALL FILTERS
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-2">
                            {restaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            {/* Mobile Filters Drawer Modal */}
            {showMobileFilters && (
                <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md md:hidden animate-in fade-in duration-200">
                    <div className="w-80 bg-surface-container-low border-l border-stone-800/80 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
                        <div>
                            <div className="flex justify-between items-center pb-4 border-b border-[#c5a880]/20">
                                <h3 className="font-serif text-lg font-bold gold-gradient-text flex items-center gap-1.5">
                                    <Sparkles size={14} /> Refine Search
                                </h3>
                                <button
                                    onClick={() => setShowMobileFilters(false)}
                                    className="p-1 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Cuisines */}
                            <div className="py-6 space-y-3">
                                <h4 className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Cuisine Type</h4>
                                <div className="space-y-2">
                                    {cuisineOptions.map((c) => {
                                        const active = cuisinesSelected.includes(c);
                                        return (
                                            <button
                                                key={c}
                                                onClick={() => handleCuisineToggle(c)}
                                                className="w-full flex items-center justify-between text-left text-xs text-stone-300 hover:text-[#c5a880] py-1 cursor-pointer font-light"
                                            >
                                                <span>{c}</span>
                                                <div
                                                    className={`w-4 h-4 border rounded-md flex items-center justify-center ${
                                                        active ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e]" : "border-stone-700 bg-[#0c0d0e]"
                                                    }`}
                                                >
                                                    {active && <Check size={10} strokeWidth={3} />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Prices */}
                            <div className="py-4 space-y-3 border-t border-stone-800">
                                <h4 className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Price Tier</h4>
                                <div className="grid grid-cols-4 gap-1.5">
                                    {priceOptions.map((p) => {
                                        const active = pricesSelected.includes(p);
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => handlePriceToggle(p)}
                                                className={`py-2 text-center text-xs font-medium transition-colors cursor-pointer border rounded-xl ${
                                                    active
                                                        ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e] font-bold"
                                                        : "bg-[#0c0d0e] border-stone-800 text-stone-300 hover:border-[#c5a880]"
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Drawer Bottom Actions */}
                        <div className="border-t border-stone-800 pt-4 flex gap-3">
                            <button
                                onClick={clearAllFilters}
                                className="flex-1 border border-stone-800 text-stone-200 py-3 text-[10px] font-bold tracking-widest uppercase rounded-xl cursor-pointer"
                            >
                                CLEAR
                            </button>
                            <button
                                onClick={() => setShowMobileFilters(false)}
                                className="flex-1 bg-[#c5a880] text-[#0c0d0e] py-3 text-[10px] font-bold tracking-widest uppercase rounded-xl hover:bg-[#b5976f] cursor-pointer transition-colors"
                            >
                                APPLY
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}