import React from "react";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
  return (
    <div>
      This is sidebar
      <div style={{ margin: 10, padding: 10, backgroundColor: "#ffffdc" }}>
        This is the place for some secret data!
      </div>
    </div>
  );
};

export default Sidebar;
