/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Grid,
  IconButton,
  Button,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import useForm from '../../hooks/useForm';
import { validationSchema, defaultValues } from './Filter.form';
import { Search } from '@material-ui/icons';
import SelectComponent from '../../components/common/Select';
import { getUsers } from '../../service/user';


function Filter({
  handleClose,
  submit,
}) {
  const { t } = useTranslation();
  const { handleSubmit, formState: { errors }, muiRegister } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    users: [],
  });

  useEffect(async () => {
    const { data: users } = await getUsers();
    setUsers(users.map(user => ({
      id: user.id,
      title: user.username,
    })));
  }, []);

  const onSubmit = (value) => {
    console.log(value);
    // submit(value);
    // close();
  };

  const handleChange = (field, { value }) => {
    if (field === 'users') {
      setFilter({
        ...filter,
        users: [...value],
      })
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: 450 }}>
      <Grid container style={{ width: 430, marginLeft: 10, marginRight: 10 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label={t("start_date")}
            variant="outlined"
            margin="normal"
            autoFocus
            error={!!errors.startDate}
            helperText={t(errors.startDate?.message)}
            {...muiRegister("startDate")}
            size="small"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label={t("end_date")}
            variant="outlined"
            margin="normal"
            error={!!errors.endDate}
            helperText={t(errors.endDate?.message)}
            {...muiRegister("endDate")}
            size="small"
          />
        </Grid>
        <SelectComponent
          fullWidth
          multiple
          values={users}
          currentValue={filter.users}
          onChange={({ target }) => handleChange('users', target)}
        />
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 15 }}
            size="small"
          >
            <Search />
          </Button>
        </Grid>
      </Grid >
    </form>
  )
};

export default Filter;