import { useRef, useState } from "react";
import WhiteBoard from "../../components/Whiteboard";

export const RoomPage = ({user,socket}) => {

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements,setElements]= useState([]);
  //for undo and redo function
  const [ history , setHistory]= useState([]);

    const handleClearCanvas =()=>{
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      ctx.fillRect = "white";
      ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
      setElements([]);
    }


    //fuction for undo and redo
    const undo = () => {
      setHistory((prevHistory)=>[...prevHistory,
      elements[elements.length-1]]);

      setElements((prevElements)=>prevElements.slice(0,prevElements.length-1))
    }

    const redo = () => {
      setElements((prevElements)=>[...prevElements,
      history[history.length-1]]);
      setHistory((prevHistory)=>prevHistory.slice(0,prevHistory.length-1));
      
    }
   

  return (
    <div className="row">

      {/* details  */}
      <h2 className="text-center  mt-1">White Board Sharing APP </h2>
      { user?.presenter && (
            <div className="col-md-12   mb-2 d-flex align-items-center justify-content-around">
              <div className="d-flex gap-1">
                <label htmlFor="pencil">Pencil</label>
                <input type="radio"
                  name='tool'
                  value="pencil"
                  checked={tool === "pencil"}
                  onChange={(e) => setTool(e.target.value)}>

                </input>
              </div>
              <div className="d-flex gap-1">
                <label htmlFor="line">Line</label>
                <input type="radio"

                  name='tool'
                  value="line"
                  checked={tool === "line"}

                  onChange={(e) => setTool(e.target.value)}>

                </input>
              </div>
              <div className="d-flex gap-1">
                <label htmlFor="rect">Rectangle</label>
                <input type="radio"
                  name='tool'
                  value="rect"
                  checked={tool === "rect"}

                  onChange={(e) => setTool(e.target.value)}>

                </input>
              </div>

              
              <div className="d-flex  align-items-center">
                <label htmlFor="color">Select Color</label>
                <input type="color" id="color" value={color} className="mt-1"
                  onChange={(e) => setColor(e.target.value)} />
              </div>
              <div className="col-md-3 d-flex gap-2">
                <button className="btn btn-primary mt-1"
                disabled={elements.length === 0}
                onClick={()=>undo()}
                >Undo</button>
                <button className="btn btn-outline-primary mt-1"
                disabled={history.length === 0}
                onClick={()=>redo()}
                >Redo</button>
              </div>
             
        <div className="col-md-3">
          <button className="btn btn-danger" onClick={handleClearCanvas}>Clear canvas</button>
        </div>

      </div>
       )}

      {/* white Board  */}
      <div className=" col-md-10 mx-auto  canvas-box">
        <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} 
        elements = {elements}
        setElements = {setElements}
        tool = {tool}
        color = {color}
        socket = {socket}
        user = {user} />
      </div>


    </div>
  )
}

export default RoomPage;