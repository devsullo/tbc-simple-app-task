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
  }
];

const accounts = [
  {
    id: 15871394766921,
    clientId: 15871394551248,
    type: 'მიმდინარე',
    currency: ['GEL'],
    status: 'აქტიური'
  }
]

const setUniqueNumber = (obj) => {
  obj.id = Number(Date.now() + ((Math.random() * 10).toFixed()));
  return obj;
};

// Get all clients
app.get('/clients', (req, res) => {
  res.send(clients);
});

// Get client details
app.get('/client/:id', (req, res) => {
  const clientId = Number(req.params.id);
  const client = clients.find(c => c.id === Number(clientId));

  if (client) {
    const clientAccounts = accounts.filter(a => a.clientId === clientId) || [];
    const cloneClient = Object.assign({}, client);
    cloneClient.accounts = clientAccounts;
    res.send(cloneClient);
    return;
  }

  res.status(404).send('Client not found');
});

// Add client
app.post('/client', (req, res) => {
  const client = setUniqueNumber(req.body);
  clients.push(client);
  res.send(client);
});

// Edit client
app.put('/client/:id', (req, res) => {
  const clientId = Number(req.params.id);
  const newClient = req.body;
  
  clients.forEach((c, i) => {
    if (c.id === clientId) {
      Object.assign(clients[i], newClient);
      res.send(clients[i]);
      return;
    }
  })

  if (!res.headersSent) {
    res.status(404).send('Client not found');
  }
});

// Delete client
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

// Add account
app.post('/account', (req, res) => {
  const clientId = Number(req.body.clientId);

  if(clients.find(c => c.id === clientId)){
    const account = setUniqueNumber(req.body);
    accounts.push(account);
    res.send(account);
    return;
  }

  res.status(404).send('Client not found');
});

// Close account
app.post('/account/close/:id', (req, res) => {
  const accountId = Number(req.params.id);
  const account = accounts.find(a => a.id === accountId);

  if (account) {
    account.status = 'დახურული';
    res.send(account);
    return;
  }

  res.status(404).send('Account not found');
});

app.listen(3000, () => console.log('API started at http://localhost:3000/'));