/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import RestaurantCard from "../components/RestaurantCard.tsx";
import AuthModal from "../components/AuthModal.tsx";
import { CalendarIcon, UsersIcon, ClockIcon, MapPinIcon, CalendarDaysIcon, Sparkles, ArrowRight, XCircle } from "lucide-react";
import toast from "react-hot-toast";
import api from "../lib/api.ts";

export default function Dashboard() {
    const { user } = useAppContext();

    const [bookings, setBookings] = useState<any[]>([]);
    const [recommendations, setRecommendations] = useState<any[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(true);

    // Fetch user bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoadingBookings(true);
                const res = await api.get("/bookings/my");
                setBookings(res.data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.message);
            } finally {
                setLoadingBookings(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user]);

    // Fetch recommendations
    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const res = await api.get("/restaurants/featured");
                setRecommendations(res.data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.message);
            }
        };
        fetchRecommendations();
    }, []);

    const handleCancelBooking = async (bookingId: string) => {
        if (!window.confirm("Are you sure you want to cancel this reservation?")) {
            return;
        }

        try {
            await api.put(`/bookings/${bookingId}/cancel`);
            // Update local state
            setBookings((prev) => prev.map((b) => (b._id === bookingId ? { ...b, status: "Cancelled" } : b)));

            toast.success("Reservation cancelled successfully.");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message);
        }
    };

    if (!user) return null;

    // Filter bookings into upcoming and past
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingBookings = bookings.filter((b) => {
        const bDate = new Date(b.date);
        return bDate >= today && b.status === "confirmed";
    });

    const pastBookings = bookings.filter((b) => {
        const bDate = new Date(b.date);
        return bDate < today || b.status !== "confirmed";
    });

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20 relative overflow-hidden text-left">
            {/* Ambient Background Lighting Glows */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c5a880]/5 blur-[160px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-[#c5a880]/5 blur-[160px] pointer-events-none" />

            <Navbar />
            <AuthModal />

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 relative z-10">
                <div className="grow space-y-10 sm:space-y-12">
                    {/* Welcome Header Ribbon */}
                    <div className="pb-5 border-b border-[#c5a880]/20 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                                <Sparkles size={11} /> DINER PORTAL
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text">
                                Welcome back, {user.name.split(" ")[0]}
                            </h2>
                            <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
                                Manage your upcoming reservations and dining itinerary.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-12">
                        {/* Upcoming Reservations Section */}
                        <div className="space-y-5">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 flex items-center gap-2">
                                Upcoming Reservations
                                <span className="text-xs text-[#c5a880] font-sans font-bold">({upcomingBookings.length})</span>
                            </h3>

                            {loadingBookings ? (
                                <div className="glass-panel border border-stone-800 p-12 text-center flex flex-col items-center justify-center rounded-2xl shadow-xl">
                                    <div className="w-8 h-8 border-2 border-stone-800 border-t-[#c5a880] rounded-full animate-spin shadow-[0_0_15px_rgba(197,168,128,0.2)]"></div>
                                    <p className="text-[10px] tracking-widest text-stone-400 uppercase font-semibold mt-3">Loading Reservations...</p>
                                </div>
                            ) : upcomingBookings.length === 0 ? (
                                <div className="glass-panel border border-stone-800/80 p-12 text-center rounded-3xl shadow-xl bg-surface-container-low/60">
                                    <div className="w-14 h-14 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] mx-auto mb-3">
                                        <CalendarDaysIcon size={28} />
                                    </div>

                                    <h4 className="font-serif text-base font-bold text-stone-200 mb-1">No Active Reservations</h4>
                                    <p className="text-xs text-stone-400 font-light italic max-w-sm mx-auto">
                                        You currently have no upcoming table bookings scheduled.
                                    </p>

                                    <Link
                                        to="/search"
                                        className="relative group overflow-hidden inline-flex items-center gap-2 mt-6 bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] text-[10px] font-bold tracking-widest uppercase px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-[0_10px_25px_rgba(197,168,128,0.3)]"
                                    >
                                        <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                                        <span className="relative z-10 flex items-center gap-2">
                                            EXPLORE & BOOK A TABLE <ArrowRight size={13} />
                                        </span>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {upcomingBookings.map((b) => (
                                        <div
                                            key={b._id}
                                            className="group relative glass-panel border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-low/80 hover:bg-surface-container-low"
                                        >
                                            <div className="flex gap-4 items-center">
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 bg-[#0c0d0e] border border-[#c5a880]/30 shadow-md">
                                                    <img
                                                        src={b.restaurant?.image}
                                                        alt={b.restaurant?.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[9px] font-bold text-[#c5a880] tracking-[0.2em] uppercase">
                                                        {b.restaurant?.cuisine}
                                                    </span>
                                                    <h4 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors">
                                                        {b.restaurant?.name}
                                                    </h4>
                                                    <p className="text-xs text-stone-400 flex items-center gap-1 font-light">
                                                        <MapPinIcon size={13} className="text-[#c5a880] shrink-0" />
                                                        {b.restaurant?.location}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Reservation Parameters Card */}
                                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-stone-300 bg-[#0c0d0e]/80 p-3.5 sm:p-4 rounded-2xl border border-stone-800/80 w-full md:w-auto font-light">
                                                <div className="flex items-center gap-2 pr-4 border-r border-stone-800">
                                                    <CalendarIcon size={14} className="text-[#c5a880]" />
                                                    <span className="font-semibold text-stone-100">{new Date(b.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center gap-2 pr-4 border-r border-stone-800">
                                                    <ClockIcon size={14} className="text-[#c5a880]" />
                                                    <span className="font-semibold text-stone-100">{b.time}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <UsersIcon size={14} className="text-[#c5a880]" />
                                                    <span className="font-semibold text-stone-100">{b.guests} Guests</span>
                                                </div>
                                            </div>

                                            <div className="flex gap-3 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-800/80 pt-4 md:pt-0">
                                                <button
                                                    onClick={() => handleCancelBooking(b._id)}
                                                    className="px-4 py-2.5 text-[10px] font-bold tracking-widest uppercase text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl cursor-pointer transition-luxury flex items-center gap-1.5 shadow-sm"
                                                >
                                                    <XCircle size={13} /> Cancel Seating
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Past & Cancelled Dining History */}
                        <div className="space-y-5">
                            {!loadingBookings && pastBookings.length !== 0 && (
                                <>
                                    <h3 className="font-serif text-xl font-bold text-stone-100">Dining History</h3>
                                    <div className="glass-panel border border-stone-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low/80">
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-left text-xs border-collapse">
                                                <thead>
                                                    <tr className="bg-[#0c0d0e]/90 border-b border-stone-800/80 text-[10px] font-bold tracking-widest text-[#c5a880] uppercase">
                                                        <th className="p-4 sm:p-5">Establishment</th>
                                                        <th className="p-4 sm:p-5">Date & Time</th>
                                                        <th className="p-4 sm:p-5">Party Size</th>
                                                        <th className="p-4 sm:p-5 text-right">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-stone-800/60 font-light text-stone-300">
                                                    {pastBookings.map((b) => (
                                                        <tr key={b._id} className="hover:bg-[#0c0d0e]/60 transition-colors">
                                                            <td className="p-4 sm:p-5 font-serif font-bold text-stone-100">
                                                                <Link
                                                                    to={`/restaurant/${b.restaurant?.slug}`}
                                                                    className="hover:text-[#c5a880] transition-colors"
                                                                >
                                                                    {b.restaurant?.name || "Deleted Venue"}
                                                                </Link>
                                                            </td>
                                                            <td className="p-4 sm:p-5 text-stone-300">
                                                                {new Date(b.date).toLocaleDateString()} at <strong className="text-stone-100">{b.time}</strong>
                                                            </td>
                                                            <td className="p-4 sm:p-5 text-stone-300">
                                                                {b.guests} {b.guests === 1 ? "Guest" : "Guests"}
                                                            </td>
                                                            <td className="p-4 sm:p-5 text-right">
                                                                <span
                                                                    className={`inline-block py-1 px-3 text-[9px] font-bold tracking-widest uppercase rounded-full border ${
                                                                        b.status === "confirmed"
                                                                            ? "bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-sm"
                                                                            : b.status === "completed"
                                                                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm"
                                                                              : "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm"
                                                                    }`}
                                                                >
                                                                    {b.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Featured Recommendations Section */}
                        {recommendations.length > 0 && (
                            <div className="space-y-6 pt-10 border-t border-[#c5a880]/20">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                                            <Sparkles size={11} /> CURATED SELECTIONS
                                        </span>
                                        <h3 className="font-serif text-2xl font-bold gold-gradient-text">
                                            Recommended for You
                                        </h3>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                    {recommendations.slice(0, 3).map((r) => (
                                        <RestaurantCard key={r._id} restaurant={r} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}