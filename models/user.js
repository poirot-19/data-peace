const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var UserSchema = new mongoose.Schema({
    id: {
    type: Number,
    required:true,
    },
    first_name: {
    type: String,
    required: true,
    trim:true
    },
    last_name: {
    type: String,
    required: true,
    trim:true
    },
    company_name: {
    type: String,
    required: true,
    trim:true
    },
    age: {
    type: Number,
    required: true,
    },
    city: {
    type: String,
    required: true,
    trim:true
    },
    state: {
    type: String,
    required: true,
    trim:true
    },
    zip: {
    type: Number,
    required: true,
    },
    email: {
    type: String,
    required: true,
    trim:true
    },
    web: {
    type: String,
    required: true,
    trim:true
    },
  });

UserSchema.set({usePushEach:true});
UserSchema.plugin(mongoosePaginate);

var User = mongoose.model('User', UserSchema);

module.exports = {User}
