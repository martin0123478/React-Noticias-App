import axios from "axios";
import { useState,useEffect,createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) =>{

    const [categoria,setCategoria] =useState('general')
    const [noticias,setNoticias] = useState([])
    useEffect(()=>{
        const consultarApi = async() =>{
               try {
                 const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
        
        const {data} = await axios(url)
        setNoticias(data.articles)
               } catch (error) {
                console.log(error)
               }
        }
        consultarApi()
    },[categoria])

    const handleCategoria = e =>{
        setCategoria(e.target.value)
    }
    return(
        <NoticiasContext.Provider
        value={{
            categoria,
            handleCategoria,
            noticias
        }}>
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext