/* ORM操作数据库 */
const { Sequelize , DataTypes , Model }= require('sequelize')
const path = require('path')
const dbFile = path.join(__dirname, 'db.sqlite3')
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile
})

exports.sequelize = sequelize

class User extends Model {}
exports.User = User
User.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salt:{
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  gender: {
    type: DataTypes.ENUM('f', 'm'),
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
  }
}, 
{
  sequelize,
  modelName: 'User'
})


class Vote extends Model {}
exports.Vote = Vote
Vote.init({
  title: DataTypes.STRING,
  desc: DataTypes.STRING,
  deadline: DataTypes.DATE,
  multiSelect: DataTypes.BOOLEAN,
  anonymous: DataTypes.BOOLEAN,
  restricted: DataTypes.BOOLEAN,
}, {
  sequelize,
  modelName: 'Vote'
})
User.hasMany(Vote)
Vote.belongsTo(User)



class Option extends Model {}
exports.Option = Option
Option.init({
  content: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'Option',
  timestamps:false
})
Vote.hasMany(Option)
Option.belongsTo(Vote)

User.hasMany(Option)
Option.belongsToMany(User,{
  through:'UserVoting',
})


sequelize.sync()