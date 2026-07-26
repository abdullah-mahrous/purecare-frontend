import type { ReactNode } from "react";

type TrustCardProps = {
    children: ReactNode;
};

const TrustCard = ({ children }: TrustCardProps) => {
    return (
        <div className="trust-card relative overflow-hidden rounded-2xl bg-white px-4 py-5 text-primary shadow">
            <div className="relative z-10 flex items-center gap-3">
                {children}
            </div>
        </div>
    );
};

export default TrustCard;
