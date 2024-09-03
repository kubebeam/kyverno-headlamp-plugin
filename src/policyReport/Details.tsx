import { MainInfoSection, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useLocation } from 'react-router';
import { policyReportClass } from '../model';

export default function KyvernoPolicyReportDetails() {
  const location = useLocation();
  const segments = location.pathname.split('/');
  // The fourth last segment is the kind
  const namespace = segments[segments.length - 3];
  // The second last segment is the type
  const type = segments[segments.length - 2];
  // The last segment is the name
  const name = segments[segments.length - 1];

  return <PolicyReportDetailView name={name} namespace={namespace} />;
}

function prepareExtraInfo(policyReport) {
  const extraInfo = [];

  extraInfo.push({
    name: 'Scope',
    value: policyReport?.jsonData.scope.name,
  });
  return extraInfo;
}

function PolicyReportDetailView(props) {
  const { name, namespace } = props;
  const [policyReport, setPolicyReport] = React.useState(null);

  policyReportClass.useApiGet(setPolicyReport, name, namespace);

  return (
    <>
      <MainInfoSection
        title="Policy Report"
        resource={policyReport}
        extraInfo={prepareExtraInfo(policyReport)}
        actions={[]}
      />
      {policyReport && <Results cr={policyReport} />}
    </>
  );
}

function Results(props) {
  const { policyReport } = props;
  const results = policyReport?.jsonData.results;

  return (
    <SectionBox title="Results">
      <Table
        data={results}
        columns={[
          {
            header: 'Policy',
            accessorFn: item => item.policy,
          },
          {
            header: 'Rule',
            accessorFn: item => item.rule,
          },
          {
            header: 'Result',
            accessorFn: item => item.result,
          },
          {
            header: 'Severity',
            accessorFn: item => item.severity,
          },
          {
            header: 'Message',
            accessorFn: item => item.message,
          },
        ]}
      />
    </SectionBox>
  );
}
