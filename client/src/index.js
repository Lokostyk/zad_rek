import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import axios from 'axios';
axios.defaults.baseURL = "https://zad-rek-lokostyk.vercel.app/"

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);