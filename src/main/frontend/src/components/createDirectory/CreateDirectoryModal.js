import {Form, Modal, Button} from 'react-bootstrap';
import AlertMessage from '../alert/AlertMessage';
import {useState} from 'react';
import Api from '../../api/Api';
import './createDirectoryModal.css';

const CreateFolderModal = ({wantedPath, active, deactive, isLoading, setIsLoading}) => {
    const [messageFeedBack, setMessageFeedback] = useState("");
    const [messageFeedBackStyle, setMessageFeedbackStyle] = useState("");
    const [showAlert, setShowAlert] = useState(false);  
    const [folderName, setFolderName] = useState('');
    const api = new Api();
    const successMessage = "The folder was created successfully";
    const successMessageStyle = "success";
    const failedMessageStyle = "danger";
    const failedMessage = "The folder could not be created";

    const handleChange = e => {
        const folderNameValue = e.target.value;
        setFolderName(folderNameValue);
    }

    //shows the alert depends on the passed message and type of alert (danger or success) 
    const setTheAlert = (message, messageStyle) =>{
        setMessageFeedback(message);
        setMessageFeedbackStyle(messageStyle);
        setShowAlert(true);
    }

    //responnsable of creating  of directory
    //by making request to the server
    const handleSubmit = event => {
        let fullPath = "";
        event.preventDefault();

        if (wantedPath === "/")
            fullPath = api.getBaseUrl();
        else
            fullPath = api.getBaseUrl() + wantedPath;
        
        api.createDirectory(fullPath, folderName)
            .then(response => {
                if(response.status === 200){
                    
                    //we show the successufully message to inform the user about his action
                    setTheAlert(successMessage, successMessageStyle);
                    //we change it to re-render the data ( to show updated data)
                    setIsLoading(!isLoading);
                }
            }).catch(err => {
                setTheAlert(failedMessage, failedMessageStyle);
            });
    }

    return(
        <div className="upload__container">            
            <Modal show={active} onHide={deactive} className="my__modal">
                <Modal.Header closeButton>
                    <Modal.Title>Create Directory</Modal.Title>
                </Modal.Header>
                    {showAlert && <AlertMessage setAlert={setShowAlert} variant={messageFeedBackStyle} children={messageFeedBack}/>}
                <Form onSubmit={handleSubmit}>

                    <Modal.Body>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="directoryName" value={folderName || ''} onChange={handleChange} />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>                              
                        <Button variant="secondary" onClick={_=>{
                            deactive()
                        }}>Close</Button>
                        <Button variant="primary" type="submit">Create</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default CreateFolderModal;