import axios from "axios";
import { useState,useEffect,createContext } from "react";

const NoticiasContext = createContext()

const NoticiasProvider = ({children}) =>{

    const [categoria,setCategoria] =useState('general')

    useEffect(()=>{
        const consultarApi = async() =>{
               try {
                 const url = `https://newsapi.org/v2/top-headlines?country=mx&category=${categoria}&apiKey=${import.meta.env.VITE_API_KEY}`
        console.log(url)
        const {data} = await axios(url)
        console.log(data)
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
            handleCategoria
        }}>
            {children}
        </NoticiasContext.Provider>
    )
}

export {
    NoticiasProvider
}

export default NoticiasContext