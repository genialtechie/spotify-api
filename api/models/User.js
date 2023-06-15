const { default: mongoose } = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  spotifyId: String,
  secret: String,
  refreshToken: String,
  accessToken: String,
});

UserSchema.plugin(passportLocalMongoose);
UserSchema.plugin(findOrCreate);

global.User = global.User || mongoose.model('User', UserSchema);
module.exports = global.User;
