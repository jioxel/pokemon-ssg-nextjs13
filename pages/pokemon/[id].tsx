import { useEffect, useState } from 'react';
import { GetStaticProps } from "next";
import { GetStaticPaths } from 'next'
import { useRouter } from "next/router"
import { Grid,Card,Text, Button, Container, Image} from "@nextui-org/react";
import confetti from 'canvas-confetti'
import { pokeApi } from "../../api";
import { Layout } from "../../components/layouts";
import { Pokemon } from "../../interfaces";
import { getPokemonInfo, localFavorites } from "../../utils";
interface Props { 
     // pokemon:any;
     pokemon:Pokemon
}


const PokemonPage = ({pokemon}:Props) => {
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
export default PokemonPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes


export const getStaticPaths: GetStaticPaths = async (ctx) => {
     const pokemons151=[...Array(151)].map((value,i)=>{
          return {
               params: {id:`${i+1}`}
          }

     })
     
     return {
          paths: pokemons151,
          fallback: false
     }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
     const {id}=params as {id:string};
     const pokemon=await getPokemonInfo(id)
     return {
       props: {
         pokemon
       }
     }
   }
