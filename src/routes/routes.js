var express = require('express');
var router = express.Router();

const path = require('path');
router.get('public', express.static(path.join(__dirname, 'public')));

//Ir al la pantalla de inicio de la aplicación
/*router.get('/', (req, res) => {
    res.render('index');
});*/

//Pantalla sobre la app
router.get('/about', (req, res) => {
    res.render('about');
});


module.exports = router;
