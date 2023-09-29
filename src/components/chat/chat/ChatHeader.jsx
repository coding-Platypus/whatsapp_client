import {useEffect, useState} from 'react'
import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import { emptyProfilePicture } from "../../../constant/data";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000");

//import {defaultProfilePicture} from '../../../constant/data';

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Image = styled("img")({
  height: 40,
  width: 40,
  objectFit: "cover",
  borderRadius: "50%",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgb(0, 0, 0, 0.6);
`;

const RightContainer = styled(Box)`
  margin-left: auto;
  & > svg {
    padding: 8px;
    font-size: 24px;
    color: #000;
  }
`;



const ChatHeader = ({person}) => {
  
  const[friend, setFriend] = useState({});
  
  
  

  // socket.emit('socket-status', data);
  // socket.on('selectstatus', (data)=>{
  //   setStatus(data.data[0].status);
  // })
  

  useEffect(() =>{
    function onLoad(){
      let friend = {};
      friend['id'] = person.id;
      friend['name'] = person.name;
      friend['photo'] = person.pic;
      // socket.emit('socket-status', data);
      // socket.on('selectstatus', (data)=>{
      //   setStatus(data.data[0].status);
      // })
      setFriend(friend);
    }
    onLoad();
  },[person]);
return (
    <Header>
      <Image src={`http://localhost:8000/${friend.photo}`} alt="dp" />
      {/* {friend.photo || emptyProfilePicture} */}
      <Box>
        <Name>{friend.name}</Name>
        {/* <Status>{changestatus.status}</Status> */}
      </Box>
      <RightContainer>
        <MoreVert />
      </RightContainer>
    </Header>
  );
};

export default ChatHeader;
