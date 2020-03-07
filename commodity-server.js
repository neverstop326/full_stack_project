const express = require('express');
const mongoIO = require('./io');



var bodyParser = require('body-parser') 

const app = express();
const port = process.env.PORT || 3010;

app.use(express.static('static'));  
app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json())

function GetCommoditiesApi (req, res, next) {
    function resultsCallback (err, docs) {
        if (docs) {
            res.json({'commoditiesList': docs})
        } else {
            console.log('ouch');
            console.log(err);
        }
    }
    mongoIO.readItem(resultsCallback);
}

app.get('/api/commodities', GetCommoditiesApi)

function PostCommoditiesApi (req, res, next) {
    if (req.body.add_commodity) {
        try {
            mongoIO.writeItem(req.body)
        } catch (e) {
            next(`Ouch! ${e}`);
        }
        res.redirect('/commodities.html')
    }
}

app.post('/api/commodities', PostCommoditiesApi)
app.get('/', function(req, res) {
    res.redirect('/index.html')
})


function DeleteCommoditiesApi(req, res, next) { 
    try {
        var title = req.body.title;
        console.log(`Trying to delete: ${title}`);
        mongoIO.deleteItem({title: req.body.title});
        req.body.status = 'deleted';
        console.log(`Deleted ${title}`);
        res.send(req.body);  
    } catch (e) {
        next(`Ouch! ${e}`);
    }
    
}

app.delete('/api/cassettes', DeleteCommoditiesApi)

app.listen(port, function() {console.log(`Example app listening on port ${port}!`)})
