const { WebSocketServer } = require('ws');

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log("接続がきたよー！");
  ws.on('message', function message(data) {
    const message = JSON.parse(data);
    // message.type が "requestMemberList" だったら、メンバーリストを送信する
    if (message.type == "requestMemberList") {
      sendMemberList(ws);
    }
    // message.type が "registerName" だったら、接続者と送られた名前を参加者リストに追加する
    if (message.type == "registerName") {
      ws.name = message.name;
      // 名前が登録されて参加者リストが変化したので、ここで全員に参加者リストを送信する
      wss.clients.forEach((client) => {
        sendMemberList(client);
      })
    }

    console.log('received: %s', data);  
  });

  ws.on("close", () => {
    wss.clients.forEach((client) => {
      sendMemberList(client);
    })
  })
  const sendMemberList = (client) => {
    // ws.nameに突っ込んだやつをちゃんと覚えてるか確認する
    console.log(`送ってきたやつの名前は${ws.name}`);

    const clients = [... wss.clients]; // wss.clients が配列じゃなくてSetなので、配列にする
    const names = clients
      .filter(client => client.name != undefined)
      .map(client => client.name);

    const message = { type: 'memberList', value: names };
    const messageText = JSON.stringify(message);
    client.send(messageText);
  };
    
  const deck = [];
  for (let i = 1; i <= 100; i++) {
    deck.push(i);
  }

  ws.on("connection", () => {
  if (message.type == "requestCard") {
    choiceCard(ws);
  }

})
});

// 動いていない理由の候補
// 1. requestCard のメッセージを受け取ったが反応していない
// 2. requestCard のメッセージに反応できているが、React側に送信することができていない





function choiceCard() {
  let randamcard = Math.floor(Math.random() * deck.length)
  const card = deck[randamcard];
  deck.splice(randamcard, 1);

  return card;
}



// // WebSocketServerを起動する
// const { WebSocketServer, WebSocket } = require('ws');
// const wss = new WebSocketServer({ server });
// wss.on('connection', ws => {
//     // ユーザが接続してきたので、配った枚数を教える
//     ws.send(dealedCardsMessage())

//     ws.on('message', data => {
//         console.info(JSON.parse(data))

//         const receiveMessage = JSON.parse(data);
//         if (receiveMessage.type === 'requestCard') {
//             const deckCard = choiceCard();
//             const message = { type: 'deckCard', value: deckCard };
//             const messageText = JSON.stringify(message);
//             ws.send(messageText);
//         }
//     });
// });

// function broadcast(messageText) {
//     wss.clients.forEach(client => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(messageText);
//       }
//     });
// }

