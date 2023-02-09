import { useEffect } from "react"
import {useLocation} from 'react-router-dom';

export default function Page3(props){
    const location = useLocation();
    
    const x = "video/mp4"
    const data = location.state
    useEffect(() => {
        console.log(data);
        
      }, []);

    return(
        <video controls width="100%">
        <source src="http://res.cloudinary.com/dxjcr8zge/video/upload/v1675950979/test/vhwocxp2w2mjuir9vu9x.mp4" type={x} />
      </video> 
    )
}