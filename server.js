var express = require('express'),
    port = process.env.PORT || 8080,
    months = ["January","February","March","April","May","June","July","August",
        "September","October","November","December"],
    app = express();

function isValidDate(d) {
  if (Object.prototype.toString.call(d) !== "[object Date]")
    return false;
  return !isNaN(d.getTime());
}
    
function getTime(req,res) {
    var input = req.params.date,
        date = new Date(isNaN(input) ? input : +input),
        unix = null,
        natural = null;
    
    //Weird bug with Date where '0' returns 'January 1, 2000'
    if (input == 0) {
        res.end(JSON.stringify({ "unix": 0, "natural": "January 1, 1970" }));
    }
    
    if (isValidDate(date)) {
        unix = date.getTime();
        natural = [months[date.getMonth()],date.getDate()+',',date.getFullYear()].join(' ');
    }
    res.end(JSON.stringify({ "unix": unix, "natural": natural }));
}

app.route('/:date').get(getTime);
app.listen(port, function () {
	console.log('Node.js listening on port ' + port + '...');
});