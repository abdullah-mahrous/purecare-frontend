import { useAppSelector } from "../../app/hooks";

import Logo from "../Logo";
import MobileMenuBtn from "./MobileMenuBtn";
import MobileDrawer from "./MobileDrawer";
import PhoneIcon from "../../assets/icons/PhoneIcon";

const NavBar = () => {
    const phoneNumber = useAppSelector((state) => state.websiteGeneralData.phoneNumber);
    
    return (
        <>
        <nav className="py-3 px-4 navbar block bg-white">
            <ul className="flex justify-between items-center list-none w-full">
                <li>
                    <Logo />
                </li>

                {/* Mobile nav Button */}
                <li className="flex items-center sm:hidden">
                    <div className="flex justify-center items-center bg-[#dfeeff] border border-base-border rounded-full size-10 mr-3" onClick={() => window.location.href=`tel:${phoneNumber}`}>
                        <PhoneIcon className="size-6 text-primary"/>
                    </div>
                    
                    <MobileMenuBtn />
                </li>
            </ul>
        </nav>

        <MobileDrawer />
        </>
    )
}

export default NavBar;