"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import {
  Button, StatusBadge, UserAvatar, Card, Modal,
  Input, Select, FormGroup, EmptyState,
} from "@/components/ui";
import { Search, Plus, Eye, Trash2, ToggleLeft, BookOpen } from "lucide-react";
import { INDIA_CITIES, INDIA_STATES } from "@/lib/data";
import type { User } from "@/types";
import Link from "next/link";

export default function UsersPage() {
  const { users, books, addUser, updateUser, deleteUser } = useStore();

  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewUser, setViewUser] = useState<User | null>(null);

  // Add user form state
  const [form, setForm] = useState({ fname: "", lname: "", email: "", phone: "", city: "Mumbai", child: "", avatar: "BD1" });

  const filtered = users.filter(u => {
    const q = search.toLowerCase();
    const matchQ = !q || `${u.fname} ${u.lname} ${u.email} ${u.city}`.toLowerCase().includes(q);
    const matchCity = !filterCity || u.city === filterCity;
    const matchStatus = !filterStatus || u.status === filterStatus;
    return matchQ && matchCity && matchStatus;
  });

  function handleAdd() {
    if (!form.fname || !form.lname || !form.email) return;
    const ci = INDIA_CITIES.indexOf(form.city);
    addUser({ ...form, state: INDIA_STATES[ci] ?? "India", status: "Active" });
    setForm({ fname: "", lname: "", email: "", phone: "", city: "Mumbai", child: "", avatar: "BD1" });
    setShowAddModal(false);
  }

  function userBooks(id: number) {
    return books.filter(b => b.userId === id);
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-gray-800">User Registrations</h2>
          <span className="bg-green-50 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">{filtered.length} users</span>
        </div>
        <Button variant="primary" size="sm" onClick={() => setShowAddModal(true)}>
          <Plus size={13} /> Add User
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search name, email, city..." className="pl-8" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={filterCity} onChange={e => setFilterCity(e.target.value)} className="w-36">
          <option value="">All Cities</option>
          {INDIA_CITIES.map(c => <option key={c}>{c}</option>)}
        </Select>
        <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="w-32">
          <option value="">All Status</option>
          <option>Active</option><option>Inactive</option><option>Pending</option>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                {["User","Email","City","State","Books","Joined","Status","Actions"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 && (
                <tr><td colSpan={8}><EmptyState message="No users found" /></td></tr>
              )}
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <UserAvatar name={`${u.fname} ${u.lname}`} id={u.id} size={28} />
                      <span className="font-medium text-gray-800">{u.fname} {u.lname}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.email}</td>
                  <td className="px-4 py-3 text-gray-700">{u.city}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.state}</td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-gray-800">{u.books}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{u.joined}</td>
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <Button size="sm" variant="ghost" onClick={() => setViewUser(u)} title="View">
                        <Eye size={12} />
                      </Button>
                      <Button size="sm" variant="warning" onClick={() => updateUser(u.id, { status: u.status === "Active" ? "Inactive" : "Active" })} title="Toggle status">
                        <ToggleLeft size={12} />
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => deleteUser(u.id)} title="Delete">
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add User Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        footer={
          <>
            <Button variant="default" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAdd}>Add User</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormGroup label="First Name *">
              <Input placeholder="Priya" value={form.fname} onChange={e => setForm(p => ({ ...p, fname: e.target.value }))} />
            </FormGroup>
            <FormGroup label="Last Name *">
              <Input placeholder="Sharma" value={form.lname} onChange={e => setForm(p => ({ ...p, lname: e.target.value }))} />
            </FormGroup>
          </div>
          <FormGroup label="Email *">
            <Input placeholder="priya@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
          </FormGroup>
          <div className="grid grid-cols-2 gap-3">
            <FormGroup label="City">
              <Select value={form.city} onChange={e => setForm(p => ({ ...p, city: e.target.value }))}>
                {INDIA_CITIES.map(c => <option key={c}>{c}</option>)}
              </Select>
            </FormGroup>
            <FormGroup label="Phone">
              <Input placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </FormGroup>
          </div>
          <FormGroup label="Child's Name">
            <Input placeholder="Arjun, Meera, Riya..." value={form.child} onChange={e => setForm(p => ({ ...p, child: e.target.value }))} />
          </FormGroup>
          <FormGroup label="Default Avatar">
            <Select value={form.avatar} onChange={e => setForm(p => ({ ...p, avatar: e.target.value }))}>
              {["BD1","BD2","GD1","GD2","BL1","GL1"].map(a => <option key={a}>{a}</option>)}
            </Select>
          </FormGroup>
        </div>
      </Modal>

      {/* View User Modal */}
      {viewUser && (
        <Modal
          open={!!viewUser}
          onClose={() => setViewUser(null)}
          title={`${viewUser.fname} ${viewUser.lname}`}
          footer={
            <>
              <Button variant="default" onClick={() => setViewUser(null)}>Close</Button>
              <Link href="/books/create">
                <Button variant="primary" onClick={() => setViewUser(null)}>
                  <BookOpen size={13} /> Create Book
                </Button>
              </Link>
            </>
          }
        >
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <UserAvatar name={`${viewUser.fname} ${viewUser.lname}`} id={viewUser.id} size={48} />
              <div>
                <p className="font-semibold text-gray-800">{viewUser.fname} {viewUser.lname}</p>
                <StatusBadge status={viewUser.status} />
              </div>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-50">
                {[
                  ["Email", viewUser.email],
                  ["Phone", viewUser.phone],
                  ["City", `${viewUser.city}, ${viewUser.state}`],
                  ["Child's Name", viewUser.child],
                  ["Avatar", viewUser.avatar],
                  ["Joined", viewUser.joined],
                  ["Books Created", viewUser.books],
                ].map(([k, v]) => (
                  <tr key={String(k)}>
                    <td className="py-2 text-gray-500 text-xs">{k}</td>
                    <td className="py-2 text-right font-medium text-gray-800 text-xs">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">Recent Books</p>
              {userBooks(viewUser.id).slice(0, 3).map(b => (
                <div key={b.id} className="py-2 border-b border-gray-50 flex justify-between text-xs">
                  <span className="font-medium text-gray-800">{b.title}</span>
                  <span className="text-gray-400">{b.theme}</span>
                </div>
              ))}
              {userBooks(viewUser.id).length === 0 && <p className="text-xs text-gray-400">No books yet</p>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
