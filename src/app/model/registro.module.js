const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('pruebas', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql', // Especificar el dialecto aquí
  port: 3306
});

const Empresa = sequelize.define('Empresa', {
  idempresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreempresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'empresas',
  timestamps: false,
});

const DatosPersonales = sequelize.define('DatosPersonales', {
  idpersona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidop: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'datospersonales',
  timestamps: false,
});

const Proyecto = sequelize.define('Proyecto', {
  idproyecto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombreproyecto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idempresa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Empresa,
      key: 'idempresa',
    },
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idlider: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: DatosPersonales,
      key: 'idpersona',
    },
  },
  integrantesproyecto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'proyectos',
  timestamps: false,
});

Proyecto.belongsTo(Empresa, { foreignKey: 'idempresa' });
Proyecto.belongsTo(DatosPersonales, { foreignKey: 'idlider' });

module.exports = {
  Proyecto,
  Empresa,
  DatosPersonales,
  sequelize,
};