import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { X, Mail, Lock, User, Phone, Sparkles } from "lucide-react";

export default function AuthModal() {
    const { isAuthModalOpen, setAuthModalOpen, login, register } = useAppContext();
    const [isLoginTab, setIsLoginTab] = useState<boolean>(true);

    // Form states
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [isOwner, setIsOwner] = useState<boolean>(false);

    const [formLoading, setFormLoading] = useState(false);

    if (!isAuthModalOpen) return null;

    const resetForm = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setIsOwner(false);
    };

    const handleClose = () => {
        resetForm();
        setAuthModalOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormLoading(true);

        let success: boolean;

        if (isLoginTab) {
            success = await login(email, password);
        } else {
            success = await register(name, email, password, phone, isOwner ? "owner" : "user");
        }

        setFormLoading(false);
        if (success) {
            handleClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-300">
            {/* Click outside overlay */}
            <div className="fixed inset-0" onClick={handleClose}></div>

            {/* Modal Container - Responsive Max Height for Mobile Viewports */}
            <div className="relative w-full max-w-sm sm:max-w-md my-auto bg-surface-container-low border border-[#c5a880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-2xl sm:rounded-3xl overflow-hidden z-10 transition-luxury flex flex-col max-h-[90vh] sm:max-h-none">
                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-8 h-8 rounded-full bg-[#0c0d0e]/70 border border-stone-800 text-stone-400 hover:text-[#c5a880] hover:border-[#c5a880]/50 flex items-center justify-center transition-colors cursor-pointer"
                    aria-label="Close"
                >
                    <X size={15} />
                </button>

                {/* Header Tabs */}
                <div className="flex border-b border-stone-800 bg-[#0c0d0e]">
                    <button
                        onClick={() => setIsLoginTab(true)}
                        className={`flex-1 py-3.5 sm:py-4 text-center text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-luxury cursor-pointer ${
                            isLoginTab
                                ? "text-[#c5a880] border-b-2 border-[#c5a880] bg-surface-container-low"
                                : "text-stone-500 hover:text-stone-300 bg-[#0c0d0e]"
                        }`}
                    >
                        SIGN IN
                    </button>
                    <button
                        onClick={() => setIsLoginTab(false)}
                        className={`flex-1 py-3.5 sm:py-4 text-center text-[11px] sm:text-xs font-bold tracking-widest uppercase transition-luxury cursor-pointer ${
                            !isLoginTab
                                ? "text-[#c5a880] border-b-2 border-[#c5a880] bg-surface-container-low"
                                : "text-stone-500 hover:text-stone-300 bg-[#0c0d0e]"
                        }`}
                    >
                        CREATE ACCOUNT
                    </button>
                </div>

                {/* Scrollable Form Body for Small Mobile Screens */}
                <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-5 overflow-y-auto flex-1 flex flex-col justify-between">
                    <div>
                        <div className="text-center mb-5 sm:mb-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] uppercase font-bold tracking-widest mb-2.5">
                                <Sparkles size={11} /> DineSpot VIP Access
                            </div>
                            <h2 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text tracking-tight">
                                {isLoginTab ? "Welcome Back" : "Join the Pass"}
                            </h2>
                            <p className="text-[11px] sm:text-xs text-stone-400 mt-1 leading-relaxed font-light">
                                Access your exclusive reservations and luxury dining profile.
                            </p>
                        </div>

                        <div className="space-y-3.5 sm:space-y-4">
                            {/* Name Field (Register Only) */}
                            {!isLoginTab && (
                                <div className="space-y-1">
                                    <label className="block text-left text-[10px] font-semibold text-stone-400 tracking-wider uppercase">
                                        FULL NAME
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                                            <User size={15} />
                                        </span>
                                        <input
                                            type="text"
                                            required={!isLoginTab}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Sarah Jenkins"
                                            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:border-[#c5a880] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="space-y-1">
                                <label className="block text-left text-[10px] font-semibold text-stone-400 tracking-wider uppercase">
                                    EMAIL ADDRESS
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                                        <Mail size={15} />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:border-[#c5a880] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Phone Field (Register Only) */}
                            {!isLoginTab && (
                                <div className="space-y-1">
                                    <label className="block text-left text-[10px] font-semibold text-stone-400 tracking-wider uppercase">
                                        PHONE NUMBER (OPTIONAL)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                                            <Phone size={15} />
                                        </span>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="+1 (555) 000-0000"
                                            className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:border-[#c5a880] focus:outline-none transition-colors"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Password Field */}
                            <div className="space-y-1">
                                <label className="block text-left text-[10px] font-semibold text-stone-400 tracking-wider uppercase">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-500">
                                        <Lock size={15} />
                                    </span>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-200 placeholder-stone-600 focus:border-[#c5a880] focus:outline-none transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Owner Checkbox (Register Only) */}
                            {!isLoginTab && (
                                <div className="flex items-center gap-2.5 pt-1.5">
                                    <input
                                        type="checkbox"
                                        id="isOwner"
                                        checked={isOwner}
                                        onChange={(e) => setIsOwner(e.target.checked)}
                                        className="h-4 w-4 accent-[#c5a880] rounded border-stone-800 bg-[#0c0d0e] cursor-pointer"
                                    />
                                    <label htmlFor="isOwner" className="text-xs text-stone-300 select-none cursor-pointer font-light">
                                        I am a Restaurant Owner / Partner
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="mt-6 sm:mt-8 pt-2">
                        <button
                            type="submit"
                            disabled={formLoading}
                            className="w-full bg-[#c5a880] hover:bg-[#b0936b] text-[#0c0d0e] py-3.5 px-4 text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-[#c5a880]/10 focus:outline-none transition-luxury disabled:opacity-50 cursor-pointer"
                        >
                            {formLoading ? "PROCESSING..." : isLoginTab ? "SIGN IN" : "CREATE VIP ACCOUNT"}
                        </button>

                        <p className="text-center text-[10px] text-stone-500 mt-3 leading-relaxed">
                            By proceeding, you agree to our{" "}
                            <a href="#" className="text-[#c5a880] hover:underline">
                                Terms of Service
                            </a>
                            .
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}