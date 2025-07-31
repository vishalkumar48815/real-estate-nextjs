import Logo from "@/components/Logo";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Card } from "antd";

export default function ForgetPassword() {
    return <main className="py-6 lg:pt-30 lg:pb-10">
        <div className="flex flex-row justify-center">
            <Logo />
        </div>
        <Card className="max-w-lg text-center" style={{ margin: "10px auto" }}>
            <div className="pb-3">
                <h2 className="text-left text-xl font-semibold pb-1">Forget Password</h2>
                <p className="text-gray-400 text-left font-medium">Enter your registered email and
                    we will send you a link to reset your password.</p>
            </div>
            <form className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                    <label className="text-left font-medium text-lg">Email <span className="text-red-700 text-lg">*</span></label>
                    <input className="border border-gray-200 rounded-lg p-2" placeholder="Enter your password" type="email" />
                </div>
                <button className="w-[80%] md:w-[60%] mx-auto py-3 px-4 border rounded-lg bg-black text-[#ffffff] hover:opacity-75" type="button">Continue</button>
            </form>
            <BorderBeam duration={5} size={300} />
        </Card>
    </main>
}