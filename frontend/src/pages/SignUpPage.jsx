import { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import { Link } from 'react-router'
import useSignup from '../hooks/useSignup'

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "", 
    email: "",
    password: "" 
  })

  // const queryClient = useQueryClient()

  // const {mutate , isPending , error} = useMutation({
  //   mutationFn : signup ,
  //   onSuccess: () => queryClient.invalidateQueries({
  //     queryKey : ["authUser"]
  //   })
  // })

  const {isPending , error , signupMutation} = useSignup() ;

  const handleSignup = (e) => {
    e.preventDefault() ;
    signupMutation(signupData) ;
  }

  return (
    <div data-theme="forest" className="py-8 md:py-12 bg-base-200">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl mx-auto shadow-xl overflow-hidden rounded-xl">
        {/* signup form - left side */}
        <div className="w-full lg:w-1/2 bg-base-100 p-6 md:p-8">
          {/* logo */}
          <div className="flex items-center gap-2 mb-6">
            <ShipWheelIcon className="size-8 text-primary"/>
            <span className="text-xl font-bold text-primary">StreamChat</span>
          </div>

          {error && (
            <div className='alert alert-error mb-4'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div>
            <form onSubmit={handleSignup} className="space-y-6">
              <div className="space-y-5">
                <div className="text-center lg:text-left space-y-1">
                  <h2 className="text-2xl font-bold">Create an Account</h2>
                  <p className="text-base-content/70 text-sm">Join StreamChat and start your adventure of learning language</p>
                </div>
                <div className="space-y-3">
                  <div className="form-control w-full">
                    <label className="label py-1">
                      <span className="label-text font-medium">Full Name</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="input input-bordered input-md w-full focus:border-primary"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({
                        ...signupData, fullName: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label py-1">
                      <span className="label-text font-medium">Email</span>
                    </label>
                    <input 
                      type="email" 
                      placeholder="john@example.com"
                      className="input input-bordered input-md w-full focus:border-primary"
                      value={signupData.email}
                      onChange={(e) => setSignupData({
                        ...signupData, email: e.target.value
                      })}
                      required
                    />
                  </div>

                  <div className="form-control w-full">
                    <label className="label py-1">
                      <span className="label-text font-medium">Password</span>
                    </label>
                    <input 
                      type="password" 
                      placeholder="••••••"
                      className="input input-bordered input-md w-full focus:border-primary"
                      value={signupData.password}
                      onChange={(e) => setSignupData({
                        ...signupData, password: e.target.value
                      })}
                      required
                    />
                    <p className="text-xs mt-1 text-base-content/70">Password must be at least 6 characters long</p>
                  </div>
                  
                  <div className="mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="checkbox checkbox-sm checkbox-primary" required/>
                      <span className="text-sm">
                        I agree to the{" "}
                        <span className="text-primary hover:underline cursor-pointer">terms of service</span> and{" "}
                        <span className="text-primary hover:underline cursor-pointer">privacy policy</span>
                      </span>
                    </label>
                  </div>  
                </div>
                
                <button className="btn btn-primary w-full" type="submit">
                  {isPending ?  (
                    <>
                    
                    <span className='loading loading-apinner loading-xs'></span>
                    Loading...
                    </>
                  )  : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right side illustration */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-8">
          <div className="max-w-sm p-4">
            {/* Illustration */}
            <div className="relative aspect-square max-w-xs mx-auto">
              <img src="/i.png" alt="Language connection illustration" className="w-full h-full object-contain" />
            </div>

            <div className="text-center space-y-2 mt-6">
              <h2 className="text-xl font-bold text-primary">Connect with language partners worldwide</h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
