/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Drawer, IconButton } from '@material-ui/core';
import { FilterList } from '@material-ui/icons';
import { getDate } from '../../utils/helper';
import Filter from './Filter';
import { fetchAdminReport, useAdminReport } from '../../store';
import { useDispatch } from 'react-redux';
import TableComponent from './Table';
import { getUsers } from '../../service/user';

function CheckWork() {
  const adminReports = useAdminReport();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const [filter, setFilter] = useState({
    users: [],
    start: getDate(new Date()),
    end: getDate(new Date()),
  });
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    const { data: users } = await getUsers();
    setUsers(users.map(user => ({
      id: user.id,
      title: user.username,
    })));
    dispatch(fetchAdminReport(filter));
  }, []);

  console.log(adminReports);

  return (
    <>
      <TableComponent
        reports={adminReports}
        users={users}
      />
      <IconButton
        style={{ position: 'fixed', top: '90%' }}
        color="primary"
        onClick={() => setOpen(true)}
      >
        <FilterList />
      </IconButton>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Filter
          filter={filter}
          setFilter={setFilter}
          users={users}
        />
      </Drawer>
    </>
  );
};

export default CheckWork;