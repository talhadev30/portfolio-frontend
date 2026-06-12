import React from "react";
import workflowData from "../../data/Workflowdata";
import Workflowcard from "./Workflowcard";
import Projecttext from "./Projecttext";
const Workflow = () => {
  const Workflowcards = workflowData;

  return (
    <div>
        <Projecttext text1={"my development"} text2={"workflow"} />
    <div className="min-h-[200vh] relative w-full lg:m-20 px-5 ">
      <div className="w-full h-full relative">
        {Workflowcards.map((item) => (
          <Workflowcard
            key={item.numbers}
            numbers={item.numbers}
            title={item.title}
            color={item.color}
            zindex={item.zindex}
            top={item.top}
            left={item.left}
            mdtop={item.mdtop}
            paragraf={item.paragraf}
            subparagraf={item.subparagraf}
          />
        ))}
      </div>
    </div>
    </div>
  );
};

export default Workflow;
