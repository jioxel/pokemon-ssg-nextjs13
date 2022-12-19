import { Grid,Card,Image,Text } from "@nextui-org/react"
import { useRouter } from 'next/router';
interface Props{
     pokemonFav:number[]
}
export const Favorites = ({pokemonFav}:Props) => {
     const router=useRouter()

  return (
    
     <Grid.Container gap={2} direction='row' justify='flex-start'>
     {
       pokemonFav.map(id=>(
         <Grid xs ={6} sm={3} md ={2} xl ={1} key={id}>
           <Card isHoverable isPressable css={{padding:10}} onPress={()=>router.push(`/pokemon/${id}`)}>
             <Card.Image
             src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
             width={'100%'}
             height={140}/>
           </Card>

         </Grid>
       ))
     }
   </Grid.Container>
  )
}