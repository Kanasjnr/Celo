import { Box } from '@chakra-ui/react'
import React from 'react'
import SidebarWithHeader from '../components/SidebarWithHeader'
import RedeemGiftcard from '../components/Dashboard/RedeemGiftcard'

const RedeemGiftcardPage = () => {
  return (
    <Box>
        <SidebarWithHeader>
            <RedeemGiftcard/>
        </SidebarWithHeader>
      
    </Box>
  )
}

export default RedeemGiftcardPage
