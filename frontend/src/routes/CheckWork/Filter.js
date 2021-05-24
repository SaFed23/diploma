/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  TextField,
  Grid,
  Button,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Search } from '@material-ui/icons';
import SelectComponent from '../../components/common/Select';
import { fetchAdminReport } from '../../store/report';
import { useDispatch } from 'react-redux';


function Filter({
  filter,
  setFilter,
  users,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(fetchAdminReport(filter));
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (new Date(filter.start) <= new Date(filter.end)) {
      dispatch(fetchAdminReport(filter));
    }
  };

  const handleChange = (field, { value }) => {
    if (field === 'users') {
      setFilter({
        ...filter,
        users: [...value],
      })
    } else {
      setFilter({
        ...filter,
        [field]: value,
      })
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ width: 450 }}>
      <Grid container style={{ width: 430, marginLeft: 10, marginRight: 10 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="date"
            label={t("start_date")}
            variant="outlined"
            margin="normal"
            autoFocus
            value={filter.start}
            InputLabelProps={{
              shrink: true
            }}
            onChange={({ target }) => handleChange('start', target)}
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
            value={filter.end}
            InputLabelProps={{
              shrink: true
            }}
            onChange={({ target }) => handleChange('end', target)}
            size="small"
          />
        </Grid>
        <SelectComponent
          fullWidth
          multiple
          values={users}
          currentValue={filter.users}
          onChange={({ target }) => handleChange('users', target)}
          nullValue={false}
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