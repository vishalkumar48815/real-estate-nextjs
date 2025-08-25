'use client';

import { register } from "@/services/auth";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface FormDataTypes {
    name: string;
    email: string;
    phone: string;
    password: string;
}

const SignupForm = () => {
    const [formData, setFormData] = useState<FormDataTypes>({
        name: "",
        email: "",
        phone: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value
        }));
    }

    async function handleCreateAccount(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.password) {
            toast.error("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);
            const response = await register(formData)
            console.log("response: ", response)
            if (response.status === 201) {
                toast.success("Account created successfully!");
                // Optional: Save token in localStorage
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));
            } else {
                toast.error(response.data.error || "Signup failed.");
            }
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }


    return (<form className="flex flex-col gap-3" onSubmit={handleCreateAccount}>
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
    </form>)
}


export default SignupForm;