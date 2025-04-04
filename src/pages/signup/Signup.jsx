import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
import GenderCheckboxes from "./GenderCheckboxes";

const Signup = () => {


  const{loading, signup} = useSignup();


  const [inputs, setInputs] = useState({
    fullName:"",
    userName:"",
    password:"",
    confirmPassword:"",
    gender:""
  })

  const handleSubmit = async (e)=>{
    e.preventDefault();
    await signup(inputs);
  }
  const handleCheckboxChange = (gender)=>{
    setInputs({...inputs, gender});
  }

    return (
      <div className="hero min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up ChatApp</h1>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  placeholder="full name"
                  className="input input-bordered"
                  value={inputs.fullName}
                  onChange={(e)=>setInputs({...inputs, fullName:e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="username"
                  className="input input-bordered"
                  value={inputs.userName}
                  onChange={(e)=>setInputs({...inputs, userName:e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={inputs.password}
                  onChange={(e)=>setInputs({...inputs, password:e.target.value})}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="input input-bordered"
                  value={inputs.confirmPassword}
                  onChange={(e)=>setInputs({...inputs, confirmPassword:e.target.value})}
                />
              </div>

              {/* gender check boxes */}

              <GenderCheckboxes onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>


              <Link to="/login" className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
                  Already have an account?
              </Link>
              <div className="form-control mt-6">
                <button className="btn btn-primary text-gray-100" type="submit" disabled={loading}>
                  {
                    loading ? <span className="loading loading-spinner"></span>
                    : "Sign Up"
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };
  
  export default Signup;
  