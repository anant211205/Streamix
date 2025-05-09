import { useState } from "react"
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {

    const [loginData , setLoginData] = useState({
        email : "" ,
        password: "" ,
    })
    
    const {error , isPending , loginMutation} = useLogin() ;
    
    const handleLogin = (e) => {
        e.preventDefault() ;
        loginMutation(loginData) ;
    }

    return (
        <div className="bg-[#1a1f24] min-h-screen p-6 md:p-8">
            <div className="flex flex-col lg:flex-row max-w-5xl mx-auto rounded-xl overflow-hidden">
                <div className="w-full lg:w-1/2 lg:p-8 p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <ShipWheelIcon className="size-8 text-indigo-500"/>
                        <span className="text-2xl font-bold text-indigo-500">StreamChat</span>
                    </div>
                    
                    {
                        error && (
                            <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-md p-4 mb-6">
                                <span>{error.response.data.message}</span>
                            </div>
                        )
                    }

                    <div>
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-white">Welcome back</h2>
                                    <p className="text-gray-400">Sign in to your account to continue your language journey</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="block text-gray-300 font-medium">
                                            Email
                                        </label>
                                        <input 
                                            type="email" 
                                            placeholder="hello@gmail.com"
                                            className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={loginData.email}
                                            onChange={(e) => setLoginData({...loginData , email: e.target.value})}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-gray-300 font-medium">
                                            Password
                                        </label>
                                        <input 
                                            type="password" 
                                            placeholder="••••••"
                                            className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            value={loginData.password}
                                            onChange={(e) => setLoginData({...loginData , password: e.target.value})}
                                            required
                                        />
                                    </div>

                                <button 
                                    type="submit" 
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mt-6" 
                                    disabled={isPending}
                                >
                                    {
                                        isPending ? (
                                            <>
                                                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Signing in...
                                            </>
                                        ) : (
                                            "Sign In"
                                        )
                                    }
                                </button>
                                
                                <div className="text-center mt-4">
                                    <p className="text-gray-400">
                                        Don't have an account? {" "}
                                        <Link to="/signup" className="text-indigo-500 hover:text-indigo-400 font-medium">
                                            Create one
                                        </Link>
                                    </p>
                                </div>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                
                <div className="hidden lg:block w-1/2 bg-[#1e252b]">
                    <div className="h-full flex flex-col items-center justify-center p-8">
                        <div className="relative aspect-square max-w-xs mx-auto mb-8">
                            <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain" />
                        </div>
                        <div className="text-center space-y-3">
                            <h2 className="text-xl font-bold text-indigo-500">Connect with language partners worldwide</h2>
                            <p className="text-gray-400 max-w-sm">
                                Practice conversations, make friends, and improve your language skills together
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage