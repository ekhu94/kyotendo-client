import React from 'react';
import { Container, Row, Modal } from 'react-bootstrap';
import toadIcon from '../assets/icons/toad-modal-icon.jpg';

const AlertModal = ({showModal, setShowModal, messages}) => {

    const handleClose = () => setShowModal(false)

    return (
        <>
            <Modal show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header style={{margin: '10px'}}>
                    <Modal.Title className="text-center">{messages.header}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img src={toadIcon} style={{
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