/* eslint-disable @typescript-eslint/no-explicit-any */
import { Star, Sparkles, Quote } from "lucide-react";
import { dummyReviews } from "../../assets/assets.ts";

export default function RestaurantReviews() {
    return (
        <section className="space-y-6 pt-10 text-left border-t border-[#c5a880]/15">
            {/* Header Title */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                        <Sparkles size={11} /> VERIFIED DINING REVIEWS
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold gold-gradient-text">
                        Guest Experiences
                    </h3>
                </div>
            </div>

            {/* Reviews Cards List */}
            <div className="space-y-4">
                {dummyReviews.length === 0 ? (
                    <div className="glass-panel p-8 rounded-2xl text-center border border-stone-800">
                        <p className="text-xs text-stone-400 italic font-light">
                            No reviews recorded yet. Be the first distinguished guest to share your experience!
                        </p>
                    </div>
                ) : (
                    dummyReviews.map((r: any) => (
                        <div
                            key={r._id}
                            className="group relative glass-panel p-5 sm:p-6 rounded-2xl border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury space-y-3 bg-surface-container-low/60 hover:bg-surface-container-low"
                        >
                            <Quote size={20} className="absolute top-4 right-4 text-[#c5a880]/15 group-hover:text-[#c5a880]/30 transition-colors pointer-events-none" />

                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    {/* User Avatar Badge */}
                                    <div className="w-9 h-9 rounded-full bg-linear-to-tr from-[#c5a880] to-on-primary-container text-[#0c0d0e] font-bold flex items-center justify-center text-xs uppercase shadow-md shrink-0">
                                        {r.userName ? r.userName.charAt(0) : "G"}
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-serif font-bold text-stone-100 group-hover:text-[#c5a880] transition-colors">
                                            {r.userName}
                                        </h4>
                                        <span className="text-[10px] sm:text-[11px] text-stone-400 font-light">
                                            Visited {new Date(r.visitedDate).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Star Rating Pill */}
                                <div className="flex items-center gap-1 text-[#c5a880] bg-[#0c0d0e]/80 border border-[#c5a880]/20 px-2.5 py-1 rounded-full shadow-inner">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={11}
                                            fill={i < r.rating ? "currentColor" : "none"}
                                            className={i < r.rating ? "text-[#c5a880]" : "text-stone-800"}
                                        />
                                    ))}
                                </div>
                            </div>

                            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light pl-1 sm:pl-12">
                                "{r.comment}"
                            </p>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}