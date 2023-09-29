import { useEffect, useState } from "react";
import { getAllUsers } from "../../../service/api";
import { Box, styled, Divider, Modal, Typography, Button } from "@mui/material";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Conversation from "./Conversation";


const Component = styled(Box)`
  height: 83vh;
  width: 100%;
  overflow: overlay;
  
`;

const StyleDivider = styled(Divider)`
  margin: 0 0 0 70px;
  backgroung-color: #e9edef;
  opcity: 0.6;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const FriendList = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem("details");

      if (token) {
        let response = await getAllUsers(token);

        if (response.err === true) {
          setOpen(true);
          localStorage.clear();
        } else {
          setUsers(response.data);
        }
      }else{
        navigate("/home");
      }
    };
    fetchData();
  }, []);

  return (
    <Component>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hey
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your Session Expired.. Login?
          </Typography>
          <Link to="/login">
            <Button
              variant="contained"
              size="medium"
              style={{
                backgroundColor: "#00a884",
                marginLeft: "80%",
                marginTop: "0.5rem",
              }}
            >
              Ok
            </Button>
          </Link>
        </Box>
      </Modal>
      {users.map((user) => (
        <>
          <Conversation user={user} />
          <StyleDivider />
        </>
      ))}
    </Component>
  );
};

export default FriendList;
