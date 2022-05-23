import './GameMain.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useMembers, useMyCard } from "../../models/WebSocket";

/**
 * - [ ] GameMain ページを作る
 *   - [x] React: 参加者リストを表示する
 *   - [ ] ランダムな数字を配って表示する
 *     - [ ] WebSocket: ランダムな数字を配る
 *       - [x] React: GameMain を表示した時にカードを配って欲しいと要求する
 *       - [ ] WebSocket: type が requestCard のメッセージを受け取ったら、カードを配る
 *     - [ ] WebSocket: 配る数字が被らないようにする
 *     - [ ] React: 自分に配られた数字を表示する
 *   - [ ] カードが配られた後に切断されても配られたカードを覚えて再表示したい
 *     - [ ] WebSocket: ゲーム開始時にIDを割り振る
 *     - [ ] React: 割り振られたIDをlocalStorageで覚える
 *     - [ ] React: GameMainを開いた時に保存したIDを送って、前に配られたカードを教えてもらう
 *   - [ ] カードを出せるようにする
 *   - [ ] 今の最高の数字を表示する
 *     - [ ] 誰かがカードを出す度に更新されるようにする
 * - [ ] 出したカードの正誤判定
 * - [ ] React: 配られた数字をモーダルウィンドウでふわっと出す。数秒後にふわっと消す
 * - [ ] React用サーバの起動と同時にWebSocketサーバも起動するようにしたい
 *   - npm scriptをいじる？
 *   - create-react-appのdevServerに server.js をproxyする？
 * - [ ] 間違って更新ボタンを押しても、登録した名前がリセットされないようにしたい
 * - [ ] MemberCheckページのスタートボタンを押せるのは部屋主だけにしたい
 * - ゲーム開始後に切断されて戻ってこない人がいたらどうする？
 *   - 切断された人が3分戻ってこなかったら、その人に配ったカードを公開する
 *     - 部屋主が公開されたカードを出せる
 *   - 切断された人が部屋主だったら？
 *     - 戻らないまま3分経った時にカードが公開されて、別の人が部屋主になる
 */

const GameMain = () => {
  const members = useMembers();
  const card = useMyCard();
  const navigate = useNavigate();

  return (
    <div className="main">
      <div className="outline2">
        <div className="btn-set">
          <h3 className="title4">参加者リスト
            {members.map((name) => 
            <p key={name}>{name}</p>
          )}
          </h3>
          <h2 className="title3">今の最高の数字</h2>
        </div>
          <h2 className="title5">自分のカード</h2>
        </div>
      <div className="btn-set">
        <button className="room-create-btn">数字を出す</button>
      </div>
    </div>
  );
}

export default GameMain;