const { DataTypes } = require('sequelize');

// Exportamos una función que define el modelo
// Luego le inyectamos la conexión a sequelize.
module.exports = (sequelize) => {
  // Defino el modelo
  sequelize.define(
    'videogame',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        // Validación de la cantidad de caracteres
        validate: {
          len: [0, 50],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [10, 2000],
        },
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        validate: {
          hasAtLeastOneElement: function (value) {
            if (!Array.isArray(value) || value.length < 1) {
              throw new Error('The videogame must have at least 1 platform.');
            }
          }
        }
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      released: {
        type: DataTypes.DATEONLY, // Solo fecha, sin marca de tiempo
        allowNull: false,
        validate: {
          isDate: true,
          correctFormat(value) {
            // Expresión regular para verificar el formato YYYY-MM-DD
            const regex = /^\d{4}-\d{2}-\d{2}$/;
            if (!regex.test(value)) {
              // Test se usa para verificar si la fecha value coincide con el patrón de expresión regular.
              // Si no coincide, lanza el error
              throw new Error('The date format must be YYYY-MM-DD');
            }
          },
        },
      },
      rating: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          isDecimal: true,
          min: 1,
          max: 5,
        },
      },
      createdInDB: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      timestamps: false, // Quito las columnas de fecha y hora
    }
  );
};