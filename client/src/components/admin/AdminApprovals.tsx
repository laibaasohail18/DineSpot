/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { CheckCircle, Utensils, MapPin, Users, Sparkles, ShieldCheck, CheckCircle2, XCircle } from "lucide-react";

interface AdminApprovalsProps {
    pendingRestaurants: any[];
    otherRestaurants: any[];
    btnLoading: string | null;
    onApproveStatus: (restaurantId: string, status: "approved" | "rejected") => Promise<void>;
}

export default function AdminApprovals({ pendingRestaurants, otherRestaurants, btnLoading, onApproveStatus }: AdminApprovalsProps) {
    return (
        <div className="space-y-12 text-left">
            {/* Section A: Pending Partner Approvals */}
            <div className="space-y-5">
                <div className="flex justify-between items-center pb-3 border-b border-[#c5a880]/20">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                            <Sparkles size={11} /> ADMIN AUDIT QUEUE
                        </span>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text flex items-center gap-2">
                            Pending Partner Applications <span className="text-xs text-[#c5a880] font-sans font-bold">({pendingRestaurants.length})</span>
                        </h3>
                    </div>
                </div>

                {pendingRestaurants.length === 0 ? (
                    <div className="glass-panel border border-stone-800/80 p-12 text-center rounded-3xl shadow-xl bg-surface-container-low/60">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                            <CheckCircle size={28} />
                        </div>
                        <h4 className="font-serif text-base font-bold text-stone-200 mb-1">Audit Queue Empty</h4>
                        <p className="text-xs text-stone-400 font-light italic">All partner registration requests have been verified and processed.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pendingRestaurants.map((r) => (
                            <div
                                key={r._id}
                                className="group relative glass-panel border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury rounded-2xl sm:rounded-3xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-surface-container-low/80 hover:bg-surface-container-low"
                            >
                                <div className="space-y-3 flex-1">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h4 className="font-serif text-base sm:text-lg font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors">
                                            {r.name}
                                        </h4>
                                        <span className="text-[9px] font-bold tracking-widest uppercase text-amber-300 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full shadow-sm">
                                            AWAITING APPROVAL
                                        </span>
                                    </div>

                                    <p className="text-xs text-stone-300 font-light leading-relaxed max-w-2xl">{r.description}</p>

                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-300 font-light pt-1">
                                        <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                            <Utensils size={13} className="text-[#c5a880]" /> <strong className="font-semibold text-stone-200">{r.cuisine}</strong>
                                        </span>
                                        <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                            <MapPin size={13} className="text-[#c5a880]" /> {r.address}
                                        </span>
                                        <span className="flex items-center gap-2 bg-[#0c0d0e]/60 px-3 py-1 rounded-lg border border-stone-800">
                                            <Users size={13} className="text-[#c5a880]" /> Capacity: <strong className="font-semibold text-stone-200">{r.totalSeats} seats</strong>
                                        </span>
                                    </div>

                                    <p className="text-[10px] text-[#c5a880] font-mono tracking-wider uppercase pt-1 flex items-center gap-1.5">
                                        <ShieldCheck size={12} /> Applicant: <strong className="text-stone-200 font-semibold">{r.owner?.name || "Partner"}</strong> ({r.owner?.email || "No email"})
                                    </p>
                                </div>

                                <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end border-t md:border-t-0 border-stone-800/80 pt-4 md:pt-0">
                                    <button
                                        disabled={btnLoading === r._id}
                                        onClick={() => onApproveStatus(r._id, "approved")}
                                        className="px-5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-md"
                                    >
                                        <CheckCircle2 size={13} /> Approve
                                    </button>
                                    <button
                                        disabled={btnLoading === r._id}
                                        onClick={() => onApproveStatus(r._id, "rejected")}
                                        className="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[10px] font-bold tracking-widest uppercase transition-luxury rounded-xl cursor-pointer disabled:opacity-50 flex items-center gap-1.5 shadow-md"
                                    >
                                        <XCircle size={13} /> Reject
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Section B: Existing Restaurant Partners */}
            <div className="space-y-5">
                <div className="pb-3 border-b border-[#c5a880]/20">
                    <h3 className="font-serif text-xl font-bold text-stone-100">
                        Registered Establishments <span className="text-xs text-stone-400 font-sans font-semibold">({otherRestaurants.length})</span>
                    </h3>
                </div>

                {otherRestaurants.length === 0 ? (
                    <p className="text-xs text-stone-500 italic font-light">No historical approved or rejected restaurant records.</p>
                ) : (
                    <div className="glass-panel border border-stone-800/80 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl bg-surface-container-low/80">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr className="bg-[#0c0d0e]/90 border-b border-stone-800/80 text-[10px] font-bold tracking-widest text-[#c5a880] uppercase">
                                        <th className="p-4 sm:p-5">Establishment</th>
                                        <th className="p-4 sm:p-5">Cuisine & City</th>
                                        <th className="p-4 sm:p-5">Owner Account</th>
                                        <th className="p-4 sm:p-5 text-right">Status / Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-stone-800/60 font-light text-stone-300">
                                    {otherRestaurants.map((r) => (
                                        <tr key={r._id} className="hover:bg-[#0c0d0e]/60 transition-colors">
                                            <td className="p-4 sm:p-5 font-serif font-bold text-stone-100">
                                                <Link to={`/restaurant/${r.slug}`} className="hover:text-[#c5a880] transition-colors">
                                                    {r.name}
                                                </Link>
                                            </td>
                                            <td className="p-4 sm:p-5">
                                                {r.cuisine} • <span className="text-stone-400">{r.location}</span>
                                            </td>
                                            <td className="p-4 sm:p-5 text-stone-400 font-mono text-[11px]">{r.owner?.name || "N/A"}</td>
                                            <td className="p-4 sm:p-5 text-right space-x-3">
                                                <span
                                                    className={`inline-block py-1 px-3 text-[9px] font-bold tracking-widest uppercase rounded-full border ${
                                                        r.status === "approved"
                                                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-sm"
                                                            : "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-sm"
                                                    }`}
                                                >
                                                    {r.status}
                                                </span>

                                                {r.status === "approved" ? (
                                                    <button
                                                        onClick={() => onApproveStatus(r._id, "rejected")}
                                                        className="text-rose-400 hover:text-rose-300 hover:underline text-[10px] uppercase font-bold cursor-pointer transition-colors"
                                                    >
                                                        Suspend
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => onApproveStatus(r._id, "approved")}
                                                        className="text-emerald-400 hover:text-emerald-300 hover:underline text-[10px] uppercase font-bold cursor-pointer transition-colors"
                                                    >
                                                        Re-Approve
                                                    </button>
                                                )}
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