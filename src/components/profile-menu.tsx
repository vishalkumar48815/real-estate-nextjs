import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "antd"
import { UserOutlined } from '@ant-design/icons';
import { PropsWithChildren } from "react";

export default function ProfileMenu({children} : PropsWithChildren) {
    return <DropdownMenu>
        <DropdownMenuTrigger className="text-start md:text-center px-2 py-1">
            <Avatar icon={<UserOutlined />} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {children}
        </DropdownMenuContent>
    </DropdownMenu>
}
