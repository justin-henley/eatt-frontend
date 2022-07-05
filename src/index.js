// Libraries
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// Custom components
import App from './App';
import Home from './Home';
import Dishes from './Dishes/Dishes';
import Dish from '../pages/dishes/[dishId]';
import DishSearch from '../pages/dishes/search';
import NewDishForm from '../pages/dishes/new';
import AllDishes from '../pages/dishes';
import Menus from './Menus/Menus';
import Menu from './Menus/Menu';
import SearchMenus from './Menus/SearchMenus';
import NewMenu from './Menus/NewMenu';
import AllMenus from './Menus/AllMenus';
import NotFound from './NotFound';
// CSS
import './index.css'; // Global styles, including variables

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          <Route path="menus" element={<Menus />}>
            <Route path=":menuId" element={<Menu />} />
            <Route path="search" element={<SearchMenus />} />
            <Route path="new" element={<NewMenu />} />
            <Route index element={<AllMenus />} />
          </Route>
          <Route path="*" element={<NotFound message={'404 Error'} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// TODO delete after rebuilding routes

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
