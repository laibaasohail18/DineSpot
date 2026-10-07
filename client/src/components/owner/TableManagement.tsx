/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Plus, Users, Armchair, Sparkles, Trash2, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import toast from "react-hot-toast";

interface Table {
    _id: string;
    tableNumber: string;
    capacity: number;
    zone: "Main Dining" | "Outdoor Terrace" | "VIP Private Lounge" | "Bar Area";
    status: "available" | "reserved" | "maintenance";
}

interface TableManagementProps {
    restaurantId: string;
    initialTables?: Table[];
}

export default function TableManagement({ restaurantId: _restaurantId, initialTables = [] }: TableManagementProps) {
    const [tables, setTables] = useState<Table[]>(
        initialTables.length > 0
            ? initialTables
            : [
                  { _id: "t1", tableNumber: "T-01", capacity: 2, zone: "Main Dining", status: "available" },
                  { _id: "t2", tableNumber: "T-02", capacity: 4, zone: "Main Dining", status: "reserved" },
                  { _id: "t3", tableNumber: "VIP-01", capacity: 8, zone: "VIP Private Lounge", status: "available" },
                  { _id: "t4", tableNumber: "TER-01", capacity: 4, zone: "Outdoor Terrace", status: "maintenance" },
              ]
    );

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filterZone, setFilterZone] = useState<string>("All");

    // Form state for creating a new table
    const [newTable, setNewTable] = useState({
        tableNumber: "",
        capacity: 2,
        zone: "Main Dining" as Table["zone"],
        status: "available" as Table["status"],
    });

    const handleAddTable = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTable.tableNumber.trim()) {
            toast.error("Please provide a valid table number or label.");
            return;
        }

        const createdTable: Table = {
            _id: `t_${Date.now()}`,
            tableNumber: newTable.tableNumber.toUpperCase(),
            capacity: Number(newTable.capacity),
            zone: newTable.zone,
            status: newTable.status,
        };

        setTables((prev) => [...prev, createdTable]);
        toast.success(`Table ${createdTable.tableNumber} added to layout.`);
        setIsAddModalOpen(false);
        setNewTable({ tableNumber: "", capacity: 2, zone: "Main Dining", status: "available" });
    };

    const handleToggleStatus = (id: string, newStatus: Table["status"]) => {
        setTables((prev) => prev.map((t) => (t._id === id ? { ...t, status: newStatus } : t)));
        toast.success("Table seating status updated.");
    };

    const handleDeleteTable = (id: string, tableNumber: string) => {
        if (!window.confirm(`Are you sure you want to remove Table ${tableNumber}?`)) return;
        setTables((prev) => prev.filter((t) => t._id !== id));
        toast.success(`Table ${tableNumber} deleted.`);
    };

    const zones = ["All", "Main Dining", "Outdoor Terrace", "VIP Private Lounge", "Bar Area"];

    const filteredTables = filterZone === "All" ? tables : tables.filter((t) => t.zone === filterZone);

    return (
        <div className="space-y-8 text-left">
            {/* Header & Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#c5a880]/20 pb-5">
                <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c5a880]/10 border border-[#c5a880]/20 text-[#c5a880] text-[9px] font-bold tracking-[0.2em] uppercase mb-1">
                        <Sparkles size={11} /> SEATING & LAYOUT MANAGEMENT
                    </span>
                    <h3 className="font-serif text-2xl font-bold gold-gradient-text">Floor Tables & Zones</h3>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="relative group overflow-hidden bg-linear-to-r from-[#c5a880] via-[#d4bc9a] to-[#a88a62] text-[#0c0d0e] text-[10px] font-bold tracking-widest uppercase px-5 py-3 rounded-xl cursor-pointer transition-all duration-300 shadow-md hover:shadow-[0_5px_20px_rgba(197,168,128,0.3)] flex items-center gap-2"
                >
                    <Plus size={15} /> ADD NEW TABLE
                </button>
            </div>

            {/* Zone Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {zones.map((zone) => (
                    <button
                        key={zone}
                        onClick={() => setFilterZone(zone)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-luxury whitespace-nowrap cursor-pointer ${
                            filterZone === zone
                                ? "bg-[#c5a880] text-[#0c0d0e] shadow-md shadow-[#c5a880]/20"
                                : "bg-[#151719]/80 text-stone-400 border border-stone-800 hover:border-[#c5a880]/40 hover:text-stone-200"
                        }`}
                    >
                        {zone}
                    </button>
                ))}
            </div>

            {/* Tables Grid View */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTables.map((table) => (
                    <div
                        key={table._id}
                        className="group relative glass-panel border border-stone-800/80 hover:border-[#c5a880]/40 transition-luxury rounded-2xl p-5 shadow-xl bg-[#151719]/80 flex flex-col justify-between gap-5"
                    >
                        {/* Card Top Row */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-xl bg-[#0c0d0e] border border-[#c5a880]/30 flex items-center justify-center text-[#c5a880] font-serif font-bold text-base shadow-sm">
                                    <Armchair size={20} />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-lg text-stone-100 group-hover:text-[#c5a880] transition-colors">
                                        {table.tableNumber}
                                    </h4>
                                    <span className="text-[10px] font-medium text-stone-400">{table.zone}</span>
                                </div>
                            </div>

                            {/* Status Indicator */}
                            <span
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase border ${
                                    table.status === "available"
                                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                        : table.status === "reserved"
                                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                                        : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                                }`}
                            >
                                {table.status === "available" && <CheckCircle2 size={11} />}
                                {table.status === "reserved" && <AlertCircle size={11} />}
                                {table.status === "maintenance" && <XCircle size={11} />}
                                {table.status}
                            </span>
                        </div>

                        {/* Capacity & Details */}
                        <div className="bg-[#0c0d0e]/60 p-3 rounded-xl border border-stone-800/80 flex items-center justify-between text-xs text-stone-300">
                            <span className="flex items-center gap-1.5 font-light">
                                <Users size={14} className="text-[#c5a880]" /> Capacity Limit:
                            </span>
                            <strong className="text-stone-100 font-bold">{table.capacity} Guests</strong>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between border-t border-stone-800/80 pt-4 text-xs">
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => handleToggleStatus(table._id, "available")}
                                    title="Mark Available"
                                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase border cursor-pointer transition-luxury ${
                                        table.status === "available"
                                            ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                                            : "bg-[#0c0d0e] border-stone-800 text-stone-400 hover:text-emerald-400"
                                    }`}
                                >
                                    Ready
                                </button>
                                <button
                                    onClick={() => handleToggleStatus(table._id, "reserved")}
                                    title="Mark Reserved"
                                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold tracking-widest uppercase border cursor-pointer transition-luxury ${
                                        table.status === "reserved"
                                            ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                                            : "bg-[#0c0d0e] border-stone-800 text-stone-400 hover:text-amber-300"
                                    }`}
                                >
                                    Booked
                                </button>
                            </div>

                            <button
                                onClick={() => handleDeleteTable(table._id, table.tableNumber)}
                                className="p-2 text-stone-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg cursor-pointer transition-colors"
                            >
                                <Trash2 size={15} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal: Add New Table */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-md bg-[#151719] border border-[#c5a880]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
                        <div className="border-b border-stone-800 pb-4">
                            <h3 className="font-serif text-xl font-bold gold-gradient-text">Add Dining Table</h3>
                            <p className="text-xs text-stone-400 font-light mt-1">Configure seating capacity and floor zone.</p>
                        </div>

                        <form onSubmit={handleAddTable} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">
                                    Table ID / Label
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. VIP-03 or T-12"
                                    value={newTable.tableNumber}
                                    onChange={(e) => setNewTable({ ...newTable, tableNumber: e.target.value })}
                                    className="w-full px-4 py-3 bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-[#c5a880] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">
                                        Max Guests
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="20"
                                        required
                                        value={newTable.capacity}
                                        onChange={(e) => setNewTable({ ...newTable, capacity: Number(e.target.value) })}
                                        className="w-full px-4 py-3 bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-[#c5a880] focus:outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">
                                        Initial Status
                                    </label>
                                    <select
                                        value={newTable.status}
                                        onChange={(e) => setNewTable({ ...newTable, status: e.target.value as Table["status"] })}
                                        className="w-full px-4 py-3 bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-[#c5a880] focus:outline-none [&>option]:bg-[#151719]"
                                    >
                                        <option value="available">Available</option>
                                        <option value="reserved">Reserved</option>
                                        <option value="maintenance">Maintenance</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-stone-400 tracking-widest uppercase mb-1.5">
                                    Floor Zone
                                </label>
                                <select
                                    value={newTable.zone}
                                    onChange={(e) => setNewTable({ ...newTable, zone: e.target.value as Table["zone"] })}
                                    className="w-full px-4 py-3 bg-[#0c0d0e] border border-stone-800 rounded-xl text-stone-100 text-xs focus:border-[#c5a880] focus:outline-none [&>option]:bg-[#151719]"
                                >
                                    <option value="Main Dining">Main Dining</option>
                                    <option value="Outdoor Terrace">Outdoor Terrace</option>
                                    <option value="VIP Private Lounge">VIP Private Lounge</option>
                                    <option value="Bar Area">Bar Area</option>
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-stone-800">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="flex-1 border border-stone-800 text-stone-300 py-3 text-[10px] font-bold tracking-widest uppercase rounded-xl cursor-pointer hover:bg-stone-800/40"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 bg-linear-to-r from-[#c5a880] to-[#b5976f] text-[#0c0d0e] py-3 text-[10px] font-bold tracking-widest uppercase rounded-xl cursor-pointer shadow-md hover:shadow-[0_5px_15px_rgba(197,168,128,0.3)]"
                                >
                                    Save Table
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}