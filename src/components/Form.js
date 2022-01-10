import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateFormData } from '../features/user'
import { Button, Container, TextField } from '@mui/material';
import api from '../api/users'


function Profile() {
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "", age: "", email: "", password: "", contactNumber: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const request = { ...user }
        await postUser(request)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        dispatch(updateFormData({ ...user, [name]: value }))
        validate([name], value)
    }

    const postUser = async (request) => {
        const response = await api.post('/users', { ...request });
        console.log(response);
    }

    const fetchUsers = async () => {
        const response = await api.get('/users');
        console.log(response);
    }

    const validate = (name, value) => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i;


        //age check
        if ([name] == 'age' && (value <= 1 || value >= 100)) {
            const res = { ...formErrors, [name]: "Invalid Age" }
            setFormErrors(res)
        } else {
            setFormErrors({ ...formErrors, [name]: "" })
        }

        //email check
        if ([name] == 'email' && !emailRegex.test(value)) {
            const res = { ...formErrors, [name]: "Invalid Email Address" }
            setFormErrors(res)
        } else {
            setFormErrors({ ...formErrors, [name]: "" })
        }
        //only the bottom one is functional, 'email' in this case.
        //if 'age' check is cut-pasted below 'email' check, then 'age' check
        //would be done but not email and vice versa.
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <>
            <Container maxWidth="sm">
                <h1>User Form</h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            required
                            name="firstName"
                            label="First Name:"
                            variant="filled"
                            type="text"
                            value={user.firstName} onChange={handleChange} />

                        <p>{formErrors.firstName}</p>
                    </div>

                    <div>
                        <TextField
                            required
                            name="lastName"
                            label="Last Name:"
                            variant="filled"
                            type="text"
                            value={user.lastName} onChange={handleChange} />
                        <p>{formErrors.lastName}</p>
                    </div>

                    <div>
                        <TextField
                            required
                            name="age"
                            label="Age:"
                            variant="filled"
                            type="number"
                            value={user.age} onChange={handleChange} />
                        <p>{formErrors.age}</p>
                    </div>

                    <div>
                        <TextField
                            required
                            name="email"
                            label="Email-ID:"
                            variant="filled"
                            type="email"
                            value={user.email} onChange={handleChange} />
                        <p>{formErrors.email}</p>
                    </div>

                    <div>
                        <TextField
                            required
                            name="password"
                            label="Password:"
                            variant="filled"
                            type="password"
                            value={user.password} onChange={handleChange} />
                        <p>{formErrors.password}</p>
                    </div>

                    <div>
                        <TextField
                            required
                            name="contactNumber"
                            label="Contact Number:"
                            variant="filled"
                            type="text"
                            value={user.contactNumber} onChange={handleChange} />
                        <p>{formErrors.contactNumber}</p>
                    </div>

                    <div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </div>
                </form>
            </Container>
        </>
    )
}

export default Profile
