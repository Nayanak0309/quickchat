import React, { useEffect, useRef } from "react"
import assets, { messagesDummyData } from "../assets/assets/assets"
import { formatMessageTime } from "../lib/utils"

const ChatContainer = ({selectedUser, setSelectedUser}) => {

    const scrollEnd= useRef()
    
    useEffect(()=>{
      if(scrollEnd.current){
        scrollEnd.current.scrollIntoView({ behavior: "smooth" });

      }
    },[])


  return  selectedUser ? (
    <div className="h-full overflow-scroll relative backdrop-blur-lg">
      {/* ---------header--------*/}
      <div className='flex items-center gap-3 py-3 mx-4 border-b border-stone-500'>
        <img src={assets.profile_martin} alt="" className="w-8 rounded-full"/>
        <p className='flex-1 text-lg text-white flex items-center gap-2'>
          Martin Johnson
          <span className="W-2 h-2 rounded-full bg-green-500"></span>
          </p>
          <img onClick={()=> setSelectedUser(null)} src={assets.arrow_icon} alt="" className='md:hidden max-w-7'/>
          <img src={assets.help_icon} alt="" className='max-md:hidden max-w-5'/>
      </div>


      {/*------chat area-------*/}
      <div className="flex flex-col h-[calc(100%-120px)] overflow-y-scroll p-3 pb-6">
        {messagesDummyData.map((msg, index) => {
  // 👇 Define this first before using it
  const isSender = msg.senderId === "680f50e4f10f3cd28382ecf9"; // your ID

  return (
    <div key={index} className="mb-3">
      <div
        className={`flex items-end gap-2 ${
          isSender ? "justify-end" : "justify-start"
        }`}
      >
        {/* Receiver profile */}
        {!isSender && (
          <img
            src={selectedUser?.profilePic || assets.profile_martin}
            alt="receiver"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}

        {/* Message bubble */}
        {msg.image ? (
          <img src={msg.image} alt="" className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"/>
        ):(


        
      
        <div
          className={`max-w-[230px] md:max-w-[320px] p-2 rounded-2xl wrap-break-word ${
            isSender
              ? "bg-[#8185B2]/30 rounded-br-none text-white"
              : "bg-gray-700/40 rounded-bl-none text-white"
          }`}
        >
          {msg.text}
        </div>
        )}

        {/* Sender profile */}
        {isSender && (
          <img
            src={assets.avatar_icon}
            alt="You"
            className="w-8 h-8 rounded-full object-cover"
          />
        )}
      </div>

      {/* Message time */}
      <p
        className={`text-xs text-gray-400 mt-1 ${
          isSender ? "text-right pr-10" : "text-left pl-10"
        }`}
      >
        {formatMessageTime(msg.createdAt)}
      </p>
    </div>
  );
})}

    
            
          
          
        
        <div ref={scrollEnd}>

        </div>



      </div>


      {/*---botom area----*/}
      <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input type="text" placeholder="send a message" 
          className="flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-500"/>
          <input type="file" id='image' accept='image/png, image/jpeg' hidden/>
          <label htmlFor="image">
            <img src={assets.gallery_icon} alt="" className="w-5 mr-2 cursor-pointer"/>
            </label>

        </div>
        <img src={assets.send_button} alt=""  className="w-7 cursor-pointer"/>
      </div>
    </div >
  ) : (
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  )
}

export default ChatContainer
