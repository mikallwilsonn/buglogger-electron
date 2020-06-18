// ----
// Dependencies
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';


// ----
// Child Components
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';


// ----
// App functional component
const App = () => {
	// Logs State
	const [ logs, setLogs ] = useState([
		{
			_id: 1,
			text: 'This is log one',
			priority: 'low',
			user: 'Bob',
			created: new Date().toString()
		},
		{
			_id: 2,
			text: 'A second log',
			priority: 'moderate',
			user: 'Jim',
			created: new Date().toString()
		},
		{
			_id: 3,
			text: 'Here, this is a third log to show',
			priority: 'high',
			user: 'Jane',
			created: new Date().toString()
		},
	]);


	// Alert State
	const [ alert, setAlert ] = useState({
		show: false,
		message: '',
		variant: 'success'
	});


	// Add New Log Item
	function addItem( item ) {
		if ( item.text === '' || item.user === '' || item.priority === '' ) {
			showAlert( 'Please enter all fields', 'danger' );

			return false;
		} else {
			item._id = logs.length + 1;
			item.created = new Date().toString();

			console.log( item );
	
			setLogs([ ...logs, item ]);
	
			showAlert( 'Log Added' );

			return true;
		}
	}


	// Delete Log Item
	function deleteItem( _id ) {
		setLogs( logs.filter(( item ) => item._id !== _id ));

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
