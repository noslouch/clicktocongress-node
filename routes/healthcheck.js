var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(204).send({});
});

module.exports = router;
