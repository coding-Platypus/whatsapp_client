import { Dialog, Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "./menu/Menu";
import EmptyChat from "./EmptyChat";
import ChatBox from "./chat/ChatBox";






const Component = styled(Box)`
  display: flex;
`;

const LeftComponent = styled(Box)`
  min-width: 450px;
`;

const RightComponent = styled(Box)`
  width: 70%;
  min-width: 300px;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const dialogStyle = {
  height: "96%",
  width: "100%",
  margin: "20px",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "0",
  boxShadow: "none",
  overflow: "hidden",
};

const ChatPage = () => {
 const [friend, setFriend] = useState({});
  const [value, setValue] = useState(false);

  useEffect(() => {
    const handleChat = async () => {
      let id = localStorage.getItem("friend_id");
      let name = localStorage.getItem("friend_name");
      let email = localStorage.getItem("friend_email")
      let dp = localStorage.getItem("friend_dp");
      if (id !== undefined && name !== undefined && id !== null && name !== null) {
        let friend = {};
        friend["id"] = id
        friend["name"] = name
        friend["email"] = email
        friend["pic"] = dp
        setFriend(friend);
        setValue(true);
      } else{
        setValue(false);
        setFriend({});
      }
      
    };
    handleChat();
  }, [friend]);

  return (
    <Dialog
      open={true}
      PaperProps={{ sx: dialogStyle }}
      hideBackdrop={true}
      maxWidth={"md"}
    >
      <Component>
        <LeftComponent>
          <Menu />
        </LeftComponent>
        <RightComponent>
          {value ? (
            <ChatBox friend={friend} />
          ) : (
            <EmptyChat />
          )}
        </RightComponent>
      </Component>
    </Dialog>
  );
};

export default ChatPage;
