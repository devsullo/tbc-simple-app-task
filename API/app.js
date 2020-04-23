const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(fileUpload());
app.use(express.static('public'));
app.use('/uploads', express.static(__dirname + '/public'));

const clients = [
  {
    id: 15871394551248,
    name: 'ლაშა',
    surname: 'სულაბერიძე',
    sex: 'კაცი',
    personalNumber: 60001138452,
    phone: '598-34-56-68',
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
    avatar: '',
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
  const removeIndex = clients.findIndex(c => c.id === clientId);

  if (removeIndex >= 0) {
    clients.splice(removeIndex, 1);
    res.send({ id: clientId });
    return;
  }

  res.status(404).send('Client not found');
});

// Add account
app.post('/account', (req, res) => {
  const clientId = Number(req.body.clientId);

  if(clients.find(c => c.id === clientId)){
    const account = setUniqueNumber(req.body);
    account.status = 'აქტიური';
    accounts.push(account);
    res.send(account);
    return;
  }

  res.status(404).send('Client not found');
});

// Close account
app.put('/account/close/:id', (req, res) => {
  const accountId = Number(req.params.id);
  const account = accounts.find(a => a.id === accountId);

  if (account) {
    account.status = 'დახურული';
    res.send(account);
    return;
  }

  res.status(404).send('Account not found');
});

// Image upload
app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded');
  }

  const avatar = req.files.avatar;
  avatar.mv('public/uploads/' + avatar.name , function (err) {
    if (err)
      return res.status(500).send(err);

    res.send({ fileName: avatar.name});
  });
});

app.listen(3000, () => console.log('API started at http://localhost:3000/'));