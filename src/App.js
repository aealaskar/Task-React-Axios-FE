import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import ChatRoomsList from "./components/ChatRoomsList";
import { Route, Switch } from "react-router";
import axios from "axios";
import { useEffect } from "react";

function App() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        "https://coded-task-axios-be.herokuapp.com/rooms"
      );
      setRooms(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const createRoom = async (newRoom) => {
    try {
      const response = await axios.post(
        "https://coded-task-axios-be.herokuapp.com/rooms",
        newRoom
      );
      setRooms([...rooms, response.data]);
    } catch (error) {
      alert(error);
    }
  };

  const deleteRoom = async (roomId) => {
    // to do : call BE to delete a room
    try {
      const response = await axios.delete(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`
      );
      let tempRoom = rooms.filter((room) => room.id !== roomId);
      setRooms(tempRoom);
    } catch (error) {
      alert(error);
    }
  };

  const updateRoom = async (newRoom, roomId) => {
    try {
      const response = await axios.put(
        `https://coded-task-axios-be.herokuapp.com/rooms/${roomId}`,
        newRoom
      );
      let updatedRoom = rooms.map((room) =>
        room.id === roomId ? response.data : room
      );
      setRooms(updatedRoom);
    } catch (error) {
      alert(error);
    }
  };

  // const createMsg = async (roomId) => {
  //   try {
  //     const response = await axios.post(
  //       `https://coded-task-axios-be.herokuapp.com/rooms/msg/${roomId}`
  //     );
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return (
    <div className="__main">
      <div className="main__chatbody">
        <Switch>
          <Route path="/room/:roomSlug">
            <ChatRoom rooms={rooms} />
          </Route>
          <Route exact path="/">
            <center>
              <ChatRoomsList
                rooms={rooms}
                createRoom={createRoom}
                deleteRoom={deleteRoom}
                updateRoom={updateRoom}
              />
            </center>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
