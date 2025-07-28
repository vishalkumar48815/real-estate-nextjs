'use client';

import Logo from "./Logo";
import { useState } from "react";
import { Drawer } from "antd";
import NavbarList from "./navbar-list";
import { Button } from "./ui/button";
import { MenuOutlined } from "@ant-design/icons";


const Navbar = () => {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    return <>
        <main>
            <div className="flex justify-between gap-3 items-center p-4 max-w-[95%] m-auto">
                <Logo />
                <div className="flex gap-3 items-center">
                    <nav className="items-center hidden md:block">
                        <NavbarList />
                    </nav>
                    <Button variant={"outline"} title="Menu" className="block md:hidden" onClick={showDrawer}>
                    <MenuOutlined />
                    </Button>
                    <Drawer className="block md:hiddenx" title="Menu" closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open} width={"80%"} >
                        <nav className="items-center block md:hidden">
                            <NavbarList />
                        </nav>
                    </Drawer>
                </div>
            </div>
        </main>
    </>
}

export default Navbar