// import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainBackground from "./components/drawer/MainBackground";
import Signup from "./components/drawer/SignupDialog";
import  Login from "./components/drawer/LoginDialog";
import ChatPage from "./components/chat/Chatpage";
function App() {

  //const clientId = '87867203919-l0b6ka95484ihprjtjuqqqmg7bla6hcj.apps.googleusercontent.com'
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/chatpage" element={<ChatPage/>}/>
      <Route index element={<ChatPage />} />
      <Route path="/home" element={<MainBackground/>} />
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/login" element={<Login/>} />
      
  
      </Routes>
      </BrowserRouter>
      {/* <Accountprovider > */}
        {/* <Messenger /> */}
      {/* </Accountprovider> */}
      
    </>
  );
}

export default App;
