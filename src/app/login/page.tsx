
import LoginForm from "@/components/login-form";
import Logo from "@/components/Logo";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Card } from "antd";

export default function Login() {
    return <main className="py-6 lg:pt-30 lg:pb-10">
        <div className="flex flex-row justify-center">
            <Logo />
        </div>
        <Card className="max-w-xl text-center" style={{ margin: "20px auto 40px auto" }}>
            <div className="py-3">
                <h2 className="text-left text-xl font-semibold">Login</h2>
                <p className="text-gray-400 text-left font-medium">Enter your email and password below to
                    log into your account</p>
            </div>
            <LoginForm />
            <BorderBeam duration={5} size={300} />
        </Card>
    </main>
}
