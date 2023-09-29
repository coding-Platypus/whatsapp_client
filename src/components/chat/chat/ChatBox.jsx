import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ChatHeader from './ChatHeader';
import Messages from './Messages';
// import io from 'socket.io-client';

import { getConversation } from "../../../service/api";
// import { conversation } from "../../../../../server/database/selectConversation";

// const socket = io.connect("http://localhost:8000");

const ChatBox = ({friend}) => {
    const[conversation, setConversation] = useState('');
    // const[status, setStatus] = useState({});
    // let data = {
    //     user_id: friend.id
    //   }
    
    // socket.emit('socket-status', data);
    //     socket.on('selectstatus', (data)=>{
    //       console.log(data.data[0]);
    //       setStatus(data.data[0]);

    //     })
    
    useEffect(() => {
        const getConversationDetails = async() => {
        let email = localStorage.getItem('email');
        let response = await getConversation({senderEmail: email, receiverEmail: friend.email});
        // console.log(response.data);
        // console.log(friend.email);
       
        setConversation(response.data[0]);
        }
        getConversationDetails();
    }, [friend.email]);
    return(
        <Box style={{height: '75%'}}>
            <ChatHeader person={friend}/>
            <Messages person={friend}
                    conversation={conversation}/>
        </Box>
    )
}

export default ChatBox;