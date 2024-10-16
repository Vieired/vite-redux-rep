import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Learn from './pages/Learn'
import { Provider } from 'react-redux';
import store from './store';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Projeto</h1>
      <Provider store={store}>
        <Learn />
      </Provider>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
    </>
  )
}

export default App
