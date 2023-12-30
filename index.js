var i = 0;
while (i < 6) {
  console.log(i, '< 6');
  i++;
}
console.log(i, '== 6');

function countTo(number) {
  for (var j = 0; j <= number; j++) {
    console.log(j);
  }
}

(number => {
  for (var j = 0; j <= number; j++) {
    console.log(j);
  }
})(10);

const fs = require('fs');

fs.readFile('data.txt', {encoding: 'utf8'}, (err, file) => {
  console.log(file);
});

var a = ['ahmed', 'mohamed', 'islam'];
console.log([1, 2, 3].slice(1, 3));
console.log([3, 2, 1].join('||'));
console.log(a.sort());
console.log(a);

var a = 'age';
console.log({name: 'ahmed', age: 25}.name);
var person = {name: 'ahmed', age: 25};
console.log(person['age']);
console.log(person['salary']);
person['salary'] = 26000;
console.log(person['salary']);
console.log(Object.keys(person));
var keys = Object.keys(person);
for (var i = 0; i < keys.length; i++)
  console.log(keys[i], ':', person[keys[i]]);

const express = require('express');

const server = express();

server.listen(3000, () => {
  console.log('server is listening on 3000');
});

server.get('/', (req, res) => {
  console.log(req.path);
  res.sendFile('/home/o/Desktop/node-first/index.html');
});

server.get('/employees', (req, res) => {
  fs.readFile('employees.json', {encoding: 'utf-8'}, (err, file) => {
    const employees = JSON.parse(file);
    res.contentType('application/json');
    res.send(employees);
  });
});

server.get('/employee', (req, res) => {
  fs.readFile('employees.json', {encoding: 'utf-8'}, (err, file) => {
    const employees = JSON.parse(file);
    for (var i = 0; i < employees.length; i++)
      if (req.query.id == employees[i].id) {
        res.send(employees[i]);
        return;
      }

    res.sendStatus(404);
  });
});

server.use(express.urlencoded({extended: true}));

server.post('/employees', (req, res) => {
  fs.readFile('employees.json', {encoding: 'utf-8'}, (err, file) => {
    const employees = JSON.parse(file);
    req.body.id = employees.length + 1;
    employees.push(req.body);
    fs.writeFile(
      'employees.json',
      JSON.stringify(employees),
      {encoding: 'utf-8'},
      err => {
        if (err) {
          console.log(err);
          res.sendStatus(404);
          return;
        }
        res.sendStatus(200);
      },
    );
  });
});
