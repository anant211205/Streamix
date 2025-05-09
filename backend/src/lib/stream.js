import { StreamChat } from "stream-chat"
import "dotenv/config"

const apiKey = process.env.STREAM_API_KEY
const apiSecret = process.env.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("stream API key or secret is missing") 
}

const streamClient = StreamChat.getInstance(apiKey , apiSecret) ;

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUsers([userData]) ;     
        // console.log(userData)
        return userData ;
    } catch (error) {
        console.log("Error upserting stream user" , error);
    }
}

//TODO 
export const generateStreamToken = (userID) => {
    try {
        //ensure userId is string
        const userIdStr = userID.toString() 
        return streamClient.createToken(userIdStr); 

    } catch (error) {
        console.error("Error generating stream token" , error)
    }
} ;

