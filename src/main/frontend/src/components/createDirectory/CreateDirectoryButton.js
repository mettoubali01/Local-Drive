import { Button } from "react-bootstrap";
import { useState } from 'react';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CreateDirectoryModal from './CreateDirectoryModal';
import './createDirectoryButton.css'

const CreateDirectoryButton = ({path, loading, setLoading}) => {
    const [show, setShow] = useState(false);

    const handleShow = _ => {
        setShow(true);
    }

    const handleClose = _ => {
        setShow(false)
    }

    return (
        <>
            <Button variant="info" className="w-75" size="sm" onClick={_ => {
                handleShow();
            }}>
                Create Directory
                <FontAwesomeIcon className="folder__icon" icon={faFolderPlus}/>
            </Button>

            {show && <CreateDirectoryModal isLoading={loading} 
                    setIsLoading={setLoading} 
                    wantedPath={path}
                    active={show}
                    deactive={handleClose} />}
        </>
    )
}

export default CreateDirectoryButton;