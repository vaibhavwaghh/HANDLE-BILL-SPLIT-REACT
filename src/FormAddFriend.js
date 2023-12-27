import { useState } from "react";
import { Button } from "./Button";
export function FormAddFriend({ onAddFriend }) {
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
