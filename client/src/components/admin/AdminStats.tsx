/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, ShieldCheck, Utensils, Calendar, Sparkles, TrendingUp } from "lucide-react";

interface AdminStatsProps {
    stats: any;
}

export default function AdminStats({ stats }: AdminStatsProps) {
    if (!stats) return null;

    const kpiCards = [
        { title: "Active Diners", value: stats.users?.totalUsers, icon: Users, accent: "from-[#c5a880]/15 to-transparent" },
        { title: "Partners", value: stats.users?.totalOwners, icon: ShieldCheck, accent: "from-amber-500/10 to-transparent" },
        { title: "Total Venues", value: stats.restaurants?.total, icon: Utensils, accent: "from-emerald-500/10 to-transparent" },
        { title: "Bookings", value: stats.bookings?.total, icon: Calendar, accent: "from-sky-500/10 to-transparent" },
    ];

    return (
        <div className="space-y-10 text-left">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {kpiCards.map(({ title, value, icon: Icon, accent }) => (
                    <div
                        key={title}
                        className="group relative glass-panel border border-stone-800/80 hover:border-[#c5a880]/50 p-6 rounded-2xl sm:rounded-3xl shadow-xl transition-luxury overflow-hidden bg-surface-container-low/80 hover:bg-surface-container-low"
                    >
                        {/* Subtle Card Ambient Gradient */}
                        <div className={`absolute inset-0 bg-linear-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                        <div className="flex items-center justify-between mb-3 relative z-10">
                            <span className="text-[10px] font-bold tracking-[0.2em] text-[#c5a880] uppercase flex items-center gap-1.5">
                                <Icon size={14} className="text-[#c5a880]" />
                                {title}
                            </span>
                            <div className="w-8 h-8 rounded-full bg-[#0c0d0e] border border-stone-800/80 flex items-center justify-center text-[#c5a880] group-hover:border-[#c5a880]/40 transition-colors">
                                <TrendingUp size={13} />
                            </div>
                        </div>

                        <h4 className="font-serif text-3xl sm:text-4xl font-bold gold-gradient-text relative z-10">
                            {value ?? 0}
                        </h4>
                    </div>
                ))}
            </div>

            {/* Recent Bookings Activity Table Section */}
            <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a880]/20">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                            <Sparkles size={11} /> REAL-TIME MONITORING
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                            Recent Bookings Activity
                        </h3>
                    </div>
                </div>

                {stats.latestBookings?.length === 0 ? (
                    <div className="glass-panel border border-stone-800/80 p-12 text-center rounded-3xl shadow-xl bg-surface-container-low/60">
                        <Calendar size={32} className="mx-auto text-stone-600 mb-3" />
                        <p className="text-xs text-stone-400 font-light italic">No reservation records detected across the platform.</p>
                    </div>
                ) : (
                    <div className="glass-panel border border-stone-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low/80">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-[#0c0d0e]/90 border-b border-stone-800/80 text-[10px] font-bold tracking-widest text-[#c5a880] uppercase">
                                        {["Ref Code", "Diner", "Restaurant", "Details", "Status"].map((header) => (
                                            <th key={header} className={`p-4 sm:p-5 ${header === "Status" ? "text-right" : ""}`}>
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-stone-800/60 font-light text-stone-300">
                                    {stats.latestBookings.map((b: any) => (
                                        <tr key={b._id} className="hover:bg-[#0c0d0e]/60 transition-colors">
                                            <td className="p-4 sm:p-5 text-[#c5a880] font-mono font-bold tracking-wider">
                                                #{b.bookingId || b._id.slice(-6)}
                                            </td>

                                            <td className="p-4 sm:p-5">
                                                <div className="font-semibold text-stone-100">{b.user?.name || "VIP Guest"}</div>
                                                <div className="text-[10px] text-stone-400 font-mono">{b.user?.email}</div>
                                            </td>

                                            <td className="p-4 sm:p-5 font-serif font-bold text-stone-100">
                                                {b.restaurant?.name || "Deleted Venue"}
                                            </td>

                                            <td className="p-4 sm:p-5 text-stone-300">
                                                {new Date(b.date).toLocaleDateString()} at <strong className="text-stone-100">{b.time}</strong> • <span className="text-[#c5a880] font-medium">{b.guests} Guests</span>
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
                )}
            </div>
        </div>
    );
}