var express = require('express');
var router = express.Router();
var babylonjsSearch = require('../babylonjs-search');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});

router.get('/api/search', function(req, res, next) {
	console.log(req.query);
	//?q=Box&page=2&max=25&bf=all
	var promise = babylonjsSearch.search(req.query.searchTerm);
	promise.then(function(parsedBody) {
			console.log(parsedBody);
			res.json(parsedBody);
		})
		.catch(function(err) {
			res.json({err: err});
		});

});


module.exports = router;