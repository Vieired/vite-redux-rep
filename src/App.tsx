import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { RootState } from './store';
import { decrement, increment } from './store/Stock.store';
// import Learn from './pages/Learn'
// import videoRep from './store';
// import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const stock = useSelector((state: RootState) => state.stock);
  const [count, setCount] = useState(0)

  return (
    <Provider store={store}>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Projeto</h1>
      {/* <Learn /> */}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <br />
      <br />

      <p>{stock.counter}</p>
      <button
          type="button"
          onClick={() => dispatch(increment())}>+</button>
      <button
          type="button"
          onClick={() => dispatch(decrement())}>-</button>      
    </Provider>
  )
}

export default App
