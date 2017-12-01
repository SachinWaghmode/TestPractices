var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['34.209.12.224'], keyspace: 'doordash'});
client.connect(function(err,result){
  console.log('cassandra connected')
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.route("/cassandra")
.get(function(req, res) 
{
    console.log('in get')
       var q = "SELECT * FROM user_doordash"; 
        client.execute(q, function (err, result) {

            //Select order
            if (!err){
                console.log('******resulr=',result.rows.length);
                if ( result.rows.length > 0 ) {
                    var user = result.rows[0];
                    console.log("userid", user.userid);
                    res.send(result.rows);
                } else {
                    console.log("No results");
                }
            }
        });
});

router.route("/cassandra/:userid")
.get(function(req, res) 
{
    var userid = req.params.userid;
    
        client.execute("SELECT * FROM user_doordash WHERE userid = ? ",[userid], function (err, result) {

            //Select order
            if (!err){
                console.log('******resulr=',result.rows.length);
                if ( result.rows.length > 0 ) {
                    var user = result.rows[0];
                    console.log("userid", user.userid);
                    res.send(result.rows);
                } else {
                    console.log("No results");
                }
            }
      
        });
});

router.route("/cassandra1")
.get(function(req, res) 
{
    console.log('in cassandra');
    //var timestamp1 = toTimestamp(now());
    //console.log('value: ',timestamp1);
    client.execute("insert into user_doordash (userid, restaurant_id, order_id , order_item, order_quantity, order_price, order_date_time) values(?,?,?,?,?,?,?)", ['Rupesh','Starbucks002',112,'Pizza',1,10,"toTimestamp(now())"], function (err, result) {
        if (!err){
            
                console.log("Successful insert into doordash");
            } else {
                console.log("Unsuccessful...Error");
            }
        });
});


router.route("/cassandra/keyspace")
.get(function(req, res) 
{
    console.log('in get')

        client.execute("use doordash", function (err, result) {

            //Select order
            if (!err){
                console.log('******resulr=');
                
                }

        });
});

module.exports = router;
