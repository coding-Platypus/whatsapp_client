import axios from 'axios';

const url = 'http://localhost:8000';

export const addUser = async(data) =>{
    try{
        let response = await axios.post(`${url}/selectUser?email=${data.email}`, data);
        return response.data;
    } catch(error){
        console.log('Error while addUser api', error);
    }
}


export const login = async(data) =>{
  try{
      let response = await axios.post(`${url}/loginUser?name=${data.name}&&email=${data.email}`, data);
      return response.data;
  } catch(error){
      console.log('Error while loginUser api', error);
  }
}

export const changeProfile = async(id, file) => {
  try{
    const formData = new FormData();
    formData.append('id', id);
    formData.append('image', file);
  let response = await axios.put(`${url}/picture?id=${id}`, formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }})
    console.log(response.data);
    return response.data;
   
  } catch(error){
    console.log(error.message);
  }

}


// import axios from 'axios';

// const url = 'http://localhost:8000';

// export const addUser = async (data) => {

//   let config = {
//     method: 'post',
//     maxBodyLength: Infinity,
//     url: `${url}/selectUser?email=${data.email}`,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     data: data
//   };

//   axios.request(config)
//     .then((response) => {
//       console.log(JSON.stringify(response.data));
    
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


export const getAllUsers = async (token) => {
  try {
    let response = await axios.get(`${url}/users`, {
      headers: {
        'token': token
      }
    });
    return response.data;
  } catch (error) {
    console.log(error);

  }
}


// let data = JSON.stringify({
//   "sender_id": 6,
//   "receiver_id": 3,
//   "messages": "ki khobor"
// });

// export const setConversation = async(data) => {
// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: `${url}/conversation?sender_email=${data.senderEmail}&&receiver_email=${data.receiverEmail}`,
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   return response.data;
// })
// .catch((error) => {
//   console.log(error.message);
// });

// }

export const setConversation = async(data) =>{
  try{
    let response = await axios.post( `${url}/conversation?sender_email=${data.senderEmail}&&receiver_email=${data.receiverEmail}`, data);
    return response.data;
  } catch(error){
    console.log(error.message);
  }
}


// export const getConversation = async(data) =>{

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: `${url}/conversation/message?sender_email=${data.senderEmail}&&receiver_email=${data.receiverEmail}`,
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error) => {
//   console.log(error);
// });
// }

export const getConversation = async(data) =>{
  try{
    let response = await axios.get(`${url}/getconversation?sender_email=${data.senderEmail}&&receiver_email=${data.receiverEmail}`);
    return response.data;
  } catch(error){
    console.log(error.message);
  }
}


// let data = JSON.stringify({
//   "senderEmail": "brawler.stree1000@gmail.com",
//   "receiverEmail": "roy.manashi1995@gmail.com",
//   "conversationsId": "42",
//   "type": "text",
//   "value": "please love me"
// });
// export const sendMessage = async(data) => {
// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: `${url}/messages/add`,
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };

// axios.request(config)
// .then((response) => {
//   return response.data;
// })
// .catch((error) => {
//   console.log(error);
// });
// }
export const sendMessage = async(data) =>{
  try{
    let response = await axios.post( `${url}/messages/add`, data);
    console.log(response.data);
    return response.data;
  } catch(error){
    console.log(error.message);
  }
}

export const getMessages = async(data) =>{
  try{
    let response = await axios.get(`${url}/messages?conversations_id=${data}`);
    return response.data;
  } catch(error){
    console.log(error.message);
  }
}


export const sendFile = async(data) => {
  try{
    const formData = new FormData();
    formData.append('senderEmail', data.senderEmail);
    formData.append('receiverEmail', data.receiverEmail);
    formData.append('conversationId', data.conversationId);
    formData.append('type', 'file');
    formData.append('file', data.value);
  let response = await axios.post(`${url}/messages/files`, formData, {
    headers: {
      'Content-Type' : 'multipart/form-data'
    }})
    console.log(response.data);
    return response.data;
   
  } catch(error){
    console.log(error);
  }

}





