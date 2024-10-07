import Title from "../components/title";
import DefaultLayout from "../layout/defaultLayout";

const About = () => {
  return (
    <DefaultLayout>
      <Title title={"About us"} />
      <div className="container mx-auto p-20">
        <h1 className="text-4xl font-bold mb-5">Our Mission</h1>
        <p className="text-lg">
          Our mission is to revolutionize the way tournaments are organized by
          providing a seamless, user-friendly platform that simplifies every
          step of the process. We aim to empower organizers and participants
          alike with tools that enhance the experience, foster competition, and
          promote a sense of community.
        </p>
        <h1 className="text-4xl font-bold my-5">Our Vision</h1>
        <p className="text-lg">
          Our mission is to revolutionize the way tournaments are organized by
          providing a seamless, user-friendly platform that simplifies every
          step of the process. We aim to empower organizers and participants
          alike with tools that enhance the experience, foster competition, and
          promote a sense of community.
        </p>
      </div>
    </DefaultLayout>
  );
};

export default About;
