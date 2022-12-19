
const toggleFavorite=(id:number)=>{
     console.log('togglefavorite')
     let favorites:number[]=JSON.parse(localStorage.getItem('favorites') || '[]')

     if(favorites.includes(id)){
          favorites=favorites.filter(pokemonId=>pokemonId!==id)

     }else{
          favorites.push(id);
     }
     
     localStorage.setItem('favorites',JSON.stringify(favorites))
}

const verifiFavorite=(id:number)=>{
     const favoritesPokemons:Array<number>=JSON.parse(localStorage.getItem('favorites') || '[]')
     return favoritesPokemons.includes(id)
}


const pokemons=():number[]=>{
     return JSON.parse(localStorage.getItem('favorites')||'[]')
}
export default{
     toggleFavorite,
     verifiFavorite,
     pokemons
}