import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { cuisines } from "../../assets/assets";

export default function CuisineBrowse() {
    const navigate = useNavigate();

    const handleCuisineClick = (cuisineName: string) => {
        navigate(`/search?cuisine=${cuisineName}`);
    };

    return (
        <section className="py-16 sm:py-24 bg-[#0c0d0e] border-b border-[#c5a880]/15 relative overflow-hidden">
            {/* Background Ambient Lighting */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-[#c5a880]/5 blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 sm:mb-14">
                    <div>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase mb-3">
                            <Sparkles size={11} /> EXPLORE CATEGORIES
                        </span>
                        <h2 className="font-serif text-2xl sm:text-4xl font-bold gold-gradient-text tracking-tight">
                            Curated Flavors
                        </h2>
                    </div>

                    <Link 
                        to="/search" 
                        className="text-xs font-bold tracking-widest text-[#c5a880] hover:text-stone-100 transition-luxury flex items-center gap-2 group uppercase py-1"
                    >
                        VIEW ALL COLLECTIONS <ArrowRight size={15} className="group-hover:translate-x-1.5 transition-transform text-[#c5a880]" />
                    </Link>
                </div>
                
                {/* Responsive Cuisine Cards Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
                    {cuisines.map((c) => {
                        const Icon = c.icon;

                        return (
                            <button
                                key={c.name}
                                onClick={() => handleCuisineClick(c.name)}
                                className="group relative cursor-pointer text-center py-7 sm:py-9 px-4 bg-surface-container-low/90 border border-stone-800/80 hover:border-[#c5a880]/60 rounded-2xl sm:rounded-3xl transition-luxury flex flex-col items-center justify-center shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:-translate-y-1 overflow-hidden"
                            >
                                {/* Glowing backdrop effect on card hover */}
                                <div className="absolute inset-0 bg-linear-to-b from-[#c5a880]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0c0d0e] border border-stone-800 group-hover:border-[#c5a880]/40 flex items-center justify-center mb-4 transition-luxury group-hover:scale-110 shadow-inner">
                                    <Icon size={26} strokeWidth={1.2} className="text-stone-400 group-hover:text-[#c5a880] transition-colors" />
                                </div>

                                <span className="text-[10px] sm:text-[11px] tracking-widest uppercase font-bold text-stone-300 group-hover:text-[#c5a880] transition-colors relative z-10">
                                    {c.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
    