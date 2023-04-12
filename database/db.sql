---to use the database
Use projectd;

CREATE TABLE productos(
    id_producto INT(7) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    precio DECIMAL(30) NOT NULL,
    estado INT(1) NOT NULL,
    imagen VARCHAR(2083) NOT NULL
);

--to show all tables 
SHOW tables;

--describe the table  
describe productos;