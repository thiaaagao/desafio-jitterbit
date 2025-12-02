const express = require('expresss');
const app = express;
app.use(express.JSON()) ; 

app.get('/ping', (req, res) => {
    res.send('pong');

});

app.listen(3000, () => console.log("Porta 3000 rodando!"));


