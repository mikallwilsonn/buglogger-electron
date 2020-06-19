// ----
// Dependencies
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { ipcRenderer } from 'electron';


// ----
// Child Components
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';


// ----
// App functional component
const App = () => {
	// Logs State
	const [ logs, setLogs ] = useState([]);


	// Alert State
	const [ alert, setAlert ] = useState({
		show: false,
		message: '',
		variant: 'success'
	});


	// ----
	useEffect(() => {
		ipcRenderer.send( 'logs:load' ); 

		ipcRenderer.on( 'logs:get', ( event, logs ) => {
			setLogs(JSON.parse( logs ));
		});

		ipcRenderer.on( 'logs:clear', () => {
			setLogs([]);

			showAlert( 'Logs Cleared' );
		});
	}, []);


	// Add New Log Item
	function addItem( item ) {
		if ( item.text === '' || item.user === '' || item.priority === '' ) {
			showAlert( 'Please enter all fields', 'danger' );

			return false;
		} else {
			/*
			item._id = logs.length + 1;
			item.created = new Date().toString();
			setLogs([ ...logs, item ]);
			*/

			ipcRenderer.send( 'logs:add', item );

			showAlert( 'Log Added' );

			return true;
		}
	}


	// Delete Log Item
	function deleteItem( _id ) {
		// setLogs( logs.filter(( item ) => item._id !== _id ));
		ipcRenderer.send( 'logs:delete', _id );

		showAlert( 'Log Removed' );
	}


	// Show Alert
	function showAlert( message, variant = 'success', seconds = 3000 ) {
		setAlert({
			show: true,
			message,
			variant
		});

		setTimeout(() => {
			setAlert({
				show: false,
				message: '',
				variant: 'success'
			})
		}, seconds );
	}


	// Render the component
	return (
		<Container className='app'>
			<AddLogItem addItem={ addItem } />

			{	alert.show &&

				<Alert variant={ alert.variant }>
					{ alert.message }
				</Alert>
			}

			<Table>
				<thead>
					<tr>
						<th>
							Priority
						</th>

						<th>
							Log Text
						</th>

						<th>
							User
						</th>

						<th>
							Created Date
						</th>

						<th></th>
					</tr>
				</thead>

				<tbody>
					{ logs.map(( log ) => {
						return ( 
							<LogItem 
								key={ log._id } 
								log={ log } 
								deleteItem={ deleteItem }
							/> 
						);
					})}
				</tbody>
			</Table>
		</Container>
	)
}


// ----
// Export
export default App;
