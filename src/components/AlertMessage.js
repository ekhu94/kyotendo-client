import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertMessage = ({ variant, message}) => {

    return (
        <Alert className='text-center py-3 fade' style={{marginTop: '85px', marginBottom: '0 !important', letterSpacing: '0.2rem'}} variant={variant}>
            {message}
        </Alert>
    )
};

export default AlertMessage;