// ----
// Dependencies
const mongoose = require( 'mongoose' );

// Database Keys
// -- Create a dbKeys.js file in this directory that exports an object with  
// -- a user, password and dbname property. 
// -- dbKeys.js not included in repo, is ignored by git for security.
const { user, password, dbname } = require( './dbKeys' );


// ----
// Connect to Database
const connectDB = async () => {
    const connectionString = `mongodb+srv://${ user }:${ password }@cluster0-ics5z.mongodb.net/${ dbname }?retryWrites=true&w=majority`;

    const connectionOptions = {
        userNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }

    try {
        const connection = await mongoose.connect( connectionString, connectionOptions );

        console.log( '✅ MongoDB Connected!' );

    } catch ( error ) {
        console.log( error );
        process.exit( 1 );
    }
}


// ----
// Export
module.exports = connectDB;
