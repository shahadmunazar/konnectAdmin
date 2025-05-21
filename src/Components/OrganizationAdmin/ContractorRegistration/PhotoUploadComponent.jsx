import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Button, Modal } from 'react-bootstrap';
import ImageComponent from './ImageComponent'; // Assuming you have this from the previous request

const PhotoUploadComponent = () => {
    const [selectedPhoto, setSelectedPhoto] = useState(null); // Store the photo (URL or data URL)
    const [showCameraModal, setShowCameraModal] = useState(false); // Control camera modal visibility
    const videoRef = useRef(null); // Reference to video element for camera feed
    const canvasRef = useRef(null); // Reference to canvas for capturing photo
    const streamRef = useRef(null); // Reference to camera stream

    // Handle file upload (drag-and-drop or click)
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedPhoto(reader.result); // Set the photo data URL
            };
            reader.readAsDataURL(file);
        }
    };

    // Open the camera modal
    const openCamera = () => {
        setShowCameraModal(true);
    };

    // Start the camera feed when the modal opens
    useEffect(() => {
        if (showCameraModal) {
            const startCamera = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user' }, // Use front-facing camera if available
                    });
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                        videoRef.current.play();
                    }
                } catch (error) {
                    console.error('Error accessing camera:', error);
                    alert('Could not access the camera. Please ensure you have granted permission.');
                    setShowCameraModal(false);
                }
            };
            startCamera();
        }

        // Cleanup: Stop the camera stream when the modal closes
        return () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };
    }, [showCameraModal]);

    // Capture photo from the camera
    const capturePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg');
            setSelectedPhoto(dataUrl); // Set the captured photo
            setShowCameraModal(false); // Close the modal
        }
    };

    // Remove the selected photo
    const removePhoto = () => {
        setSelectedPhoto(null);
    };

    // Retake photo (reopen the camera)
    const retakePhoto = () => {
        setShowCameraModal(true);
    };

    return (
        <>
            <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={3}>Upload your photo</Form.Label>
                <Col sm={9}>
                    {selectedPhoto ? (
                        <div className="text-center">
                            <ImageComponent
                                src={selectedPhoto}
                                alt="Uploaded Photo"
                                width="200px"
                                height="200px"
                                rounded
                                border
                            />
                            <div className="mt-2 d-flex justify-content-center gap-2">
                                <Button variant="primary" size="sm" onClick={retakePhoto}>
                                    Retake Photo
                                </Button>
                                <Button variant="danger" size="sm" onClick={removePhoto}>
                                    Remove Photo
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                border: '1px dashed #ccc',
                                borderRadius: '8px',
                                padding: '20px',
                                textAlign: 'center',
                                position: 'relative',
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    opacity: 0,
                                    width: '100%',
                                    height: '100%',
                                }}
                                onChange={handleFileChange}
                            />
                            <div>Drag and drop a file here or click</div>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                className="mt-2"
                                onClick={openCamera}
                            >
                                Take Photo
                            </Button>
                            <small className="text-muted d-block mt-2">
                                This photo may be used for identification purposes.<br />
                                Please ensure it is a real photo of your face and of good quality.
                            </small>
                        </div>
                    )}
                </Col>
            </Form.Group>

            {/* Camera Modal */}
            <Modal
                show={showCameraModal}
                onHide={() => setShowCameraModal(false)}
                centered
                dialogClassName="camera-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Take a Photo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <video
                        ref={videoRef}
                        style={{ width: '100%', maxHeight: '400px', borderRadius: '8px' }}
                        autoPlay
                        playsInline
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowCameraModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={capturePhoto}>
                        Capture Photo
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Custom Styles */}
            <style>{`
                .camera-modal {
                    max-width: 600px;
                    width: 90%;
                    margin: 0 auto;
                }
                .camera-modal .modal-content {
                    border-radius: 8px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .camera-modal .modal-body {
                    padding: 20px;
                }
            `}</style>
        </>
    );
};

export default PhotoUploadComponent;