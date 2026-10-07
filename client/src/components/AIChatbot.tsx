/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Bot, Send, X, ArrowRight, RefreshCw, ChefHat } from "lucide-react";
import api from "../lib/api.ts";

interface Message {
    id: string;
    sender: "bot" | "user";
    text: string;
    suggestions?: { name: string; slug: string; cuisine: string; location: string }[];
    timestamp: string;
}

export default function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            id: "msg_welcome",
            sender: "bot",
            text: "Welcome to DineSpot Privé. I am your personal AI Sommelier & Dining Concierge. How may I curating your evening?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const quickPrompts = [
        "Romantic French spot for 2",
        "Top Japanese Steakhouses",
        "Chef's tasting menu with wine pairing",
    ];

    const handleSendMessage = async (textToSend?: string) => {
        const queryText = textToSend || input;
        if (!queryText.trim()) return;

        const userMsg: Message = {
            id: `usr_${Date.now()}`,
            sender: "user",
            text: queryText,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, userMsg]);
        if (!textToSend) setInput("");
        setIsTyping(true);

        try {
            // Attempt to query featured restaurants to provide real recommendations if matches exist
            const featuredRes = await api.get("/restaurants/featured").catch(() => ({ data: [] }));
            const venueList = featuredRes.data || [];

            setTimeout(() => {
                let botResponseText = "I have curated exclusive recommendations matching your palate and occasion.";
                let matchedVenues: any[] = [];

                const lowerQuery = queryText.toLowerCase();

                if (lowerQuery.includes("french") || lowerQuery.includes("romantic")) {
                    botResponseText = "For a refined romantic evening, I recommend our premier European and French establishments featuring intimate lighting and artisanal wine cellars.";
                    matchedVenues = venueList.filter((v: any) => v.cuisine?.toLowerCase().includes("french") || v.cuisine?.toLowerCase().includes("italian")).slice(0, 2);
                } else if (lowerQuery.includes("japanese") || lowerQuery.includes("steak") || lowerQuery.includes("sushi")) {
                    botResponseText = "Discover supreme Omakase and high-grade Wagyu dining spaces curated for connoisseurs.";
                    matchedVenues = venueList.filter((v: any) => v.cuisine?.toLowerCase().includes("japanese") || v.cuisine?.toLowerCase().includes("steak")).slice(0, 2);
                } else {
                    botResponseText = `Searching through our verified luxury establishments for '${queryText}'... Here are top recommended seating reserves.`;
                    matchedVenues = venueList.slice(0, 2);
                }

                const botMsg: Message = {
                    id: `bot_${Date.now()}`,
                    sender: "bot",
                    text: botResponseText,
                    suggestions: matchedVenues.length > 0 ? matchedVenues : undefined,
                    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                };

                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);
            }, 1000);
        } catch {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 text-left">
            {/* Floating Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative group flex items-center gap-3 bg-[#151719] border border-[#c5a880]/50 text-[#c5a880] p-4 rounded-full shadow-[0_10px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_35px_rgba(197,168,128,0.3)] hover:border-[#c5a880] transition-all duration-300 cursor-pointer"
                >
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c5a880]"></span>
                    </span>
                    <Bot size={22} className="group-hover:rotate-12 transition-transform" />
                    <span className="hidden sm:inline font-serif font-bold text-xs tracking-widest text-stone-100 uppercase pr-1">
                        AI Concierge
                    </span>
                </button>
            )}

            {/* Chatbot Interface Window */}
            {isOpen && (
                <div className="w-[90vw] sm:w-95 h-130 glass-panel border border-[#c5a880]/40 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] bg-[#0c0d0e]/95 backdrop-blur-xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                    {/* Header Ribbon */}
                    <div className="p-4 bg-[#151719]/90 border-b border-[#c5a880]/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] shadow-sm">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-sm text-stone-100 flex items-center gap-1.5">
                                    DineSpot Sommelier <Sparkles size={12} className="text-[#c5a880]" />
                                </h4>
                                <span className="text-[9px] font-bold text-emerald-400 tracking-widest uppercase flex items-center gap-1">
                                    ● AI CONCIERGE LIVE
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1.5 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer rounded-full hover:bg-stone-800/50"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages Container */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-light scrollbar-thin">
                        {messages.map((m) => (
                            <div
                                key={m.id}
                                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                            >
                                <div
                                    className={`max-w-[82%] p-3.5 rounded-2xl leading-relaxed ${
                                        m.sender === "user"
                                            ? "bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] font-semibold rounded-br-none shadow-md"
                                            : "bg-[#151719] border border-stone-800 text-stone-200 rounded-bl-none shadow-lg"
                                    }`}
                                >
                                    <p>{m.text}</p>

                                    {/* Recommendations Card Carousel inside Bot Response */}
                                    {m.suggestions && m.suggestions.length > 0 && (
                                        <div className="mt-3 space-y-2 border-t border-stone-800/80 pt-2.5">
                                            <span className="text-[9px] font-bold tracking-widest text-[#c5a880] uppercase flex items-center gap-1">
                                                <ChefHat size={11} /> Suggested Venues
                                            </span>
                                            {m.suggestions.map((v) => (
                                                <Link
                                                    key={v.slug}
                                                    to={`/restaurant/${v.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="flex items-center justify-between p-2 rounded-xl bg-[#0c0d0e] border border-stone-800 hover:border-[#c5a880]/50 transition-colors group"
                                                >
                                                    <div>
                                                        <p className="font-serif font-bold text-stone-100 text-xs group-hover:text-[#c5a880] transition-colors">
                                                            {v.name}
                                                        </p>
                                                        <span className="text-[9px] text-stone-400">{v.cuisine} • {v.location}</span>
                                                    </div>
                                                    <ArrowRight size={13} className="text-[#c5a880] group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <span className="text-[9px] text-stone-500 mt-1 px-1">{m.timestamp}</span>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex items-center gap-2 text-stone-400 italic text-[11px] bg-[#151719] p-3 rounded-2xl w-fit border border-stone-800">
                                <RefreshCw size={12} className="animate-spin text-[#c5a880]" />
                                AI Sommelier is curating recommendations...
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="px-3 py-2 border-t border-stone-800/80 bg-[#0c0d0e]/60 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                        {quickPrompts.map((qp) => (
                            <button
                                key={qp}
                                onClick={() => handleSendMessage(qp)}
                                className="px-2.5 py-1 rounded-full bg-[#151719] border border-stone-800 text-[10px] text-stone-300 hover:border-[#c5a880]/50 hover:text-[#c5a880] whitespace-nowrap cursor-pointer transition-colors shrink-0"
                            >
                                {qp}
                            </button>
                        ))}
                    </div>

                    {/* Input Bar */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSendMessage();
                        }}
                        className="p-3 bg-[#151719] border-t border-[#c5a880]/20 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            placeholder="Ask about dining recommendations, wines, or venues..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-[#0c0d0e] border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-stone-100 placeholder:text-stone-500 focus:border-[#c5a880] focus:outline-none font-light"
                        />
                        <button
                            type="submit"
                            disabled={!input.trim()}
                            className="p-2.5 rounded-xl bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] disabled:opacity-40 cursor-pointer shadow-md transition-all hover:scale-105"
                        >
                            <Send size={15} />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}