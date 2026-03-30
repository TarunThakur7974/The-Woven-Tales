"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { Card, Button, Input, Select, FormGroup } from "@/components/ui";
import { Save, Download, RefreshCw, Database, AlertTriangle } from "lucide-react";

export default function SettingsPage() {
  const { showToast } = useStore();
  const [settings, setSettings] = useState({
    platformName: "The Woven Tales",
    adminEmail: "admin@woventry.in",
    region: "India",
    defaultLanguage: "English",
    allowRegistrations: true,
    maintenanceMode: false,
    emailNotifications: true,
    autoApproveBooks: false,
  });

  function set(k: string, v: string | boolean) {
    setSettings(p => ({ ...p, [k]: v }));
  }

  return (
    <div className="space-y-5 max-w-2xl">
      {/* General Settings */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">General Settings</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Platform Name">
              <Input value={settings.platformName} onChange={e => set("platformName", e.target.value)} />
            </FormGroup>
            <FormGroup label="Admin Email">
              <Input value={settings.adminEmail} onChange={e => set("adminEmail", e.target.value)} />
            </FormGroup>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormGroup label="Region">
              <Select value={settings.region} onChange={e => set("region", e.target.value)}>
                <option>India</option>
              </Select>
            </FormGroup>
            <FormGroup label="Default Language">
              <Select value={settings.defaultLanguage} onChange={e => set("defaultLanguage", e.target.value)}>
                {["English","Hindi","Tamil","Telugu","Marathi","Bengali","Gujarati"].map(l => <option key={l}>{l}</option>)}
              </Select>
            </FormGroup>
          </div>
          <Button variant="primary" onClick={() => showToast("Settings saved successfully")}>
            <Save size={13} /> Save Settings
          </Button>
        </div>
      </Card>

      {/* Feature Toggles */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">Feature Toggles</h2>
        </div>
        <div className="px-6 py-5 space-y-4">
          {[
            { key: "allowRegistrations", label: "Allow New Registrations", desc: "Let new users sign up to the platform" },
            { key: "maintenanceMode", label: "Maintenance Mode", desc: "Show maintenance page to all visitors" },
            { key: "emailNotifications", label: "Email Notifications", desc: "Send emails for new registrations and books" },
            { key: "autoApproveBooks", label: "Auto-approve Books", desc: "Automatically approve books without admin review" },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-gray-800">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </div>
              <button
                onClick={() => { set(key, !settings[key as keyof typeof settings]); showToast(`${label} ${!settings[key as keyof typeof settings] ? "enabled" : "disabled"}`); }}
                className={`relative w-10 h-5 rounded-full transition-colors ${settings[key as keyof typeof settings] ? "bg-green-600" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${settings[key as keyof typeof settings] ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
          <AlertTriangle size={14} className="text-red-500" />
          <h2 className="text-sm font-semibold text-gray-800">Danger Zone</h2>
        </div>
        <div className="px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => showToast("Export initiated — CSV will be emailed to admin")}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Download size={14} /> Export All Data
            </button>
            <button
              onClick={() => showToast("Cache cleared successfully")}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 text-amber-700 text-sm font-medium hover:bg-amber-100 transition-colors"
            >
              <RefreshCw size={14} /> Clear Cache
            </button>
            <button
              onClick={() => showToast("Database backup triggered")}
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-red-200 bg-red-50 text-red-700 text-sm font-medium hover:bg-red-100 transition-colors"
            >
              <Database size={14} /> Backup Database
            </button>
          </div>
        </div>
      </Card>

      {/* Version Info */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-800">System Info</h2>
        </div>
        <div className="px-6 py-4">
          <table className="w-full text-sm">
            <tbody className="divide-y divide-gray-50">
              {[
                ["Platform", "The Woven Tales Admin"],
                ["Version", "1.0.0"],
                ["Framework", "Next.js 14"],
                ["Region", "India 🇮🇳"],
                ["Environment", "Production"],
              ].map(([k, v]) => (
                <tr key={k}>
                  <td className="py-2 text-xs text-gray-500">{k}</td>
                  <td className="py-2 text-right text-xs font-medium text-gray-800">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
