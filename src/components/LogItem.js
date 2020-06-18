// ----
// Dependencies
import React from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';


// ----
// LogItem functional component
const LogItem = ({ log: { priority, text, user, created }}) => {

    // Set variant for priority badge
    const setVariant = () => {
        if ( priority === 'high' ) {
            return 'danger';
        } else if ( priority === 'moderate' ) {
            return 'warning';
        } else {
            return 'success';
        }
    }

    // Render Component
    return (
        <tr>
            <td>
                <Badge 
                    variant={ setVariant() }
                    className="p-2"
                >
                    { priority.charAt(0).toUpperCase() + priority.slice( 1 ) }
                </Badge>
            </td>

            <td>
                { text }
            </td>

            <td>
                { user }
            </td>

            <td>
                { created }
            </td>

            <td>
                <Button 
                    variant='danger' 
                    size='sm' 
                    onClick={() => alert( 'Delete Log (coming soon)' )}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}


// ----
// Export
export default LogItem;
