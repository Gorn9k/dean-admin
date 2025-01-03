import {useNavigate} from "react-router-dom";
import {FC, useEffect} from "react";

export const NotFound: FC = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        navigate('/groups')
    }, [navigate]);
    
    return null
}