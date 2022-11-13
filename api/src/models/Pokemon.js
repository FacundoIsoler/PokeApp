const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life: {
      type: DataTypes.INTEGER,
    },
    attack: {
      type: DataTypes.INTEGER,
    },
    defence: {
      type: DataTypes.INTEGER,
    },
    speed: {
      type: DataTypes.INTEGER,
    },
    height:{
      type: DataTypes.FLOAT,  
    },
    weight: {
      type: DataTypes.FLOAT,
    },
    img:{
      type: DataTypes.TEXT,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFn6bP6QWEoW0gr0L-Bmj-XxojojyezXIiNQ&usqp=CAU'
    },
  });
  
};
