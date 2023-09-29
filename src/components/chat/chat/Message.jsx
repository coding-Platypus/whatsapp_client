import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, styled } from "@mui/material";
import { formatDate } from "../../../utils/common-utils";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import IconButton from "@mui/material/IconButton";
import {pdfImage, docImage, otherFile} from '../../../constant/data';



const Own = styled(Box)`
  background: #dcf8c6;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Friend = styled(Box)`
  background: #ffffff;
  max-width: 60%;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Background = styled(Box)`
display: block;
position: relative;
`




const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  word-break: keep-all;
  margin-top: auto;
`;
const Time1 = styled(Typography)`
  font-size: 12px;
  color: #919191;
  margin-top: 6px;
  margin-left: 90%;
  word-break: keep-all;
  margin-top: auto;
  position: absolute;
  bottom: 2%;
  right: 3%;

`;
const Time2 = styled(Typography)`
  font-size: 10px;
  color: #919191;
  margin-top: 6px;
  margin-left: 17rem;
  word-break: keep-all;
  margin-top: auto;

`;

const StyleIcon = styled(IconButton)`
font-size: 10px;
`

const PdfBackground = styled(Box)`
display: flex;
padding: 0.4rem;
`

const PdfImage = styled('img')({
  width: 50,
  height: 50,
})

const Image = styled('img')({
  width: 300,
  height: 300,
  position: "relative"
})

const Video = styled('video')({
  width: 300,
  height: 300,
  position: "relative"
})



export default function Message({ msg }) {
  const [showFile, setShowFile] = useState(false);
  const[image, setImage] = useState(false);
  const[video, setVideo] = useState(false);
  const[pdf, setPdf] = useState(false);
  const[doc, setDoc] = useState(false);
  const[text, setText] = useState(false);
  const firstElementRef = useRef(null);
  const secondElementRef = useRef(null);
  let user = localStorage.getItem("email");

  // setText(true);
  // useEffect(() => {
  //   if (msg.type !== "file"){
  //     setText(true);
  //   }
  // },[]);
  // useEffect(() => {
    // if (msg.type == "file") {
    //   if(msg.ext == 'jpeg' || msg.ext == 'jpg' || msg.ext == 'png'){
    //     setImage(true);
        
    //   } else if(msg.ext == 'mp4' || msg.ext == 'video'){
    //     setVideo(true);
    //   } else if(msg.ext == 'pdf'){
    //     setPdf(true);
    //   } else if(msg.ext == 'doc' || msg.ext == 'docx'){
    //     setDoc(true);
    //   } 
    //   else {
    //     setShowFile(true);
    //   }
    //   } else{
    //   setText(true);
    // }
  // }, []);

  const handleFile = () => {
    // Here you can handle the file upload logic if needed
    if (secondElementRef.current) {
      secondElementRef.current.click();
    }
  };

  return (
    <>
      {user === msg.sender_email ? (
          
        
        <Own>
            {/* {image && (
            <Background>
            <Image src={`http://localhost:8000/${msg.value}`} alt="dp" />
            <Time1>{formatDate(msg.created_at)}</Time1>
            </Background>
          )} */}

          {/* {video && (
            <Background>
            <Video src={`http://localhost:8000/${msg.value}`} alt="video" controls/>
            <Time1>{formatDate(msg.created_at)}</Time1>
            </Background>
          )} */}
        
         
          {/* {pdf && (
            <PdfBackground>
            <StyleIcon
              aria-label="delete"
              ref={firstElementRef}
              onClick={handleFile}
            >
              <PdfImage src={pdfImage} />
              <Text>{msg.value}</Text>
              <CloudDownloadIcon />
              
            </StyleIcon>
            <Time>{formatDate(msg.created_at)}</Time>
            </PdfBackground>
          )}

          {doc && (
            <PdfBackground>
            <StyleIcon
              aria-label="delete"
              ref={firstElementRef}
              onClick={handleFile}
            >
              <PdfImage src={docImage} />
              <Text>{msg.value}</Text>
              <CloudDownloadIcon />
              
            </StyleIcon>
            <Time>{formatDate(msg.created_at)}</Time>
            </PdfBackground>
          )}

          {showFile && (
            <PdfBackground>
            <StyleIcon
              aria-label="delete"
              ref={firstElementRef}
              onClick={handleFile}
            >
              <PdfImage src={otherFile} />
              <Text>{msg.value}</Text>
              <CloudDownloadIcon />
              
            </StyleIcon>
            <Time>{formatDate(msg.created_at)}</Time>
            </PdfBackground>
          )} */
          // <>
          // {text && ( 
            <>
            <Text>{msg.value}</Text>
            <Time>{formatDate(msg.created_at)}</Time>
            </>
          // )} 
          // </>
          
          /* <a
            href={`http://localhost:8000/${msg.value}`}
            id="file"
            ref={secondElementRef}
            style={{ display: "none" }}
          >
            Click
          </a> */}
        </Own>
      ) : (
        // <>
       
        <Friend>
           {/* {image && (
          <Background>
          <Image src={`http://localhost:8000/${msg.value}`} alt="dp" />
          <Time2>{formatDate(msg.created_at)}</Time2>
          </Background>
        )}

        {video && (
            <Background>
            <Video src={`http://localhost:8000/${msg.value}`} alt="video" controls/>
            <Time1>{formatDate(msg.created_at)}</Time1>
            </Background>
          )}
        
          {showFile && (
            <>
            <StyleIcon
              aria-label="delete"
              ref={firstElementRef}
              onClick={handleFile}
            >
              <Text>{msg.value}</Text>
              <CloudDownloadIcon />
              
            </StyleIcon>
            <Time>{formatDate(msg.created_at)}</Time>
            </>
          )}
          {text && (
            <> */}
            <Text>{msg.value}</Text>
            <Time>{formatDate(msg.created_at)}</Time>
            {/* </> */}
          {/* )}
          
          <a
            href={`http://localhost:8000/${msg.value}`}
            id="file"
            ref={secondElementRef}
            style={{ display: "none" }}
          >
            Click
          </a> */}
        </Friend>
        // </>
      )}
      </>
  );
}
