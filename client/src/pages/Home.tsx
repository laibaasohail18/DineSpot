/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import AuthModal from "../components/AuthModal.tsx";
import Hero from "../components/home/Hero.tsx";
import CuisineBrowse from "../components/home/CuisineBrowse.tsx";
import TrendingRow from "../components/home/TrendingRow.tsx";
import MembershipSection from "../components/home/MembershipSection.tsx";
import NewsletterCTA from "../components/home/NewsletterCTA.tsx";
import api from "../lib/api.ts";
import toast from "react-hot-toast";

export default function Home() {
    const [trending, setTrending] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const res = await api.get('/restaurants/featured');
                setTrending(res.data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.message);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-0 relative overflow-hidden text-left">
            {/* Ambient Background Lighting Spots */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-[#c5a880]/5 blur-[200px] pointer-events-none rounded-full" />
            <div className="absolute top-[40%] right-0 w-150 h-150 bg-[#c5a880]/5 blur-[180px] pointer-events-none rounded-full" />

            <Navbar />
            <AuthModal />

            <main className="flex-1 relative z-10 space-y-16 sm:space-y-24 pb-16">
                <Hero />
                <CuisineBrowse />
                <TrendingRow trending={trending} loading={loading} />
                <MembershipSection />
                <NewsletterCTA />
            </main>

            <Footer />
        </div>
    );
}