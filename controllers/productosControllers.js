const { render } = require("ejs");

const controller= {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM productos', (err, productos) => {
            if (err){
                res.json(err);
            }
            else{
                console.log(productos);
                res.render('productos', {
                    data: productos
                });
            }
        });
    });
};

module.exports = controller;