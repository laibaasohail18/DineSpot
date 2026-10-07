/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Calendar, Users, Clock, MapPin, Check, Sparkles, ArrowRight, Home } from "lucide-react";

interface BookingSuccessProps {
    confirmedBooking: any;
    restaurant: any;
    date: string;
    slot: string;
    guests: string;
}

export default function BookingSuccess({ confirmedBooking, restaurant, date, slot, guests }: BookingSuccessProps) {
    if (!confirmedBooking || !restaurant) return null;

    return (
        <div className="min-h-[75vh] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
            {/* Ambient Lighting Background Glow */}
            <div className="absolute w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-xl w-full glass-panel border border-[#c5a880]/30 p-8 sm:p-12 text-center rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-8 animate-in zoom-in-95 duration-500 bg-surface-container-low/90 relative z-10">
                {/* Glowing Success Badge Ring */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#c5a880]/10 border border-[#c5a880]/40 rounded-full flex items-center justify-center text-[#c5a880] mx-auto shadow-lg shadow-[#c5a880]/15">
                    <Check size={36} className="text-[#c5a880]" />
                </div>

                <div className="space-y-2.5">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase">
                        <Sparkles size={11} /> SEATING GUARANTEED
                    </span>
                    <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text">
                        Reservation Confirmed
                    </h2>
                    <p className="text-xs sm:text-sm text-stone-300 max-w-sm mx-auto leading-relaxed font-light">
                        A table has been reserved for you at{" "}
                        <strong className="text-[#c5a880] font-bold">{restaurant.name}</strong>.
                    </p>
                </div>

                {/* Confirmation Card Details Box */}
                <div className="bg-[#0c0d0e]/80 p-6 rounded-2xl space-y-4 text-left border border-stone-800/80 shadow-inner">
                    <div className="flex justify-between items-center pb-3 border-b border-stone-800">
                        <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                            REFERENCE CODE
                        </span>
                        <span className="text-sm font-mono font-bold text-[#c5a880] bg-[#c5a880]/10 px-3 py-1 rounded-full border border-[#c5a880]/30 shadow-sm">
                            #{confirmedBooking.bookingId || confirmedBooking._id?.slice(-6)}
                        </span>
                    </div>

                    <div className="space-y-3 text-xs text-stone-300 font-light">
                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-surface-container-low border border-stone-800 flex items-center justify-center text-[#c5a880] shrink-0">
                                <Calendar size={14} />
                            </div>
                            <span className="font-medium text-stone-200">
                                {new Date(date).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-surface-container-low border border-stone-800 flex items-center justify-center text-[#c5a880] shrink-0">
                                <Clock size={14} />
                            </div>
                            <span className="font-medium text-stone-200">{slot}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-7 h-7 rounded-lg bg-surface-container-low border border-stone-800 flex items-center justify-center text-[#c5a880] shrink-0">
                                <Users size={14} />
                            </div>
                            <span className="font-medium text-stone-200">{guests} Guests</span>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-surface-container-low border border-stone-800 flex items-center justify-center text-[#c5a880] shrink-0 mt-0.5">
                                <MapPin size={14} />
                            </div>
                            <span className="font-light text-stone-300 leading-relaxed">{restaurant.address}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation CTA Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Link
                        to="/dashboard"
                        className="relative group overflow-hidden flex-1 bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] py-4 px-4 text-xs font-bold tracking-widest uppercase rounded-2xl text-center cursor-pointer transition-all duration-300 shadow-lg shadow-[#c5a880]/20 hover:shadow-[0_10px_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    >
                        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            MY BOOKINGS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>

                    <Link
                        to="/"
                        className="flex-1 bg-[#0c0d0e] border border-stone-800 hover:border-[#c5a880] text-stone-200 hover:text-[#c5a880] py-4 px-4 text-xs font-bold tracking-widest uppercase rounded-2xl text-center cursor-pointer transition-luxury flex items-center justify-center gap-2"
                    >
                        <Home size={14} /> DISCOVER MORE
                    </Link>
                </div>
            </div>
        </div>
    );
}