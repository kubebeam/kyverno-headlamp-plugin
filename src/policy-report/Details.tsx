import { NameValueTable, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { PolicyReport } from '../kyverno-types/PolicyReport';
import { policyReportClass } from '../model';
import { getURLSegments } from '../utils/url';

export default function KyvernoPolicyReportDetails() {
  const [name, namespace] = getURLSegments(-1, -2);
  const [policyReportObject, setPolicyReport] = React.useState(null);

  policyReportClass.useApiGet(setPolicyReport, name, namespace);

  if (!policyReportObject) {
    return <div></div>;
  }

  const policyReport: PolicyReport = policyReportObject.jsonData;
  return (
    <>
      <SectionBox title="Policy Report">
        <NameValueTable
          rows={[
            {
              name: 'Workload',
              value: policyReport.scope.name,
            },
            {
              name: 'Kind',
              value: policyReport.scope.kind,
            },
            {
              name: 'Namespace',
              value: policyReport.scope.namespace,
            },
          ]}
        />
      </SectionBox>
      <Results policyReport={policyReport} />
    </>
  );
}

function Results(props: { policyReport: PolicyReport }) {
  const { policyReport } = props;
  const results = policyReport.results;

  return (
    <SectionBox title="Results">
      <Table
        data={results}
        columns={[
          {
            header: 'Policy',
            accessorFn: (report: PolicyReport.Result) => report.policy,
            gridTemplate: '0.5fr',
          },
          {
            header: 'Rule',
            accessorFn: (report: PolicyReport.Result) => report.rule,
            gridTemplate: '0.5fr',
          },
          {
            header: 'Result',
            accessorFn: (report: PolicyReport.Result) => report.result,
            gridTemplate: 'min-content',
          },
          {
            header: 'Severity',
            accessorFn: (report: PolicyReport.Result) => report.severity,
            gridTemplate: 'min-content',
          },
          {
            header: 'Message',
            accessorFn: (report: PolicyReport.Result) => report.message.replaceAll('`', '"'),
            gridTemplate: 'auto',
          },
        ]}
      />
    </SectionBox>
  );
}
