const { v4 } = require('uuid');
const { Router } = require('express');
const fs = require('fs');

const pathToThings = './services/things.json';

const api = Router();

api.get('/', (req, res) => {
  fs.readFile(pathToThings, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    res.send(data);
  });
})

api.post('/', (req, res) => {
  console.log(req.body, req.body.name);
  if (!req.body || !req.body.name) {
    res.status(400).send('field name is required');
  }

  fs.readFile(pathToThings, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    const objectFromRequest = {
      ...req.body,
      id: v4()
    };
    const dataObject = JSON.parse(data);
    dataObject.push(objectFromRequest);

    fs.writeFile(pathToThings, JSON.stringify(dataObject), 'utf8', (err) => {
      if (err) {
        throw err;
      }

      res.json(objectFromRequest);
    })
  });
});

api.put('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(pathToThings, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    const thingIndex = jsonData.findIndex(item => item.id === id);

    if (thingIndex === -1) {
      res.send('Thing is not exist');
    } else {
      const updatedObject = Object.assign(jsonData[thingIndex], req.body, { id });
      jsonData[thingIndex] = updatedObject;


      fs.writeFile(pathToThings, JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          throw err;
        }

        res.status(201).json(updatedObject);
      })
    }
  });
});

api.delete('/:id', (req, res) => {
  const { id } = req.params;

  fs.readFile(pathToThings, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    const jsonData = JSON.parse(data);
    const thingIndex = jsonData.findIndex(item => item.id === id);

    if (thingIndex === -1) {
      res.send('Thing is not exist');
    } else {

      jsonData.splice([thingIndex], 1);

      fs.writeFile(pathToThings, JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          throw err;
        }

        res.status(200).json(thingIndex);
      })
    }
  });
});

module.exports = api;
