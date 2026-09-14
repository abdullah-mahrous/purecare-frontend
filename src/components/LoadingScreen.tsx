type LoadingScreenProps = {
    isExiting?: boolean;
};

const LoadingScreen = ({ isExiting = false }: LoadingScreenProps) => {
    return (
        <div
            aria-label="Loading"
            aria-live="polite"
            className={`fixed top-0 z-100 h-screen w-screen bg-white transition-opacity duration-[400ms] ease-out ${isExiting ? "pointer-events-none opacity-0" : "opacity-100"}`}
        >
            <div className="flex items-center justify-center w-full h-full">
                {/* loading animation */}
                <section>
                    <div className="container">
                        <div className="content">
                            <div className="heart-rate">
                                <svg
                                    xmlSpace="preserve"
                                    viewBox="0 0 150 73"
                                    height="73px"
                                    width="150px"
                                    y="0px"
                                    x="0px"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    xmlns="http://www.w3.org/2000/svg"
                                    version="1.0"
                                >
                                    <polyline
                                        points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,
                        63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                                        stroke-miterlimit="10"
                                        stroke-width="4"
                                        stroke="#0B4A85"
                                        fill="none"
                                    ></polyline>
                                </svg>

                                <div className="fade-in"></div>

                                <div className="fade-out"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default LoadingScreen;