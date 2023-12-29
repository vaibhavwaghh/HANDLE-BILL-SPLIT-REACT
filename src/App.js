import { useState } from "react";
import { FreindList } from "./FreindList";
import { FormAddFriend } from "./FormAddFriend";
import { Button } from "./Button";
import { FormSplitBill } from "./FormSplitBill";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [showAddFriend, setAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");
  function handleAddNewFriend(newFriend) {
    setFriends((friends) => [...friends, newFriend]);
    setAddFriend(false);
  }
  function handleShowAdd() {
    setAddFriend((showAddFriend) => !showAddFriend);
  }
  function handleSelection(friend) {
    setSelectedFriend((curr) => (curr?.id === friend?.id ? null : friend));
    setAddFriend(false);
  }
  function handleSplitBill(value) {
    console.log(value);
    setFriends((friends) =>
      friends.map((curr) =>
        curr.id === selectedFriend.id
          ? { ...curr, balance: curr.balance + value }
          : curr
      )
    );
    setSelectedFriend(null);
  }
  return (
    <>
      <div className="app">
        <div className="slidebar">
          <FreindList
            friends={friends}
            handleSelection={handleSelection}
            selectedFriend={selectedFriend}
          />
          {showAddFriend && <FormAddFriend onAddFriend={handleAddNewFriend} />}
          <Button handleAdd={handleShowAdd}>
            {showAddFriend ? "Close" : "Add friend"}
          </Button>
        </div>
        {selectedFriend && (
          <FormSplitBill
            selectedFriend={selectedFriend}
            handleSplitBill={handleSplitBill}
            key={selectedFriend.id}
          />
        )}
      </div>
    </>
  );
}

export default App;
