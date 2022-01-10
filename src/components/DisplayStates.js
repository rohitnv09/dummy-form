import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material';

function Login() {
    const user = useSelector((state) => state.user.value)
    const [clicked, setClicked] = useState(false)
    const mystyle = {
        color: "black",
        padding: "30px",
        fontFamily: "Arial"
    };

    const handleClick = () => {
        clicked ?
            setClicked(false) : setClicked(true)
    }

    return (
        <div style={{ margin: "2rem" }}>
            <Button variant="contained" onClick={handleClick}>Toggle States</Button>
            <p>
                <pre style={mystyle}>{clicked && JSON.stringify(user, undefined, 2)}</pre>
            </p>
        </div>
    )
}

export default Login
