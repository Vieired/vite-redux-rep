import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import reactLogo from './assets/react.svg'
import { ToastContainer } from 'react-toastify';
import './App.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store/stock';
// import { decrement, increment, selectStock } from './store/stockSlice';
// import Learn from './pages/Learn'
import Games from './pages/Games';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { selectUsers } from './store/usersSlice';
// import videoRep from './store';
import GlobalStyle from "./styles/global";


function App() {
  // const dispatch = useDispatch();
  // const stock = useSelector(selectStock);
  // const [count, setCount] = useState(0)

  const user = useSelector(selectUsers);

  return (
    <>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />    
      <GlobalStyle />

      {user?.currentUser ? (
        <BrowserRouter>
          <Routes>
              <Route index element={<Games/>} />
          </Routes>
        </BrowserRouter>
      ) : (
        <Login/>
      )}

      {/* <Route path="*" element={<NotFound />} /> */}

      {/* <section>
        <div>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Projeto REACT Com TypeScript, Redux e Firebase</h1>
        <Learn />
        <br />
        <br />
        <p>{stock.counter}</p>
        <div>
          <button
              type="button"
              onClick={() => dispatch(decrement())}>-</button>
          <button
              type="button"
              onClick={() => dispatch(increment())}>+</button>
        </div>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer eget massa lacinia, eleifend dolor et, facilisis dolor. Integer facilisis facilisis malesuada. Vestibulum nec quam dignissim, pretium ipsum vel, porta turpis. Proin id tristique augue. Aliquam erat volutpat. Aenean eleifend, ipsum id interdum sodales, felis massa condimentum ipsum, non sagittis enim massa consectetur lectus. Phasellus sit amet lorem bibendum, porttitor risus nec, tincidunt eros. Aliquam aliquet dui at nisi suscipit, lacinia feugiat arcu tincidunt.
          Sed sit amet risus tellus. Maecenas eget mauris bibendum, ornare quam sit amet, laoreet nibh. Cras nec justo pulvinar, tempor dui et, scelerisque nisi. Suspendisse a pharetra sapien. Nullam et nisi tortor. Aenean egestas sem libero, in volutpat purus vulputate et. Sed pellentesque arcu blandit sapien auctor, ullamcorper fermentum elit accumsan. Aliquam semper sagittis erat sed venenatis. Etiam quam arcu, efficitur sit amet dui sit amet, sollicitudin porta nulla. Proin tincidunt velit et ipsum sodales, non mattis purus fermentum. Maecenas condimentum ex felis, quis molestie nulla facilisis pretium. Quisque vel elit at nibh aliquam maximus. Morbi ultrices mi ut diam iaculis, imperdiet sodales purus tristique.
        </p>
      </section> */}
    </>
  )
}

export default App
