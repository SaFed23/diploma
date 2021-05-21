import { Typography } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../../store';
import ReportForm from './ReportForm';

function Report({
  date,
  reports,
  projects,
}) {
  const { t } = useTranslation();
  const user = useUserData();

  return (
    <div style={{ height: 'calc(100vh - 150px)', overflowY: 'auto', overflowX: 'hidden' }}>
      {date ? (
        <>
          <Typography variant="h6">
            {t("report")}: {date.toLocaleDateString()}
          </Typography>
          <ReportForm
            date={date}
            user={user}
            projects={projects}
          />
          {reports.map(report => (
            <ReportForm
              date={date}
              report={report}
              user={user}
              projects={projects}
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