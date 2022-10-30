import React, { useEffect, useState, useRef } from "react";
import {
  DataTableBase,
  ModalBase,
  LabelBase,
  ButtonBase,
} from "@reusejs/react";
import { Link } from "react-router-dom";

import PackageModal from "./PackageModal";
import { getPackages, removePackage } from "../services/packageHandler";

export default function Home() {
  const [packageData, setPackageData] = useState([]);
  const tableRef = useRef();

  const openModal = async (id) => {
    const result = await ModalBase({
      content: PackageModal,
      backgroundColor: "bg-white",
      backgroundOpacity: "opacity-50",
      contentProps: {},
      modalBaseClasses: {
        background: "bg-white",
        border: "border-gray-500 border-2 rounded-lg w-[400px]",
        font: "text-black",
        alignment: "z-50 flex flex-col justify-center overflow-visible",
        padding: "p-0",
        small: "sm:p-0",
      },
    });
    if (result === "yes") {
      removePackage(id);
      loadTableData();
      tableRef.current?.refresh?.();
    }
  };

  const loadTableData = () => {
    const packagesList = getPackages();
    setPackageData([...packagesList]);
  };

  useEffect(() => {
    loadTableData();
  }, []);

  return (
    <div className="mx-40 mt-20">
      <div className="flex justify-between">
        <div className="mt-3">
          <LabelBase
            label="Welcome to Favorite NPM Packages"
            variant="secondary"
          />
        </div>
        {packageData.length > 0 && (
          <div className="w-32">
            <Link to="/addFavoritePackage">
              <ButtonBase label="Add Fav" variant="secondary" />
            </Link>
          </div>
        )}
      </div>
      {packageData.length === 0 && (
        <div className="border border-gray-500 w-full h-72 mt-20 flex flex-col items-center justify-center">
          <div className="mt-2">
            <LabelBase
              label="You don't have any favs yet. Please add."
              variant="primary"
            />
          </div>
          <div className="w-32 mt-5">
            <Link to="/addFavoritePackage">
              <ButtonBase label="Add Fav" variant="secondary" />
            </Link>
          </div>
        </div>
      )}

      {packageData.length > 0 && (
        <div className="mt-10">
          <DataTableBase
            ref={tableRef}
            sortColumn={0}
            config={{
              filterable: false,
              columns: [
                {
                  label: "Package Name",
                  identifier: "name",
                  resolver: (d) => {
                    return d.package.label;
                  },
                  sortable: false,
                },

                {
                  label: "Actions",
                  identifier: "action",

                  resolver: (d) => {
                    return (
                      <div className="flex gap-2">
                        <div onClick={() => openModal(d.id)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6 cursor-pointer"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <Link to={`/editPackage/${d.id}`}>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-6 h-6"
                            >
                              <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    );
                  },
                  sortable: false,
                },
              ],
            }}
            dataSource={() => {
              return {
                data: packageData,
                pagination: {
                  total: packageData.length,
                },
              };
            }}
            refresh={packageData.length}
          />
        </div>
      )}
    </div>
  );
}
