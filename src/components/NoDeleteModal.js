import React, { useState, useEffect } from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import noDeleteIcon from '../assets/icons/no-delete-icon.jpg';
import './DeleteModal.css';

const NoDeleteModal = ({ showModal, setShowModal, onBackClick }) => {

    useEffect(() => {
    }, [])

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Modal show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header className="justify-content-center no-delete-header">
                    <Modal.Title className="text-center py-2">Wah, heh, heh, heh!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img src={noDeleteIcon} style={{
                                    width: '200px',
                                    height: '200px',
                                    marginBottom: '18px'
                                }}
                             />
                        </Row>
                        <Row className="justify-content-center mb-3 text-center p-text" style={{fontSize: '1.1rem'}}>
                            Ehh, everybody cheater! Comments on the internet are forever!
                        </Row>
                        <Row className="justify-content-center mt-3">
                            <Button className="mr-4 back-btn px-4" variant="primary" onClick={onBackClick}>
                                Got It
                            </Button>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default NoDeleteModal;