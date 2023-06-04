import React, { useEffect, useState } from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { eye } from "../assets";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { client, urlFor } from "../client";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  imgUrl,
  projectLink,
  truncateDescription,
  setShowMore,
  showMore,
  toggleShowMore,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={urlFor(imgUrl)}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(projectLink, "_blank")}
              className="black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={eye}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-secondary text-[14px]">
            {showMore[index]
              ? description
              : truncateDescription(description, 250)}
            {description.length > 250 && (
              <span
                className="text-white font-bold"
                onClick={() => toggleShowMore(index)}
              >
                {showMore[index] ? "Show less" : "Show more"}
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag}`} className={`text-[14px] ${tag?.color}`}>
              #{tag}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const [works, setWorks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const worksPerPage = 6;

  useEffect(() => {
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      setWorks(data);
    });
  }, []);

  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }

    return description.substring(0, maxLength) + "...";
  };

  const [showMore, setShowMore] = useState([]);

  const toggleShowMore = (index) => {
    setShowMore((prevState) => {
      const updatedState = [...prevState];
      updatedState[index] = !prevState[index];
      return updatedState;
    });
  };

  // Pagination logic
  const indexOfLastWork = currentPage * worksPerPage;
  const indexOfFirstWork = indexOfLastWork - worksPerPage;
  const currentWorks = works.slice(indexOfFirstWork, indexOfLastWork);
  const totalPages = Math.ceil(works.length / worksPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-20 flex flex-wrap gap-7">
        {currentWorks.map((work, index) => (
          <ProjectCard
            key={`project-${index}`}
            index={index}
            title={work.title}
            description={work.description}
            tags={work.tags}
            imgUrl={work.imgUrl}
            projectLink={work.projectLink}
            truncateDescription={truncateDescription}
            setShowMore={setShowMore}
            showMore={showMore}
            toggleShowMore={toggleShowMore}
          />
        ))}
      </div>

      <div className="mt-10 flex justify-center h-10">
        <nav className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage > 1 ? prevPage - 1 : prevPage
              )
            }
            className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`${
                  currentPage === pageNumber
                    ? "bg-tertiary text-white"
                    : "bg-white text-gray-700 hover:text-gray-500"
                } px-3 py-1 border-t border-b border-gray-300 text-sm leading-5 font-medium focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150`}
              >
                {pageNumber}
              </button>
            )
          )}
          <button
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : prevPage
              )
            }
            className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 focus:outline-none focus:border-blue-300 focus:ring-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
          >
            Next
          </button>
        </nav>
      </div>
    </>
  );
};

export default SectionWrapper(Works, "");
