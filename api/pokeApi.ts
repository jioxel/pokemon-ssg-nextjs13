import axios from "axios"

const pokeApi=async(url:string)=>{
     const resp=await fetch(`https://pokeapi.co/api/v2${url}`)
     const data=await resp.json()
     return data
}


export default pokeApi;