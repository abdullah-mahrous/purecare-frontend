import { useAppSelector } from "../../app/hooks";

import Logo from "../Logo";
import DesktopNavbar from "./DesktopNavbar";
import MobileMenuBtn from "./MobileMenuBtn";
import MobileDrawer from "./MobileDrawer";
import PhoneIcon from "../../assets/icons/PhoneIcon";

const NavBar = () => {
    const phoneNumber = useAppSelector((state) => state.websiteGeneralData.phoneNumber);

    return (
        <>
            <nav className="navbar block bg-white">
                <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <div>
                        <Logo />
                    </div>

                    <DesktopNavbar />

                    {/* Mobile nav buttons */}
                    <div className="flex items-center md:hidden gap-3">
                        <div className="flex justify-center items-center bg-[#dfeeff] border border-base-border rounded-full size-10" onClick={() => window.location.href = `tel:${phoneNumber}`}>
                            <PhoneIcon className="size-6 text-primary" />
                        </div>

                        <MobileMenuBtn />
                    </div>
                </div>
            </nav>

            <MobileDrawer />
        </>
    )
}

export default NavBar;