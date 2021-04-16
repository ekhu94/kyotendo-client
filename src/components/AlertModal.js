import React from 'react';
import { Container, Row, Modal } from 'react-bootstrap';
import toadIcon from '../assets/icons/toad-modal-icon.jpg';

import './AlertModal.css';

const AlertModal = ({showModal, setShowModal, messages}) => {

    const handleClose = () => setShowModal(false)

    return (
        <>
            <Modal centered show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header className="justify-content-center modal-header">
                    <Modal.Title className="text-center py-2">{messages.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img alt="happy-toad" src={toadIcon} style={{
                                    width: '200px',
                                    height: '200px',
                                    marginBottom: '18px'
                                }}
                             />
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            {messages.body}
                        </Row>
                        <Row className="justify-content-center">
                            <p style={{color: 'var(--blue-secondary)'}}>Redirecting...</p>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AlertModal;