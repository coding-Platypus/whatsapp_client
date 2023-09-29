
import {Box, InputBase, styled} from '@mui/material';
import {EmojiEmotionsOutlined, AttachFile, Mic} from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import React, { useState } from 'react';
import { sendMessage } from '../../../service/api';
import { sendFile } from "../../../service/api";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");

const Container = styled(Box)`
height: 55px;
background: #ededed;
display: flex;
width: 100%;
align-items: center;
padding: 0 15px;
& > * {
    margin: 5px;
    color: #919191;
}
`

const Search = styled(Box)`
    background-color: #ffffff;
    border-radius: 10px;
    width: calc(99% - 100px);
`

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    height: 20px;
    padding-left: 25px;
    font-size: 14px;
`
const ClipIcon = styled(AttachFile)`
    transform: rotate(40deg);
`
const Footer = ({sendText, file, setFile}) => {
    const[text,setText] = useState('');

    const handleKeyPress = (e) =>{
        if(e.key === "Enter") {
            handleSendText();
        }
    }

    // useEffect(() =>{
        // if(file) {
        //     const data = {
        //         senderEmail: localStorage.getItem('email'),
        //         receiverEmail: localStorage.getItem('friend_email'),
        //         conversationId: localStorage.getItem('convo_id'),
        //         type: 'file',
        //         value: e.target.files[0]
        //     }
           
        // }
    // }, [file])
    const onFileChange = (e) =>{
        setFile(e.target.files[0]);
        sendText(e.target.files[0]);
    }

   const handleSendText = () =>{
    socket.on('message', (data)=>{
        alert(data);
    })
    sendText(text);
    setText('');
   }


   
    // const sendMsg = async({}) =>{
    //     const[text,setText] = useState('');
    //     try{
    //     const data = {
    //         "senderEmail": localStorage.getItem('id'),
    //         "receiverEmail": localStorage.getItem('friend_id'),
    //         "conversationId": localStorage.getItem('convo_id'),
    //         "type": "text",
    //         "value": value,
    //     }
    //     console.log(data);
        
    //     await sendMessage(data);
    //     setValue('');
    //     } catch(e){
    //         console.log(e.message);
    //     }
    // }

    return(
        <Container>
            <label htmlFor="fileInput">
            <ClipIcon />
            </label>
            <input type="file"
            id="fileInput"
            style={{display:'none'}} 
            onChange={(e) => onFileChange(e)}/>
            <Search>
                <InputField placeholder='Type a message'
                value={text}
                onChange={(e)=> setText(e.target.value)}
                onKeyPress={handleKeyPress}>
                </InputField>
            </Search>
            <SendIcon onClick={() => handleSendText()}/>
        </Container>
    )
}

export default Footer;