import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Search from "./pages/Search.tsx";
import RestaurantDetail from "./pages/RestaurantDetail.tsx";
import BookingConfirmation from "./pages/BookingConfirmation.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import OwnerDashboard from "./pages/owner/OwnerDashboard.tsx";
import AdminDashboard from "./pages/admin/AdminDashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import AIChatbot from "./components/AIChatbot.tsx";
import { Toaster } from "react-hot-toast";

export default function App() {
    return (
        <>
            {/* DineSpot Luxury VIP Toast Notifications Configuration */}
            <Toaster 
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: "#151719",
                        color: "#f5f5f4",
                        fontFamily: "'Cinzel', serif, sans-serif",
                        fontSize: "12px",
                        fontWeight: 500,
                        letterSpacing: "0.05em",
                        borderRadius: "16px",
                        border: "1px solid rgba(197, 168, 128, 0.3)",
                        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.8), 0 0 15px rgba(197, 168, 128, 0.15)",
                        padding: "12px 18px",
                    },
                    success: {
                        iconTheme: {
                            primary: "#c5a880",
                            secondary: "#0c0d0e",
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: "#f43f5e",
                            secondary: "#0c0d0e",
                        },
                    },
                }}
            />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/restaurant/:slug" element={<RestaurantDetail />} />
                <Route 
                    path="/booking/:slug" 
                    element={
                        <ProtectedRoute>
                            <BookingConfirmation />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/owner/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["owner"]}>
                            <OwnerDashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/admin/dashboard" 
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <AdminDashboard />
                        </ProtectedRoute>
                    } 
                />
            </Routes>

            {/* Global AI Sommelier & Dining Concierge Floating Widget */}
            <AIChatbot />
        </>
    );
}