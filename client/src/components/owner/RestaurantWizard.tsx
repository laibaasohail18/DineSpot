/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Utensils, Upload, Image, Sparkles, Send } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api.ts";

interface RestaurantWizardProps {
    setRestaurant: (restaurant: any) => void;
}

export default function RestaurantWizard({ setRestaurant }: RestaurantWizardProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [priceRange, setPriceRange] = useState("$$");
    const [location, setLocation] = useState("");
    const [address, setAddress] = useState("");
    const [chef, setChef] = useState("");
    const [tags, setTags] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");
    const [availableSlots, setAvailableSlots] = useState<string[]>([
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
    ]);
    const [totalSeats, setTotalSeats] = useState("20");
    const [formLoading, setFormLoading] = useState(false);

    const defaultSlots = [
        "12:00",
        "13:00",
        "14:00",
        "17:00",
        "17:30",
        "18:00",
        "18:30",
        "19:00",
        "19:30",
        "20:00",
        "20:30",
        "21:00",
        "21:30",
    ];

    const toggleSlot = (slot: string) => {
        if (availableSlots.includes(slot)) {
            setAvailableSlots(availableSlots.filter((s) => s !== slot));
        } else {
            setAvailableSlots([...availableSlots, slot].sort());
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleCreateRestaurant = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("description", description);
            formData.append("cuisine", cuisine);
            formData.append("priceRange", priceRange);
            formData.append("location", location);
            formData.append("address", address);
            formData.append("chef", chef);
            formData.append("tags", tags);
            formData.append("availableSlots", availableSlots.join(","));
            formData.append("totalSeats", totalSeats);
            if (imageFile) {
                formData.append("image", imageFile);
            }

            const res = await api.post("/owner/restaurant", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setRestaurant(res.data);

            toast.success("Restaurant profile submitted successfully! Awaiting Admin approval.");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to register restaurant");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto glass-panel border border-[#c5a880]/30 p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-3xl space-y-8 bg-surface-container-low/90 relative overflow-hidden text-left">
            {/* Header Ribbon */}
            <div className="text-center space-y-3 pb-6 border-b border-[#c5a880]/20">
                <div className="w-16 h-16 bg-[#c5a880]/10 border border-[#c5a880]/30 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg shadow-[#c5a880]/10">
                    <Utensils size={30} className="text-[#c5a880]" />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase">
                    <Sparkles size={11} /> ONBOARDING WIZARD
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text">
                    Setup Restaurant Profile
                </h2>
                <p className="text-xs sm:text-sm text-stone-400 font-light max-w-md mx-auto leading-relaxed">
                    Complete your luxury venue details below. Once submitted, your profile will undergo administrative review for approval.
                </p>
            </div>

            <form onSubmit={handleCreateRestaurant} className="space-y-6">
                {/* Basic Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                            Restaurant Name
                        </label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. L'Aura Fine Dining"
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                            Cuisine Type
                        </label>
                        <input
                            type="text"
                            required
                            value={cuisine}
                            onChange={(e) => setCuisine(e.target.value)}
                            placeholder="e.g. French Contemporary, Omakase"
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                        />
                    </div>
                </div>

                {/* Description Textarea */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        Description
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the gastronomical experience, atmosphere, and dining philosophy..."
                        className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 p-4 text-xs focus:outline-none rounded-2xl transition-luxury font-light leading-relaxed placeholder:text-stone-600"
                    ></textarea>
                </div>

                {/* Cover Image Upload Card */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        Restaurant Banner Photo
                    </label>
                    <div className="flex flex-col md:flex-row gap-5 items-center bg-[#0c0d0e]/80 border border-stone-800 p-5 rounded-2xl">
                        <div className="relative w-36 h-24 bg-surface-container-low border border-[#c5a880]/30 rounded-xl overflow-hidden shrink-0 flex items-center justify-center shadow-lg">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <Image size={28} className="text-stone-600" />
                            )}
                        </div>
                        <div className="grow space-y-2 text-center md:text-left w-full">
                            <p className="text-xs text-stone-400 font-light leading-relaxed">
                                Upload a high-resolution banner photo for your luxury venue showcase page.
                            </p>
                            <label className="inline-flex items-center gap-2 px-4 py-2.5 border border-stone-800 hover:border-[#c5a880] hover:text-[#c5a880] transition-luxury text-[10px] font-bold tracking-widest uppercase rounded-xl cursor-pointer bg-surface-container-low text-stone-200">
                                <Upload size={14} className="text-[#c5a880]" />
                                {imageFile ? "Change Image" : "Upload Image"}
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                            {imageFile && (
                                <span className="block text-[10px] text-[#c5a880] font-semibold">
                                    Selected: {imageFile.name}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Attributes Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Price Range</label>
                        <select
                            value={priceRange}
                            onChange={(e) => setPriceRange(e.target.value)}
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
                        >
                            <option value="$" className="bg-surface-container-low">$ (Casual)</option>
                            <option value="$$" className="bg-surface-container-low">$$ (Moderate)</option>
                            <option value="$$$" className="bg-surface-container-low">$$$ (Upscale)</option>
                            <option value="$$$$" className="bg-surface-container-low">$$$$ (Fine Dining)</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Location (City)</label>
                        <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Manhattan, NY"
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Total Capacity (Seats)</label>
                        <input
                            type="number"
                            min="1"
                            required
                            value={totalSeats}
                            onChange={(e) => setTotalSeats(e.target.value)}
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
                        />
                    </div>
                </div>

                {/* Address and Chef Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Address</label>
                        <input
                            type="text"
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="123 Gastronomy Lane, Manhattan"
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Executive Chef</label>
                        <input
                            type="text"
                            required
                            value={chef}
                            onChange={(e) => setChef(e.target.value)}
                            placeholder="Chef Jean-Luc"
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                        />
                    </div>
                </div>

                {/* Tags Input */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Tags (comma separated)</label>
                    <input
                        type="text"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Michelin Star, Romantic, Rooftop"
                        className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium placeholder:text-stone-600"
                    />
                </div>

                {/* Available Slots Chips */}
                <div className="space-y-2.5">
                    <span className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        Available Reservation Slots
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {defaultSlots.map((slot) => {
                            const isSelected = availableSlots.includes(slot);
                            return (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => toggleSlot(slot)}
                                    className={`py-2 px-3 text-[10px] font-bold tracking-wider border transition-luxury cursor-pointer rounded-xl ${
                                        isSelected
                                            ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                            : "bg-[#0c0d0e]/80 border-stone-800 text-stone-400 hover:border-[#c5a880] hover:text-[#c5a880]"
                                    }`}
                                >
                                    {slot}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Endless Shimmer Submit Button */}
                <button
                    type="submit"
                    disabled={formLoading}
                    className="relative group overflow-hidden w-full bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] text-xs font-bold tracking-widest uppercase py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#c5a880]/20 hover:shadow-[0_10px_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 cursor-pointer"
                >
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {formLoading ? "SUBMITTING RESTAURANT..." : "REGISTER RESTAURANT"} <Send size={15} />
                    </span>
                </button>
            </form>
        </div>
    );
}