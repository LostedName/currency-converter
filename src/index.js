import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './redux/store';
import {BrowserRouter} from 'react-router-dom'
import { fetchRates } from './asyncAction/newRates';
const rerenderDOM = (store)=>{
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
      <App store={store}/>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

rerenderDOM(store);
store.subscribe(()=>{rerenderDOM(store)});

store.dispatch(fetchRates(store.getState().currencies));

