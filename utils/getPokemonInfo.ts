import { pokeApi } from "../api"
import { Pokemon } from "../interfaces"

export const getPokemonInfo=async (nameOrId:string)=>{
     const data:Pokemon = await  pokeApi(`/pokemon/${nameOrId}`)
     return {
          id:data.id,
          name:data.name,
          sprites:data.sprites
     }

}