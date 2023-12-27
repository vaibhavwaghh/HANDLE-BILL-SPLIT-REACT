import { useState } from "react";

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
          />
        )}
      </div>
    </>
  );
}
function Button({ children, handleAdd }) {
  return (
    <>
      <button onClick={handleAdd} className="button">
        {children}
      </button>
    </>
  );
}

function FreindList({ friends, handleSelection, selectedFriend }) {
  // const friends = initialFriends;
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            handleSelection={handleSelection}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>{" "}
    </>
  );
}

function Friend({ friend, handleSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend?.id;
  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt="" />
        <h3>{friend.name}</h3>
        {friend.balance < 0 && (
          <p className="red">
            You owe {friend.name} {Math.abs(friend.balance)} $
          </p>
        )}
        {friend.balance > 0 && (
          <p className="green">
            {friend.name} owes you {Math.abs(friend.balance)} $
          </p>
        )}
        {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        <button className="button" onClick={() => handleSelection(friend)}>
          {isSelected ? "Close" : "Select"}
        </button>
      </li>
    </>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u");
  function addName(e) {
    e.preventDefault();
    if (!name || !image) return;
    const id = crypto.randomUUID();
    const newPerson = {
      name,
      image: `${image}?=${id}`,
      balance: 0,
      id,
    };
    console.log(newPerson);
    onAddFriend(newPerson);
    setName("");
    setImage("https://i.pravatar.cc/48?u");
  }
  return (
    <>
      <form onSubmit={addName} action="" className="form-add-friend">
        <label>🧑‍🤝‍🧑Friend name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>👈Image URL</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add </Button>
      </form>
    </>
  );
}

function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - paidByUser : "";

  function handleBillSubmit(e) {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    handleSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <>
      <form onSubmit={handleBillSubmit} action="" className="form-split-bill">
        <h2>Split bill with {selectedFriend.name}</h2>
        <label>💰Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        />
        <label>👱Your expense</label>
        <input
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
        />
        <label>🧑‍🤝‍🧑{selectedFriend.name}'s expense</label>
        <input type="text" disabled value={paidByFriend} />
        <label htmlFor="">Who is paying the bill</label>
        <select
          name=""
          id=""
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option>You</option>
          <option>{selectedFriend.name}</option>
        </select>
        <Button>Split Bill</Button>
      </form>
    </>
  );
}

export default App;
