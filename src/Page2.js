import axios from "axios";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"

export default function Page2(){

    const navigate = useNavigate();

    const [data, setData] = useState();
    useEffect(() => {
        axios.get('http://localhost:5004/getData').then((response)=>{
            console.log(response.data)
            setData(response.data)
        }).catch(error => {
            console.log(error)
          });
      }, []);

    const next=()=>{

    }
    return(
        <>
        <body >
        
        {data && data.length && data.map((value, key)=>{
                    return(
                        <div className="flex-parent-element" style={{margin: "5%;"}}
                            onClick={()=>{
                                navigate("/page3", {state:value})
                            }}
                        >
                        <div className="flex-child-element">
                            <img src={value.image.thumbnail} style={{height: "100%", width: "100%"}}/>
                        <figcaption style={{fontSize: "30px"}}>{value.title}</figcaption>
                        </div>
                        <div className="flex-child-element">
                            <label style={{fontSize: "large", fontFamily: "Arial, Helvetica, sans-serif"}}>
                                {value.des}
                            </label>
                        </div>
                        
                      </div>
            )
        })}
    
    
    

</body>
        </>
    );
}