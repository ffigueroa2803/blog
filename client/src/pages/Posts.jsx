import { Modal, Table, Button } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useGetPostsQuery } from "../redux/services/post/postApi";
import { Pagination } from "../components";
import { postChangeCurrentPage } from "../redux/features/post/postSlice";

const Posts = () => {
  const { currentUser } = useSelector((state) => state?.auth);
  const { page, limit, search } = useSelector((state) => state?.post);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const {
    data: userPosts,
    isLoading,
    error,
    isFetching,
  } = useGetPostsQuery({ page, limit, userId: currentUser?.user?.id });

  const handleShowMore = async () => {};

  const handleDeletePost = async () => {};

  return (
    <>
      <div className="table-auto md:mx-auto m-2">
        <div className="mt-4 mb-4  overflow-x-auto">
          {currentUser?.user?.role === "ADMIN" &&
          userPosts?.data?.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Fecha</Table.HeadCell>
                  <Table.HeadCell>Imagen</Table.HeadCell>
                  <Table.HeadCell>Título</Table.HeadCell>
                  <Table.HeadCell>Categoría</Table.HeadCell>
                  <Table.HeadCell>Eliminar</Table.HeadCell>
                  <Table.HeadCell>
                    <span>Editar</span>
                  </Table.HeadCell>
                </Table.Head>
                {userPosts?.data?.map((post) => (
                  <Table.Body className="divide-y" key={post.id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(post.updatedAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/post/${post.slug}`}>
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-20 h-10 object-contain bg-gray-500"
                          />
                        </Link>
                      </Table.Cell>
                      <Table.Cell width={480}>
                        <Link
                          className="font-medium text-gray-900 text-justify dark:text-white"
                          to={`/post/${post.slug}`}
                        >
                          {post.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{post.category}</Table.Cell>
                      <Table.Cell>
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setPostIdToDelete(post.id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Eliminar
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          className="text-teal-500 hover:underline"
                          to={`/update-post/${post.id}`}
                        >
                          <span>Editar</span>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </>
          ) : (
            <p>¡Aún no tienes publicaciones!</p>
          )}
        </div>
        {/* Pagination */}
        <Pagination
          {...userPosts?.meta}
          changeCurrentPage={postChangeCurrentPage}
        />
      </div>
      {/* Modal Eliminar */}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              ¿Estás seguro de que deseas eliminar esta publicación?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Si estoy seguro
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Posts;
