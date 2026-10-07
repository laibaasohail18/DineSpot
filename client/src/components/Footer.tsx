import { Link } from "react-router-dom";
import { bottomLinks, footerSections, socialLinks } from "../assets/assets";
import { Sparkles, ArrowUpRight } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-surface-container-lowest border-t border-[#c5a880]/20 pt-12 md:pt-20 pb-8 md:pb-12 text-stone-400 relative overflow-hidden">
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-125 h-28 sm:h-30 bg-[#c5a880]/5 blur-[90px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
                {/* Upper Feature Banner Card - Fully Responsive Stack */}
                <div className="mb-10 sm:mb-16 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-linear-to-r from-surface-container-low via-[#0c0d0e] to-surface-container-low border border-[#c5a880]/20 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl text-center md:text-left">
                    <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[10px] font-bold tracking-widest uppercase">
                            <Sparkles size={11} /> Concierge Desk
                        </span>
                        <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-bold gold-gradient-text">
                            Experience World-Class Hospitality
                        </h3>
                        <p className="text-xs text-stone-400 max-w-md font-light leading-relaxed">
                            Elevating private dining and real-time venue reservations across fine-dining establishments worldwide.
                        </p>
                    </div>
                    <a
                        href="mailto:concierge@dinespot.com"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl sm:rounded-full bg-[#c5a880] text-[#0c0d0e] text-xs font-bold tracking-widest uppercase hover:bg-[#b0936b] transition-luxury shadow-lg shadow-[#c5a880]/10 cursor-pointer"
                    >
                        Contact Concierge <ArrowUpRight size={15} />
                    </a>
                </div>

                {/* Main Grid Section - Adaptive Grid Columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-stone-800/80">
                    {/* Brand Meta */}
                    <div className="sm:col-span-2 space-y-4 text-left">
                        <Link to="/" className="flex items-center gap-2.5 group w-fit">
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-br from-[#c5a880] to-[#8e734c] flex items-center justify-center shadow-[0_0_15px_rgba(197,168,128,0.3)] group-hover:scale-105 transition-luxury">
                                <span className="font-serif font-black text-[#0c0d0e] text-sm sm:text-base">D</span>
                            </div>
                            <span className="text-xl sm:text-2xl font-serif font-bold tracking-wider text-stone-100">
                                DINE<span className="text-[#c5a880] font-light">SPOT</span>
                            </span>
                        </Link>

                        <p className="text-stone-400 text-xs leading-relaxed max-w-sm font-light">
                            Architected for high-end epicurean journeys. Seamlessly connecting guests with verified multi-restaurant culinary tables globally.
                        </p>

                        <div className="pt-2 flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href }, index) => (
                                <a
                                    key={index}
                                    href={href}
                                    className="w-9 h-9 rounded-xl bg-surface-container-low border border-stone-800 flex items-center justify-center text-stone-400 hover:text-[#c5a880] hover:border-[#c5a880]/40 transition-luxury"
                                >
                                    <Icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Dynamic Links Columns */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-3 sm:gap-4 text-left">
                            <h4 className="text-[11px] sm:text-xs font-bold tracking-widest text-[#c5a880] uppercase">
                                {section.title}
                            </h4>

                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.path}
                                            className="text-xs text-stone-400 hover:text-stone-100 transition-colors font-light hover:underline underline-offset-4"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Contact Detail Card */}
                    <div className="flex flex-col gap-3 sm:gap-4 sm:col-span-2 md:col-span-1 text-left">
                        <h4 className="text-[11px] sm:text-xs font-bold tracking-widest text-[#c5a880] uppercase">
                            DIRECT ENQUIRIES
                        </h4>
                        <div className="p-4 rounded-xl bg-surface-container-low border border-stone-800 space-y-1.5">
                            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold">VIP DESK</p>
                            <p className="text-xs font-serif text-stone-200">concierge@dinespot.com</p>
                            <p className="text-[11px] text-stone-400 font-light">+1 (800) 458-DINE</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Mobile Alignment Fix */}
                <div className="mt-6 sm:mt-8 pt-2 flex flex-col-reverse sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                    <p className="text-[10px] sm:text-[11px] text-stone-500 font-light tracking-wider">
                        © {new Date().getFullYear()} DineSpot VIP Network. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        {bottomLinks.map((link) => (
                            <Link
                                key={link.label}
                                to={link.path}
                                className="text-[10px] sm:text-[11px] text-stone-500 hover:text-[#c5a880] font-light transition-colors uppercase tracking-widest"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}