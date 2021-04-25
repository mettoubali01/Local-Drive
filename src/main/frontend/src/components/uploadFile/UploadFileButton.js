import {Button} from 'react-bootstrap';
import UploadFileModal from './UploadFileModal';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './uploadFileButton.css';

const UploadFileButton = ({path, loading, setLoading}) => {
    const [show, setShow] = useState(false);

    const handleShow = _ => {
        setShow(true);
    }

    const handleClose = _ => {
        setShow(false)
    }

    return (
        <>
            <Button className="w-75" size="sm" onClick={_ => {
                handleShow();
            }}>
                Upload files 
                <FontAwesomeIcon icon={faCloudUploadAlt}/>
            </Button>

            {show && <UploadFileModal isLoading={loading}
                    setIsLoading={setLoading} 
                    wantedPath={path} 
                    active={show} 
                    deactive={handleClose} />}
        </>
    )
}

export default UploadFileButton;