import React, { useState } from 'react';
import './styles.css'; // Don't forget to import Jennie's styles!
import axios from 'axios';

const DocumentEditor = () => {
  const [title, setTitle] = useState('My Lovely Document ✨');
  const [content, setContent] = useState('');

  const handleSave = async () => {
    try {
      // Sending your lovely notes to the backend! 💌
      const response = await axios.post("http://localhost:8080/api/v1/documents/create", { title, content },
        {
            withCredentials: true,
        }
      );
      
      console.log("Yay! Saved successfully:", response.data);
      
      // Jennie's magic touch to refresh the page! ✨
      window.location.reload();

    } catch (error) {
      // Just in case something goes a little wrong!
      console.error("Oh no! Something went wrong saving your beautiful document:", error);
      alert("Oopsie! Couldn't save the document. 🥺");
    }
  };

  return (
    <div className="editor-wrapper notebook-paper">
      
      <div className="editor-header">
        <input 
          type="text" 
          className="title-input" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your document a cute title..."
        />
        <button className="save-btn" onClick={handleSave}>
          Save ✨
        </button>
      </div>
      
      <div className="paper-canvas">
        <textarea 
          className="text-area" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your sweet thoughts here..."
          spellCheck="false"
        />
      </div>

    </div>
  );
};

export default DocumentEditor;