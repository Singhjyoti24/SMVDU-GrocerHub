import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

function AdminLayout() {
    const [openSidebar, setOpenSidebar] = useState(false)

    return (
        <div className='flex min-h-screen w-full'>
            {/* Admin sidebar */}
            <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
            <div className="flex flex-1 flex-col">
                {/* Admin header */}
                <AdminHeader setOpen={setOpenSidebar} />
                <main className='flex-1 flex-col flex bg-muted/40 md:p-6'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default AdminLayout