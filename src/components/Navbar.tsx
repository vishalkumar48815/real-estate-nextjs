'use client';

import Logo from "./Logo";
import { useState } from "react";
import { Drawer } from "antd";
import NavbarList from "./navbar-list";
import { Button } from "./ui/button";
import { MenuOutlined } from "@ant-design/icons";
import NavbarDock from "./navbar-dock";


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
            <div className="flex justify-between gap-3 items-center p-2 sm:p-4 max-w-[98%] sm:max-w-[95%] md:w-full md:p-0 m-auto">
                <div className="w-[10%] h-[10%] sm:w-[14%] sm:h-[14%] block lg:hidden">
                    <Logo />
                </div>
                <div className="flex gap-3 items-center w-[80%] md:w-full justify-end lg:justify-center mx-auto">
                    {/* <nav className="items-center hidden md:block">
                        <NavbarList onClose={onClose} />
                    </nav> */}
                    <div className="items-center hidden lg:block fixed top-0 z-40 w-full">
                        <NavbarDock onClose={onClose} />
                    </div>
                    <Button variant={"outline"} title="Menu" className="block md:hidden" onClick={showDrawer}>
                        <MenuOutlined />
                    </Button>
                    <Drawer className="block lg:hidden" title="Menu" closable={{ 'aria-label': 'Close Button' }} onClose={onClose} open={open} width={"80%"} >
                        <nav className="items-center block md:hidden">
                            <NavbarList onClose={onClose} />
                        </nav>
                    </Drawer>
                </div>
            </div>
        </main>
    </>
}

export default Navbar