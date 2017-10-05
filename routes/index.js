var express = require('express');
var router = express.Router();

var restrictedChars = "\/'+=-_|[](){},.?!@#$%^&*:;\"";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*TODO: addUser */

/*TODO: removeUser */

/*TODO: requestToken */

/*TODO: returnToken */

/*TODO: getAllForGroup */

/*TODO: addGeo */

/*TODO: removeGeo */

/*TODO: addCampingListItem*/

/*TODO: removeCampingListItem */

/*TODO: updateCampingListItem */

/*TODO: newMessage */

/*TODO: removeMessage */

/*TODO: getAllMessages */

/*TODO: getNewMessages */

module.exports = router;
