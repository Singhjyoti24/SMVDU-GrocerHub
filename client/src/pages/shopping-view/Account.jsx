import React from 'react'
import accImg from '../../assets/cart.webp'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Orders from '@/components/shopping-view/Orders'
import Address from '@/components/shopping-view/Address'

function Account() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg} className='w-full h-full object-cover object-center' />
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col border bg-background rounded-lg p-6 shadow-sm">
          <Tabs defaultValue='orders'>
            <TabsList>
              <TabsTrigger value='orders'>
                Orders
              </TabsTrigger>
              <TabsTrigger value='address'>
                Address
              </TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Account