import React from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import errorIcon from '../assets/icons/auth-fail-icon.jpg';

import './AlertModal.css';

const ErrorModal = ({showModal, setShowModal, messages, onBackClick}) => {

    const handleClose = () => setShowModal(false)

    return (
        <>
            <Modal show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header className="justify-content-center error-modal-header">
                    <Modal.Title className="text-center py-2">{messages.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img alt="error-toad" src={errorIcon} style={{
                                    width: 'auto',
                                    height: '200px',
                                    marginBottom: '18px'
                                }}
                             />
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            {messages.body}
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="mr-4 back-btn py-2 px-5" variant="primary" onClick={onBackClick}>
                                Got It
                            </Button>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ErrorModal;