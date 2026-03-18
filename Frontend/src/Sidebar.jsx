import React, { useState } from 'react'
import { useContext,useEffect } from 'react'
import { MyContext } from './MyContext.jsx'
import './sidebar.css'
import {v1 as uuidv1} from 'uuid'

const Sidebar = () => {
  const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setCurrThreadId,setPrevChats} = useContext(MyContext);

  const getAllThreads = async()=>{
    try {
      const res = await fetch("http://localhost:5000/api/thread");
      const data = await res.json();
      const filteredData = data.map(thread=>({
        threadId: thread.threadId,
        title: thread.title,
        updatedAt: thread.updatedAt
      }))
      // console.log(filteredData);
      setAllThreads(filteredData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getAllThreads();
  },[currThreadId])

  const deleteThread = async (threadId)=>{
  try {
    const response = await fetch(`http://localhost:5000/api/thread/${threadId}`,{
      method:"DELETE"
    });
    console.log(response)
    setAllThreads(prev =>prev.filter(thread=>thread.threadId != threadId));
    if(threadId===currThreadId){
      createNewChat();
    }
  } catch (error) {
    console.log(error)
  }
  }

  const createNewChat = ()=>{
    setNewChat(true);
    setPrompt("")
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);

  }

  const changeThread = async(newThreadId)=>{
    setCurrThreadId(newThreadId);
    setPrevChats([]);

    try {
      const res = await fetch(`http://localhost:5000/api/thread/${newThreadId}`);
      const data = await res.json();
      setPrevChats(data);
      setNewChat(false);
      setReply(null);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <section className='sidebar'>
        {/* New chat */}
        <button className='new-chat' onClick={createNewChat}>
          <img src="src/assets/gpt-icon.png" alt="GPT" className='logo'/>
          <span className='icon'><i className="fa-solid fa-pen-to-square"></i></span>
        </button>
        
        {/* history */}
 <ul className="history">
        {allThreads?.map((thread,idx) => (
          <li key={idx} onClick={(e)=>changeThread(thread.threadId)} className={thread.threadId === currThreadId ? "highlighted":""}>
            {thread.title}
            <i
              className="fa-solid fa-trash delete"
              onClick={(e) =>{
                e.stopPropagation();
                deleteThread(thread.threadId);
              }}
            ></i>
          </li>
        ))}
      </ul>
        {/* signin */}
        <div className='sign'>
          <p>By ChatGpt &hearts;</p>
        </div>
      </section>
    </div>
  )
}

export default Sidebar
