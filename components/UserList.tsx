"use client";

import { user } from "@prisma/client";
import React, { cache, use, useState } from "react";

const getUsers = cache(() =>
  fetch("http://localhost:3000/api/users").then((res) => res.json())
);

const deleteUser = cache((id: number) =>
  fetch(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
  }).then((res) => res.json())
);

export default function ListUsers() {
  const editUser = cache((id: number) =>
    fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ name: userName }),
    }).then((res) => res.json())
  );

  let users = use<user[]>(getUsers());
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState(users);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1fr",
        gap: 20,
      }}
    >
      {userList.map((user) => (
        <div
          key={user.id}
          style={{ border: "1px solid #ccc", textAlign: "center" }}
        >
          <img
            src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
            alt={user.name}
            style={{ height: 180, width: 180 }}
          />
          <h3>{user.name}</h3>
          <button
            className={
              "bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4  shadow-md transform hover:scale-105 transition duration-300"
            }
            onClick={() => {
              deleteUser(user.id);
            }}
          >
            Delete
          </button>
          <br />
          <br />
          <button
            className={
              "bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4  shadow-md transform hover:scale-105 transition duration-300"
            }
            onClick={() => {
              editUser(user.id);
            }}
          >
            Edit
          </button>
          <input
            className={
              "w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400"
            }
            type="text"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
