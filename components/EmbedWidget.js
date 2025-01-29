import React, { useEffect } from "react";

const EmbedWidget = () => {
  useEffect(() => {
    // Load the Elfsight script dynamically
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
      style={{
        background: "linear-gradient(45deg, #6a11cb, #2575fc, #ff512f, #dd2476)",
      }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden bg-white">
        {/* Elfsight widget */}
        <div
          className="elfsight-app-4bf8c5d2-4179-4635-b84b-8a131f017624"
          data-elfsight-app-lazy
        />
      </div>
    </div>
  );
};

export default EmbedWidget;
