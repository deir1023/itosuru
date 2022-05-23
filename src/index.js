import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RoomSetting from './pages/RoomSetting/RoomSetting';
import Join from './pages/Join/Join';
import MemberCheck from './pages/MemberCheck/MemberCheck';
import GameMain from './pages/GameMain/GameMain';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="roomsetting" element={<RoomSetting />} />
        <Route path="join" element={<Join />} />
        <Route path="membercheck" element={<MemberCheck />} />
        <Route path="gamemain" element={<GameMain />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
