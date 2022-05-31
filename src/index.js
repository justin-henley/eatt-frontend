// Outside components
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// Custom components
import App from './App';
import Home from './Home';
import Dishes from './Dishes/Dishes';
import Dish from './Dishes/Dish';
import SearchDishes from './Dishes/SearchDishes';
import NewDishForm from './Dishes/NewDishForm';
import AllDishes from './Dishes/AllDishes';
import Menus from './Menus/Menus';
import Menu from './Menus/Menu';
import SearchMenus from './Menus/SearchMenus';
import NewMenuForm from './Menus/NewMenuForm';
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
          <Route path="dishes" element={<Dishes />}>
            <Route path=":dishId" element={<Dish />} />
            <Route path="search" element={<SearchDishes />} />
            <Route path="new" element={<NewDishForm />} />
            <Route index element={<AllDishes />} />
          </Route>
          <Route path="menus" element={<Menus />}>
            <Route path=":menuId" element={<Menu />} />
            <Route path="search" element={<SearchMenus />} />
            <Route path="new" element={<NewMenuForm />} />
            <Route index element={<AllMenus />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
