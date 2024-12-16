import React from 'react'
import { Outlet } from 'react-router-dom'

function AuthLayout() {
    return (
        <div className="flex min-h-screen w-full">
            {/* Left Section */}
            <div className="hidden lg:flex items-center justify-center w-1/2">
                <div className="text-center text-black">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Welcome to SMVDU Grocery Application!
                    </h1>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex-1 flex items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
                <Outlet />
            </div>
        </div>
    )
}

export default AuthLayout