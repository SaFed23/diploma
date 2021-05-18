import { IconButton } from "@material-ui/core";
import { AddCircle, Delete } from "@material-ui/icons";
import { ROLES } from '../../utils/constants';

export const columns = (t, deleteUser, createUser) => (
  [
    {
      field: 'id',
      headerName: "ID",
      flex: 1.2,
      type: 'number',
      sortable: false,
      headerAlign: 'left',
    },
    { field: 'username', headerName: t("username"), flex: 0.7, sortable: false, },
    { field: 'email', headerName: "Email", flex: 1, sortable: false, },
    {
      field: 'role',
      headerName: t("role"),
      flex: 1,
      sortable: false,
      valueGetter: (params) => (params.row.role.title),
    },
    {
      field: 'location',
      headerName: t("location"),
      flex: 1,
      sortable: false,
      valueGetter: (params) => (params.row.location ? params.row.location.title : ""),
    },
    {
      field: 'action',
      headerAlign: 'center',
      align: 'center',
      renderHeader: () => (
        <IconButton onClick={createUser}>
          <AddCircle color="primary" />
        </IconButton>
      ),
      flex: 0.3,
      sortable: false,
      renderCell: (params) => params.row.role.title !== ROLES.ADMIN && (
        <IconButton onClick={() => deleteUser(params.row.id)}>
          <Delete />
        </IconButton>
      )
    },
  ]
);

export const localeText = (t) => ({
  noRowsLabel: t("no_content")
});