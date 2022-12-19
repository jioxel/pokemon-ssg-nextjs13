import Head from "next/head"
import { FC } from "react"
import { Navbar } from '../ui/Navbar';

interface Props{
     children:JSX.Element | JSX.Element[]
     title?:string
}
const origin=(typeof window==='undefined')? '':window.location.origin
export const Layout = ({children,title="Pokemon App"}:Props) => {
     
     

  return (
    <>
          <Head>
               <title>{title}</title>
               <meta name="author" content="Jovany Valdelamar"  />
               <meta name="description " content={`Informacion sobre el pokemon ${title}`}/>
               <meta name="keywords" content={`${title}, pokemon, pokedex`} />

               <meta property="og:title" content="Información sobre el pokemon" />
               <meta property="og:description" content="Pagina que muestra informacion sobre un pokemon" />
               <meta property="og:image" content={`${origin}/img/poster,504x498,f8f8f8-pad,600x600,f8f8f8.u1.jpg`} />
          </Head>
          <Navbar/>
          <main style={{
               padding:'0px 20px'
          }}>
               {children}
          </main>
    </>
  )
}