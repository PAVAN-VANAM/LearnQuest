import { useState, useEffect } from "react";

function App() {
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "http://localhost:8000/completions",
        options
      );
      const data = await response.json();
      console.log(data);
      setMessage(data.choices[0].message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="app">
        <section className="sidebar">
          <button>+ New Chat</button>
          <ul className="history"></ul>
          <nav>
            <p>Made By LearnQuest!!</p>
          </nav>
        </section>
        <section className="main">
          <div className="input">
            <input value={value} onChange={(e) => setValue(e.target.value)} />
            <button id="submit" onClick={getMessage}>
              Submit
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
