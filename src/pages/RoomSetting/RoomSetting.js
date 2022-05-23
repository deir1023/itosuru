import './RoomSetting.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const odaiList = [
  "言われて嬉しい言葉",
  "欲しい能力",
  "戦闘力の高い生き物",
  "2回目のデートで行きたい所",
  "今食べたいお菓子",
  "みんなで遊びに行くなら",
  "こわいもの",
  "居酒屋で最初に頼む物",
]

const RoomSetting = () => {
  const [odai, setOdai] = useState("");
  const disabled = odai.length === 0;

  const handleChange = event => {
    setOdai(event.target.value);
  };

  const setRandomTheme = () => {
    // odaiListからランダムに一つ選ぶ
    let i = Math.floor(Math.random() * odaiList.length);
    let odai = odaiList[i];
    // this.setStateを使って、 this.state.odai に odai を突っ込む
    setOdai(odai);
  };

  const navigate = useNavigate();
  const issueURL = () => {
    const roomId = "ランダムな部屋のID"; // ←ここの詳細は後で考える
    navigate(`/join?room_id=${roomId}`);
  };

  const jumpToApp = () => { navigate("/"); };

  return (
    <div className="main">
      <h1 className="title">お部屋設定</h1>
      <div className="url-set">
        <input
          className='field'
          type="text"
          value={odai}
          onChange={handleChange}
          placeholder="お題入力欄">
        </input>
        {disabled && <label className='error-message'>お題を入力してください！</label>}
      </div>
      <button className="odai-create-btn" onClick={setRandomTheme}>ランダムでお題を作成</button>
      <div className="btn-set">
        <button className="back-btn" onClick={jumpToApp}>≪</button>
        <button className="room-create-btn" onClick={issueURL} disabled={disabled}>URL発行</button>
        <button className="back-btn">≫</button>
      </div>
    </div>
  );
};

export default RoomSetting;