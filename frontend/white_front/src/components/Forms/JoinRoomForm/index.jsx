import { useNavigate } from "react-router-dom";
import { useState } from "react";

const JoinRoomForm = ({uuid ,socket , setUser}) => {
    const [name , setName] = useState("");
    const [roomId , setRoomId] = useState();

   const navigate = useNavigate();

    const handleRoomJoin = (e)=>{
        e.preventDefault();

        const roomData = {
            name , 
            roomId,
            userId : uuid(),
            host : false,
            presenter: false,
        }
        setUser(roomData);
        navigate(`/${roomId}`);
        socket.emit("userJoined",roomData);
       
    }
    return (
        <div>
           
            <input placeholder="Enter RoomId" onChange={(e)=>{setRoomId(e.target.value)}}></input>
            <input placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}}></input>

            <button onClick={handleRoomJoin}>Join Room</button>
        </div>
    );
    return (<div>
        <input placeholder="Enter ROOM ID"></input>
        <button placeholder="join Room">Join Room</button>
    </div>);
}

export default JoinRoomForm;