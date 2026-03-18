import React, { useContext, useEffect, useState } from 'react'
import './Chatwindow.css'
import Chat from './Chat.jsx'
import { MyContext } from './MyContext.jsx'
import {ScaleLoader} from 'react-spinners'

const ChatWindow = () => {
  const {prompt,setPrompt,reply,setReply,currThreadId,prevChats, setPrevChats,setNewChat}=useContext(MyContext);
  const [loading,setLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false);

  const getReply = async()=>{
    if(!prompt.trim() || loading) return;
    const userPrompt = prompt;
    setLoading(true);
    setNewChat(false);
    console.log("message",prompt,"thradid",currThreadId)
    const options = {
      method:"POST",
      headers:{"Content-Type":"application/json"
      },
      body:JSON.stringify({
        message:prompt,
        threadId:currThreadId
      })
    }

    try {
     const response =  await fetch("http://localhost:5000/api/chat",options);
     const res = await response.json();
     console.log(res)
     setReply(res.reply);
     setPrevChats(prev=>[
      ...prev,{role:"user",content:userPrompt},{role:"assistant",content:res.reply}
     ])
     setPrompt("");
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  useEffect(()=>{
    if(prompt && reply){
      setPrevChats(prevChats=>(
        [...prevChats,{
          role:"user",
          content:prompt
        },{
          role:"assistant",
          content:reply
        }]
      ))
    }
    setPrompt("")
  },[reply])

  const handleProfileClick = ()=>{
    setIsOpen(!isOpen);
  }
  return (
    <div className='chatWindow'>
      <div className="navbar">
        <span>GPT <i className='fa-solid fa-chevron-down'></i></span>
        <div className="userIconDiv" onClick={handleProfileClick}>
          <span className='userIcon'><i className='fa-solid fa-user'></i></span>
        </div>
      </div>
      {isOpen && <div className='dropDown'>
        <div className="dropDownItem" ><i class="fa-solid fa-cloud-arrow-up"></i>Upgrade Plan</div>
        <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
        <div className="dropDownItem"><i class="fa-solid fa-sign-out"></i>Logout</div>
       

        </div>}

      <div className="chatArea">

      <Chat />

      {loading && <ScaleLoader color='#fff' />}
    </div>

      <div className="chatInput">
        <div className="inputBox">
          <input placeholder="Ask anything" value={prompt}
              onChange={(e)=>setPrompt(e.target.value)}
              onKeyDown={(e)=>{
  if(e.key==="Enter"){
    getReply();
  }
}}>
              
          </input>
      <div id='submit' onClick={getReply}><i className='fa-solid fa-paper-plane'></i></div>

        </div>
        <div className="info">
          Gpt is a large language model trained by OpenAI.
        </div>
      </div>
    </div>
  )
}

export default ChatWindow
