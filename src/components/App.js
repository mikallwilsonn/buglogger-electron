// ----
// Dependencies
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';


// ----
// Child Components
import LogItem from './LogItem';
import AddLogItem from './AddLogItem';


// ----
// App functional component
const App = () => {
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


	// Add New Log Item
	function addItem( item ) {
		item._id = ( logs.length + 1 );
		item.created = new Date().toString();

		setLogs([ ...logs, item ]);
	}

	// Render the component
	return (
		<Container className='app'>
			<AddLogItem addItem={ addItem } />

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
