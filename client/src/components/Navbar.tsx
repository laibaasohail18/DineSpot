import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import { 
    Menu, X, LogOut, LayoutDashboard, ShieldCheck, Sparkles, 
    Compass, UtensilsCrossed, BookmarkCheck, ChevronDown 
} from "lucide-react";

export default function Navbar() {
    const { user, logout, setAuthModalOpen } = useAppContext();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
        setDropdownOpen(false);
    }, [location]);

    const handleDashboardClick = () => {
        if (!user) {
            setAuthModalOpen(true);
        } else {
            navigate("/dashboard");
        }
    };

    return (
        <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-8 pt-4 transition-all duration-500">
            {/* Floating Floating Pill Container */}
            <nav
                className={`max-w-6xl mx-auto rounded-full transition-all duration-500 border ${
                    scrolled
                        ? "bg-[#0c0d0e]/85 backdrop-blur-2xl border-[#c5a880]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-2.5 px-6"
                        : "bg-surface-container-low/60 backdrop-blur-md border-white/10 py-3.5 px-8"
                }`}
            >
                <div className="flex items-center justify-between">
                    {/* Brand Logo with Glowing Orb */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-8 h-8 rounded-full bg-linear-to-br from-[#c5a880] to-[#8e734c] flex items-center justify-center shadow-[0_0_12px_rgba(197,168,128,0.4)] group-hover:scale-105 transition-transform">
                            <span className="font-serif font-black text-[#0c0d0e] text-sm">D</span>
                        </div>
                        <span className="text-lg font-serif font-bold tracking-wider text-stone-100">
                            DINE<span className="text-[#c5a880] font-light">SPOT</span>
                        </span>
                    </Link>

                    {/* Centered Pill Nav Items (Desktop) */}
                    <div className="hidden md:flex items-center gap-1 bg-[#0c0d0e]/60 border border-stone-800/80 p-1 rounded-full">
                        <Link
                            to="/"
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all ${
                                location.pathname === "/"
                                    ? "bg-[#c5a880] text-[#0c0d0e] shadow-md"
                                    : "text-stone-400 hover:text-stone-100"
                            }`}
                        >
                            <Compass size={13} /> Discover
                        </Link>

                        <Link
                            to="/search"
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all ${
                                location.pathname.startsWith("/search")
                                    ? "bg-[#c5a880] text-[#0c0d0e] shadow-md"
                                    : "text-stone-400 hover:text-stone-100"
                            }`}
                        >
                            <UtensilsCrossed size={13} /> Venues
                        </Link>

                        <button
                            onClick={handleDashboardClick}
                            className={`flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all cursor-pointer ${
                                location.pathname === "/dashboard"
                                    ? "bg-[#c5a880] text-[#0c0d0e] shadow-md"
                                    : "text-stone-400 hover:text-stone-100"
                            }`}
                        >
                            <BookmarkCheck size={13} /> Bookings
                        </button>
                    </div>

                    {/* Right Action Trigger */}
                    <div className="hidden md:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2.5 bg-surface-container-low hover:bg-[#1f2226] border border-[#c5a880]/30 pl-2 pr-3 py-1.5 rounded-full text-xs font-medium text-stone-200 transition-all cursor-pointer shadow-lg"
                                >
                                    <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#c5a880] to-on-primary-container text-[#0c0d0e] font-bold flex items-center justify-center text-[10px]">
                                        {user.name.charAt(0)}
                                    </div>
                                    <span className="truncate max-w-24 text-stone-200">{user.name.split(" ")[0]}</span>
                                    <ChevronDown size={13} className="text-[#c5a880]" />
                                </button>

                                {/* Luxury Dropdown Card */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-64 bg-surface-container-low/95 backdrop-blur-2xl border border-[#c5a880]/30 rounded-2xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 animate-in fade-in zoom-in-95 duration-200">
                                        <div className="bg-[#0c0d0e] p-3 rounded-xl border border-stone-800/80 mb-2">
                                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-[#c5a880] uppercase tracking-widest mb-1">
                                                <Sparkles size={11} /> Exclusive Access
                                            </div>
                                            <p className="font-serif font-bold text-stone-100 text-sm truncate">{user.name}</p>
                                            <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <button
                                                onClick={handleDashboardClick}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-medium text-stone-300 hover:text-[#c5a880] hover:bg-[#c5a880]/10 rounded-lg transition-colors text-left cursor-pointer"
                                            >
                                                <LayoutDashboard size={14} className="text-[#c5a880]" /> Reservation Hub
                                            </button>

                                            {user.role === "admin" && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-stone-300 hover:text-[#c5a880] hover:bg-[#c5a880]/10 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <ShieldCheck size={14} className="text-[#c5a880]" /> Admin Portal
                                                </Link>
                                            )}

                                            {user.role === "owner" && (
                                                <Link
                                                    to="/owner/dashboard"
                                                    className="flex items-center gap-3 px-3 py-2 text-xs font-medium text-stone-300 hover:text-[#c5a880] hover:bg-[#c5a880]/10 rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <ShieldCheck size={14} className="text-[#c5a880]" /> Partner Suite
                                                </Link>
                                            )}

                                            <button
                                                onClick={logout}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors border-t border-stone-800/80 text-left cursor-pointer mt-1"
                                            >
                                                <LogOut size={14} /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="text-xs font-semibold tracking-wider text-stone-300 hover:text-[#c5a880] uppercase px-3 py-1.5 transition-colors cursor-pointer"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="text-[11px] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full bg-linear-to-r from-[#c5a880] to-[#a88a62] text-[#0c0d0e] shadow-[0_4px_15px_rgba(197,168,128,0.3)] hover:opacity-90 transition-all cursor-pointer"
                                >
                                    Get Pass
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-9 h-9 rounded-full bg-surface-container-low border border-stone-800 flex items-center justify-center text-stone-300 hover:text-[#c5a880] transition-colors"
                    >
                        {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Overlay */}
            {mobileMenuOpen && (
                <div className="md:hidden mt-3 max-w-6xl mx-auto bg-surface-container-low/95 backdrop-blur-2xl border border-[#c5a880]/30 rounded-3xl p-6 shadow-2xl animate-in slide-in-from-top-4 duration-300">
                    <div className="flex flex-col gap-3">
                        <Link to="/" className="text-xs font-semibold tracking-widest uppercase text-stone-200 hover:text-[#c5a880] p-2">
                            Discover
                        </Link>
                        <Link to="/search" className="text-xs font-semibold tracking-widest uppercase text-stone-200 hover:text-[#c5a880] p-2">
                            Restaurants
                        </Link>
                        <button onClick={handleDashboardClick} className="text-xs font-semibold tracking-widest uppercase text-stone-200 hover:text-[#c5a880] text-left p-2 cursor-pointer">
                            My Reservations
                        </button>

                        <div className="border-t border-stone-800 my-2"></div>

                        {user ? (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 bg-[#0c0d0e] p-3 rounded-xl border border-stone-800">
                                    <div className="w-8 h-8 rounded-full bg-[#c5a880] text-[#0c0d0e] font-bold flex items-center justify-center text-xs">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs font-bold text-[#c5a880]">{user.name}</p>
                                        <p className="text-[10px] text-stone-400 truncate">{user.email}</p>
                                    </div>
                                </div>
                                {user.role === "admin" && (
                                    <Link to="/admin/dashboard" className="block text-xs uppercase tracking-wider text-stone-300 hover:text-[#c5a880] p-2">
                                        Admin Console
                                    </Link>
                                )}
                                {user.role === "owner" && (
                                    <Link to="/owner/dashboard" className="block text-xs uppercase tracking-wider text-stone-300 hover:text-[#c5a880] p-2">
                                        Owner Suite
                                    </Link>
                                )}
                                <button onClick={logout} className="w-full text-left text-xs uppercase font-bold text-rose-400 p-2 cursor-pointer">
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="w-full border border-stone-700 text-stone-200 py-3 text-xs font-semibold uppercase tracking-wider rounded-xl cursor-pointer"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="w-full bg-[#c5a880] text-[#0c0d0e] py-3 text-xs font-bold tracking-widest uppercase rounded-xl cursor-pointer"
                                >
                                    Get Pass
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}