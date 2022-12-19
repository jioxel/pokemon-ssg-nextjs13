import {Button, Grid,Card, Row, Text} from '@nextui-org/react'
import { Layout } from '../components/layouts'
import { GetStaticProps } from 'next'
import { pokeApi } from '../api'
import { useEffect } from 'react'
import { PokemonListResponse, SmallPokemon } from '../interfaces'
import Image from 'next/image';
import { PokemonCard } from '../components/pokemon'


interface Props{
  pokemons:SmallPokemon[]
;}

export default function HomePage({pokemons}:Props) {


  
  return (
  <Layout>
    <Grid.Container gap={2} justify='flex-start'>
    {pokemons.map((pokemon)=><PokemonCard pokemon={pokemon} key={pokemon.id}/>)}
    </Grid.Container>
  </Layout>
  )
}
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async (ctx) => {

  const data:PokemonListResponse=await pokeApi('/pokemon?limit=151');

  const pokemons:SmallPokemon[] = data.results.map((pokemon,i)=>{
    const id:number=i+1
    return{
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    }
  })


  return {
    props: {
      pokemons
    }
  }
}