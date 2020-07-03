const express = require('express');
const router = express.Router();


const mysqlConnection = require('../connection');


router.post('/create', (req, res) => {
    const {id, user, name, password} = req.body;
    mysqlConnection.query('INSERT INTO account VALUES (?,?,?,?)', [id,user, name, password], (err, rows, fields) => {
      if(!err) {
        res.json({status: 'Register Success'});
      } else {
        res.json(err);
      }
    });
});

router.post('/login', (req, res) => {
  const { id, user, password } = req.body;
  mysqlConnection.query('SELECT * FROM account WHERE id = ?', [id], (err, result, fields) => {
    if (!err) {
      pass = result[0].password;
        if (pass == password) {

          mysqlConnection.query('UPDATE session SET flag=1 WHERE user=?', [user], (err, result, fields) => {
            if (!err) {
              res.json({ status: 'Correct Login' });
            } else {
              res.json(err);
            }
          });
        }
        else {
          res.json({ status: 'Error' });
        }
    }
  });
});

router.put('/edit', (req, res) => {
  const { id, user, name, password } = req.body;
    mysqlConnection.query('UPDATE account SET user=?, name=?, password=? WHERE id =?', [user, name, password, id], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'account updated' });
      } else {
        res.json(err);
      }
    });
})

router.patch('/change', (req, res) => {
  const { id, password } = req.body;
    mysqlConnection.query('UPDATE account SET password=? WHERE id =?', [password, id], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'password updated' });
      } else {
        res.json(err);
      }
    });
})

router.delete('/close', (req, res) => {
  const {user} = req.body;

  mysqlConnection.query('UPDATE session SET flag=0 WHERE user=?', [user],(err, rows, fields) =>{
    if(!err){
      res.json({status: 'closed session'});

    }else{
      res.json({status: 'unexpected error'});
    }
  });
});


module.exports = router;
