import RoomService from "@roomservice/browser";
import { useRoomService } from "@roomservice/react";
import React from "react";
import Block from "../components/block";

const client = new RoomService({
  authUrl: "http://localhost:3000/api/roomservice"
});

export default () => {
  const [state, setState] = useRoomService(client, "clean-board-room");

  // Tree Structure
  // state = {}
  // state.board = {id1: id1, id2: id2, id3: id3}
  // state.board.id1.coordinates = {position: {x: 0, y: 0}}
  // state.board.id1.coordinates.position = {x: 0, y: 0}

  // creates a new board
  function createBoard() {
    setState(state => {
      state.board = state.board || {};

      const id = `block-${Math.random() * 10}`;
      state.board[id] = id;

      console.log(state.board[id]);
      console.log(Object.keys(state.board));
    });
  }

  // deletes most recent board
  function deleteBoard() {
    setState(state => {
      state.board = {};
      console.log(Object.keys(state.board));
    });
    blocks = [];
  }

  // sets the position to be determined by the drag
  function onDrag(e, position, blockName) {
    const { x, y } = position;
    setState(state => {
      state.board[blockName].coordinates = { position: { x, y } };
    });
  }

  // state.id.position = {};

  // reset position of all the boards
  function reset() {
    setPosition(position => {
      position["one"].position = { x: 0, y: 0 };
    });
  }

  // Object.values() returns an array with the values of an objects properties
  // b.coordinates.position
  // position["one"] ? position["one"].position : { x: 0, y: 0 }
  let blocks = Object.values(state).map(b => {
    return (
      <Block
        setState={b.coordinates ? b.coordinates.position : { x: 0, y: 0 }}
        onDrag={(e, pos) => onDrag(e, pos, b)}
      />
    );
  });
  console.log(blocks);

  return (
    <div>
      <h1>RoomService Kanban Board Demo</h1>

      <button onClick={createBoard}>Create Board</button>
      <button onClick={deleteBoard}>Delete Board</button>
      <button onClick={reset}>Reset Position</button>
      <div className="blockContainer">{blocks}</div>
      <div className="blockContainer"></div>
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
