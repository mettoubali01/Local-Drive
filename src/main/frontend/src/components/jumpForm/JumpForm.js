import {Form, Button} from 'react-bootstrap';
import {useState} from 'react';
import './jumpform.css';

const JumpForm = ({setInfo}) => {
    const [jumpPath, setJumpPath] = useState('')

    const handleSubmit = event => {
        event.preventDefault();
        setInfo(jumpPath);

    }

    const handleChange = event => {
        const currentPath = event.target.value;
        setJumpPath(currentPath);
    }

    return (
        <>    
            <Form onSubmit={handleSubmit} className="form__path w-75">
                <Form.Group controlId="input__path">
                    <Form.Label>Path</Form.Label>
                    <Form.Control value={jumpPath} name="jump-path" type="text" onChange={handleChange} placeholder="/test" />
                </Form.Group>
                
                <Button type="submit" variant="primary">
                    Jump
                </Button>
            </Form>
        </>
    )
}

export default JumpForm;