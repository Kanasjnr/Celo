import { Box } from '@chakra-ui/react'
import React from 'react'
import NavBar from '../components/NavBar'
import Hero from '../components/Home/Hero'
import Content from '../components/Home/Content'
import Offer from '../components/Home/Offer'
import Footer from '../components/Home/Footer'

const HomePage = () => {
  return (
   <Box>
    <NavBar position={"sticky"} zIndex={9999} top={0}/>
    <Hero/>
    <Content/>
    <Offer/>
    <Footer/>

   </Box>
  )
}

export default HomePage
