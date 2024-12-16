import React from 'react'
import { Outlet } from 'react-router-dom'
import ShopHeader from './ShopHeader'

function ShopLayout() {
    return (
        <div className='flex flex-col overflow-hidden'>
            {/* Header component of Shopping view */}
            <ShopHeader />
            <main className='flex flex-col w-full'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShopLayout