import React, { useState } from "react";

const inputTextKumar = "Ashok /n  \\n hehe ashok /n kumar";

const InputText = () => {
  const [commentText, setCommentText] = useState(
    (inputTextKumar || "")
      .replace(/\/n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .join("\n")
  );

  console.log(commentText);

  return (
    <div>
      <textarea
        rows={20}
        cols={30}
        className="ml-4"
        type="text"
        value={commentText.replace(/\/n/g, "\n")}
        onChange={(e) => setCommentText(e.target.value)}
      />
    </div>
  );
};

export default InputText;
