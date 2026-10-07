/* eslint-disable @typescript-eslint/no-explicit-any */
import { Calendar, Users, Sparkles, Clock, ArrowRight } from "lucide-react";

interface BookingWidgetProps {
    restaurant: any;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedGuests: string;
    setSelectedGuests: (guests: string) => void;
    selectedSlot: string;
    setSelectedSlot: (slot: string) => void;
    slotsAvailability: any[];
    loadingSlots: boolean;
    isAuthenticated: boolean;
    handleReserveClick: () => void;
}

export default function BookingWidget({
    restaurant,
    selectedDate,
    setSelectedDate,
    selectedGuests,
    setSelectedGuests,
    selectedSlot,
    setSelectedSlot,
    slotsAvailability,
    loadingSlots,
    isAuthenticated,
    handleReserveClick,
}: BookingWidgetProps) {
    if (!restaurant) return null;

    return (
        <div className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#c5a880]/30 shadow-[0_20px_50px_rgba(0,0,0,0.9)] text-left relative overflow-hidden">
            {/* Ambient Lighting Background Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#c5a880]/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
                <div>
                    <span className="inline-flex items-center gap-1.5 text-[9px] font-bold text-[#c5a880] tracking-[0.2em] uppercase">
                        <Sparkles size={11} /> INSTANT CONCIERGE
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                        Reserve Your Table
                    </h3>
                </div>
            </div>

            <div className="space-y-5">
                {/* Party Size Selector Card */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        PARTY SIZE
                    </label>
                    <div className="relative">
                        <Users className="absolute left-3.5 top-3.5 text-[#c5a880]" size={16} />
                        <select
                            value={selectedGuests}
                            onChange={(e) => setSelectedGuests(e.target.value)}
                            className="w-full bg-[#0c0d0e]/80 text-stone-200 pl-10 pr-4 py-3 text-xs border border-stone-800 focus:border-[#c5a880] focus:outline-none rounded-xl cursor-pointer font-medium transition-luxury [&>option]:bg-surface-container-low"
                        >
                            <option value="1">1 Guest (Single Seating)</option>
                            <option value="2">2 Guests (Couple Table)</option>
                            <option value="4">4 Guests (Family Dining)</option>
                            <option value="6">6 Guests (VIP Booth)</option>
                            <option value="8">8 Guests (Private Dining Hall)</option>
                        </select>
                    </div>
                </div>

                {/* Date Picker Card */}
                <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        RESERVATION DATE
                    </label>
                    <div className="relative">
                        <Calendar className="absolute left-3.5 top-3.5 text-[#c5a880]" size={16} />
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            className="w-full bg-[#0c0d0e]/80 text-stone-200 pl-10 pr-4 py-3 text-xs border border-stone-800 focus:border-[#c5a880] focus:outline-none rounded-xl cursor-pointer font-medium transition-luxury"
                        />
                    </div>
                </div>

                {/* Time Slots Selector Section */}
                <div className="space-y-2 pt-2">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                        <Clock size={12} className="text-[#c5a880]" /> AVAILABLE TIME SLOTS
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                        {loadingSlots ? (
                            <div className="col-span-3 py-6 text-center flex justify-center">
                                <div className="w-6 h-6 border-2 border-stone-800 border-t-[#c5a880] rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            (() => {
                                const todayStr = new Date().toISOString().split("T")[0];
                                const isToday = selectedDate === todayStr;
                                const allSlots =
                                    slotsAvailability.length > 0
                                        ? slotsAvailability
                                        : (restaurant.availableSlots || []).map((s: string) => ({
                                              time: s,
                                              availableSeats: 20,
                                              isAvailable: true,
                                          }));
                                return allSlots.filter((slotInfo: any) => {
                                    if (!isToday) return true;
                                    const [slotHour, slotMinute] = slotInfo.time.split(":").map(Number);
                                    const now = new Date();
                                    const currentHour = now.getHours();
                                    const currentMinute = now.getMinutes();
                                    return slotHour > currentHour || (slotHour === currentHour && slotMinute > currentMinute);
                                });
                            })().map((slotInfo: any) => {
                                const slot = slotInfo.time;
                                const isSelected = selectedSlot === slot;
                                const isFull = !slotInfo.isAvailable || slotInfo.availableSeats < Number(selectedGuests);
                                return (
                                    <button
                                        key={slot}
                                        type="button"
                                        disabled={isFull}
                                        onClick={() => setSelectedSlot(slot)}
                                        className={`py-2.5 px-1 text-center text-[10px] font-bold tracking-wider uppercase border transition-luxury rounded-xl relative overflow-hidden ${
                                            isSelected
                                                ? "bg-[#c5a880] border-[#c5a880] text-[#0c0d0e] shadow-lg shadow-[#c5a880]/20 scale-102 cursor-pointer"
                                                : isFull
                                                  ? "bg-[#0c0d0e]/40 border-stone-800/40 text-stone-600 cursor-not-allowed opacity-40"
                                                  : "bg-[#0c0d0e]/80 border-stone-800/80 text-stone-300 hover:border-[#c5a880] hover:text-[#c5a880] cursor-pointer hover:bg-[#c5a880]/10"
                                        }`}
                                    >
                                        {slot}
                                        {isFull && <span className="block text-[8px] text-rose-400 uppercase mt-0.5">FULL</span>}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Primary Endless Shimmer Action CTA Button */}
                <button
                    onClick={handleReserveClick}
                    className="relative group overflow-hidden w-full bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] py-4 mt-6 text-xs font-bold tracking-widest uppercase rounded-2xl shadow-[0_4px_20px_rgba(197,168,128,0.2)] hover:shadow-[0_10px_35px_rgba(197,168,128,0.45)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                    <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        {isAuthenticated ? "RESERVE SEATING" : "LOGIN TO RESERVE"} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>

                <p className="text-center text-[10px] text-stone-400 mt-3 leading-relaxed font-light">
                    Guaranteed confirmation. Complimentary cancellation up to 24h prior.
                </p>
            </div>
        </div>
    );
}