import { useState, useEffect, useRef } from 'react';

export const socket = new WebSocket('ws://localhost:8080');

export const useMembers = () => {
  // 参加者リストが変化したらそれをReactに教える
  const [names, setNames] = useState([]);

  // WebSocketサーバと接続する
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket;
    const onMessage = event => {
      const text = event["data"];
      const message = JSON.parse(text);
      console.log(message);
    
      setNames(message.value);
    };
    socketRef.current.addEventListener('message', onMessage);

    // WebSocketサーバに「参加者リストを送ってくれ」というメッセージを送信する
    const requestMemberList = () => {
      const message = { type: "requestMemberList" };
      const messageText = JSON.stringify(message);
      socketRef.current.send(messageText);
    };
    if (socketRef.current.readyState === WebSocket.OPEN) {
      requestMemberList();
    }
    socketRef.current.addEventListener('open', requestMemberList);

    return () => {
        socketRef.current.removeEventListener('message', onMessage);
        socketRef.current.removeEventListener('open', requestMemberList);
    }
  }, []);

  return names;

};

export const useMyCard = () => {

  const socketRef = useRef();

useEffect(() => {
  socketRef.current = socket;
  const onMessage = event => {
    const text = event["data"];
    const message = JSON.parse(text);
    console.log(message);

  };
  socketRef.current.addEventListener('message', onMessage);

  const requestCard = () => {
    const message = { type: "requestCard" };
    const messageText = JSON.stringify(message);
    socketRef.current.send(messageText);
  };
  if (socketRef.current.readyState === WebSocket.OPEN) {
    requestCard();
  }
  socketRef.current.addEventListener('open', requestCard);
  
  return () => {
      socketRef.current.removeEventListener('message', onMessage);
      socketRef.current.removeEventListener('open', requestCard);
  }

}, []);
}