/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.tsx";
import Navbar from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";
import { ChevronRight, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import Loader from "../components/Loader.tsx";
import BookingSuccess from "../components/booking/BookingSuccess.tsx";
import BookingSummary from "../components/booking/BookingSummary.tsx";
import BookingForm from "../components/booking/BookingForm.tsx";
import api from "../lib/api.ts";

export default function BookingConfirmation() {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams] = useSearchParams();
    const { user } = useAppContext();
    const navigate = useNavigate();

    const [restaurant, setRestaurant] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [confirming, setConfirming] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState<any>(null);

    // Form inputs
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [occasion, setOccasion] = useState("");
    const [specialRequests, setSpecialRequests] = useState("");

    // From Query Params
    const slot = searchParams.get("slot") || "";
    const date = searchParams.get("date") || "";
    const guests = searchParams.get("guests") || "2";

    useEffect(() => {
        if (user) {
            (() => {
                setName(user.name || "");
                setEmail(user.email || "");
                if (user.phone) setPhone(user.phone);
            })();
        }
    }, [user]);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                setLoading(true);
                const res = await api.get(`/restaurants/${slug}`);
                setRestaurant(res.data);
            } catch (error: any) {
                toast.error(error?.response?.data?.message || error?.message);
                navigate("/");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchRestaurant();
        }
    }, [slug, navigate]);

    if (loading) {
        return <Loader text="Retrieving Seating Details..." />;
    }

    if (!restaurant) return null;

    const handleConfirmSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!slot || !date) {
            toast.error("Reservation parameters are missing. Please return to venue details.");
            return;
        }

        try {
            setConfirming(true);
            
            const res = await api.post(`/bookings`, { 
                restaurantId: restaurant._id, 
                date, 
                time: slot, 
                guests, 
                occasion, 
                specialRequests 
            });
            setConfirmedBooking(res.data);

            toast.success("Reservation confirmed successfully!");
        } catch (error: any) {
            toast.error(error?.response?.data?.message || error?.message);
        } finally {
            setConfirming(false);
        }
    };

    // Render Success Screen
    if (confirmedBooking) {
        return (
            <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20">
                <Navbar />
                <main className="grow flex items-center justify-center py-12 px-4 sm:px-6">
                    <BookingSuccess 
                        confirmedBooking={confirmedBooking} 
                        restaurant={restaurant} 
                        date={date} 
                        slot={slot} 
                        guests={guests} 
                    />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0c0d0e] flex flex-col pt-20 relative overflow-hidden text-left">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#c5a880]/5 blur-[160px] pointer-events-none" />

            <Navbar />

            {/* Main Booking Content */}
            <main className="grow max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-10 sm:py-14 relative z-10">
                {/* Navigation Breadcrumb Header */}
                <div className="flex items-center gap-2 mb-8 sm:mb-10 pb-4 border-b border-[#c5a880]/20 text-xs text-stone-400 font-light">
                    <Link to="/" className="hover:text-[#c5a880] transition-colors">
                        Venues
                    </Link>
                    <ChevronRight size={14} className="text-stone-600" />
                    <Link to={`/restaurant/${restaurant.slug}`} className="hover:text-[#c5a880] transition-colors truncate max-w-37.5 sm:max-w-none">
                        {restaurant.name}
                    </Link>
                    <ChevronRight size={14} className="text-stone-600" />
                    <span className="text-[#c5a880] font-bold flex items-center gap-1.5">
                        <Sparkles size={12} /> Seating Confirmation
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Left Column (Reservation Summary) */}
                    <div className="lg:col-span-5">
                        <BookingSummary restaurant={restaurant} date={date} slot={slot} guests={guests} />
                    </div>

                    {/* Right Column (Guest Details Form) */}
                    <div className="lg:col-span-7">
                        <BookingForm
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            phone={phone}
                            setPhone={setPhone}
                            occasion={occasion}
                            setOccasion={setOccasion}
                            specialRequests={specialRequests}
                            setSpecialRequests={setSpecialRequests}
                            confirming={confirming}
                            onSubmit={handleConfirmSubmit}
                        />
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}