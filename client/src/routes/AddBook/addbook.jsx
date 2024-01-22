import React , { useState } from 'react'
import './addbook.css'

function addBook() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [thumbnail, setThumbnail] = useState('')
  const [text, setText] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const book = { title, description, thumbnail, text };
    const apiURL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${apiURL}/books`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(book),
    });
  
    try {
      if (!response.ok) {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message}`);
        return;
      }
  
      setTitle('');
      setDescription('');
      setThumbnail('');
      setText('');
      setMessage('Book added successfully');
    } catch (error) {
      console.error('Error while processing response:', error);
      setMessage('Something went wrong');
    }
  };

  return (
    <div className="add-book">
      <h1>Add Book</h1>
      <form className="add-book-form" onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} required onChange={e => setTitle(e.target.value)} />
        <label>Description</label>
        <textarea value={description} required onChange={e => setDescription(e.target.value)} />
        <label>Thumbnail</label>
        <input type="text" value={thumbnail} required onChange={e => setThumbnail(e.target.value)} />
        <label>Text</label>
        <textarea value={text} required onChange={e => setText(e.target.value)} />
        <button type="submit">Add Book</button>
      </form>
      <p className='message'>{message}</p>
    </div>
  )
}

export default addBook