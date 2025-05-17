import react, {useState} from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';

const Login=()=>{
    const [email, setEmail]= useState('');
    const[password, setPassword]= useState('');
    const[errors, setErrors]=useState({email:'',password:''});
    const[activeTab, setActiveTab] =useState('login');
    const navigate= useNavigate();

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
          const response = await axios.post('/api/auth/login', { email, password });
            console.log("Login Successful:", response.data);
        }catch(error){
           console.log("Login Failed:", error);

        }
        
    };
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
   
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-around mb-6">
          <button
            className={`font-bold text-lg ${activeTab === 'login' ? 'text-blue-600' : ''}`}
            onClick={() => handleTabChange('login')}
          >Login
          </button>
          <button
            className={`font-bold text-lg ${activeTab === 'register' ? 'text-blue-600' : ''}`}
            onClick={() => navigate('/register')}
          >Register 
          </button>
        </div>

        {activeTab === 'login' && (
          <form>
            <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            <div className="text-right mb-4">
              <button
                type="button"
                className="text-blue-500 text-sm hover:underline"
                onClick={() => navigate('/forgotpassword')}
              >Forgot Password?
              </button>
            </div>

            <button
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded"
              onClick={handleLogin}
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;