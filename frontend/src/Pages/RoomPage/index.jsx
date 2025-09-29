import { useRef, useState, useEffect } from "react";
import "./index.css";
import WhiteBoard from "../../components/Whiteboard";

const RoomPage = ({ user, socket, users }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("black");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [openedUserTab, setOpenedUserTab] = useState(false);

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

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    if (elements.length === 0) return;
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.slice(0, prevElements.length - 1)
    );
  };

  const redo = () => {
    if (history.length === 0) return;
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) => prevHistory.slice(0, prevHistory.length - 1));
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <header className="d-flex align-items-center py-3 px-4 bg-white shadow-sm">
        <button
          type="button"
          className="btn btn-dark me-3"
          onClick={() => setOpenedUserTab(true)}
        >
          Users
        </button>
        <h1 className="mb-0 fw-bold text-center flex-grow-1">
          White Board Sharing App{" "}
          <span className="text-primary fs-6">
            [ Users Online : {users ? users.length : 0} ]
          </span>
        </h1>
      </header>
      {openedUserTab && (
        <aside
          className="position-fixed top-0 start-0 h-100 text-white bg-dark shadow"
          style={{ width: "250px", zIndex: 1050 }}
        >
          <div className="p-3">
            <button
              type="button"
              onClick={() => setOpenedUserTab(false)}
              className="btn btn-light w-100 mb-4"
            >
              Close
            </button>
            <div className="user-list">
              {users.map((usr, index) => (
                <p
                  key={index * 999}
                  className="my-2 text-center pb-2"
                >
                  {usr.name}{" "}
                  {user && user.userId === usr.userId && (
                    <span className="text-success">(You)</span>
                  )}
                </p>
              ))}
            </div>
          </div>
        </aside>
      )}
      {user?.presenter && (
        <div className="col-md-10 mx-auto my-4">
          <div className="card shadow rounded-4 p-3">
            <div className="row align-items-center g-3">
              <div className="col-md-4 d-flex flex-wrap gap-4 justify-content-center">
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="tool"
                    id="pencil"
                    value="pencil"
                    checked={tool === "pencil"}
                    className="form-check-input"
                    onChange={(e) => setTool(e.target.value)}
                  />
                  <label htmlFor="pencil" className="mb-0">
                    <i className="bi bi-pencil"></i> Pencil
                  </label>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="tool"
                    id="line"
                    value="line"
                    checked={tool === "line"}
                    className="form-check-input"
                    onChange={(e) => setTool(e.target.value)}
                  />
                  <label htmlFor="line" className="mb-0">
                    <i className="bi bi-slash-lg"></i> Line
                  </label>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="radio"
                    name="tool"
                    id="rect"
                    value="rect"
                    checked={tool === "rect"}
                    className="form-check-input"
                    onChange={(e) => setTool(e.target.value)}
                  />
                  <label htmlFor="rect" className="mb-0">
                    <i className="bi bi-square"></i> Rectangle
                  </label>
                </div>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-center gap-3">
                <label htmlFor="color" className="fw-semibold mb-0">
                  Color:
                </label>
                <input
                  type="color"
                  id="color"
                  value={color}
                  className="form-control form-control-color border-0 shadow-sm"
                  style={{ width: "2.5rem", height: "2.5rem" }}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="col-md-3 d-flex justify-content-center gap-2">
                <button
                  className="btn btn-primary px-4 rounded-pill"
                  disabled={elements.length === 0}
                  onClick={undo}
                >
                  Undo
                </button>
                <button
                  className="btn btn-outline-primary px-4 rounded-pill"
                  disabled={history.length < 1}
                  onClick={redo}
                >
                  Redo
                </button>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <button
                  className="btn btn-danger px-4 rounded-pill"
                  onClick={handleClearCanvas}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="col-md-10 mx-auto mt-4 canvas-box">
        <WhiteBoard
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          elements={elements}
          setElements={setElements}
          tool={tool}
          color={color}
          user={user}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default RoomPage;
