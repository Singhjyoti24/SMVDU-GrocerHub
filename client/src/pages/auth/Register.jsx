import Form from '@/components/common/Form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
    userName: '',
    email: '',
    password: ''
}

function Register() {
    const [formData, setFormData] = useState(initialState)
    console.log(formData)

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { toast } = useToast();
    console.log(toast)

    function onSubmit(event) {
        event.preventDefault();
        dispatch(registerUser(formData)).then((data) => {
            console.log(data)
            if (data?.payload?.success==='true') {
                toast({
                    title: data?.payload?.message,
                });
                navigate("/auth/login");
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
                <h1 className='text-3xl text-foregroundf font-bold tracking-tight'>Create new Account</h1>
                <p className='mt-2'>
                    Already have an account
                    <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/login">
                        Login
                    </Link>
                </p>
            </div>
            <Form
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default Register