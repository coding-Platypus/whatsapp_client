// import { useContext } from 'react';
import {Box, Typography, styled} from '@mui/material';
// import { AccountContext } from '../../context/accountProvider';
import { setConversation } from '../../../service/api';
import { emptyProfilePicture } from "../../../constant/data";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");


const Component = styled(Box)`
display: flex;
height: 45px;
padding: 13px 0;
cursor: pointer;
&:hover {
    background: #F5F5F5;
}
`


const Image = styled('img')({
    width:50,
    height:50,
    borderRadius: '50%' ,
    padding: '0 14px'
})

// const joinRoom = (data) =>{
//     if(data !== ""){
//         socket.emit('join-room', data);
//     }
// }


const Conversation = ({user}) =>{

    // const {setPerson, account} = useContext(AccountContext);

    const getUser = async() => {
        localStorage.setItem('friend_id', user.user_id);
        localStorage.setItem('friend_name', user.name);
        localStorage.setItem('friend_email', user.email);
        localStorage.setItem('friend_dp', user.profile_image);
        let account = localStorage.getItem('email');
        
        let convo = await setConversation({senderEmail: account, receiverEmail: user.email});
        let data = {
            "conversationId" : convo.data[0].conversations_id
        }

        socket.emit('conversation', data);
        socket.on('conversation', (data) => {
            localStorage.setItem('roomId', data.data);
        })
        console.log(convo);
        if(convo.data[0].conversations_id){
            localStorage.setItem('convo_id', convo.data[0].conversations_id)
        }
        // onClick = {() => getUser()}
    }
    return(
        <Component onClick={getUser}>
            <Box>
            <Image src={`http://localhost:8000/${user.profile_image}`} alt="dp" />
            </Box>
            <Box>
                <Typography>{user.name}</Typography>
            </Box>
        </Component>
    )
}

export default Conversation;