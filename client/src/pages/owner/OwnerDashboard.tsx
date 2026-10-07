/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext.tsx";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import Loader from "../../components/Loader.tsx";
import TableManagement from "../../components/owner/TableManagement.tsx";

import { CalendarIcon, SettingsIcon, Sparkles, LogOut, Store } from "lucide-react";
import RestaurantWizard from "../../components/owner/RestaurantWizard.tsx";
import PendingApproval from "../../components/owner/PendingApproval.tsx";
import RequestRejected from "../../components/owner/RequestRejected.tsx";
import OwnerBookings from "../../components/owner/OwnerBookings.tsx";
import OwnerProfileDetails from "../../components/owner/OwnerProfileDetails.tsx";
import api from "../../lib/api.ts";
import toast from "react-hot-toast";

export default function OwnerDashboard() {
    const { logout, user } = useAppContext();
    const [restaurant, setRestaurant] = useState<any>(null);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"bookings" | "details">("bookings");

    useEffect(() => {
        let isSubscribed = true;

        const loadOwnerDashboard = async () => {
            if (!user) {
                if (isSubscribed) setLoading(false);
                return;
            }

            try {
                const res = await api.get("/owner/restaurant");
                const restaurantData = res.data?.restaurant || res.data;

                if (!isSubscribed) return;

                if (restaurantData && restaurantData._id) {
                    setRestaurant(restaurantData);

                    if (restaurantData.status === "approved") {
                        try {
                            const bookingRes = await api.get("/owner/bookings");
                            const bookingsList = bookingRes.data?.bookings || bookingRes.data || [];
                            if (isSubscribed) {
                                setBookings(Array.isArray(bookingsList) ? bookingsList : []);
                            }
                        } catch (bookingErr: any) {
                            console.error("Bookings Fetch Error:", bookingErr);
                        }
                    }
                } else {
                    setRestaurant(null);
                }
            } catch (error: any) {
                console.error("Dashboard Fetch Error:", error);
                if (isSubscribed) {
                    if (error?.response?.status !== 404) {
                        toast.error(error?.response?.data?.message || "Failed to load dashboard data");
                    }
                    setRestaurant(null);
                }
            } finally {
                if (isSubscribed) {
                    setLoading(false);
                }
            }
        };

        loadOwnerDashboard();

        return () => {
            isSubscribed = false;
        };
    }, [user]);

    if (loading) {
        return <Loader text="Loading Partner Portal Console..." />;
    }

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20 relative overflow-hidden text-left">
            {/* Ambient Background Lighting */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c5a880]/5 blur-[180px] pointer-events-none" />

            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 relative z-10">
                {/* Heading Ribbon */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#c5a880]/20 pb-6 mb-10 text-left">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                            <Sparkles size={11} /> PARTNER CONCIERGE PORTAL
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text flex items-center gap-2">
                            <Store size={32} className="text-[#c5a880]" /> Establishment Portal
                        </h1>
                        <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
                            Review capacity limits, manage seating slots, and process live guest reservations.
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <LogOut size={13} /> Sign Out
                    </button>
                </div>

                {/* Case 1: No Restaurant Setup Profile */}
                {!restaurant ? (
                    <RestaurantWizard setRestaurant={setRestaurant} />
                ) : restaurant.status === "pending" ? (
                    /* Case 2: Profile Pending Approval */
                    <PendingApproval restaurant={restaurant} />
                ) : restaurant.status === "rejected" ? (
                    /* Case 3: Rejected Request */
                    <RequestRejected restaurantName={restaurant.name} />
                ) : (
                    /* Case 4: Approved - Full Management Panel */
                    <>
                        <TableManagement restaurantId={restaurant._id} />

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                            {/* Tab Selector Sidebar */}
                            <aside className="lg:col-span-3 space-y-6 glass-panel border border-stone-800/80 p-5 sm:p-6 rounded-2xl shadow-2xl h-fit bg-[#151719]/80">
                            <div className="flex items-center gap-3.5 border-b border-[#c5a880]/20 pb-5">
                                <span className="w-12 h-12 bg-[#c5a880]/10 border border-[#c5a880]/30 rounded-full flex items-center justify-center text-[#c5a880] font-serif font-bold text-lg shrink-0 shadow-sm">
                                    {restaurant.name?.charAt(0) || "R"}
                                </span>
                                <div className="min-w-0">
                                    <h4 className="font-serif font-bold text-stone-100 text-base truncate">{restaurant.name}</h4>
                                    <span className="text-[9px] font-bold text-[#c5a880] tracking-widest uppercase bg-[#c5a880]/10 border border-[#c5a880]/20 px-2.5 py-0.5 rounded-full inline-block mt-1">
                                        APPROVED PARTNER
                                    </span>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-2">
                                <button
                                    onClick={() => setActiveTab("bookings")}
                                    className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold tracking-wider uppercase text-left rounded-xl cursor-pointer transition-luxury ${
                                        activeTab === "bookings"
                                            ? "bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                            : "text-stone-400 hover:bg-[#0c0d0e]/60 hover:text-stone-200"
                                    }`}
                                >
                                    <span className="flex items-center gap-2.5">
                                        <CalendarIcon size={15} /> Bookings
                                    </span>
                                    <span className="px-2 py-0.5 text-[9px] font-bold bg-[#0c0d0e]/80 text-[#c5a880] rounded-full border border-[#c5a880]/30">
                                        {bookings.length}
                                    </span>
                                </button>

                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`w-full flex items-center gap-2.5 px-4 py-3.5 text-xs font-bold tracking-wider uppercase text-left rounded-xl cursor-pointer transition-luxury ${
                                        activeTab === "details"
                                            ? "bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                            : "text-stone-400 hover:bg-[#0c0d0e]/60 hover:text-stone-200"
                                    }`}
                                >
                                    <SettingsIcon size={15} /> Profile Details
                                </button>
                            </nav>
                            </aside>

                            {/* Content Panel */}
                            <div className="lg:col-span-9 space-y-8">
                            {/* Tab 1: Bookings List */}
                            {activeTab === "bookings" && (
                                <OwnerBookings bookings={bookings} setBookings={setBookings} totalSeats={restaurant.totalSeats} />
                            )}

                            {/* Tab 2: Profile Details and Capacity Management */}
                            {activeTab === "details" && <OwnerProfileDetails restaurant={restaurant} setRestaurant={setRestaurant} />}
                            </div>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}