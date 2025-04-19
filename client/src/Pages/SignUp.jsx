import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigate = useNavigate();

    const formSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            alert("Please fill all the fields");
            return;
        }

        try {
            const resp = await fetch("http://localhost:4000/api/v1/patient-auth/sign-up-patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await resp.json();

            if (resp.status === 201) {
                alert("User registered successfully");
                navigate("/signin");
            }else if(resp.status == 429){
                alert("Too many requests. Please try again later.");
            } else if (data?.errors?.length > 0) {
                alert(data.errors[0].msg); // 👈 show alert here
            } else if (data?.message) {
                alert(data.message);
            }

            console.log("signup data:", data);
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.error("Signup error:", error);
        }
    };

  return (
      <div className="wrapper signUp">
         
          <div className="form">
              <div className="heading">CREATE AN ACCOUNT</div>
              <form onSubmit={(e)=> formSubmit(e)}>
                  <div>
                      <label htmlFor="name">Name</label>
                      <input 
                      type="text" 
                      id="name" 
                      placeholder="Enter your name"
                      value={name}
                        onChange={(e)=> setName(e.target.value)}
                     />
                  </div>
                  <div>
                      <label htmlFor="name">E-Mail</label>
                      <input 
                      type="email" 
                      id="name" 
                      placeholder="Enter your mail"
                      value={email}
                      onChange={(e)=> setEmail(e.target.value)}
                      />
                  </div>
                  <div>
                      <label htmlFor="password">Password</label>
                      <input
                          type="password"
                          id="password"
                          placeholder="Enter you password"
                         value={password}
                         onChange={(e)=> setPassword(e.target.value)}
                      />
                  </div>
                  <button type="submit">Submit</button>
                  <h2 align="center" className="or">
                      OR
                  </h2>
              </form>
              <p>
                  Have an account ? <Link to="/signin"> Login </Link>
              </p>
          </div>
      </div>
  )
}

export default SignUp