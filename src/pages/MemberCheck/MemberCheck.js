import './MemberCheck.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMembers } from "../../models/WebSocket";

const MemberCheck = () => {
  const members = useMembers();

  const navigate = useNavigate();
  const jumpToRoomSetting = () => { navigate("/roomsetting"); };
  const jumpToGameMain = () => { navigate("/GameMain"); };

  return (
    <div className="main">
      <div className="outline">
        <h2 className="title2">参加者一覧</h2>
        {members.map((name) => 
          <p key={name}>{name}</p>
        )}
      </div>
      <div className="btn-set">
        <button className="back-btn" onClick={jumpToRoomSetting}>≪</button>
        <button className="room-create-btn" onClick={jumpToGameMain}>スタート</button>
        <button className="back-btn">≫</button>
      </div>
    </div>
  );
}

export default MemberCheck;