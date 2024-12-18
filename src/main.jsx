
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App.jsx'

import {store } from './redux/store.jsx'
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);


// createRoot(document.getElementById('root')!).render(
//     <Provider store={store}>
//       <App />
//     </Provider>
  
// )
