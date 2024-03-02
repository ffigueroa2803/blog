import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import {
  CallToAction,
  CommentSection,
  LoadingGlobal,
} from "./../../components";
import { useLazyGetPostsQuery } from "../../redux/services/post/postApi";

const GetPost = () => {
  const { postSlug } = useParams();

  const [recentPosts, setRecentPosts] = useState(null);

  const [getPosts, { data: post, isLoading, error }] = useLazyGetPostsQuery();

  useEffect(() => {
    if (postSlug) getPosts({ slug: postSlug });
  }, [postSlug]);

  if (isLoading) <LoadingGlobal />;

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post?.data[0]?.title}
      </h1>
      <Link
        to={`/search?category=${post?.data[0]?.category}`}
        className="self-center mt-5"
      >
        <Button color="gray" pill size="xs">
          {post?.data[0]?.category}
        </Button>
      </Link>
      <div className="mx-auto">
        <img
          src={post && post?.data[0]?.image}
          alt={post?.data[0]?.title}
          className="mt-10 p-3 h-96 w-96 object-fill"
        />
      </div>
      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{new Date(post?.data[0]?.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {(post?.data[0]?.content?.length / 1000).toFixed(0)} minutos de
          lectura
        </span>
      </div>
      <div
        className="p-3 max-w-2xl mx-auto w-full post-content"
        dangerouslySetInnerHTML={{ __html: post?.data[0]?.content }}
      ></div>
      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>
      <CommentSection postId={post?.data[0]?.id} />
      <div className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Artículos Recientes</h1>
        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts?.map((post) => (
              <PostCard key={post?.data?.id} post={post?.data} />
            ))}
        </div>
      </div>
    </main>
  );
};

export default GetPost;
