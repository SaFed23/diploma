import React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useTranslation } from 'react-i18next';

function Users() {
  const { t } = useTranslation();


  return (
    <>
      <DataGrid />
    </>
  );
};

export default Users;