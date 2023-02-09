import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from "react-router-dom"

import "./main.css"

export default function Page1(){
    const [title, setTitle] = useState();
    const [des, setDes] = useState();
    
    const [thumbnail, setThumbnail] = useState();
    const [thumbnailName, setThumbnailName] = useState(NaN);

    const [video, setVideo] = useState();
    const [videoName, setVideoName] = useState(NaN);

    const [error, setError] = useState();

    const [loading, setLoading] = useState();

    const navigate = useNavigate();


    const uploadFile = async (file, id)=>{
        try{
            setLoading(1);
            let type = ""
            if(id == 1){
                setThumbnail(file.name);
                type = "image"
            }
            else{
                setVideo(file.name);
                type = "video"
            }
            const url = `https://api.cloudinary.com/v1_1/dxjcr8zge/${type}/upload`;
            const Data = new FormData()
            Data.append("file", file);
            Data.append("api_key","595653675122675" );
            Data.append("upload_preset", "xk80mfzt");
            // const res = await axios.post(url, Data);
            // console.log(res)
            // return;
            axios.post(url, Data).then((response)=>{
                if(id == 1){
                    setThumbnail(response.data.url)
                    setThumbnailName(file.name)
                    setLoading(0);
                } else{
                    setVideo(response.data.url)
                    setVideoName(file.name)
                    setLoading(0);
                }   
                console.log(response.data)
            }).catch((error)=>{  
                console.log(error)
                setError(error)
            })
        } catch(err){
            console.log(err);
        }
    }
    const submitData = async()=>{
        try{
            const data = {
                title, des, image:{
                    thumbnail, thumbnailName
                }, video:{
                    video, videoName
                }
            }
            setLoading(1);
            console.log("Data:", data);
            axios.post("http://localhost:5004/fileUpload", data).then(()=>{
                setError("Submitted Successfully");
            })

          
        } catch(err){
            console.log(err);
            toast.info('Loading', {position:"bottom-center"});
        }
    }

        return(
            <body>
                <button
                    style={{position:"absolute", width:"7vw", padding:"4px", marginTop:"4vh", marginLeft:"85vw"}}
                    onClick = {()=>{
                        navigate("/page2")
                    }}
                >
                    Media
                </button>
                <h1 style={{ textAlign : "center", fontFamily: "Arial, Helvetica, sans-serif"}}>Media Storage System</h1>
                <div style={{marginLeft:"35%"}}>
                <form style={{width:"fit-content", height:"fit-content"}}>
                <div>  
                
                <label style={{fontSize: "large", fontFamily:"Arial, Helvetica, sans-serif", margin:"5px"}}>Enter Title:</label> <br/>
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }}/> <br/><br/>
                
                <label style={{fontSize: "large", fontFamily:"Arial, Helvetica, sans-serif;", margin:"5px"}}>Enter Description:</label><br></br>

                <textarea onChange={(e)=>{
                    setDes(e.target.value);
                }}/> <br/><br/>

<label style={{fontSize: "large", fontFamily:"Arial, Helvetica, sans-serif"}}>Upload thumbnail</label><br/>
                
                <input type="file" id="file" 
                        onChange =  {(e)=> uploadFile(e.target.files[0], 1) } disabled={loading}/><br/><br/>
                
                <label style={{fontSize: "large", fontFamily:"Arial, Helvetica, sans-serif"}}>Upload the video</label><br/> 

               <input type="file" id="video" 
                        onChange =  {(e)=>{uploadFile(e.target.files[0], 2)}} disabled={loading}/><br/><br/>
                
                <button onClick={()=>{
                        submitData();
                }} disabled={loading}>Submit</button>

                {loading && loading == 1 && <>
                    Please wait loading
                </>}
                {loading && loading == 0 && <>
                    Done uploading
                </>}

                {error && <>
                    {error}
                </>}

            </div>
            </form>
            </div>
            </body>
        );

}