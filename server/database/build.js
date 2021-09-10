const fs = require('fs');
const path = require('path');
const connection = require('./connection');

const buildDB = () => {
  const filepath = path.join(__dirname, 'build.sql');
  const sql = fs.readFileSync(filepath).toString();
  return connection.query(sql);
};

module.exports = buildDB;
