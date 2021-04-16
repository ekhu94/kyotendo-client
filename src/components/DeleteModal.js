import React, { useState, useEffect } from 'react';
import { Container, Row, Modal, Button } from 'react-bootstrap';
import deleteIcon from '../assets/icons/delete-modal-icon.jpg';
import './DeleteModal.css';

const DeleteModal = ({ showModal, setShowModal, item, onDeleteConfirm, onBackClick, data }) => {
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    useEffect(() => {


        return () => {
            setDeleteConfirm(false);
        }
    }, [])

    const handleClose = () => setShowModal(false);

    const onDeleteClick = () => {
        setDeleteConfirm(true);
        onDeleteConfirm(item);
        setTimeout(() => {
            setDeleteConfirm(false);
        }, 1500)
    };

    return (
        <>
            <Modal show={showModal} onHide={handleClose} backdrop='static'>
                <Modal.Header className="justify-content-center delete-header">
                    <Modal.Title className="text-center py-2">{data.head}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{margin: '20px'}}>
                    <Container>
                        <Row className="justify-content-center">
                             <img alt="delete-koopa" src={deleteIcon} style={{
                                    width: '200px',
                                    height: '200px',
                                    marginBottom: '18px'
                                }}
                             />
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            {data.bodyOne}
                        </Row>
                        <Row className="justify-content-center mb-3 text-center" style={{fontSize: '1.1rem'}}>
                            {data.bodyTwo}
                        </Row>
                        {deleteConfirm ?
                            <Row className="justify-content-center mb-3 text-center text-danger" style={{fontSize: '0.9rem'}}>
                                {data.deleteConfirm}
                            </Row>
                        : null }
                        <Row className="justify-content-center mt-3">
                            <Button className="mr-4 back-btn px-3" variant="primary" onClick={onBackClick}>
                                Go Back
                            </Button>
                            <Button onClick={onDeleteClick} className="ml-4 delete-confirm-btn px-3" variant="danger">
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