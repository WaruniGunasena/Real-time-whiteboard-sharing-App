import { useRef, useState, useEffect } from "react";
import "./index.css";
import WhiteBoard from "../../components/Whiteboard";


const RoomPage = ({
  user,
  socket,
  users
}) => {
  
  useEffect(() => {
    if (!socket) return;
    const handleUsers = (data) => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else if (data && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    };
    socket.on("usersInRoom", handleUsers);
    return () => {
      socket.off("usersInRoom", handleUsers);
    };
  }, [socket]);

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool]  = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);

  const handleClearCanvas = () =>{
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")
    ctx.fillRect = "white";
    ctx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setElements([]);
  };

  const undo = () => {
  if (elements.length === 0) return;
  setHistory((prevHistory) => [
    ...prevHistory,
    elements[elements.length - 1]
  ]);
  setElements((prevElements) =>
    prevElements.slice(0, prevElements.length - 1)
  );
};

  const redo = () => {
  if (history.length === 0) return;
  setElements((prevElements) => [
    ...prevElements,
    history[history.length - 1]
  ]);
  setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
};

  return (
    <div className="container-fluid bg-light min-vh-100">
  <h3 className="text-center py-2 mb-1 display-4 fw-bold">
        White Board Sharing App
  <span className="text-primary">[ Users Online : {(users ? users.length : 0)} ]</span>
      </h3>
      {
        user?.presenter &&(
          <div className="col-md-10 mx-auto mb-5">
        <div className="card shadow rounded-4 p-2 mb-2">
          <div className="row align-items-center g-3">
            <div className="col-md-4 d-flex align-items-center gap-4 justify-content-center">
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="tool"
                  id="pencil"
                  value="pencil"
                  checked = {tool === "pencil"}
                  className="form-check-input"
                  onChange={(e) => setTool(e.target.value)}
                />
                <label htmlFor="pencil" className="mb-0" title="Pencil">
                  <span className="fs-5"><i className="bi bi-pencil"></i></span> Pencil
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="tool"
                  id="line"
                  value="line"
                  checked = {tool === "line"}
                  className="form-check-input"
                  onChange={(e) => setTool(e.target.value)}
                />
                <label htmlFor="line" className="mb-0" title="Line">
                  <span className="fs-5"><i className="bi bi-slash-lg"></i></span> Line
                </label>
              </div>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="radio"
                  name="tool"
                  id="rect"
                  value="rect"
                  checked = {tool === "rect"}
                  className="form-check-input"
                  onChange={(e) => setTool(e.target.value)}
                />
                <label htmlFor="rect" className="mb-0" title="Rectangle">
                  <span className="fs-5"><i className="bi bi-square"></i></span> Rectangle
                </label>
              </div>
            </div>
            <div className="col-md-3 d-flex align-items-center justify-content-center gap-3">
              <label htmlFor="color" className="form-label mb-0 fw-semibold">Color:</label>
              <input
                type="color"
                id="color"
                value={color}
                className="form-control form-control-color border-0 shadow-sm"
                style={{ width: "2.5rem", height: "2.5rem" }}
                title="Choose your color"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="col-md-3 d-flex gap-2 justify-content-center">
              <button className="btn btn-primary px-4 py-2 shadow-sm rounded-pill"
              disabled = {elements.length == 0}
              onClick={() => undo()}
              >Undo</button>
              <button className="btn btn-outline-primary px-4 py-2 shadow-sm rounded-pill"
              disabled = {history.length < 1}
              onClick={() => redo()}
              >Redo</button>
            </div>
            <div className="col-md-2 d-flex justify-content-center">
              <button className="btn btn-danger px-4 py-2 shadow-sm rounded-pill" onClick={handleClearCanvas}>Clear Canvas</button>
            </div>
          </div>
        </div>
      </div>
        )
      }
      <div className="col-md-10 mx-auto mt-4 canvas-box">
          <WhiteBoard 
            canvasRef={canvasRef} 
            ctxRef={ctxRef}
            elements ={elements}
            setElements={setElements}
            tool={tool}
            color ={color}
            user ={user}
            socket= {socket}
            //users = {users}
          />
      </div>
    </div>
  )
}

export default RoomPage