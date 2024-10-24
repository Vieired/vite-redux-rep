import reactLogo from './assets/react.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';
import { decrement, increment } from './store/Stock.store';
import Learn from './pages/Learn'
// import videoRep from './store';
// import { useDispatch, useSelector } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const stock = useSelector((state: RootState) => state.stock);
  // const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Projeto</h1>
      <Learn />
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}

      <br />
      <br />

      <p>{stock.counter}</p>
      <button
          type="button"
          onClick={() => dispatch(decrement())}>-</button>
      <button
          type="button"
          onClick={() => dispatch(increment())}>+</button>

      <br />
      
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget massa lacinia, eleifend dolor et, facilisis dolor. Integer facilisis facilisis malesuada. Vestibulum nec quam dignissim, pretium ipsum vel, porta turpis. Proin id tristique augue. Aliquam erat volutpat. Aenean eleifend, ipsum id interdum sodales, felis massa condimentum ipsum, non sagittis enim massa consectetur lectus. Phasellus sit amet lorem bibendum, porttitor risus nec, tincidunt eros. Aliquam aliquet dui at nisi suscipit, lacinia feugiat arcu tincidunt.
        Sed sit amet risus tellus. Maecenas eget mauris bibendum, ornare quam sit amet, laoreet nibh. Cras nec justo pulvinar, tempor dui et, scelerisque nisi. Suspendisse a pharetra sapien. Nullam et nisi tortor. Aenean egestas sem libero, in volutpat purus vulputate et. Sed pellentesque arcu blandit sapien auctor, ullamcorper fermentum elit accumsan. Aliquam semper sagittis erat sed venenatis. Etiam quam arcu, efficitur sit amet dui sit amet, sollicitudin porta nulla. Proin tincidunt velit et ipsum sodales, non mattis purus fermentum. Maecenas condimentum ex felis, quis molestie nulla facilisis pretium. Quisque vel elit at nibh aliquam maximus. Morbi ultrices mi ut diam iaculis, imperdiet sodales purus tristique.
      </p>
    </>
  )
}

export default App
