import RoomService from "@roomservice/browser";
import { useRoomService } from "@roomservice/react";
import React from "react";
import Block from "../components/block";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

export default () => {
  const [doc, setDoc] = useRoomService(client, "kobys-room");
  const [position, setPosition] = useRoomService(client, "evans-room");

  function onClick() {
    setDoc(prevDoc => {
      prevDoc.number = Math.floor(Math.random() * 100);
    });
  }

  // function handleDrag(e, ui) {
  //   setDoc(doc => {
  //     doc["mycard"].x += ui.deltaX;
  //     doc["mycard"].y += ui.deltaY;
  //     console.log(doc);
  //   });
  // }

  function onClickFour() {
    setPosition(position => {
      var z = position.newPosition.x - 250;
      console.log(z);
      position.newPosition = { x: z, y: 0 };
    });
  }

  function onClickFive() {
    setPosition(position => {
      var z = position.newPosition.x + 250;
      console.log(z);
      position.newPosition = { x: z, y: 0 };
    });
  }

  return (
    <div>
      <h1>Open multiple browser windows!</h1>

      <p>Number: {doc.number || 0}</p>

      <button onClick={onClick}>Pick Random Number</button>

      <button onClick={onClickFour}>Decrease Default Position</button>
      <button onClick={onClickFive}>Increase Default Position</button>
      <div className="blockContainer">
        <Block />
        <Block />
        <Block />
      </div>
      <div className="blockContainer">
        <Block setDefaultPosition={position.newPosition || { x: 0, y: 0 }} />
      </div>
      <style jsx>{`
        div.blockContainer {
          background-color: red;
          display: flex;
          flex-direction: row;
          margin: 10px;
        }
      `}</style>
    </div>
  );
};
