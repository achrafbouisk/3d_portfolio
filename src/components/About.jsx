import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import { urlFor, client } from "../client";

const ServiceCard = ({ index, title, imgUrl }) => (
  <Tilt className="xs:w-[250px] w-full">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={urlFor(imgUrl)}
          alt={title}
          className="w-16 h-16 object-cover"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        I'm a skilled software developer with experience in JavaScript, and
        expertise in frameworks like React, Node.js, and Three.js. I'm a quick
        learner and collaborate closely with clients to create efficient,
        scalable, and user-friendly solutions that solve real-world problems.
        Let's work together to bring your ideas to life!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {abouts.map((item, index) => (
          <ServiceCard
            key={index}
            index={index}
            title={item.title}
            imgUrl={item.imgUrl}
          />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
