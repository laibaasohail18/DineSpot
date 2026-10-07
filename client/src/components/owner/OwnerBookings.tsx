/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Calendar, Users, Clock, Sparkles, CheckCircle2, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../lib/api";

interface OwnerBookingsProps {
    bookings: any[];
    setBookings: React.Dispatch<React.SetStateAction<any[]>>;
    totalSeats: number;
}

export default function OwnerBookings({ bookings, setBookings, totalSeats }: OwnerBookingsProps) {
    const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
        try {
            await api.put(`/owner/bookings/${bookingId}/status`, { status: newStatus });
            setBookings((prev) => prev.map((b) => (b._id === bookingId ? { ...b, status: newStatus } : b)));

            toast.success(`Booking status updated to ${newStatus}`);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Update status failed");
        }
    };

    return (
        <div className="space-y-6 text-left">
            {/* Upper Metric Header Ribbon */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-[#c5a880]/20 gap-3">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                        <Sparkles size={11} /> PARTNER CONSOLE
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                        Active Guest Reservations
                    </h3>
                </div>

                <div className="bg-surface-container-low border border-stone-800 px-4 py-2 rounded-xl text-xs text-stone-300 font-light flex items-center gap-2 shadow-sm">
                    <span className="text-stone-400">Total Seating Capacity:</span>
                    <strong className="text-[#c5a880] font-bold font-serif text-sm">{totalSeats} seats</strong>
                </div>
            </div>

            {/* Empty State Card */}
            {bookings.length === 0 ? (
                <div className="glass-panel border border-stone-800 p-12 sm:p-16 text-center rounded-3xl shadow-xl">
                    <div className="w-14 h-14 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto mb-4">
                        <Calendar size={28} />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-stone-200 mb-1">No Guest Reservations Yet</h4>
                    <p className="text-xs text-stone-400 font-light italic max-w-sm mx-auto">
                        Real-time table reservations submitted by guests will populate automatically here.
                    </p>
                </div>
            ) : (
                /* Reservation List Cards */
                <div className="space-y-4">
                    {bookings.map((b) => (
                        <div
                            key={b._id}
                            className="group relative glass-panel border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-low/80 hover:bg-surface-container-low"
                        >
                            <div className="space-y-3 flex-1">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors">
                                        {b.user?.name || "VIP Guest"}
                                    </h4>
                                    <span className="text-[10px] text-[#c5a880] bg-[#0c0d0e] border border-[#c5a880]/30 px-2.5 py-0.5 rounded-full font-mono tracking-wider font-semibold">
                                        #{b.bookingId || b._id.slice(-6)}
                                    </span>
                                </div>

                                {/* Metadata Row */}
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300 font-light">
                                    <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                        <Users size={14} className="text-[#c5a880]" /> <strong className="font-semibold text-stone-200">{b.guests}</strong> Guests
                                    </span>
                                    <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                        <Clock size={14} className="text-[#c5a880]" /> <strong className="font-semibold text-stone-200">{b.time}</strong>
                                    </span>
                                    <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                        <Calendar size={14} className="text-[#c5a880]" /> {new Date(b.date).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* Special Requests Card */}
                                {b.specialRequests && (
                                    <p className="text-xs text-stone-300 bg-[#0c0d0e] px-3.5 py-2.5 rounded-xl border-l-2 border-[#c5a880] mt-2 font-light leading-relaxed">
                                        <strong className="text-[#c5a880] font-semibold">Special Request:</strong> {b.specialRequests}
                                    </p>
                                )}
                            </div>

                            {/* Status & Action Control Section */}
                            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-800/80 pt-4 md:pt-0">
                                <span
                                    className={`text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border ${
                                        b.status === "confirmed"
                                            ? "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-sm"
                                            : b.status === "completed"
                                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm"
                                              : "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm"
                                    }`}
                                >
                                    {b.status}
                                </span>

                                {b.status === "confirmed" && (
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleUpdateBookingStatus(b._id, "completed")}
                                            className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md"
                                        >
                                            <CheckCircle2 size={13} /> Complete
                                        </button>
                                        <button
                                            onClick={() => handleUpdateBookingStatus(b._id, "cancelled")}
                                            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer flex items-center gap-1.5 shadow-md"
                                        >
                                            <XCircle size={13} /> Cancel
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}