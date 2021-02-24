import React from "react";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <div>
      Hello, this is header!
      <span style={{ margin: 10, padding: 10, backgroundColor: "#ffffdc" }}>
        This is the place for some secret data!
      </span>
      <div style={{ position: "absolute", right: 10, top: 10 }}>
        You're logged in as ABC user.
        <div>
          <button onClick={() => {}}>Click here to log out</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
