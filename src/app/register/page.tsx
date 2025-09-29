"use client";

import React, { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [graduationYear, setGraduationYear] = useState<string>("");
  const [department, setDepartment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password, graduationYear: graduationYear ? Number(graduationYear) : undefined, department })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Registration failed");
      
      // Save user data to localStorage
      const userName = name || email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      localStorage.setItem('userType', role);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', email);
      
      setMessage("Registration successful! Redirecting to dashboard...");
      // Redirect to the correct role-based dashboard after successful registration
      setTimeout(() => {
        window.location.href = `/dashboard/${role}`;
      }, 2000);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create an account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="student">Student</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Graduation Year (optional)</label>
          <input type="number" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Department (optional)</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded font-semibold disabled:opacity-60">
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p className="mt-3 text-green-600 text-sm">{message}</p>}
      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
    </div>
  );
}

