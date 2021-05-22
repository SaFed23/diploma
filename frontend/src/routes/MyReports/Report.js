/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  createReportAndFetch,
  deleteReportAndFetch,
  fetchFactors,
  fetchLocations,
  fetchUserProjects,
  updateReportAndFetch,
  useFactorData,
  useLocationData,
  useProjectData,
  useUserData
} from '../../store';
import ReportForm from './ReportForm';

function Report({
  date,
  reports,
}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useUserData();
  const projects = useProjectData();
  const locations = useLocationData();
  const factors = useFactorData();
  const [currentReports, setReports] = useState();

  useEffect(() => {
    dispatch(fetchUserProjects());
    dispatch(fetchLocations());
    dispatch(fetchFactors());
  }, []);

  useEffect(() => {
    setReports(reports.length ? [...reports] : [{}]);
  }, [reports]);

  const handleAddReport = () => {
    if (currentReports[currentReports.length - 1].id) {
      const newReports = [...currentReports, {}];

      setReports(newReports);
    }
  };

  const handleSave = (value) => {
    dispatch(createReportAndFetch(value));
  };

  const handleUpdate = (value) => {
    dispatch(updateReportAndFetch(value));
  };

  const handleDelete = (id) => {
    dispatch(deleteReportAndFetch(id));
  };

  return (
    <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', overflowX: 'hidden' }}>
      {date ? (
        <>
          <Grid container justify="space-between">
            <Grid item xs={10}>
              <Typography variant="h6">
                {t("report")}: {date.toLocaleDateString()}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton onClick={handleAddReport}>
                <AddCircle color="primary" />
              </IconButton>
            </Grid>
          </Grid>
          {currentReports.map((report, index) => (
            <ReportForm
              key={index}
              date={date}
              report={report}
              user={user}
              projects={projects}
              locations={locations}
              factors={factors}
              createRep={handleSave}
              updateRep={handleUpdate}
              deleteRep={handleDelete}
            />
          ))}
        </>
      ) : (
        <Typography variant="h6">
          {t("no_content")}
        </Typography>
      )}
    </div>
  )
};

export default Report;