import React, { useEffect, useState } from "react";
import { Card, CardTitle, CardText, CardGroup, Row, Col, Button } from 'reactstrap';
import  SignOut  from "../../components/Header/SignOut.js";
import Footer from "../../components/Footer";
import swal from 'sweetalert';
import './Kitchen.css';

export const Kitchen = () => {
  let token = localStorage.getItem("token");
  let name = localStorage.getItem('name');

  const [pendingOrders, setPendingOrders] = useState([])
  const [preparingOrders, setPreparingOrders] = useState([])

  const toPrepareAlert = () => {
    swal({
      title: 'Bom trabalho!',
      text: 'Pedido em preparo.',
      icon: 'success',
      button: 'OK',
      timer: '3000',
    });
  }

  const toReadyAlert = () => {
    swal({
      title: 'Pedido pronto!',
      text: 'Entrega solicitada ao garçom',
      icon: 'success',
      button: 'OK',
      timer: '2000',
    });
  }
  

  const ordersList = () => {
    fetch('https://lab-api-bq.herokuapp.com/orders', {

      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
    })

      .then(response => response.json())
      .then(data => {
        const allOrders = data;
        setPendingOrders(allOrders.filter((order) => order.status.includes("pending")))
        setPreparingOrders(allOrders.filter((order) => order.status.includes("preparing")))
      })
  };

  useEffect(() => {
    ordersList();
  }, [token]);

  const handlePrepare = (order) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = order.id;
    const status = { status: 'preparing' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        ordersList();
        toPrepareAlert();
      });
    });
  };

  const handleFinish = (order) => {
    const url = 'https://lab-api-bq.herokuapp.com/orders/';
    const id = order.id;
    const status = { status: 'ready' };

    fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
      body: JSON.stringify(status),
    }).then((response) => {
      response.json().then(() => {
        ordersList();
        toReadyAlert();
      });
    });
  };

  return (
    <>
      <div>
        <>
          <SignOut />
          <h1 className="h1-kitchen">Bem vindx, {name}!</h1>
          <h1 className="h1-kitchen">Pedidos Pendentes</h1>
          {pendingOrders.map((order) => {
            const createdDate = new Date(order.createdAt).toLocaleString()
            return (
              <Row>
                <Col>
                  <CardGroup>
                    <Card body className="text-center" key={order.id}>
                      <CardTitle className="table-ready" tag="h5">Mesa: {order.table}</CardTitle>
                      <CardText>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th>Pedido nº {order.id}</th>
                              <th>Cliente: {order.client_name}</th>
                              <th>Status: {order.status.replace("pending", "Pendente")}</th>
                              <th>Criado: {createdDate}</th>
                            </tr>
                            <tr>
                              <th>Qtde</th>
                              <th>Ítem</th>
                              <th>Complemento</th>
                              <th>Adicionais</th>
                            </tr>
                            {order.Products.map((items, index) => (
                              <tr key={index}>
                                <td>{items.qtd}</td>
                                <td>{items.name}</td>
                                <td>{items.flavor}</td>
                                <td>{items.complement}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardText>
                      <Button
                        onClick={() => handlePrepare(order)}>
                        Preparar Pedido
                    </Button>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            )
          })}

          <h1 className="h1-kitchen">Pedidos em Preparo</h1>
          {preparingOrders.map((order) => {
            const createdDateString = new Date(order.createdAt).toLocaleString()
            const updatedDate = new Date(order.updatedAt).toLocaleString()
            return (
              <Row>
                <Col>
                  <CardGroup>
                    <Card body className="text-center" key={order.id}>
                      <CardTitle className="table-ready" tag="h5">Mesa: {order.table}</CardTitle>
                      <CardText>
                        <table className="table">
                          <tbody>
                            <tr>
                              <th>Pedido nº {order.id}</th>
                              <th>Cliente: {order.client_name}</th>
                              <th>Status: {order.status.replace("preparing", "Preparando")}</th>
                              <th>Criado: {createdDateString}</th>
                              <th>Atualizado: {updatedDate}</th>
                            </tr>
                            <tr>
                              <th>Qtde</th>
                              <th>Ítem</th>
                              <th>Complemento</th>
                              <th>Adicionais</th>
                            </tr>
                            {order.Products.map((items, index) => (
                              <tr key={index}>
                                <td>{items.qtd}</td>
                                <td>{items.name}</td>
                                <td>{items.flavor}</td>
                                <td>{items.complement}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </CardText>
                      <Button
                        onClick={() => handleFinish(order)}>
                        Pedido Pronto
                    </Button>
                    </Card>
                  </CardGroup>
                </Col>
              </Row>
            )
          })}

        </>
      </div>
      <Footer />
    </>
  )
};