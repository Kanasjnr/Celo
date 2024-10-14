import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import CreateGiftCard from '../components/Dashboard/CreateGiftcard'

const CreateGiftcard = () => {
  return (
    <Box>
        <SidebarWithHeader>
            <CreateGiftCard/>
        </SidebarWithHeader>
      
    </Box>
  )
}

export default CreateGiftcard
