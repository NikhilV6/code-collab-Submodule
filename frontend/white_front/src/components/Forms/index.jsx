import JoinRoomForm from "./JoinRoomForm";
import CreateRoomForm from "./CreateRoomForm";

import "./index.css";

const Forms = ({uuid, socket,setUser,user}) =>{
    return (
        <div className="row h-100 pt-5">
            <div className="col-md-4 mt-5 form-box p-3 border border-2 border-primary rounded-2 mx-auto d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold">create room</h1>
                <CreateRoomForm uuid = {uuid} socket ={socket} setUser={setUser} user={user}/>
            </div>
            <div className="col-md-4 mt-5 form-box p-3 border  border-2 border-primary rounded-2 mx-auto d-flex flex-column align-items-center">
                <h1 className="text-primary fw-bold">join room</h1>
                <JoinRoomForm uuid = {uuid} socket ={socket} setUser={setUser} ></JoinRoomForm>
            </div>
        </div>
    );
    };
    export default Forms;