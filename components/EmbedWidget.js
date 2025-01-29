import React from "react";

const EmbedWidget = () => {
  return (
    <div 
      className="relative w-full h-[500px] p-1 rounded-xl"
      style={{ background: "linear-gradient(45deg, #6a11cb, #2575fc, #ff512f, #dd2476)" }}
    >
      <div className="w-full h-full rounded-xl overflow-hidden bg-white">
        <iframe
          src="https://widget.taggbox.com/2150416"
          className="w-full h-full border-none"
          title="Taggbox Widget"
        />
      </div>
    </div>
  );
};

export default EmbedWidget;
