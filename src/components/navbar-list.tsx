import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";


type NavbarListProps = {
    onClose?: () => void;
};

export default function NavbarList({ onClose }: NavbarListProps) {
    const currentPath = usePathname();
    const [token, setToken] = useState<string>("");

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: 'My Account',
            disabled: true,
        },
        {
            type: 'divider',
        },
        {
            key: '2',
            label: <Link href={"/profile"}>Profile</Link>
        },
        {
            key: '3',
            label: <p onClick={handleLogout}>Logout</p>
        }
    ];

    useEffect(() => {
        const token = localStorage.getItem('token') as string;
        setToken(token);
        if (onClose) onClose()
    }, [currentPath]);

    function handleLogout() {
        fetch('/api/auth/signout', {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            localStorage.removeItem("token")
            setToken("");
            redirect('/')
        })
    }

    function linkClass(path: string, currentPath: string) {
        return (path === currentPath ? "text-lg font-bold border-b-3 border-0 border-blue-500 shadow-b-xl" : "text-md text-gray-700") + " px-2 py-1";
    }


    return <ul className="flex gap-2 sm:gap-3 md:items-center flex-col md:flex-row" style={{ marginBottom: 0 }}>
        <Link href="/" className={linkClass('/', currentPath)}>Home</Link>
        {token && <>
            <Link href="/listings" className={linkClass('/listings', currentPath)}>My listings</Link>
            <Link href="/messages" className={linkClass('/messages', currentPath)}>Messages</Link>
            <Link href="/notifiactions" className={linkClass('/notifications', currentPath)}>Notifications</Link>
        </>}
        <Link href="/about" className={linkClass('/about', currentPath)}>About</Link>
        {!token && <Link href="/login" className={linkClass('/login', currentPath)}>Sign in</Link>}
        {token && <Dropdown menu={{ items }}>
            <div className="px-2 py-1 w-fit flex items-center">
            <Avatar size={25} icon={<UserOutlined />} />
            </div>
        </Dropdown>}
    </ul>
}