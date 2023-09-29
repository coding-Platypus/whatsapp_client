import { emptyProfilePicture } from "../../constant/data";
import { useEffect, useState, useRef  } from "react";
import IconButton from '@mui/material/IconButton';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

import { Box, Typography, styled } from "@mui/material"; 
import { changeProfile } from "../../service/api";


const ImageController = styled(Box)`
    display: flex;
    justify-content: center;
    `

    const Image = styled('img')({
        width: 200,
        height: 200,
        borderRadius: '50%',
        padding: '25px 0',
        position: "relative",

    })

    const BoxWrapper = styled(Box)`
    background: #fff;
    padding: 12px 30px 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    & :first-child {
        font-size: 13px;
        color: #009688;
        font-weight: 200;

    }
    & :last-child {
        margin: 14px 0;
        color: #4A4A4A;
    }
    `

    const StyleIcon = styled(ImageController)`
    position: absolute;
    bottom: 50%;
    left: 55%;
    background: #fff;
    width:7%;
    height: 1.8rem;
    border-radius: 100%;
    padding: 0.2rem;
    `
    
    const DescriptionContainer = styled(Box)`
    padding: 15px 20px 28px 30px;
    & > p{
        font-size: 13px;
        color: #8696a0;
    } `

const Profile = () =>{
    const[profilePicture, setProfilePicture] = useState(null);
    const firstElementRef = useRef(null);
    const secondElementRef = useRef(null);
   let id = localStorage.getItem('id');
   let name = localStorage.getItem('name');
   
   useEffect(() => {
        let dp = localStorage.getItem('dp');
        
        if(dp){
            setProfilePicture(dp);
        }
    }, []);
    
    const handleFileChange = async(event) => {
        const file = event.target.files[0];
        try{
            let pic = await changeProfile(id, file);
            console.log(pic);
            setProfilePicture(pic.data[0].profile_image);
            localStorage.setItem('dp', pic.data[0].profile_image);
            const reader = new FileReader();
            reader.readAsDataURL(file);
        
       
        // reader.onloadend = async() => {
        //     // Display the selected image in the image field
        //    const base64String = reader.result;
        //    localStorage.setItem('dp', base64String);
        //    setProfilePicture(base64String);
           
           
        //   };
        }catch(error){
            console.log(error);
        }
      };

      const handleUpload = () => {
        // Here you can handle the file upload logic if needed
        if (secondElementRef.current) {
            secondElementRef.current.click();
        }
      };


    return(
        <>
        <ImageController>
            <Image src={`http://localhost:8000/${profilePicture}`} alt="dp"/>
            <StyleIcon aria-label="delete"  ref={firstElementRef} onClick={handleUpload}>
        <CameraAltIcon />
        </StyleIcon>
        <input
        accept="image/*" // Specify the accepted file types here (e.g., image/*, .pdf, .doc, etc.)
        id="file-upload"
        type="file"
        style={{display:"none"}}
        onChange={handleFileChange}
        ref={secondElementRef} 
      />
        </ImageController>
        <BoxWrapper>
            <Typography>Your name</Typography>
            <Typography>{name}</Typography>
        </BoxWrapper>
        <DescriptionContainer><Typography>This is not your username or pin. This name will be visible to your WhatsApp contacts.</Typography></DescriptionContainer>
        <BoxWrapper>
            <Typography>About</Typography>
            <Typography>Eat! Sleep! Code! Repeat!</Typography>
        </BoxWrapper>
        </>
    )
}

export default Profile;