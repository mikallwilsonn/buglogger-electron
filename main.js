// ----
// Depedencies
const path = require( 'path' );
const url = require( 'url' );
const { app, BrowserWindow } = require( 'electron' );


// Initializing main window variable
let mainWindow;


// ----
// set Environment
let isDev = false;

if (
	process.env.NODE_ENV !== undefined &&
	process.env.NODE_ENV === 'development'
) {
	isDev = true;
}


// ----
// Creating the main window
function createMainWindow() {
	mainWindow = new BrowserWindow({
		width: isDev ? 1400 : 1100,
		height: 800,
		show: false,
		backgroundColor: '#FFF',
		icon: './assets/icons/icon.png',
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// Init the index path variable
	let indexPath;

	// Checking for development server
	if ( isDev && process.argv.indexOf( '--noDevServer' ) === -1 ) {
		indexPath = url.format({
			protocol: 'http:',
			host: 'localhost:8080',
			pathname: 'index.html',
			slashes: true,
		});
	} else {
		indexPath = url.format({
			protocol: 'file:',
			pathname: path.join( __dirname, 'dist', 'index.html' ),
			slashes: true,
		});
	}

	mainWindow.loadURL( indexPath );

	// Don't show until we are ready and loaded
	mainWindow.once( 'ready-to-show', () => {
		mainWindow.show();

		// Open devtools if dev
		if ( isDev ) {
			const {
				default: installExtension,
				REACT_DEVELOPER_TOOLS,
			} = require( 'electron-devtools-installer' );

			installExtension( REACT_DEVELOPER_TOOLS ).catch(( error ) =>
				console.log( 'Error loading React DevTools: ', error )
			);

			mainWindow.webContents.openDevTools();
		}
	});

	mainWindow.on( 'closed', () => ( mainWindow = null ));
}


// On Ready
app.on( 'ready', createMainWindow );

// When all windows are closed
app.on( 'window-all-closed', () => {
	if ( process.platform !== 'darwin' ) {
		app.quit();
	}
});

// On activate
app.on( 'activate', () => {
	if ( mainWindow === null ) {
		createMainWindow();
	}
});

// Stop error
app.allowRendererProcessReuse = true
