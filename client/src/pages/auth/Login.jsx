import Form from '@/components/common/Form'
import { loginFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const initialState = {
    email: '',
    password: ''
}

function Login() {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch();
    const { toast } = useToast();

    function onSubmit(event) {
        event.preventDefault();
        dispatch(loginUser(formData)).then((data) => {
            console.log(data)
            if (data?.payload?.success==='true') {
                toast({
                    title: data?.payload?.message,
                });
            } else {
                toast({
                    title: data?.payload?.message,
                    variant: 'destructive'
                });
            }
        });
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl text-foregroundf font-bold tracking-tight'>Sign in to your account</h1>
                <p className='mt-2'>
                    Didn't have an account
                    <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/register">
                        Register
                    </Link>
                </p>
            </div>
            <Form
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default Login