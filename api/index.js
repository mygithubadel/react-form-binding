const express = require('express');
const app = express();
const port = 4000;

/** for demostration purposes \/ */
const brandsData = [
    {'id':'1', 'name': 'BMW'},
    {'id':'2', 'name': 'Volkswagen'},
    {'id':'3', 'name': 'Mercedes-Benz'}
];

const modelsData = [
    {id: '1', name: '300 Series', brand_id: '1'},
    {id: '2', name: '500 Series', brand_id: '1'},
    {id: '3', name: '700 Series', brand_id: '1'},
    {id: '4', name: 'Golf', brand_id: '2'},
    {id: '5', name: 'Polo', brand_id: '2'},
    {id: '6', name: 'Up', brand_id: '2'},
    {id: '7', name: 'E-Class', brand_id: '3'},
    {id: '8', name: 'C-Class', brand_id: '3'},
    {id: '9', name: 'AMG', brand_id: '3'}
];
/** for demostration purposes /\ */

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/api/car/brands', (req, res) => res.send(brandsData));

app.get('/api/car/models/:brand_id', (req, res) => {
    let models = [];

    if(req.params.brand_id)
        models = modelsData.filter(model => model.brand_id === req.params.brand_id); // for demostration purposes, not needed when querying from a database
    else
        models = modelsData;

    res.send(models);
});

app.get('/api/car/models', (req, res) => {
    res.send(modelsData);
});

app.listen(port, () => console.log(`car manufacturer information API listening on port ${port}!`));