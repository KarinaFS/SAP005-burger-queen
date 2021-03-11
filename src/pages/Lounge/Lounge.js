import React from "react";
import { useHistory } from "react-router-dom";
import  SignOut  from "../../components/Header/SignOut.js";
import Footer from '../../components/Footer.js';
import './Lounge.css'


export const Lounge = () => {
  let name = localStorage.getItem('name');
  const route = useHistory();  
  const orderRoute = () => {
    route.push('/CreateOrder')
  }
  const ReadyOrder = () => {
    route.push('/ReadyOrder')
  }

  const handleCreateOrder = (event) => {
    event.preventDefault();
    orderRoute();
  }

  const handleReadyOrder = (event) => {
    event.preventDefault();
    ReadyOrder();
  }

  return (
    <>
      <SignOut />
      <h1 className="h1-lounge">Bem-vindx, {name}!</h1>
      <div className="container">

        <div>
          <button className='createorder-btn' onClick={handleCreateOrder}>Criar Pedido</button>
          <button className='orderread-btn' onClick={handleReadyOrder}>Pedidos Prontos</button>
        </div>

      </div>
  
  <div className="footer-lounge">
  <Footer />
  </div>
    </>
  )

};
