import React, { useEffect } from "react";

const EmbedWidget = () => {
  useEffect(() => {
    // Dynamically load the Elfsight script
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className="relative w-full h-[500px] p-1 rounded-xl"
      style={{
        background: "linear-gradient(45deg, #f58529, #dd2a7b, #8134af, #515bd4)",
        overflow: "hidden", // Ensure no overflow from the widget
        maxWidth: "100%",    // Prevent exceeding container width
        maxHeight: "100%",   // Prevent exceeding container height
      }}
    >
      <div
        className="w-full h-full rounded-xl overflow-hidden bg-white"
        style={{
          maxWidth: "100%",    // Prevent overflow horizontally
          maxHeight: "100%",   // Prevent overflow vertically
        }}
      >
        {/* Elfsight Widget */}
        <div
          className="elfsight-app-c0a59db1-a8d3-4aab-91de-855cab0e4f0b"
          data-elfsight-app-lazy
          style={{
            width: "100%",    // Ensure it fills the container width
            height: "100%",   // Ensure it fills the container height
          }}
        />
      </div>
    </div>
  );
};

export default EmbedWidget;
