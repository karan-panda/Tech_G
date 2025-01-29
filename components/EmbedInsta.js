import React from 'react';

const EmbedWidget = () => {
  return (
    <div style={{ width: '100%', height: '600px', border: 'none' }}>
      <iframe 
        src="https://widget.taggbox.com/2150420" 
        style={{ width: '100%', height: '100%', border: 'none' }} 
        title="Taggbox Widget"
      />
    </div>
  );
}

export default EmbedWidget;
