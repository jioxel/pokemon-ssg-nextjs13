import { useEffect, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import { Card, Grid,Text,Button, Container,Image } from '@nextui-org/react';

import { pokeApi } from '../../api'
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces'
import { getPokemonInfo, localFavorites } from '../../utils';

import confetti from 'canvas-confetti';
interface Props { 
     // pokemon:any;
     pokemon:Pokemon
}
const PokemonByNamePage = ({pokemon}:Props) => {
  
     const [isInFavorites, setIsInFavorites] = useState(false)
     var defaults = {
          spread: 360,
          ticks: 50,
          gravity: 0,
          decay: 0.94,
          startVelocity: 30,
          shapes: ['star'],
          colors: ['FFE400', 'FFBD00', 'E89400', 'FFCA6C', 'FDFFB8']
        };
        
        function shoot() {
          confetti({
            ...defaults,
            particleCount: 40,
            scalar: 1.2,
            shapes: ['star']
          });
        
          confetti({
            ...defaults,
            particleCount: 10,
            scalar: 0.75,
            shapes: ['circle']
          });
        }
        
        
     const onToggleFavorite=()=>{
          localFavorites.toggleFavorite(pokemon.id)
          setIsInFavorites(!isInFavorites)
          if(isInFavorites) return;
          shoot()
     }
     useEffect(() => {
       setIsInFavorites(localFavorites.verifiFavorite(pokemon.id))

     },[])
     

     

  return (
     <Layout title={pokemon.name}>
     <Grid.Container css={{marginTop:'5px'}} gap ={2}>
          <Grid xs={12} sm={4}>
               <Card isHoverable css={{padding:'30px'}}>
                    <Card.Body>
                         <Card.Image
                         src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                         alt={ pokemon.name}
                         width = "100%"
                         height={ 200 }
                         />
                    </Card.Body>

               </Card>
          </Grid>
          <Grid xs ={12} sm = {8}>
               <Card>
                    <Card.Header css={{display:'flex', justifyContent:'space-between'}}>
                         <Text h1 transform="capitalize"> {pokemon.name}</Text>
                         <Button 
                              color={!isInFavorites
                                   ? "gradient"
                                   : "error" 
                                   }
                              ghost
                              onPress={onToggleFavorite}>
                              {!isInFavorites
                              ? "Guardar en favoritos"
                              : "Quitar de favoritos" 
                              }
                         </Button>
                    </Card.Header>
                    <Card.Body>
                         <Text size={30}> Sprites:</Text>
                         <Container direction="row" display="flex" gap={0}>
                              <Image
                                   src={pokemon.sprites.front_default}
                                   alt={pokemon.name}
                                   width={150}
                                   height={150}/>
                                   <Image
                                   src={pokemon.sprites.back_default}
                                   alt={pokemon.name}
                                   width={150}
                                   height={150}/>
                                   <Image
                                   src={pokemon.sprites.front_shiny}
                                   alt={pokemon.name}
                                   width={150}
                                   height={150}/>
                                   <Image
                                   src={pokemon.sprites.back_shiny}
                                   alt={pokemon.name}
                                   width={150}
                                   height={150}/>
                         </Container>
                    </Card.Body>
               </Card>
          </Grid>
     </Grid.Container>

    </Layout>
  )
}

export default PokemonByNamePage


interface Props {
     name:string
     url:string
}
export const getStaticPaths: GetStaticPaths = async (ctx) => {

     const  data = await  pokeApi('/pokemon?limit=151')
     const names:[]= data.results.map((poke:Props)=>{
          return poke.name
     })
     const pokemons151=names.map((nam:string)=>{
          return {
               params: {name:`${nam}`}
          }
     })


     return {
          paths: pokemons151,
          fallback: false
     }
}
// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.


export const getStaticProps: GetStaticProps = async ({params}) => {
     const {name}=params as {name:string}
     const pokemon=await getPokemonInfo(name)
     return {
          props: {
               pokemon
          }
     }
} 