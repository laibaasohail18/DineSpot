/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar.tsx";
import Footer from "../../components/Footer.tsx";
import Loader from "../../components/Loader.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
import { ShieldCheckIcon, CheckCircleIcon, BarChart3Icon, LogOut, Sparkles } from "lucide-react";

// Subcomponents
import AdminApprovals from "../../components/admin/AdminApprovals.tsx";
import AdminStats from "../../components/admin/AdminStats.tsx";
import api from "../../lib/api.ts";
import toast from "react-hot-toast";

export default function AdminDashboard() {
    const { logout } = useAppContext();
    const [restaurants, setRestaurants] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"approvals" | "stats">("approvals");
    const [btnLoading, setBtnLoading] = useState<string | null>(null);

    const fetchAdminData = async () => {
        try {
            setLoading(true);
            const rRes = await api.get("/admin/restaurants");
            setRestaurants(rRes.data);

            const sRes = await api.get("/admin/stats");
            setStats(sRes.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to retrieve administrator data");
        } finally {
            setLoading(false);
        }
    };

    const handleApproveStatus = async (restaurantId: string, status: "approved" | "rejected") => {
        try {
            setBtnLoading(restaurantId);
            await api.put(`/admin/restaurants/${restaurantId}/approve`, { status });
            toast.success(`Restaurant status updated to ${status.toUpperCase()}`);

            // Reload local list and stats
            const rRes = await api.get("/admin/restaurants");
            setRestaurants(rRes.data);

            const sRes = await api.get("/admin/stats");
            setStats(sRes.data);
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Failed to update restaurant approval status");
        } finally {
            setBtnLoading(null);
        }
    };

    useEffect(() => {
        (async () => await fetchAdminData())();
    }, []);

    if (loading) {
        return <Loader text="Retrieving Executive Console Data..." />;
    }

    // Segregate pending / other restaurants
    const pendingRestaurants = restaurants.filter((r) => r.status === "pending");
    const otherRestaurants = restaurants.filter((r) => r.status !== "pending");

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20 relative overflow-hidden text-left">
            {/* Ambient Lighting Background */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#c5a880]/5 blur-[180px] pointer-events-none" />

            <Navbar />

            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 relative z-10">
                {/* Heading Ribbon */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#c5a880]/20 pb-6 mb-10 text-left">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                            <Sparkles size={11} /> MASTER CONTROL PANEL
                        </span>
                        <h1 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text flex items-center gap-2">
                            <ShieldCheckIcon size={32} className="text-[#c5a880]" /> Executive Admin Console
                        </h1>
                        <p className="text-xs sm:text-sm text-stone-400 mt-1 font-light">
                            Approve partner venues, audit listings, and monitor global platform performance metrics.
                        </p>
                    </div>
                    <button
                        onClick={logout}
                        className="bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 px-5 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer flex items-center gap-1.5 shadow-sm"
                    >
                        <LogOut size={13} /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Tab Navigation Sidebar */}
                    <aside className="lg:col-span-3 space-y-6 glass-panel border border-stone-800/80 p-5 sm:p-6 rounded-2xl shadow-2xl h-fit bg-[#151719]/80">
                        <nav className="flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("approvals")}
                                className={`w-full flex items-center justify-between px-4 py-3.5 text-xs font-bold tracking-wider uppercase text-left rounded-xl cursor-pointer transition-luxury ${
                                    activeTab === "approvals"
                                        ? "bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                        : "text-stone-400 hover:bg-[#0c0d0e]/60 hover:text-stone-200"
                                }`}
                            >
                                <span className="flex items-center gap-2.5">
                                    <CheckCircleIcon size={15} /> Partner Approvals
                                </span>
                                {pendingRestaurants.length > 0 && (
                                    <span className="px-2 py-0.5 text-[9px] font-bold bg-rose-500 text-white rounded-full">
                                        {pendingRestaurants.length}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => setActiveTab("stats")}
                                className={`w-full flex items-center gap-2.5 px-4 py-3.5 text-xs font-bold tracking-wider uppercase text-left rounded-xl cursor-pointer transition-luxury ${
                                    activeTab === "stats"
                                        ? "bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                        : "text-stone-400 hover:bg-[#0c0d0e]/60 hover:text-stone-200"
                                }`}
                            >
                                <BarChart3Icon size={15} /> Platform Analytics
                            </button>
                        </nav>
                    </aside>

                    {/* Content Panel */}
                    <div className="lg:col-span-9 space-y-8">
                        {/* Tab 1: Restaurant Approvals */}
                        {activeTab === "approvals" && (
                            <AdminApprovals
                                pendingRestaurants={pendingRestaurants}
                                otherRestaurants={otherRestaurants}
                                btnLoading={btnLoading}
                                onApproveStatus={handleApproveStatus}
                            />
                        )}

                        {/* Tab 2: Analytics & Stats */}
                        {activeTab === "stats" && stats && <AdminStats stats={stats} />}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}