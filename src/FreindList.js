import { Friend } from "./Friend";
export function FreindList({ friends, handleSelection, selectedFriend }) {
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
