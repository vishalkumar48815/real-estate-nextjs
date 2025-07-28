'use client';

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

    function handleInputChange(event: any) {
        let id = event.target.id;
        let value = event.target.value;

        setError("");
        setFormData(state => ({ ...state, [id]: value }))
    }

    async function handleLogin() {
        setLoading(true)
        const { email, password } = formData
        console.log("formData: ", formData)
        if (!email || !password) {
            setError("Please enter valid credentials!")
            return
        }

        try {
            const response = await fetch('/api/auth/signin', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem("token", result.token);
                router.push('/')
            }

        } catch (error) {
            console.log("Error: ", error)
        }
        finally {
            setLoading(false)
        }
    }

    return <form className="flex flex-col gap-3">
        {error && <span className="text-lg text-red-600">{error}</span>}
        <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-left">Email <span className="text-red-700 text-lg">*</span></label>
            <input id="email" name="email" className="border border-gray-200 rounded-lg p-2" placeholder="Enter your password" type="email" onChange={handleInputChange} />
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-left">Password <span className="text-red-700 text-lg">*</span></label>
                <Link href="/login/forget-password" ><span className="text-gray-400 hover:border-b-1 border-gray-400 font-medium">Forget password?</span></Link>
            </div>
            <input id="password" name="password" className="border border-gray-200 rounded-lg p-2" placeholder="Enter your password" type="password" onChange={handleInputChange} />
        </div>
        <button className="w-[80%] md:w-[60%] mx-auto py-3 px-4 border rounded-lg bg-black text-[#ffffff] hover:opacity-75" type="button" onClick={handleLogin}>Login</button>
        <div className="flex gap-1 justify-center">
            <span className="text-gray-400 hover:border-b-1 border-gray-400 font-medium">Does not have an Account? </span>
            <Link href="/signup" >Sign up</Link>
        </div>
    </form>
}