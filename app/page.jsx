import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text orange_gradient text-center">
      Unleash Your Career Potential
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center"> with AI-Powered Tools</span>
      </h1>
      <p className="desc text-center">
      SkillupAdvisa a resume parser tool that helps you create a professional resume, find relevant job openings, and stay up-to-date with industry trends.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
