import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";



export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages,setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [unseenMessages, setUnseenMessages] = useState({});
    
    const {socket, axois} = useContext(AuthContext);

    //function to get all users for sidebar
    const getUsers = async () =>{
        try {
            const {data} = await axois.get("/api/messages/users");
            if (data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        }catch (error){
            toast.error(error.message)
        }
    }


    //function to get message for selected user
    const getMessages = async (userId)=>{
        try{
            const {data} = await axois.get(`/api/messages/${userId}`);
            if (data.success){
                setMessages(data.messages)
            }
        }catch (error){
            toast.error(error.message)
        }
    }
    //function to send message to selected user
    const sendMessage = async (messageData)=>{
        try {
            const {data} = await axois.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages, data.newMessage])
            }else{
                toast.error(data.message);
            }
            }catch(error){
                toast.error(error.message)
            }
        }
        //function to subscrib to message for selected user
        const subscribeToMessages = async ()=>{
            if(!socket) return;
            socket.on("newMessage", (newMessage)=>{
                if(selectedUser && newMessage.senderId === selectedUser._id){
                    newMessage.seen = true;
                    setMessages((prevMessages)=> [...prevMessages, newMessage]);
                    axois.put(`/api/messages/mark/${newMessage._id}`);
                }else{
                    setUnseenMessages((prevUnseenMessages)=>({
                        ...prevUnseenMessages, [newMessage.senderId] :
                         prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                        [newMessage.senderId] + 1 :1

                    }))
                }
            })
        }
        //function to unsbscribe ftom message
        const unsubscribeFromMessages = ()=>{
            if(socket) socket.off("newMessage");
        }
        useEffect(()=>{
            subscribeToMessages();
            return ()=> unsubscribeFromMessages();
        }, [socket, selectedUser])
    
    const value = {
        messages, users, selectedUser, getUsers, setMessages, sendMessage,setSelectedUser, unseenMessages, setUnseenMessages

    }
    return (
        <ChatContext.Provider value={{value}}>
            {children}
        </ChatContext.Provider>
    )
}