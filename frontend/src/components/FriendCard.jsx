import { Link } from "react-router"
import { LANGUAGE_TO_FLAG } from "../constants";


const FriendCard = ({ friend }) => {
    return (
        <div className="card bg-base-100 shadow-xl p-4 h-full flex flex-col">
            <div className="card-body p-0 flex flex-col h-full">
                {/* USER INFO */}
                <div className="flex items-center mb-4">
                    <div className="avatar mr-4">
                        <div className="w-16 rounded-full">
                            <img src={friend.profilePic} alt={friend.fullName} />
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold">{friend.fullName}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4 text-sm opacity-70">
                    <span className="badge badge-outline badge-sm">
                        {getLanguageFlag(friend.nativeLanguage)}
                        Native: {friend.nativeLanguage}
                    </span>
                    <span className="badge badge-outline badge-sm">
                        {getLanguageFlag(friend.learningLanguage)}
                        Learning: {friend.learningLanguage}
                    </span>
                </div>

                <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full mt-auto">
                    Message
                </Link>
            </div>
        </div>
    )
}
export default FriendCard

export function getLanguageFlag(language) {
    if (!language) return null;
    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
        return (
            <img
                src={`https://flagcdn.com/24x18/${countryCode}.png`}
                alt={`${langLower} flag`}
                className="h-3 mr-1 inline-block"
            />
        )
    }
    return null ;
}

