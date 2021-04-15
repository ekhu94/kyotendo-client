import React from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import deleteIcon from '../assets/icons/delete-modal-icon.jpg';
import './DeleteModal.css';

const DeleteModal = ({ showModal, setShowModal, video, onDeleteConfirm, onBackClick }) => {

    const handleClose = () => setShowModal(false)

    return (
        <>
            <Modal show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header className="justify-content-center delete-header">
                    <Modal.Title className="text-center py-2">Remove Video?</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img src={deleteIcon} style={{
                                    width: '200px',
                                    height: '200px',
                                    marginBottom: '18px'
                                }}
                             />
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            Are you sure you want to delete this video from your collection?
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            This may also remove the game from your profile as well.
                        </Row>
                        <Row className="justify-content-center">
                            <Button variant="primary" onClick={onBackClick}>
                                Go Back
                            </Button>
                            <Button variant="danger">
                                Confirm Delete
                            </Button>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default DeleteModal;