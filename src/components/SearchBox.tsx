import React, { useCallback, useState } from "react";
import { data } from "../data";
import { useOutsideClick } from "../hooks/useOutsideClick";
import "../styles/SearchBox.css";
import Chip from "./Chip";
import ResultList from "./ResultList";

// Define the User interface
interface User {
  id: number;
  image: string;
  name: string;
}

export const SearchBox = () => {
  // Define state variables
  const [searchInput, setSearchInput] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [userData, setUserData] = useState(data);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([data[0]]);
  const [shouldDeleteLastSelectedUser, setShouldDeleteLastSelectedUser] =
    useState(false);

  // Function to remove a user from the selected users list
  const removeUser = (id: number) => {
    setSelectedUsers(selectedUsers.filter((user) => user.id !== id));
  };

  // Function to select a user and add them to the selected users list
  const selectUser = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchInput("");
    setIsInputFocused(false);
    setUserData(data);
  };

  // Function to handle search input changes
  const onSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    setUserData(
      value
        ? data.filter((user) =>
            user.name.toLowerCase().includes(value.toLowerCase())
          )
        : data
    );
  }, []);

  // Function to handle key down events in the search input
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && searchInput === "") {
        if (shouldDeleteLastSelectedUser) {
          setSelectedUsers(selectedUsers.slice(0, selectedUsers.length - 1));
          setShouldDeleteLastSelectedUser(false);
        } else {
          setShouldDeleteLastSelectedUser(true);
        }
      }
    },
    [searchInput, shouldDeleteLastSelectedUser, selectedUsers]
  );

  // Handle outside click to close the search input
  const outsideClickRef = useOutsideClick(() => {
    setIsInputFocused(false);
  });

  // Render the search box component
  return (
    <div className="searchbox-container">
      {selectedUsers.map((user, index) => {
        let isHighlited =
          index === selectedUsers.length - 1 && shouldDeleteLastSelectedUser;
        return (
          <Chip
            key={user.id}
            image={user.image}
            label={user.name}
            isHighlited={isHighlited}
            onRemove={() => removeUser(user.id)}
          />
        );
      })}
      <div
        style={{
          position: "relative",
          flex: 1,
        }}
        ref={outsideClickRef}
      >
        <input
          className="search-input"
          value={searchInput}
          onChange={onSearch}
          onFocus={() => setIsInputFocused(true)}
          onKeyDown={handleKeyDown}
        />
        {isInputFocused && (
          <ResultList
            result={userData}
            selectedUsers={selectedUsers}
            onSelectUser={selectUser}
          />
        )}
      </div>
    </div>
  );
};
