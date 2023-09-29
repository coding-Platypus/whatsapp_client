import { useState, useEffect, useRef } from "react";
import { Box,styled } from "@mui/material";
import Footer from "./Footer";
// import { AccountContext } from "../../../context/AccountProvider";
import { sendFile } from "../../../service/api";
import Message from "./Message";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");




const Wrapper = styled(Box)`
background-image: url(${'https://edge.uacdn.net/static/thumbnail/course/d22ce0e19d9443559a5602baf95aa480.jpeg'});
background-size: 50%;
opacity: 0.8;
`

const Component = styled(Box)`
height:80vh;
overFlow-y: scroll;
`

const Container = styled(Box)`
    padding: 1px 80px;
`

const Messages = ({person, conversation}) => {

    const [value, setValue] = useState();
    const [messages, setMessages] = useState([]);
    const [newMessageFlag, setMessageFlag]= useState(false);
    const [file, setFile] = useState();

    const scrollRef = useRef();

    const getConversationDetails = async(data) => {
        try{
            // let response = await getMessages(data);
            // socket.on('get-message', (data)=>{
            //     setMessages(data.data);
            // })
            let newData=[];
            socket.emit('get-message', data);
            socket.on('get-message', (data) =>{
                    newData = data.data;
                    setMessages(newData);
                })

            socket.on('message-achknowlege',(data)=>{
                newData.push(data);
                setMessages(newData);
            })

            


            // console.log(response.data);
            // setMessages(response.data);
        } catch(error){
            console.log(error.message);
        }
    }
   
  
    
    useEffect(()=>{
        if (conversation){
            let data = {
                "conversationId" : conversation.conversations_id
            }
            getConversationDetails(data);

        } else{
            console.log("conversation id is undefined or null");
        }

       
    },[conversation]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({transition: 'smooth'});
    }, [messages]);

    
    const sendText = async(e) => {
        if(typeof(e) == 'object'){
            try{
                const data = {
                    "senderEmail": localStorage.getItem('email'),
                    "receiverEmail": person.email,
                    "conversationId": localStorage.getItem('convo_id'),
                    "type": 'file',
                    "value": e,
                    
                }
                console.log(data);
                setMessageFlag(prev => !prev);
                await sendFile(data);
                // socket.emit('send-message', data);
            }catch(error){
                console.log(error.message);
            }
        } else{
        try{
            const data = {
                "senderEmail": localStorage.getItem('email'),
                "receiverEmail": person.email,
                "conversationId": localStorage.getItem('convo_id'),
                "type": "text",
                "value": e,
            }
            console.log(data);
            setValue('');
            setMessageFlag(prev => !prev);
            // await sendMessage(data);
            socket.emit('send-message', data);
        }catch(e){
                console.log(e.Messages);
    }
}
    }




    return(
        <Wrapper>
            <Component>
            {messages && messages.map((message) => (
                <Container>
                  <Message msg={message} />
                </Container>
              ))
          }
            </Component>
            <Footer 
            sendText = {sendText}
            setValue={setValue}
            value={value}
            file={file}
            setFile = {setFile}
            />
        </Wrapper>    
        )

}


export default Messages;