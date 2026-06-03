"use client";

import { useState, useEffect } from "react";
import { Save, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showPw, setShowPw] = useState(false);
  const [profileStatus, setProfileStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pwStatus, setPwStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [pwError, setPwError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) setProfile({ name: data.user.name, email: data.user.email, phone: data.user.phone || "" });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus("saving");
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      if (res.ok) {
        setProfileStatus("saved");
        setTimeout(() => setProfileStatus("idle"), 2000);
      } else {
        setProfileStatus("error");
      }
    } catch {
      setProfileStatus("error");
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError("");
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPwError("Passwords do not match.");
      return;
    }
    if (passwords.newPassword.length < 8) {
      setPwError("Password must be at least 8 characters.");
      return;
    }
    setPwStatus("saving");
    try {
      const res = await fetch("/api/users/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwords),
      });
      const data = await res.json();
      if (res.ok) {
        setPwStatus("saved");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setPwStatus("idle"), 2000);
      } else {
        setPwError(data.error || "Password change failed.");
        setPwStatus("error");
      }
    } catch {
      setPwStatus("error");
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-600 text-sm mt-1">Manage your personal details and password</p>
      </div>

      {/* Profile form */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <div>
            <label className="form-label">Full Name *</label>
            <input type="text" className="form-input" value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })} required />
          </div>
          <div>
            <label className="form-label">Email Address *</label>
            <input type="email" className="form-input" value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
          </div>
          <div>
            <label className="form-label">Phone Number</label>
            <input type="tel" className="form-input" value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
          </div>
          {profileStatus === "error" && (
            <p className="text-red-600 text-sm">Failed to save. Please try again.</p>
          )}
          <button type="submit" className="btn-primary flex items-center gap-2"
            disabled={profileStatus === "saving"}>
            {profileStatus === "saved" ? (
              <><CheckCircle className="w-4 h-4" /> Saved!</>
            ) : (
              <><Save className="w-4 h-4" /> {profileStatus === "saving" ? "Saving..." : "Save Changes"}</>
            )}
          </button>
        </form>
      </div>

      {/* Password form */}
      <div className="card p-6">
        <h3 className="font-bold text-gray-900 mb-4">Change Password</h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="form-label">Current Password *</label>
            <div className="relative">
              <input type={showPw ? "text" : "password"} className="form-input pr-10"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} required />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="form-label">New Password *</label>
            <input type="password" className="form-input"
              placeholder="Min 8 chars, 1 uppercase, 1 number"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} required />
          </div>
          <div>
            <label className="form-label">Confirm New Password *</label>
            <input type="password" className="form-input"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} required />
          </div>
          {pwError && <p className="text-red-600 text-sm">{pwError}</p>}
          {pwStatus === "error" && !pwError && (
            <p className="text-red-600 text-sm">Failed to change password. Please try again.</p>
          )}
          <button type="submit" className="btn-primary flex items-center gap-2"
            disabled={pwStatus === "saving"}>
            {pwStatus === "saved" ? (
              <><CheckCircle className="w-4 h-4" /> Password Changed!</>
            ) : (
              <><Save className="w-4 h-4" /> {pwStatus === "saving" ? "Changing..." : "Change Password"}</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
