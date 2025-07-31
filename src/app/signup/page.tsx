'use client';
import Logo from "@/components/Logo";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Card, message } from "antd";
import Link from "next/link";
import { useState } from "react";

interface FormDataTypes {
    name: string;
    email: string;
    phone: string;
    password: string;
}

export default function Signup() {
    const [formData, setFormData] = useState<FormDataTypes>({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    // ✅ Handle input change
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    // ✅ Handle Signup API Call
    async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Basic validation
        if (!formData.name || !formData.email || !formData.password) {
            message.error("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);
            const response = await fetch('/api/auth/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                message.success("Account created successfully!");
                console.log("✅ User Token:", result.token);
                // Optional: Save token in localStorage
                localStorage.setItem("token", result.token);
            } else {
                message.error(result.error || "Signup failed.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            message.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="py-6 lg:pt-30 lg:pb-10">
            <div className="flex flex-row justify-center">
                <Logo />
            </div>
            <Card className="max-w-xl text-center" style={{ margin: "20px auto 40px auto" }}>
                <div className="py-3">
                    <h2 className="text-left text-xl font-semibold">Signup</h2>
                    <p className="text-gray-400 text-left font-medium">
                        Create your account here to access all the features of this website!
                    </p>
                </div>
                <form className="flex flex-col gap-3" onSubmit={handleCreateAccount}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="text-left">
                            Name <span className="text-red-700 text-lg">*</span>
                        </label>
                        <input
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg p-2"
                            placeholder="Enter your full name"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="text-left">
                            Email <span className="text-red-700 text-lg">*</span>
                        </label>
                        <input
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg p-2"
                            placeholder="Enter your email"
                            type="email"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="text-left">
                            Phone
                        </label>
                        <input
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg p-2"
                            placeholder="Enter your phone number"
                            type="text"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-left">
                            Password <span className="text-red-700 text-lg">*</span>
                        </label>
                        <input
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-200 rounded-lg p-2"
                            placeholder="Enter your password"
                            type="password"
                        />
                    </div>

                    <button type="submit" disabled={loading} className={`w-[80%] md:w-[60%] mx-auto py-3 px-4 border rounded-lg bg-black text-white hover:opacity-75 ${loading && 'opacity-50 cursor-not-allowed'}`}
                    >
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="flex gap-1 justify-center text-sm mt-2">
                        <span className="text-gray-400 font-medium">Already have an account?</span>
                        <Link href="/login" className="text-blue-500">Login</Link>
                    </div>
                </form>
                <BorderBeam duration={5} size={300} />
            </Card>
        </main>
    );
}
