import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import Settings from '../components/Dashboard/Settings'

const SettingsPage = () => {
  return (
    <Box>
        <SidebarWithHeader>
            <Settings/>
        </SidebarWithHeader>
        
      
    </Box>
    
  )
}

export default SettingsPage
