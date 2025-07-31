"use client";

import { BadgeInfo, Bell, Building2, HomeIcon, LogIn, LogOut, User, MessagesSquare } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Dock, DockIcon } from "@/components/magicui/dock";
import Logo from "./Logo";
import { Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { redirect, usePathname } from "next/navigation";

export type IconProps = React.HTMLAttributes<SVGElement>;

type NavbarListProps = {
    onClose?: () => void;
};


export default function NavbarDock({ onClose }: NavbarListProps) {
    const currentPath = usePathname();
    const [token, setToken] = useState<string>("");

    const handleLogout = useCallback(() => {
        fetch('/api/auth/signout', {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        }).then(() => {
            localStorage.removeItem("token")
            setToken("");
            redirect('/')
        })
    }, []);

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
            label: <Link href={"/profile"} className="flex gap-1 items-center"><User size={15} /> <span>Profile</span></Link>,
            disabled: !token
        },
        {
            key: '3',
            label: <p onClick={handleLogout} className="flex gap-1 items-center"><LogOut size={15} /> <span>Logout</span></p>
        }
    ];

    const MyAccountIcon = <Dropdown placement="bottom" menu={{ items }}>
        <div className="px-2 py-1 w-fit flex items-center">
            <p className="flex gap-1 w-fit items-center">
                <UserOutlined />
                <span>Account</span></p>
        </div>
    </Dropdown>

    const DATA = {
        navbar1: [
            { href: "/", icon: <Logo width={130} height={90} />, label: "Home", id: "home-logo", public: true, tokenCheck: false },
            { href: "/", icon: <p className="flex gap-1 w-fit items-center"><HomeIcon /> <span>Home</span></p>, label: "Home", id: "home-icon", public: true, tokenCheck: false },
            { href: "/listings", icon: <p className="flex gap-1 w-fit items-center"><Building2 /> <span>My listings</span></p>, label: "My listings", id: "listing-icon", public: false, tokenCheck: true },
            { href: "/messages", icon: <p className="flex gap-1 w-fit items-center"><MessagesSquare /> <span>Messages</span></p>, label: "Messages", id: "messages-icon", public: false, tokenCheck: true },
            { href: "/notifications", icon: <p className="flex gap-1 w-fit items-center"><Bell /> <span>Notifications</span></p>, label: "Notifications", id: "notifications-icon", public: false, tokenCheck: true },
            {
                href: "/about", icon: <p className="flex gap-1 w-fit items-center"><BadgeInfo /> <span>About</span></p>, label: "About Us", id: "about-us-icon", public: true, tokenCheck: false
            },
        ],
        navbar2: [
            { href: "", icon: MyAccountIcon, label: "Account", id: "my-account-icon", public: false, tokenCheck: true },
            { href: "/login", icon: <p className="flex gap-1 w-fit items-center"><LogIn /> <span>Login</span></p>, label: "Login/Signup", id: "login-logout-icon", public: false, tokenCheck: false }
        ],
    };

    useEffect(() => {
        const token = localStorage.getItem('token') as string;
        setToken(token);
        if (onClose) onClose()
    }, [currentPath, onClose]);

    return (
        <div className="relative">
            <TooltipProvider>
                <Dock className="mt-4 flex justify-between items-center w-full" direction="middle" iconSize={100}>
                    {DATA.navbar1.map((item) => {
                        if (item.public || (!item.public && item.tokenCheck == !!token)) {
                            return (<DockIcon key={item.id} size={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {item.href ? <Link
                                            href={item.href}
                                            aria-label={item.label}
                                            className={cn(
                                                buttonVariants({ variant: "ghost", size: "icon" }),
                                                `size-full rounded-full ${item.id == "home-logo" ? "" : "px-2 py-2"}`,
                                            )}
                                        >
                                            {item.icon}
                                        </Link> : item.icon}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                            )
                        }
                    })}
                    {DATA.navbar2.map((item) => {
                        if (item.public || (!item.public && item.tokenCheck == !!token)) {
                            return (<DockIcon key={item.id} size={200}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        {item.href ? <Link
                                            href={item.href}
                                            aria-label={item.label}
                                            className={cn(
                                                buttonVariants({ variant: "ghost", size: "icon" }),
                                                "size-full rounded-full px-2 py-2",
                                            )}
                                        >
                                            {item.icon}
                                        </Link> : <div>{item.icon}</div>}
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>)
                        }
                    })}
                </Dock>
            </TooltipProvider>
        </div>
    );
}
