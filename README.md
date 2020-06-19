# buglogger-electron
A practice/review Electron-based bug-logging desktop application built from the Electron from Scratch course.


## dbKeys.js file
You will need to create a **dbKeys.js** file in the config directory to be able to connect to the database. Structure of the file will look like this:
```
// dbkeys.js file

const keys = {
    user: YOUR_USER_HERE,
    password: YOUR_PASSWORD_HERE,
    dbname: YOUR_DBNAME_HERE
}


module.exports = keys;
```
