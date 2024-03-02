import { AttachmentFileButton, CallToAction } from "../components";

const Projects = () => {
  return (
    <div className="min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3">
      <h1 className="text-3xl font-semibold">Proyectos</h1>
      <p className="text-md text-gray-500">
        Cree proyectos divertidos y atractivos mientras aprende HTML, CSS y
        JavaScript!
      </p>
      <CallToAction />
    </div>
  );
};

export default Projects;
