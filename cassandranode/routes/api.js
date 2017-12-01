var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');
var async = require('async');
var client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'doordash'});

router.route("/cassandra")
.get(function(req, res) 
{
    console.log("In cassandra");
    /*client.execute("insert into user_doordash (user_id, restaurant_id, order_id int, order_item, order_quantity, order_price, order_date_time) values(?,?,?,?,?,?), ['Sachin','Starbucks001',111,'Pizza',1,10,2017-11-17 13:30:54.234]", function (err, result) {
        if (!err){
            
                console.log("Successful insert into doordash");
            } else {
                console.log("Unsuccessful...Error");
            }
        })
        console.log("In---cassandra");*/
        // 
        //callback(err, null);*/
        //res.send('Success');
        console.log('client=',client);
        client.execute("SELECT user_id FROM user_doordash WHERE lastname='Jones'", function (err, result) {
            if (!err){
                console.log('resulr=',result.rows.length);
                if ( result.rows.length > 0 ) {
                    var user = result.rows[0];
                    console.log("name = %s, age = %d", user.user_id);
                } else {
                    console.log("No results");
                }
            }
      
            // Run next function in series
            //callback(err, null);
        });
});

    module.exports = router;