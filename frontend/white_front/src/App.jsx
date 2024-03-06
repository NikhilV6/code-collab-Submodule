
import './App.css';
import Forms from './components/Forms'
import {Route , Routes} from "react-router-dom";
import RoomPage  from './pages/RoomPage';


//soket
import io from "socket.io-client"; 
import { useEffect, useState } from 'react';
const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection" : true,
  reconnectionAttempts : "Infinity",
  timeout : 10000,
  transpots : ["websocket"],
}
const socket = io(server , connectionOptions);



const App =()=> {
 

  const [user , setUser] = useState(null);

    useEffect(()=>{
      socket.on("userIsJoined", (data)=>{
        if(data.success){
          console.log("userJoined");
        }
        else {
          console.log("joining error");
        }
      })
    },[])


  //random ID generation 
  const uuid = ()=>{
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}





  return (
    <div className="container">
      <Routes>
        <Route  path = "/" element = {<Forms uuid={uuid} socket={socket} setUser={setUser} user={user}/> }/>
        <Route  path = "/:roomID"  user = {user} element = {<RoomPage user={user} socket={socket}/>}/>
      </Routes>
    </div> 
  );
};

export default App;
