const express = require('express');
const app = express();
const port = 9091;
////MOCK IMPORT
const queryResponse = require('./mock-data/query.json');
const queryByCountryResponse = require('./mock-data/queryByCountry.json');
const accidentYearsResponse = require('./mock-data/accidentYears.json');

app.use(express.json());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET');
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With,' +
    ' Content-Type,' +
    ' Accept,' +
    ' Authorization'
  );
  res.header('Referrer-Policy', 'http://localhost:4200');
  if (req.method === 'OPTIONS') {
    res.status(200);
  }
  next();
});

app.get('/query', (req, res) => {
  let data;
  if(req.query?.year) {
    data = JSON.stringify(queryByCountryResponse);
  } else {
    data = JSON.stringify(queryResponse);
  }
  delayResponse(req, res, data);
});
app.get('/years', (req, res) => {
  const data = JSON.stringify(accidentYearsResponse);
  // res.status(401).send('Not Authorized');
  delayResponse(req, res, data);
});

app.listen(port, () =>
  console.log(`AIP local lambda server is runnint on ${port}`)
);

const delayResponse = (req, res, data, timeout = 200) => {
  setTimeout(() => {
    res.status(200).send(data);
  }, timeout);
};
