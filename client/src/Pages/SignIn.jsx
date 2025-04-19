import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignIn = () => {

      const [email,setEmail] = React.useState("")
      const [password,setPassword] = React.useState("")
      const navigate = useNavigate();
    
    const onLoginFormSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please enter all the fields");
            return;
        }

        const data = {
            email,
            password,
        };

        try {
            const resp = await fetch("http://localhost:4000/api/v1/patient-auth/sign-in-patient", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
                credentials: "include",
            });

            const result = await resp.json();

            if (resp.status === 200) {
                alert("Login success");
                navigate("/");
            }else if(resp.status == 429){
                alert("Too many requests. Please try again later.");

            } else if (result?.errors?.length > 0) {
                alert(result.errors[0].msg);
            } else if (result?.message) {
                alert(result.message);
            }

            // console.log("result", result);
        } catch (error) {
            alert("Something went wrong. Please try again.");
            console.log("error", error);
        }
    };

  return (
      <div className="wrapper signIn">
        
          <div className="form">
              <div className="heading">LOGIN</div>
              <form onSubmit={(e)=> onLoginFormSubmit(e)}>
                  <div>
                      <label htmlFor="name">email</label>
                      <input 
                      type="email" 
                      id="name" 
                      placeholder="Enter your email"
                        value={email}   
                        onChange={(e)=>setEmail(e.target.value)}
                      
                      />
                  </div>
                  <div>
                      <label htmlFor="e-mail">password</label>
                      <input type="password" 
                      id="e-mail"
                       placeholder="Enter you password"
                       value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                       />
                  </div>
                  <button type="submit">
                      Submit
                  </button>
              </form>
              <p>
                  Don't have an account ? <Link to="/signup"> Sign up </Link>
              </p>
          </div>
      </div>
  )
}

export default SignIn