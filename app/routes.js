// app/routes.js


module.exports = function(app) {

    // -------------------------------------------
    // -------- Start loading index.html  --------
    // -------------------------------------------    
    // loading index html 
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html'); 
    });
};