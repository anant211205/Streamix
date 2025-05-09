import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { completeOnboarding } from "../lib/api";
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from "lucide-react";
import { LANGUAGES } from "../constants";

const OnboardingPage = () => {

  const {authUser} = useAuthUser() ;
  const queryClient = useQueryClient() ;

  const [formState , setFormState] = useState({
    fullName : authUser?.fullName || "" ,
    bio : authUser?.bio || "" ,
    nativeLanguage : authUser?.nativeLanguage || "" ,
    learningLanguage : authUser?.learningLanguage || "" ,
    location : authUser?.location || "" ,
    profilePic : authUser?.profilePic || "" ,
  })

  const {mutate:onBoardingMutation , isPending} = useMutation({
    mutationFn : completeOnboarding, 
    onSuccess: () => {
      toast.success("Profile Onboarded successfully") ;
      queryClient.invalidateQueries({queryKey : ["authUser"]}) ;
    },
    onError  : (error) => {
      toast.error(error.response.data.message)
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    onBoardingMutation(formState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1 ;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({...formState , profilePic: randomAvatar});
    toast.success("Avatar changed successfully")
  }

  return (
    <div className="bg-[#1a1f24] min-h-screen p-6 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <ShipWheelIcon className="size-8 text-indigo-500"/>
          <span className="text-2xl font-bold text-indigo-500">Complete Your Profile</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* profile pic container */}
          <div className="flex flex-col items-center sm:items-start gap-4 mb-6">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-700 bg-gray-800">
              {
                formState.profilePic ? (
                  <img 
                    src={formState.profilePic} 
                    alt="Profile preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <CameraIcon size={50}/>
                  </div>
                )
              }
            </div>
            <button 
              type="button" 
              onClick={handleRandomAvatar} 
              className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded-md flex items-center gap-2 transition-colors"
            >
              <ShuffleIcon size={18}/>
              Generate Random Avatar
            </button>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">
                Full Name
              </label>
              <input 
                type="text" 
                name="fullName"
                value={formState.fullName}
                onChange={(e) => setFormState({...formState , fullName: e.target.value})}
                className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">
                Location
              </label>
              <input 
                type="text" 
                name="location"
                value={formState.location}
                onChange={(e) => setFormState({...formState, location: e.target.value})}
                placeholder="City, Country"
                className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-300 font-medium">
              Bio
            </label>
            <textarea 
              name="bio" 
              value={formState.bio}
              onChange={(e) => setFormState({...formState , bio:e.target.value})}
              className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 h-32"
              placeholder="Tell others about yourself and your language goals"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">
                Native Language
              </label>
              <select 
                name="nativeLanguage" 
                value={formState.nativeLanguage}
                onChange={(e) => setFormState({...formState, nativeLanguage: e.target.value})}
                className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select your native language</option>
                {
                  LANGUAGES.map((lang) => (
                    <option 
                      key={`native-${lang}`}
                      value={lang.toLowerCase()}
                    >
                      {lang}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">
                Learning Language
              </label>
              <select 
                name="learningLanguage" 
                value={formState.learningLanguage}
                onChange={(e) => setFormState({...formState, learningLanguage: e.target.value})}
                className="w-full bg-[#1e252b] border border-gray-700 rounded-md py-3 px-4 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="">Select language you are learning</option>
                {
                  LANGUAGES.map((lang) => (
                    <option 
                      key={`learning-${lang}`}
                      value={lang.toLowerCase()}
                    >
                      {lang}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <button 
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-md flex items-center justify-center gap-2 transition-colors mt-8" 
            disabled={isPending} 
            type="submit"
          >
            {
              !isPending ? (
                <>
                  <ShipWheelIcon size={20}/>
                  Complete Onboarding
                </>
              ) : (
                <>
                  <LoaderIcon className="animate-spin" size={20}/>
                  Onboarding...
                </>
              )
            }
          </button>
        </form>
      </div>
    </div>
  )
}

export default OnboardingPage
