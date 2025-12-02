// conexão com o mongoose cloud free via key co arquivo .env

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB conectado!")) // conexão ok!
    .catch(err => console.error("Erro ao conectar no mongoDB: ", err)) //Conexão com erro 

const express = require('express');
const app = express();

app.use(express.json()) ; 

// localhost/ping para verificar a saida do pong
app.get('/ping', (req, res) => {
    res.send('pong');

});

app.listen(3000, () => console.log("Porta 3000 rodando!"));
console.log("MONGO_URI:", process.env.MONGO_URI);

// listando a porta 3000 com a mensagen

const Order = require('./models/order');


// endpoint post, enviar informações com metodo post com dados do pedido
app.post('/order', async (req, res) => {
    try{
        const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

        const mappedOrder = {
            orderId: numeroPedido,
            value: valorTotal,
            creationDate: new Date(dataCriacao),
            items: items.map(item => ({
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            }))
        };
        const newOrder = await Order.create(mappedOrder); // erro de resposta ok, porem sem sucesso
        res.status(201).json(newOrder);
    }   catch (error){
        res.status(500).json({ error: error.message }); // erro interno do servidor 500 
    }

});

// endpoint get, para buscar a informação e tratando catch e codigo 404 e 500
app.get('/order/:id', async (req, res) => {
    try {
        const order  = await Order.findOne({ orderId: req.params.id });
        if (!order){
            return res.status(404).json({ error: "Pedido não existe!"}); // http codigo 404 para algo que nao existe
        }
        res.json(order);
    }  catch (error){ // capturando e tratando o erro
        res.status(500).json({ error: error.message}) // erro interno do servidor
    }
});

// listar todos os pedidos com get
app.get('/order', async (req, res) => {
  try {
    const orders = await Order.find(); // metodo .find para procurar com metodo async e params req e res
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message }); // erro interno do servidor
  }
});

// atualizar o pedido com base no ID utilizando metodo PUT
app.put('/order/:id', async (req, res) => {
  try {
    const updateOrder = await Order.findOneAndUpdate(
      { orderId: req.params.id }, // busca pelo orderId
      req.body,                   
      { new: true }               // retorna o documento atualizado
    );

    if (!updateOrder) {
      return res.status(404).json({ error: "Pedido não existe!" });
    }

    res.json(updateOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// deletar pedido por ID
app.delete('/order/:id', async (req, res) => {
    try{
        const deletedOrder = await Order.findOneAndDelete({ orderId: req.params.id })
        if (!deletedOrder){
            return res.status(404).json({ error: "Pedido não encontrado"});
        }
        res.json({message: "Pedido deletado com sucesso!"});
    }   catch (error){
        res.status(500).json({ error: error.message});
    }
});