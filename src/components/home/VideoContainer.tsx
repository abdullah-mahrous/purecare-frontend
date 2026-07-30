interface VideoContainerProps {
  source?: string;
  bubbles?: boolean;
  poster?: string;
}

function VideoContainer({
  source = "/src/assets/introduction.mp4",
  bubbles = true,
  poster
}: VideoContainerProps) {
  
  const bubbleConfig = [
    // Top-right corner bubbles
    { style: "top-[20px] right-[-14px] z-[-1] size-6", color: "#0B4A85", delay: 0, duration: 5 },
    { style: "top-[-4px] right-5 size-3 z-1", color: "#2DBE73", delay: 0.4, duration: 5.5 },
    { style: "top-[-20px] right-10 size-4 opacity-80", color: "#FBBF24", delay: 0.8, duration: 6 },
    // Bottom-left corner bubbles
    { style: "bottom-8 left-[-12px] size-6", color: "#2DBE73", delay: 0.2, duration: 5 },
    { style: "bottom-18 left-[-10px] size-2 opacity-90", color: "#E53935", delay: 1, duration: 5.5 },
    { style: "bottom-[-20px] left-4 size-4 z-[-1]", color: "#FBBF24", delay: 0.6, duration: 6 },
  ];

  return (
    <>
      <div className="relative w-full">
        {/* Floating bubbles */}
        {bubbles && bubbleConfig.map((bubble, index) => (
          <div
            key={index}
            className={`video-bubble absolute rounded-full ${bubble.style}`}
            style={{
              backgroundColor: bubble.color,
              animation: `buble-float ${bubble.duration}s ease-in-out infinite`,
              animationDelay: `${bubble.delay}s`
            }}
          />
        ))}

        {/* Video Container */}
            <div className="aspect-video">
              <video
                controls
                preload="metadata"
                className="w-full h-full rounded-3xl"
                poster={poster}
              >
                <source src={source} type="video/mp4" />
                <source src={source.replace(".mp4", ".webm")} type="video/webm" />
                <source src={source.replace(".mp4", ".ogv")} type="video/ogg" />
                <p>Your browser does not support HTML5 video.</p>
              </video>
            </div>
      </div>
    </>
  );
}

export default VideoContainer;
