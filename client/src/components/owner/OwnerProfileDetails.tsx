/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Upload, Image, Sparkles, Save } from "lucide-react";
import api from "../../lib/api.ts";

interface OwnerProfileDetailsProps {
    restaurant: any;
    setRestaurant: (restaurant: any) => void;
}

export default function OwnerProfileDetails({ restaurant, setRestaurant }: OwnerProfileDetailsProps) {
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
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
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

    useEffect(() => {
        if (restaurant) {
            (() => {
                setName(restaurant.name || "");
                setDescription(restaurant.description || "");
                setCuisine(restaurant.cuisine || "");
                setPriceRange(restaurant.priceRange || "$$");
                setLocation(restaurant.location || "");
                setAddress(restaurant.address || "");
                setChef(restaurant.chef || "");
                setTags(restaurant.tags?.join(", ") || "");
                setTotalSeats(restaurant.totalSeats?.toString() || "20");
                setAvailableSlots(restaurant.availableSlots || []);
                setImagePreview(restaurant.image || "");
                setImageFile(null);
            })();
        }
    }, [restaurant]);

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

    const handleUpdateRestaurant = async (e: React.FormEvent) => {
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
            
            const res = await api.put("/owner/restaurant", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            setRestaurant(res.data);
            toast.success("Profile details updated successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Update failed");
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="glass-panel border border-[#c5a880]/30 p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl space-y-6 text-left relative overflow-hidden bg-surface-container-low/80">
            {/* Header Section */}
            <div className="flex justify-between items-center pb-4 border-b border-[#c5a880]/20">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                        <Sparkles size={11} /> VENUE CONFIGURATION
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                        Update Venue Profile & Capacity
                    </h3>
                </div>
            </div>

            <form onSubmit={handleUpdateRestaurant} className="space-y-6">
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
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
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
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
                        />
                    </div>
                </div>

                {/* Description Input */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        Description
                    </label>
                    <textarea
                        required
                        rows={4}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 p-4 text-xs focus:outline-none rounded-2xl transition-luxury font-light leading-relaxed"
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
                                {imageFile ? "Change Banner Photo" : "Upload Banner Photo"}
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

                {/* Secondary Attributes Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Price Tier</label>
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
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
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
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">Executive Chef</label>
                        <input
                            type="text"
                            required
                            value={chef}
                            onChange={(e) => setChef(e.target.value)}
                            className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
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
                        className="w-full bg-[#0c0d0e]/80 border border-stone-800 focus:border-[#c5a880] text-stone-100 px-4 py-3 text-xs focus:outline-none rounded-xl transition-luxury font-medium"
                        placeholder="Romantic, Michelin Star, Outdoor Seating"
                    />
                </div>

                {/* Slots Selector Chips */}
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

                {/* Endless Gold CTA Button */}
                <button
                    type="submit"
                    disabled={formLoading}
                    className="relative group overflow-hidden w-full bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] text-xs font-bold tracking-widest uppercase py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-[#c5a880]/20 hover:shadow-[0_10px_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 cursor-pointer"
                >
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {formLoading ? "SAVING CHANGES..." : "SAVE PROFILE DETAILS"} <Save size={15} />
                    </span>
                </button>
            </form>
        </div>
    );
}