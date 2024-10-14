import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import Dashboard from '../components/Dashboard/Dashboard'

const DashboardPage = () => {
  return (
    <Box>
        <SidebarWithHeader>
          <Dashboard/>
          </SidebarWithHeader> 
    </Box>
  )
}

export default DashboardPage
