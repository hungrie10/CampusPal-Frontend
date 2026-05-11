import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faRobot,
  faUserFriends,
  faGroupArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

function Aside() {
  return (
    <aside id="side_bar">
      <div>
        <img
          src="https://i.pinimg.com/1200x/31/4b/96/314b960aa8fee08076b6f2db5e80ca4c.jpg"
          width={90}
          alt="logo"
        />
        <p>Chatterer</p>
      </div>

      <nav id="chat_nav">
        <ul>
          <li>
            <FontAwesomeIcon icon={faRobot} />
            <span>AI Chatter</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faUserFriends} />
            <span>StudyBuddies</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faGroupArrowsRotate} />
            <span>Groups</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faAddressBook} />
            <span>Find Friends</span>
          </li>
        </ul>
      </nav>

      <div id="chat_profile">
        <img
          src="https://i.pinimg.com/736x/d7/1d/6e/d71d6e882e9d45d0eda79e256735f3d8.jpg"
          width={50}
          alt="profile"
        />
        <span>
          <h2>Username</h2>
          <small>Online</small>
        </span>
      </div>
    </aside>
  );
}

export default Aside;