import RoomService from "@roomservice/browser";
import { useRoomService } from "@roomservice/react";
import React from "react";
import Block from "../components/block";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

export default () => {
  const [position, setPosition] = useRoomService(client, "kanban-board-room");

  function createBlock() {
    setPosition(position => {
      if (position.board) {
        delete position.board;
      }

      position.board = position.board || {};

      const id = `block-${Math.random() * 10}`;
      position.board[id] = {
        id,
        position: {
          x: 0,
          y: 0
        }
      };
    });
  }

  function deleteBoard() {
    setPosition(board => {
      const SACRIFICE_TO_THE_GODS = Object.keys(board)[
        Object.keys(board).length - 1
      ];

      // ** drums in the distance **
      // ... LIGHTENING FLARES
      // BEHOLD FOR THE CEREMONY BEGINS
      // YEE WHO HAVE BEEN CHOSEN REJOICE
      // FOR EVER SHALL BE KNOWN THIS DAY
      delete position[SACRIFICE_TO_THE_GODS];
    });
  }

  function deleteState() {
    setPosition(position => {
      position.blocks = [];
    });
  }

  function onDrag(e, position, blockName) {
    const { x, y } = position;
    setPosition(position => {
      position[blockName] = { position: { x, y } };
    });
  }

  function reset() {
    setPosition(position => {
      position["one"].position = { x: 0, y: 0 };
    });

    setPosition(position => {
      position["two"].position = { x: 0, y: 0 };
    });

    setPosition(position => {
      position["0"].position = { x: 0, y: 0 };
    });

    setPosition(position => {
      position["1"].position = { x: 0, y: 0 };
    });
    setPosition(position => {
      position["2"].position = { x: 0, y: 0 };
    });
  }

  function logState() {
    console.log(position);
  }

  const blocks = Object.values(position).map(b => {
    return (
      <Block
        setPosition={b.position || { x: 0, y: 0 }}
        onDrag={(e, pos) => onDrag(e, pos, b.id)}
      />
    );
  });

  return (
    <div>
      <h1>RoomService Kanban Board Demo</h1>

      <button onClick={createBlock}>Create Board</button>
      <button onClick={deleteBoard}>Delete Board</button>
      <button onClick={deleteState}>Delete All</button>
      <button onClick={reset}>Reset All</button>
      <button onClick={logState}>Console Log Position</button>
      <div className="blockContainer">
        {/* <Block
          setPosition={
            position["one"] ? position["one"].position : { x: 0, y: 0 }
          }
          onDrag={(e, pos) => onDrag(e, pos, "one")}
        /> */}
        {blocks}
      </div>
      <div className="blockContainer">
        {/* <Block
          setPosition={
            position["two"] ? position["two"].position : { x: 0, y: 0 }
          }
          onDrag={(e, pos) => onDrag(e, pos, "two")}
          blockTitle={"Blocki Boi 2"}
        /> */}
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
