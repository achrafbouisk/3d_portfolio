import React, { useEffect, useState } from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { client, urlFor } from "../client";

const Tech = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);
  return (
    <div className="flex flex-row flex-wrap justify-center gap-10">
      {skills.map((skill) => (
        <div className="w-28 h-28" key={skill.name}>
          <BallCanvas icon={urlFor(skill.icon)} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
