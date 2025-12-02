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
        const newOrder = await Order.create(mappedOrder);
        res.status(201).json(newOrder);
    }   catch (error){
        res.status(500).json({ error: error.message });
    }

});