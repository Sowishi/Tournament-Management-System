import { motion } from "framer-motion";

const Title = ({ title }) => {
  return (
    <motion.div
      initial={{ y: -600 }}
      animate={{ y: 0 }}
      className="wrapper flex jsutify-center items-center  flex-col mb-5"
    >
      <h1 className="font-bold uppercase text-white text-5xl m-5 text-center">
        {title}
      </h1>
      <div
        style={{ background: "#FFBD59" }}
        className="line h-[5px] w-[250px]"
      ></div>
    </motion.div>
  );
};

export default Title;
