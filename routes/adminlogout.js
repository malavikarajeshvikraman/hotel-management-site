var express = require('express');
var router = express.Router();
router.get('/adminlogout', function(req, res) {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;