import { useEffect, useState } from "react";
import { getAllUsers } from "../../../service/api";
import {Box, styled, Divider} from '@mui/material';
import Conversation from "./Conversation";
import { AccountContext } from "../../context/accountProvider";

const Component = styled(Box)`
height: 81vh;
overflow: overlay;

`;

const StyleDivider = styled(Divider)`
margin: 0 0 0 70px;
backgroung-color: #e9edef;
opcity: 0.6;
`

const Conversations = ({text}) =>{

    const[users, setUsers] = useState([]);
    const {account} = useContext(AccountContext);

    useEffect(()=>{
        const fetchData = async() => {
            let response = await getAllUsers();
            const filteredData = response.data.filter(user => user.name.toLowerCase().includes(text.toLowerCase()));
            setUsers(filteredData);
        }
        fetchData();
    }, [text]);
    return(
        <Component>
            {
                users.map(user => (
                    user.sub !== account.sub &&
                    <>
                    <Conversation user={user}/>
                    <StyleDivider />
                    </>
                ))
            }
        </Component>
    )
}

export default Conversations;