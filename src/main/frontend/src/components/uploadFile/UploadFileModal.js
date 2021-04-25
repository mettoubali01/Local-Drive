import {useState} from 'react';
import {Form, Modal, Button} from 'react-bootstrap';
import AlertMessage from '../alert/AlertMessage';
import Api from '../../api/Api';
import './uploadFileModal.css'

function removeLastSlash(path) {
    let result = "";

    if (path.charAt(path.length-1) === '/')
        result = path.substr(0, path.length-1);
        
    else
        result = path;    
    
    return result;
}   

const UploadFileModal = ({wantedPath, active, deactive, isLoading, setIsLoading}) => {

    const [messageFeedBack, setMessageFeedback] = useState("");
    const [messageFeedBackStyle, setMessageFeedbackStyle] = useState("");
    const [showAlert, setShowAlert] = useState(false);  
    const [filesInfo, setFilesInfo] = useState({
        file: ''
    });
    const api = new Api();
    const fullPath = api.getBaseUrl() + wantedPath;
    const successMessage = "The File was uploaded successfully";
    const successMessageStyle = "success";
    const failedMessageStyle = "danger";
    const failedMessage = "The file could not be uploaded";

    const handleChange = e => {
        let fileValue = e.target.files[0];
        setFilesInfo({file : fileValue});
    }

    //shows the alert depends on the passed message and type of alert (danger or success) 
    const setTheAlert = (message, messageStyle) =>{
        setMessageFeedback(message);
        setMessageFeedbackStyle(messageStyle);
        setShowAlert(true);
    }

    //responnsable of the uploading of files
    //by making request to the server
    const handleSubmit = event => {
        event.preventDefault();
        const treatedPath = removeLastSlash(fullPath);

        api.uploadFile(treatedPath, filesInfo)
            .then(response => {
                if(response.status === 200) {
                     //we show the successufully message to inform the user about his action
                     setTheAlert(successMessage, successMessageStyle);
                     //we change it to re-render the data ( to show updated data)
                     setIsLoading(!isLoading);
                }
                
            }).catch(err =>{
                setTheAlert(failedMessage, failedMessageStyle);
            });
    }

    return(
        <div className="upload__container">            
            <Modal show={active} onHide={deactive} className="my__modal">
                <Modal.Header closeButton>
                    <Modal.Title>Upload Files</Modal.Title>
                </Modal.Header>
                {showAlert && <AlertMessage setAlert={setShowAlert} variant={messageFeedBackStyle} children={messageFeedBack}/>}
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>

                            <div className="mb-3">
                                <Form.File id="formcheck-api-regular">
                                    <Form.File.Label>Upload file</Form.File.Label>
                                    <Form.File.Input type="file" name={"file"} onChange={handleChange}/>
                                </Form.File>
                            </div>
                    </Modal.Body>
                    <Modal.Footer>                              
                        <Button variant="secondary" onClick={_=>{
                            deactive()
                        }}>Close</Button>
                        <Button variant="primary" type="submit">Upload</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default UploadFileModal;