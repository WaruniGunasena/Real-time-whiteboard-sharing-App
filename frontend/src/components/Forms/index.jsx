import CreateRoomForm from "./createRoomForm";
import "./index.css";
import JoinRoomForm from "./joinRoomForm";

const Forms = () => {
  return (
    <div className='row h-100 pt-5'>
  <div className="col-md-4 mt-5 form-box p-5 border border rounded-2 border-primary mx-auto d-flex flex-column align-items-center">
        <h1 className="text-primary fn-bold">Create Room</h1>
        <CreateRoomForm/>
      </div>
  <div className="col-md-4 mt-5 form-box p-5 border border rounded-2 border-primary mx-auto d-flex flex-column align-items-center">
        <h1 className="text-primary fn-bold">Joining Room</h1>
        <JoinRoomForm/>
      </div>
    </div>
  )
}

export default Forms