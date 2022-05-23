import './Join.css';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { socket } from "../../models/WebSocket";

const Join = () => {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  const roomId = searchParams.get('room_id');

  const initialUrl = roomId ? `https://何かしら?room_id=${roomId}` : "";
  const [url, setUrl] = useState(initialUrl);
  const [name, setName] = useState("");
  const disabled = url.length === 0 || name.length === 0;

  const handleUrlChange = event => {
    setUrl(event.target.value);
  }
  const handleNameChange = event => {
    setName(event.target.value);
  }

  const navigate = useNavigate();
  const jumpToMemberCheck = () => {
    // 1. name を WebSocketサーバに送信する
    let message = { type: 'registerName', name: name };
    const messageText = JSON.stringify(message);
    socket.send(messageText);
    // 2. /membercheck に遷移する
    navigate("/membercheck");
  };
  const jumpToRoomSetting = () => { navigate("/roomsetting"); };

  return (
    <div className="main">
      {roomId && <p className="message">部屋のURLをコピーして友達に知らせる</p>}
      {roomId ?
        <button>{roomId}</button> :
        <input 
          className='field' 
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="URL:xxxxxx">
        </input>
      }
      <input 
        className='field' 
        type="text" 
        value={name}
        onChange={handleNameChange}
        placeholder="名前入力">
      </input>
      <div className="btn-set">
       <button className="back-btn" onClick={jumpToRoomSetting}>≪</button>
       <button className="room-create-btn" disabled={disabled} onClick={jumpToMemberCheck}>部屋に入る</button>
       <button className="back-btn" onClick={jumpToRoomSetting}>≫</button>
      </div>
    </div>
  );
};

export default Join;