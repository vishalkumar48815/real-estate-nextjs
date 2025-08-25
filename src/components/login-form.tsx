'use client';

import { login } from "@/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm() {
    const initialState = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = useState(initialState)
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const id = event.target.id;
        const value = event.target.value;

        setError("");
        setFormData(state => ({ ...state, [id]: value }))
    }

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        const { email, password } = formData
        if (!email || !password) {
            setError("Please enter valid credentials!")
            return
        }

        try {
            const response = await login(formData)
            if (response.status === 200) {
                localStorage.setItem("token", response.data.accessToken);
                localStorage.setItem("user", JSON.stringify(response.data));
                router.push('/')
            }

        } catch (error) {
            console.log("Error: ", error)
        }
        finally {
            setLoading(false)
        }
    }

    return <form onSubmit={handleLogin} className="flex flex-col gap-3">
        {error && <span className="text-lg text-red-600">{error}</span>}
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-left">Email <span className="text-red-700 text-lg">*</span></label>
            <input id="email" name="email" className="border border-gray-200 rounded-lg p-2" placeholder="Enter your password" type="email" onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-left">Password <span className="text-red-700 text-lg">*</span></label>
                <Link href="/forget-password" ><span className="text-gray-400 hover:border-b-1 border-gray-400 font-medium">Forget password?</span></Link>
            </div>
            <input id="password" name="password" className="border border-gray-200 rounded-lg p-2" placeholder="Enter your password" type="password" onChange={handleInputChange} />
        </div>
        <button
            className="w-[80%] md:w-[60%] mx-auto py-3 px-4 border rounded-lg bg-black text-[#ffffff] hover:opacity-75"
            type="submit"
            disabled={loading}
        >
            {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="flex gap-1 justify-center">
            <span className="text-gray-400 hover:border-b-1 border-gray-400 font-medium">Does not have an Account? </span>
            <Link href="/signup" >Sign up</Link>
        </div>
    </form>
}