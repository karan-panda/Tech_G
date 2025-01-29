import React, { useEffect } from "react";

const EmbedWidget = () => {
  useEffect(() => {
    // Load the script dynamically on component mount
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.async = true;
    document.body.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[500px] p-1 rounded-xl"
      style={{ background: "linear-gradient(45deg, #0077b5, #004182)" }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden bg-white">
        {/* Elfsight widget */}
        <div
          className="elfsight-app-0db18323-3031-49fc-9111-5886bdb842a0"
          data-elfsight-app-lazy
        />
      </div>
    </div>
  );
};

export default EmbedWidget;
