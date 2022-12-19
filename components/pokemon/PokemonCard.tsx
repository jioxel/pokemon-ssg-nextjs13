import { Grid,Card, Row, Text} from '@nextui-org/react'
import { SmallPokemon } from "../../interfaces"
import { useRouter } from 'next/router';

interface Props {
     pokemon:SmallPokemon
}
export const PokemonCard = ({pokemon}:Props) => {
     const router = useRouter()
     const onClick=()=>{
          router.push(`/pokemon/${pokemon.id}`)
     }
  return (
    <Grid key={pokemon.id} xs ={6} sm ={3} md = {2} xl={1}>
        <Card onClick={onClick}
        isHoverable isPressable>
        <Card.Body>
          <Card.Image
            src={pokemon.img}
            width="100%"
            height={140}/>
        </Card.Body>
        <Card.Footer>
          <Row justify="space-between">
            <Text transform='capitalize'> {pokemon.name}</Text>
            <Text> {pokemon.id}</Text>
          </Row>
        </Card.Footer>
        </Card>

      </Grid>
  )
}