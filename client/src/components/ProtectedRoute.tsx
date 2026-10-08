import React from "react";
import { useAppContext } from "../context/AppContext.tsx";
import { ShieldAlert, Sparkles, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal.tsx";
import Loader from "./Loader.tsx";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: ("user" | "customer"| "admin" | "owner")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, user, loading, setAuthModalOpen } = useAppContext();

    if (loading) {
        return <Loader text="Verifying Access Credentials..." />;
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0c0d0e] flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden">
                {/* Background Ambient Glow */}
                <div className="absolute w-80 h-80 bg-[#c5a880]/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-surface-container-low border border-[#c5a880]/30 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-2xl sm:rounded-3xl flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mb-6 shadow-lg shadow-[#c5a880]/10">
                        <ShieldAlert size={28} className="sm:w-8 sm:h-8" />
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-widest uppercase mb-3">
                        <Sparkles size={11} /> Authentication Required
                    </span>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text mb-3">
                        Authentication Pass Required
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-400 mb-8 leading-relaxed font-light">
                        Reservation management, table bookings, and portal controls are reserved exclusively for authenticated DineSpot members.
                    </p>

                    <div className="flex flex-col gap-3 w-full">
                        <button
                            onClick={() => setAuthModalOpen(true)}
                            className="w-full bg-[#c5a880] hover:bg-[#b0936b] text-[#0c0d0e] py-3.5 px-4 text-xs font-bold tracking-widest uppercase rounded-xl shadow-lg shadow-[#c5a880]/10 focus:outline-none transition-luxury cursor-pointer"
                        >
                            AUTHENTICATE PASS
                        </button>
                        
                        <Link
                            to="/"
                            className="w-full flex items-center justify-center gap-2 border border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-200 py-3 px-4 text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors"
                        >
                            <ArrowLeft size={14} /> Back To Discover
                        </Link>

                        <AuthModal />
                    </div>
                </div>
            </div>
        );
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        return (
            <div className="min-h-screen bg-[#0c0d0e] flex flex-col items-center justify-center p-4 sm:p-6 text-center relative overflow-hidden">
                {/* Red Glowing Ambient light for security deny */}
                <div className="absolute w-80 h-80 bg-rose-500/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="relative z-10 w-full max-w-sm sm:max-w-md bg-surface-container-low border border-rose-500/30 p-6 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.9)] rounded-2xl sm:rounded-3xl flex flex-col items-center animate-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
                        <ShieldAlert size={28} className="sm:w-8 sm:h-8" />
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mb-3">
                        Access Restricted
                    </h2>

                    <p className="text-xs sm:text-sm text-stone-400 mb-8 leading-relaxed font-light">
                        Your current member profile level does not hold clearance permissions for this suite.
                    </p>

                    <Link
                        to="/"
                        className="w-full bg-stone-800 hover:bg-stone-700 text-stone-200 py-3.5 px-4 text-xs font-bold tracking-widest uppercase rounded-xl transition-colors"
                    >
                        RETURN TO HOME
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}