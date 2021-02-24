import React from "react";

interface ContentProps {
  /* You can't touch this! */
}

export const Content: React.FC<ContentProps> = () => {
  return (
    <div>
      Hello, this is content. I want you to{" "}
      <button onClick={() => {}}>click here</button> to fetch and update the
      secret data in sidebar and header.
    </div>
  );
};

export default Content;
