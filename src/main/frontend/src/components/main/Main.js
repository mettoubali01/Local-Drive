import Folder from '../../images/folder.svg';
import Doc from '../../images/doc.png';
import BackIcon from '../../images/arrow-left-2-xxl.png';
import {useEffect, useState} from 'react';
import UploadFileButton from '../uploadFile/UploadFileButton';
import CreateDirectoryButton from '../createDirectory/CreateDirectoryButton';
import JumpForm from '../jumpForm/JumpForm';
import Api from '../../api/Api';
import './main.css';

const Main = _ => {
    const [data, setData]= useState({path: '', content: ''});  
    const currentPath = window.location.pathname;
    const [auxToFetchBoard, setAuxToFetchBoard] = useState(false);
    const api = new Api();
    let subUrl;

    //change the path in the child
    const updatePath = newPath=> {
        setData({path: newPath, ...data.content});
    }

    //make a request to the server to get the content of 
    //local drive
    const fetchData = _ => {
        if(data.path === '/'){
            subUrl = api.getBaseUrl() + currentPath;
        }else{
            subUrl = api.getBaseUrl() + data.path;
        }

        api.getData(subUrl)
            .then(response => {
                if (response.status === 200){
                    setData(response.data);
                }
            })
            .catch(err => { 
                console.log(err);
            });
    }

    //shows the content of local drive 
    //when auxToFetchBoard changes (it changes when we create new folder or when we upload a file)
    useEffect(_ => {
        fetchData();

    },[auxToFetchBoard]);

    //to see the content of the clicked folder
    const handleClick = (folderName) => {

        if (data.path === "/")
            subUrl = api.getBaseUrl() + [data.path, folderName].join('');
        else 
            subUrl = api.getBaseUrl() + [data.path, '/', folderName].join('');
          
        api.getData(subUrl)
            .then(response => {

                if (response.status === 200)
                    setData(response.data);
                
            })
            .catch(err => { 
                console.log(err);
                alert("We couldn't show the content of your local drive, try to contact with the admin.")
            });
    }

    //come back to the previous folder
    const goBack= ()=>{
        let prev = data.path, res;

        if ((prev.split('/').length - 1) === 1){
            subUrl = api.getBaseUrl() + '/';
        } else { 
            res = prev.substring(0, prev.lastIndexOf('/'));
            subUrl = api.getBaseUrl() +  res;
        }

        api.getData(subUrl)
        .then(response => {

            if (response.status === 200){
                setData(response.data);
            }
        })
        .catch(err => { 
            console.log(err);
        });
    }

    return (
        <>
            <JumpForm setInfo={updatePath} />

            <h1 className={"content__title"}>Content</h1>
          
            <UploadFileButton loading={auxToFetchBoard} setLoading={setAuxToFetchBoard} path={data.path}/>
            <CreateDirectoryButton loading={auxToFetchBoard} setLoading={setAuxToFetchBoard} path={data.path}/>
            
            {
                data.path !== "/" && <button className="up" onClick={_ => {
                    goBack();
                }}>
                    <img className="back__icon" src={BackIcon} alt={"back-button"} />
                    Up to dir...
                </button> 
            }
            
            {data.content && <div className="content__container">
                {
                    data.content.folders.map((folder, index) => {
                        return (
                            <div   key={index} className={"folder__container"} onClick={_ => handleClick(folder)}>
                                <a href="#">
                                    <img className="folder__icon" src={Folder} alt={"Folder"} />
                                </a>
                                <span>{folder}</span>
                            </div>    
                        )
                    })
                }
                {
                    data.content.files.map((file, index) => {
                        return (
                            <div key={index} className="file__container">
                                <a href="#">
                                    <img className="doc__icon" src={Doc} alt={"Document"} />
                                </a>
                                <span>{file}</span>
                            </div>
                        )
                    })
                }
            </div>}
        </>
    )
}

export default Main;