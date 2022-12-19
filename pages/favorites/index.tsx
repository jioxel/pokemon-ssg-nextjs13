import { Container,Text,Image, Grid, Card} from '@nextui-org/react';
import { NextPage } from 'next';
import { FC, useState, useEffect } from 'react';
import { Layout } from '../../components/layouts/Layout';
import { Favorites, NoFavorites } from '../../components/ui';
import localFavorites from '../../utils/localFavorites'
export  const FavoritesPages:NextPage = () => {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])
  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])
  
  return (     
    <Layout>
      {favoritePokemons.length==0
      ?<NoFavorites/>
      : <Favorites pokemonFav={favoritePokemons}/>
      }
     
    </Layout>
  )
}

export default FavoritesPages