const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const clients = [
  {
    id: 15871394551248,
    name: 'ლაშა',
    surname: 'სულაბერიძე',
    sex: 'კაცი',
    personalNumber: 60001138452,
    phone: 598345668,
    legalAddress: {
      country: 'საქართველო',
      city: 'თბილისი',
      address: 'მერაბ კოსტავას ქუჩა 4'
    },
    actualAddress: {
      country: 'საქართველო',
      city: 'ქუთაისი',
      address: 'ფარნავაზ მეფის ქუჩა'
    },
    avatar: '/',
    accountId: 15871394766921
  }
];

const accounts = [
  {
    id: 15871394766921,
    clientId: 158713945512480,
    type: 'მიმდინარე',
    currency: 'GEL',
    status: 'აქტიური'
  }
]

const setUniqueNumber = (obj) => {
  obj.id = Number(Date.now() + ((Math.random() * 10).toFixed()));
  return obj;
};

app.get('/clients', (req, res) => {
  res.send(clients);
});

app.get('/client/:id', (req, res) => {
  const clientId = Number(req.params.id);
  const client = clients.find(c => c.id === Number(clientId));

  if (client) {
    client.accounts = accounts.filter(a => a.clientId === clientId) || [];
    res.send(client);
    return;
  }

  res.status(404).send('Client not found');
});

app.post('/client/add', (req, res) => {
  const client = setUniqueNumber(req.body);
  clients.push(client);
  res.send(client);
});

app.put('/client/:id', (req, res) => {
  const clientId = Number(req.params.id);
  const newClient = req.body;
  
  clients.forEach((c, i) => {
    if (c.id === clientId) {
      clients[i] = Object.assign(clients[i], newClient);
      res.send(clients[i]);
      return;
    }
  })

  if (!res.headersSent) {
    res.status(404).send('Client not found');
  }
});

app.delete('/client/:id', (req, res) => {
  const clientId = Number(req.params.id);
  const removeIndex = clients.map((c) => { return c.id; }).indexOf(clientId);

  if (removeIndex >= 0) {
    clients.splice(removeIndex, 1);
    res.send('Client has been deleted');
    return;
  }

  res.status(404).send('Client not found');
});

app.listen(3000);