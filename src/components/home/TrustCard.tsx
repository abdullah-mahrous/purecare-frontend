import type { ReactNode } from "react";

type TrustCardProps = {
    children: ReactNode;
};

const TrustCard = ({ children }: TrustCardProps) => {
    return (
        <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white px-4 py-5 text-primary shadow-[0_8px_8px_rgba(11,74,133,0.12)] ring-1 ring-base-border/50">
            <div className="z-10 flex items-center gap-3">
                {children}
            </div>
        </div>
    );
};

export default TrustCard;
