// ----
// Dependencies
const mongoose = require( 'mongoose' );


// ----
// Log Schema
const LogSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [ true, 'Log text is required' ],
        trim: true
    },
    priority: {
        type: String,
        default: 'low',
        enum: [ 'low', 'moderate', 'high' ]
    },
    user: {
        type: String,
        required: [ true, 'A user is required' ],
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});


// ----
// Export
module.exports = mongoose.model( 'Log', LogSchema );
