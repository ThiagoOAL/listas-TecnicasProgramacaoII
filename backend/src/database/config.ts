
import { Sequelize } from 'sequelize';



const db = new Sequelize("BDAtlantis", "root", "thiago123", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
});



export default db;