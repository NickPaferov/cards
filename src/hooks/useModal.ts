import { useState } from "react";

interface ReturnType {
  openAdd: boolean;
  openEdit: boolean;
  openDelete: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  openAddModal: () => void;
  closeAddModal: () => void;
  closeEditModal: () => void;
  openEditModal: () => void;
}

export const useModal = (): ReturnType => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const closeAddModal = (): void => {
    setOpenAdd(false);
  };

  const openAddModal = (): void => {
    setOpenAdd(true);
  };

  const closeEditModal = (): void => {
    setOpenEdit(false);
  };

  const openEditModal = (): void => {
    setOpenEdit(true);
  };

  const closeDeleteModal = (): void => {
    setOpenDelete(false);
  };

  const openDeleteModal = (): void => {
    setOpenDelete(true);
  };

  return {
    openAdd,
    openEdit,
    openDelete,
    closeAddModal,
    openAddModal,
    closeEditModal,
    openEditModal,
    closeDeleteModal,
    openDeleteModal,
  };
};
