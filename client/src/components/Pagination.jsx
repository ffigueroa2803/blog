import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pagination = ({
  totalPages,
  currentPage,
  totalItems,
  changeCurrentPage,
}) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const changeCurrentPageNumberInc = (currentPage) => {
    setLoading(true);
    if (Number(currentPage) < Number(totalPages)) {
      dispatch(changeCurrentPage(currentPage + 1));
    } else if (Number(currentPage) === Number(totalPages)) {
      alert("No puede aumentar más");
    }
    setLoading(false);
  };

  const changeCurrentPageNumberDec = (currentPage) => {
    setLoading(true);
    if (Number(currentPage) === 1) {
      alert("No puede volver a su página 1");
    } else {
      dispatch(changeCurrentPage(currentPage - 1));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-md mt-3 dark:bg-gray-800">
      <div className="container flex flex-col items-center px-6 py-5 mx-auto space-y-6 sm:flex-row sm:justify-between sm:space-y-0 ">
        <div className="flex flex-row -mx-2">
          {/* Previous */}
          <button
            disabled={Number(currentPage) === 1}
            onClick={() => changeCurrentPageNumberDec(currentPage)}
            className={`px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md text-white disabled:bg-gray-200`}
          >
            <div className="flex items-center -mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-1 rtl:-scale-x-100"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16l-4-4m0 0l4-4m-4 4h18"
                />
              </svg>
              <span className="mx-1">Anterior</span>
            </div>
          </button>
          {/* Next */}
          <button
            disabled={
              Number(totalPages === 0 ? 1 : totalPages) ===
                Number(currentPage) || loading
            }
            onClick={() => changeCurrentPageNumberInc(currentPage)}
            className="px-4 py-2 mx-1 transition-colors duration-300 transform rounded-md text-white disabled:bg-gray-200"
          >
            <div className="flex items-center -mx-1">
              <span className="mx-1">Siguiente</span>
              {!loading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-1 rtl:-scale-x-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              )}
            </div>
          </button>
        </div>
        <div className="text-gray-500">
          <span className="font-medium">
            {currentPage} - {totalPages} de {totalItems} registros
          </span>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
