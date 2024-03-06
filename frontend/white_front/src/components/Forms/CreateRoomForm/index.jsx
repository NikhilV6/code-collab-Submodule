import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
const CreateRoomForm = ({uuid ,socket,setUser,user})=>{
    const [name , setName] = useState("");
    const [roomId , setRoomId] = useState(uuid());

    const navigate = useNavigate();

    const handleCreateRoom = (e)=>{
        e.preventDefault();

        const roomData = {
            name , 
            roomId,
            userId : uuid(),
            host : true,
            presenter: true,
        }
        
        setUser(roomData);
        
        
        navigate(`/${roomId}`);
        socket.emit("userJoined",roomData);
       
    }
    return (
        <div>
           
            <input readOnly value={roomId} ></input>
            <button onClick={()=>setRoomId(uuid())}>Create Room ID</button >
            <input placeholder="Enter Name" onChange={(e)=>{setName(e.target.value)}}></input>
            <button onClick={handleCreateRoom}>Enter</button>
        </div>
    );
}

export default CreateRoomForm;