import { Button, Modal, Table } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../redux/services/user/userApi";
import avatar from "../assets/avatar-default.png";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Pagination } from "../components";
import { userChangeCurrentPage } from "../redux/features/user/userSlice";

const Users = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const { page, limit, search } = useSelector((state) => state?.user);

  const {
    data: getUsers,
    isLoading,
    error,
  } = useGetUsersQuery({ page, limit, search });

  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const handleDeleteUser = () => {};
  const handleShowMore = () => {};

  return (
    <>
      <div className="table-auto md:mx-auto m-2">
        <div className="mt-4 mb-4  overflow-x-auto">
          {currentUser?.user?.role === "ADMIN" && getUsers?.data?.length > 0 ? (
            <>
              <Table hoverable className="shadow-md">
                <Table.Head>
                  <Table.HeadCell>Fecha de creacion</Table.HeadCell>
                  <Table.HeadCell>Imagen de usuario</Table.HeadCell>
                  <Table.HeadCell>Nombre de usuario</Table.HeadCell>
                  <Table.HeadCell>Correo electrónico</Table.HeadCell>
                  <Table.HeadCell>Administrador</Table.HeadCell>
                  <Table.HeadCell>Eliminar</Table.HeadCell>
                </Table.Head>
                {getUsers?.data?.map((user) => (
                  <Table.Body className="divide-y" key={user.id}>
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </Table.Cell>
                      <Table.Cell align="center">
                        <img
                          src={user?.image === null ? avatar : user?.image}
                          alt={user.name}
                          className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                        />
                      </Table.Cell>
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell align="center">
                        {user.role === "ADMIN" ? (
                          <FaCheck className="text-green-500" />
                        ) : (
                          <FaTimes className="text-red-500" />
                        )}
                      </Table.Cell>
                      <Table.Cell align="center">
                        <span
                          onClick={() => {
                            setShowModal(true);
                            setUserIdToDelete(user.id);
                          }}
                          className="font-medium text-red-500 hover:underline cursor-pointer"
                        >
                          Eliminar
                        </span>
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                ))}
              </Table>
            </>
          ) : (
            <p>¡Aún no tienes usuarios!</p>
          )}
        </div>
        {/* Pagination */}
        <Pagination
          {...getUsers?.meta}
          changeCurrentPage={userChangeCurrentPage}
        />
      </div>

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
              ¿Estás seguro de que deseas eliminar este usuario?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
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

export default Users;
