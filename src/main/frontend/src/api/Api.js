import axios from 'axios';

class Api{
    BASE_URL = "http://localhost:8080";
    
    //make a request to the server   
    async getData(url) {
        return axios.get(url);
    }

    //make request to the server to create a new folder   
    async createDirectory(path, folderName) {
        return axios({
            method: 'POST',
            url: `${path}/create`,
            headers: {
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            data: folderName
        });
    }

    //make request to the server to create a new folder   
    async uploadFile(path, fileInfo){
        const formData = new FormData();

        formData.append("file", fileInfo.file);
        
        return axios.post(
            `${path}/upload`,
            formData,
            {
                headers:{
                    'Content-type': 'multipart/form-data'
                }
            }
        );
    }

    //Url of the backend rest api to make requests 
    getBaseUrl(){
        return this.BASE_URL;
    }
}

export default Api;