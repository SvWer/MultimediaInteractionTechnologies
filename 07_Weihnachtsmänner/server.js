/* 
 *    einen Artikel als HTML Text lesen: GET
 *    einen Artikel als latex Dokument erhalten: GET
 *    eine bestimmte Seite als reinen Text zu erhalten: GET
 *    den Abstract ändern PUT
 *    einen neuen Artikel anlegen: POST
 */

var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var methodOverride = require('express-method-override');
var mysql = require('mysql');
var cors = require('cors');
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
        });
connection.connect();
        
		
var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200
}
        
        
        
var urlencodedParser = bodyParser.urlencoded({extended: false});
app.get('/listpresents', function (req, res) {

    var ausgabe = "";
    ausgabe = ausgabe.concat("<h1>Alle Geschenke</h1>");
    ausgabe = ausgabe.concat("<table border='1px solid black'><tr><th>ID</th><th>Childsname</th><th>Age</th><th>Present</th></tr>");
    connection.query('SELECT * FROM multintertech.wunschliste', function(err, rows, fields) {
    if (err) throw err;
            //console.log('The solution is: ', rows[1].title);
        for (var i = 0; i < rows.length; i++)
        {
            ausgabe = ausgabe.concat("<tr><td>" + (i+1) + "</td>");
            ausgabe = ausgabe.concat("<td>" + rows[i].childsname + "</td>");
            ausgabe = ausgabe.concat("<td> " + rows[i].age + "</td>");
            ausgabe = ausgabe.concat("<td>" + rows[i].present + "</td></tr>");
        }
    ausgabe = ausgabe.concat("</table>");
    res.end(ausgabe);
    });
});
                
                
                
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
});



app.post('/addpresent', urlencodedParser, function (req, res) {
    console.log('add article');
	console.log(req.body);
    var statement="insert into multintertech.wunschliste (Weihnachtsmann, childsname, age, present) Values ('"+req.body.santa+"','"+req.body.name+"','"+req.body.age+"','"+req.body.present+"')";
    connection.query(statement, function(err, result) {
        if (err) throw err;
        res.end('1 Zeile hinzugefuegt');
		//res.sendfile('./index.html');
    });
});


//app.use(methodOverride('_method'));
app.get('/showpresent', urlencodedParser, cors(corsOptions), function (req, res) {
    console.log('show article');
	console.log(req.query.aid);
	var statement ="SELECT * FROM multintertech.wunschliste where Weihnachtsmann = "+req.query.aid;
    connection.query(statement, function(err, rows, fields){
        if (err) throw err;
        /*var ausgabe = "";
		ausgabe = ausgabe.concat("<h1>Alle Geschenke</h1>");
		ausgabe = ausgabe.concat("<table border='1px solid black'><tr><th>ID</th><th>Childsname</th><th>Age</th><th>Present</th></tr>");
		console.log(rows);
        for (var i = 0; i < rows.length; i++)
        {
            ausgabe = ausgabe.concat("<tr><td>" + (i+1) + "</td>");
            ausgabe = ausgabe.concat("<td>" + rows[i].childsname + "</td>");
            ausgabe = ausgabe.concat("<td> " + rows[i].age + "</td>");
            ausgabe = ausgabe.concat("<td>" + rows[i].present + "</td></tr>");
        }
		ausgabe = ausgabe.concat("</table>");*/
        //res.end(ausgabe);
		console.log(JSON.stringify(rows));
		res.writeHead(200, {"Content-Type": "application/json"});
		res.end(JSON.stringify(rows));
    });
});