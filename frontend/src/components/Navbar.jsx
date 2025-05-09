import useAuthUser from '../hooks/useAuthUser.js'
import { Link, useLocation } from 'react-router';
import { BellIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
import ThemeSelector from './ThemeSelector.jsx';
import useLogout from '../hooks/useLogout.js';

const Navbar = () => {

    const {authUser} = useAuthUser() ;
    const location = useLocation() ;
    const isChatPage = location.pathname?.startsWith("/chat")
    
    const {logoutMutation} = useLogout() ;

    return (
        <nav className="bg-[#1e252b] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
                {
                    isChatPage && (
                        <div className="flex items-center gap-2">
                            <Link to="/" className="flex items-center gap-2">
                                <ShipWheelIcon className="text-indigo-500"/>
                                <span className="text-xl font-bold">StreamChat</span>
                            </Link>
                        </div>
                    )
                }
            </div>

            <div className="flex items-center gap-4">
                <Link to="/notifications">
                    <button className="hover:text-indigo-500 transition-colors">
                        <BellIcon/>
                    </button>
                </Link>

                <ThemeSelector/>

                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700">
                    <img src={authUser?.profilePic} alt="User avatar" className="w-full h-full object-cover" rel='noreferrer' />
                </div>

                <button onClick={logoutMutation} className="hover:text-red-500 transition-colors">
                    <LogOutIcon/>
                </button>

            </div>     
        </nav>
    )
}

export default Navbar
