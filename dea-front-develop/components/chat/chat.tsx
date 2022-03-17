
import { useLiveQuery } from "dexie-react-hooks";
import { useSession } from "next-auth/client";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { BotMessage, db } from "../../indexdb/db";
import chatService, { ChatbotResponse } from "../../services/chat.service";
import { Input } from "../input/Input";

export interface ChatMessageProps {
  item: BotMessage;
}
export interface ChatHistoryProps {
  items?: BotMessage[];
  userId: string;
}
export interface ChatButtonProps {
  onClick: any;
}
const ChatButton = ({ onClick }: ChatButtonProps) => {
  return <>
    <div className='fixed bottom-10 right-0'>
      <button onClick={onClick} className='my-8 float-right p-2 mr-5 shadow-2xl bg-red-900 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none'>
        <img src="/images/chat_logo.png" width={50} />
      </button>
    </div>
  </>
}

const ChatMessage = ({ item }: ChatMessageProps) => {
  if (!item.isReply) {
    return <>
      <div className="relative text-white p-5 ">
        <div className="text-center">
          <small className="text-white">{new Date(item.createdAt).toDateString()}</small>
        </div>
        <p className="bg-red-700 p-4  rounded-xl">{item.text}</p>
        <div className="absolute right-5 bottom-0">
             <img  src="/images/right_arrow.png" width={40} />
        </div>
      </div>

    </>
  } else {
    return <>
      <div className="relative text-black p-5">
        <div className="text-center">
          <small className="text-white">{new Date(item.createdAt).toDateString()}</small>
        </div>
        <div>
        <p className="bg-white p-4  rounded-xl">{item.text}</p>
        </div>
       
        <div className="absolute bottom-0">
        <img className="chat-arrow" src="/images/left_arrow.png" width={40} />
        </div>
   
      </div>

    </>
  }

}

const ChatHistory = ({ userId = '' }: ChatHistoryProps) => {
  const items = useLiveQuery(
    async () => {
      //
      // Query Dexie's API
      //
      const items = await db.botMessage
        .where({ userId: userId })
        .toArray();
      console.log(items);
      // Return result
      return items;
    },
    // specify vars that affect query:
    [userId]
  );
  return <>
    {items?.map((item: BotMessage) => <ChatMessage key={item.id} item={item} />)}
  </>
}

const ChatBot = () => {
  const [showChatbot, setShowChatbot] = useState<boolean>(false);
  const [sendMessage, setSendMessage] = useState<string>('');
  const [scrollToBottom, setScrollToBottom] = useState<boolean>(false);
  const [session] = useSession();
  const { user = {} } = session || {};
  const el = useRef(null);

  useEffect(() => {
    var objDiv: any = document.getElementById("el");
    if(objDiv){
      objDiv.scrollTop = objDiv?.scrollHeight;
    }
  }, [scrollToBottom]);

  async function addChatToDb() {
    if(!sendMessage && sendMessage.length ==0) return;
    try {
      const id = await db.botMessage?.add({
        text: sendMessage,
        isReply: false,
        type: 'user',
        userId: user.email || 'example@gmail.com',
        createdAt: new Date()
      });
      createMutated(sendMessage);
      setSendMessage('');
    } catch (error) {
      //  setStatus(`Failed to add ${name}: ${error}`);
    }
  }
  const {
    isLoading: createLoading,
    error: createError,
    mutate: createMutated,
    reset: createReset,
  } = useMutation((message: string) => chatService.getAnswer(message), {
    onSuccess: async (chatAnswer: ChatbotResponse) => {
      const id = await db.botMessage?.add({
        text: chatAnswer.answer,
        isReply: true,
        type: chatAnswer.type,
        userId: user.email || 'example@gmail.com',
        createdAt: new Date()
      });
      createReset();
      setScrollToBottom(!scrollToBottom);
    },
    onError: (err) => {
    },
  }
  );
  return <>
    <ChatButton onClick={() => {
      setShowChatbot(true);
      setTimeout(()=>{
        setScrollToBottom(!scrollToBottom);
      },1000)
    }} />
    {showChatbot && <div className="chat-popup rounded-xl relative  bg-black" id="myForm">
      <div className="flex justify-between p-2 bg-white">
        <div className="flex space-x-1">
          <div>  <img src="/images/chat_head.png" width={40} /></div>
          <div className="p-1 text-red-dark font-bold">chatbot name</div>
        </div>
        <div className="cursor-pointer"  onClick={() => setShowChatbot(false)}>
          <span
            className="flex justify-end text-right text-red-dark pr-2 font-bold"
           
          >
            &#10005;
          </span>
        </div>
      </div>
      <div className="messages  overflow-y-scroll overflow-x-hidden	 scrollbar" id={'el'} ref={el}>
        <ChatHistory userId={user.email || ""} />
      </div>
      <div className="send p-2">
        <Input
          type="text"
          className="mt-2 mb-0 shadow-lg bottom-0 text-red-600"
          rightIcon={"/images/send.png"}
          onKeyDown={e => e.key === 'Enter' && addChatToDb()}
          rightIconClick={addChatToDb}
          value={sendMessage}
          onChange={(e) => {
            setSendMessage(e.target.value);
          }}
          placeholder="Ask you question here."
          required
        />

      </div>
    </div>}
  </>
};

export default ChatBot;
