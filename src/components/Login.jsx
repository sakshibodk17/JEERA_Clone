import react, {useState} from 'react';
import axios from 'axios';

const Login=()=>{
    const [email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[errors, setErrors]=useState({email:'',password:''});

    const handleLogin= async(e)=>{
        e.preventDefault();

        setErrors({email:'', password:''});

        if(!email){
            setErrors((prevErrors)=>({
                ...prevErrors,
                email:"Email is required",
            }));
            return;

        }
        if(!/\S+@\S+\.\S+/.test(email)){
            setErrors((prevErrors)=>({
                ...prevErrors,
                email:'Please enter a valid email address'
            }));

            return;

        }
        if(!password){
            setErrors((prevErrors)=>({
                ...prevErrors,
                password: 'Password is required',
            }));
            return;
        }
        try{
            const response= await axios.post('/api/login',{Eamil:email, Password: password});

        }catch(error){
           console.log("Login Failed:", error);

        }
        
    };
  
    return (
        <div className="flex items-center justify-center h-screen">
          <form className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl mb-4">Login</h2>


            <div className="space-y-6">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
                   {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
             {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
             </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded"
              onClick={handleLogin}
            > Login
            </button>
          </form>
        </div>
      );
    };
    
    export default Login;