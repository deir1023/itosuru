import './App.css';
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const jumpToRoomSetting = () => { navigate("/roomsetting"); };
  const jumpToJoin = () => { navigate("/join"); };

  return (
    <div className="main">
      <h1 className="title">いとする</h1>
      <button className="room-create-btn" onClick={jumpToRoomSetting}>部屋を作成</button>
      <button className="room-create-btn" onClick={jumpToJoin}>ゲーム参加</button>
    </div>
  );
}

export default App;
