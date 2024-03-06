import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();


const WhiteBoard = ({ user ,canvasRef, ctxRef, elements, setElements, tool, color,socket}) => {

  const [isDrawing, setIsDrawing] = useState(false);
  const [img,setImg]=useState(null);

  //viewer only
  useEffect(()=>{
    socket.on("whiteboardDataResponse",({imgURL})=>{
      setImg(imgURL);
    })
  },[]);

  if(!user?.presenter){
    return(
      <div className="border border-dark border-3 h-100 overflow-hidden">
        <img src={img} alt=" Real Time board sharing image" className="w-100 h-100" />
      </div>
    );
  }

  
  useLayoutEffect(() => {
    if(canvasRef){
      const roughCanvas = rough.canvas(canvasRef.current);
      
      if(elements.length >0 ){
        ctxRef.current.clearRect(0,0,canvasRef.current.width,canvasRef.current.height);
      }
      elements.forEach((elements) => {
        if(elements.type === "pencil")
        roughCanvas.linearPath(elements.path,{
          stroke:elements.stroke,
          strokeWidth: 3,
          roughness:0,
        });
        else if( elements.type === "rect"){
          roughCanvas.draw(
            roughGenerator.rectangle(
              elements.offsetX,
              elements.offsetY,
              elements.width,
              elements.height,
              {
                stroke:elements.stroke,
                strokeWidth: 3,
                roughness:0,
              }
            )
          )
        }
        else if(elements.type === "line") {
          roughCanvas.draw(
          roughGenerator.line(
            elements.offsetX,
            elements.offsetY ,
            elements.width ,
            elements.height,
            {
              stroke:elements.stroke,
              strokeWidth: 3,
              roughness:0,
            }));
        }
      });
    }
  }, [elements]);

  


  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight*0.83;
    canvas.width = window.innerWidth*2;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    

    ctxRef.current = ctx;
  }, []);

  useEffect(()=>{
    ctxRef.current.strokeStyle = color;
  } ,[color]);

  

  //Mouse Events
  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if(tool === "pencil"){
      setElements((elements) => [
        ...elements,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    }
    else if( tool === "line"){
      setElements((prevElements)=>[
        ...prevElements,
        {
          type:'line',
          offsetX,
          offsetY,
          width:offsetX,
          height : offsetY,
          stroke:color,
        },
      ])
    }
    else if(tool === "rect"){
      setElements((prevElements)=>[
        ...prevElements,
        {
          type:'rect',
          offsetX,
          offsetY,
          width:0,
          height :0,
          stroke:color,
        },
      ])
    }
    setIsDrawing(true);


  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
      const newPath = [...path, [offsetX, offsetY]];
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            }
            else {
              return ele;
            }
          })
        );
      }
      else if (tool === "line") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
               width: offsetX,
               height : offsetY,
              };
            }
            else {
              return ele;
            }
          })
        );
      }
      else if(tool === "rect") {
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return {
                ...ele,
               width: offsetX -ele.offsetX,
               height : offsetY - ele.offsetY,
              };
            }
            else return ele;
          })
        );
      }
      const canvasImage = canvasRef.current.toDataURL();
      socket.emit("whiteboardData",{
      imgURL:canvasImage});
    }
    
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);

  };

  


  return (

    <div onMouseDown={handleMouseDown}
    onMouseUp={handleMouseUp}
    onMouseMove={handleMouseMove}
    className=" border border-dark border-bold h-100 w-100 overflow-hidden"
    >
      <canvas
        ref={canvasRef}/>     
    </div>
    
  );
}

export default WhiteBoard;