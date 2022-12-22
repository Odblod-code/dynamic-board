import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';


export const Hello: React.FC = () => {
  return (<h1>¡¡Hola Mundo!!</h1>)
}

const elementRef = document.getElementById("root");

if(elementRef) {
    const root = ReactDOM.createRoot(elementRef);
    root.render(<Hello/>);
}