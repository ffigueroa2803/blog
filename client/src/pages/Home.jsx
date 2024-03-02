import { useState } from "react";
import { Link } from "react-router-dom";
import { CallToAction, PostCard } from "../components";

const Home = () => {
  const [posts, setPosts] = useState([]);

  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">Bienvenido a mi blog</h1>
        <p className="text-gray-500 text-xs sm:text-sm">
          Aquí encontrará una variedad de artículos y tutoriales sobre temas
          como desarrollo web, ingeniería de software y lenguajes de
          programación.
        </p>
        <Link
          to="/search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          Ver todas las publicaciones
        </Link>
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">
              Reciente publicaciones
            </h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              Ver todas las publicaciones
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
