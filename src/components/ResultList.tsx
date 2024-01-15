import React from "react";
import "../styles/ResultList.css";

// Define the User interface
interface User {
  id: number;
  image: string;
  name: string;
}

// Define the props for the ResultList component
interface ResultListProps {
  result: User[];
  selectedUsers: User[];
  onSelectUser: (user: User) => void;
}

const ResultList = ({
  result,
  selectedUsers,
  onSelectUser,
}: ResultListProps) => {
  return (
    <div className="resultlist-container">
      {result.map((user) => {
        // Skip rendering if the user is already selected
        if (selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
          return null;
        }
        return (
          <div
            key={user.id} // Add a key prop to each child in a list
            className="resultlist-item"
            onClick={() => onSelectUser(user)}
          >
            <img src={user.image} alt="User avatar" />
            <div className="resultlist-label">{user.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ResultList;
