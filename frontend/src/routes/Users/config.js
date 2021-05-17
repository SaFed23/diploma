export const columns = (t) => [
  { field: 'id', headerName: t("id"), flex: 0.3, type: 'number', sortable: false, },
  { field: 'username', headerName: t("username"), flex: 0.5, sortable: false, },
  { field: 'email', headerName: t("email"), flex: 0.5, sortable: false, },
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
];