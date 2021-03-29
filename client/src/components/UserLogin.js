import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function UserLogin() {

    const [email, setUserEmail] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    Axios.defaults.withCredentials = true;
    const login = () => {
        Axios.post('http://localhost:5000/api/login', {
            email: email, 
            user_password: user_password
        }).then((response) => {
            if (response.data.message) {
                setLoginStatus(response.data.message)
            }
            else {
                setLoginStatus(response.data[0].first_name)
            }
        })
    }

    useEffect(() => {
        Axios.get("http://localhost:5000/api/login").then((response) => {
        console.log(response);
        })
    });

    return(
        <div className="container">
        <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
                <form>
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Enter email"
                            onChange={(e) => {setUserEmail(e.target.value)}}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            onChange={(e) => {setUserPassword(e.target.value)}}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={login}>Sign in</button>
                    <div className="form-group">
                        <h2 className="displaty-4 lead text-center mt-4">
                            Don't have an Account ?
                            <a href="/register">Sign Up Now</a>
                        </h2>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default UserLogin