import React, { useState } from 'react'
import Axios from 'axios';

function UserRegister() {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setUserEmail] = useState('');
    const [user_password, setUserPassword ] = useState('');

    const register = () => {
        Axios.post('http://localhost:5000/api/register', {
            first_name: first_name, 
            last_name: last_name, 
            email: email, 
            user_password: user_password
        }).then((response) => {
            console.log(response);
        })
    }

    return(
        <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>
                            <div className="form-group">
                                <label htmlFor="name">First name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="first_name"
                                    placeholder="Enter your first name"
                                    onChange={(e) => {
                                        setFirstName(e.target.value)
                                    }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Last name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="last_name"
                                    placeholder="Enter your lastname name"
                                    onChange={(e) => { setLastName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter email"
                                    onChange={(e) => { setUserEmail(e.target.value) }}
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
                                    onChange={(e) => { setUserPassword(e.target.value) }}
                                    required
                                />
                            </div>
                            <button className="btn btn-lg btn-primary btn-block" onClick={register}>Register</button>
                            <div className="form-group">
                                <h2 className="displaty-4 lead text-center mt-4">
                                    Already have an Account ?
                                    <a href="/login">Sign In Now</a>
                                </h2>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

    )
}

export default UserRegister;