import  {useRef, useEffect, useContext, useState} from 'react'
import assets, { imagesDummyData } from '../assets/assets/assets'
import { ChatContext } from '../../context/ChatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {
  const {selectedUser, messages} = useContext(ChatContext)
  const {logout, onlineUsers} = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  //grt all the image from the messages and set them to state 
  useEffect(()=>{
     setMsgImages(
      messages.filter(msg => msg.image).map(msg=>msg.image)
     )
  }, [messages])
   
       
  return selectedUser &&  (
    <div className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? "max-md:hidden" : ""}`}>
      <div className='pt-7 flex flex-col items-center gap-1 text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon } alt='' className='w-20 aspect-square rounded-full'/>
        <h1 className=' flex items-center gap-1'>
         {onlineUsers.includes(selectedUser._id) &&  <p className='w-2 h-2 rounded-full bg-green-500'></p>}
          {selectedUser.fullName}
        </h1>
        <p className=' flex mx-auto text-x1'>{selectedUser.bio}</p>
      </div>
      <hr className='border-[#ffffff50] my-4'/>

      <div className='px-5 text-x5'>
        <p>Media</p>
      <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
        {msgImages.map((url, index)=>(
          <div key={index} onClick={()=> window.open(url)}
          className='cursor-pointer rounded'>
            <img src={url} alt="" className='h-full rounded-md'/>
          </div>
        ))}
      </div>
      </div>
       <div ref={scrollEnd}>

        


      <button  onClick={()=>logout} className='absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-linear-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
      </div>
    </div>
  )
}

export default RightSidebar
