
import { useState } from 'react';
import './App.css'

const App = () => {

  const [message, setMessage] = useState('')
  const [response, setResponse] = useState('')


  const handleSubmit = (event) => {
      event.preventDefault()
      fetch('http://localhost:3001', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message}),
      })
        .then((res) => res.json())
        .then((data) => setResponse(data.message))
  }

  const onSetMessage = (event) => {
    const value = event.target.value
    setMessage(value)
  }
  return(
    <div className='App'>
      <h1>Adam ChatApp</h1>
      <form onSubmit={handleSubmit}>
        <textarea value={message} placeholder='Ask Adam anything...' onChange={onSetMessage}></textarea>
        <button type='Submit'>Submit</button>
      </form>
      {response && <div><b>Adam:</b> {response}</div>}
    </div>
  );
}

export default App
