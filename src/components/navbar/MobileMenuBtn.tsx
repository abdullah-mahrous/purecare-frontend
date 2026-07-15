import { useDispatch } from "react-redux";
import { openDrawer } from "../../features/navSlice";

const MobileMenuBtn = () => {
    const dispatch = useDispatch();

    return (
    <button className="flex justify-center items-center size-10 rounded-full bg-primary sm:hidden" onClick={() => dispatch(openDrawer())}>
        <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-white" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18M3 12h18M3 18h18" />
        </svg>
    </button>
    )
}

export default MobileMenuBtn;
