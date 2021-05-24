import React from 'react';
import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';

function TableComponent({ reports, users }) {
  const { t } = useTranslation();

  return (
    <Table stickyHeader aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell>
            {t("users")}
          </TableCell>
          {reports?.dates?.map((date, index) => (
            <TableCell
              key={index}
            >
              <Typography
              >
                {date}
              </Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {reports?.users && Object.keys(reports.users).map((user, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              <TableCell
                key={index}
              >
                <Typography>
                  {users.find(u => u.id === user)?.title}
                </Typography>
              </TableCell>
              {reports?.dates?.map((date, i) => (
                <TableCell
                  key={i}
                >
                  {reports.users[user][date] || 0}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  )
};

export default TableComponent;