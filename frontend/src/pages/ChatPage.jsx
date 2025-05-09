import { useEffect, useState } from 'react';
import { useParams } from 'react-router'
import useAuthUser from '../hooks/useAuthUser.js';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api.js';
import { Chat, Channel, ChannelHeader, MessageInput, MessageList, Window, Thread } from 'stream-chat-react';

import {StreamChat} from "stream-chat"
import ChatLoader from '../components/ChatLoader.jsx';
import toast from 'react-hot-toast';
import CallButton from '../components/CallButton.jsx';

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY

const ChatPage = () => {
  const {id:targetUserId} = useParams() ;
  // console.log(id)

  const [chatClient , setChatClient] = useState(null) ;
  const [channel , setChannel] = useState(null) ;
  const [loading , setLoading] = useState(true) ;

  const {authUser} = useAuthUser() ;

  // run only when authUser is enabled
  const {data: tokenData} = useQuery({
    queryKey :["streamToken"] ,
    queryFn : getStreamToken ,
    enabled : !!authUser
  })

  useEffect(() => {
    const initChat = async () => {
      if(!tokenData?.token || !authUser) return ;
      try {
        console.log("Initialising stream chat client")
        
        const client = StreamChat.getInstance(STREAM_API_KEY) ;
        
        // console.log("Token:", tokenData?.token);
        // console.log("Auth user:", authUser);
        // console.log("Chat client instance:", client);
        await client.connectUser({
          id : authUser._id ,
          name : authUser.fullName ,
          image : authUser.profilePic
        },tokenData.token)

        const channelId = [authUser._id , targetUserId].sort().join("-")

        const currChannel = client.channel("messaging" , channelId ,{
          members : [authUser._id , targetUserId] ,
        })

        await currChannel.watch();

        setChatClient(client) ;
        setChannel(currChannel) ;
        
      } catch (error) {
        console.log("Error inititalising chat" , error) ;
        toast.error("Could not connect to chat. Please try again") 
      }finally{
        setLoading(false) ;
      }
      
    };
    initChat(); 
  },[tokenData, authUser, targetUserId])
  
  const handleVideoCall = () => {
    if(channel){
      const callUrl = `${window.location.origin}/call/${channel.id}`
      channel.sendMessage({
        text : `I've started a video call . Join me here: ${callUrl}` ,
      })
      toast.success("video call link set successfully");
    }
  }

  if(loading || !chatClient || !channel) return <ChatLoader/> ;

  return (
    <div className="container mx-auto px-4 py-8 h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput />
            </Window>
          </div>
          <Thread/>
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
