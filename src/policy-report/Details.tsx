import { NameValueTable, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import React from 'react';
import { clusterpolicyreportClass, policyReportClass } from '../model';
import { PolicyReport } from '../types/policyreport/PolicyReport';
import { PolicyReportResults } from '../types/policyreport/PolicyReportResults';
import { getURLSegments } from '../utils/url';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export default function KyvernoPolicyReportDetails() {
  const [name, namespace] = getURLSegments(-1, -2);
  const [policyReportObject, setPolicyReport] = React.useState<KubeObject | null>(null);

  if (namespace === '-') clusterpolicyreportClass.useApiGet(setPolicyReport, name);
  else policyReportClass.useApiGet(setPolicyReport, name, namespace);

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
              value: policyReport.scope?.name,
            },
            {
              name: 'Kind',
              value: policyReport.scope?.kind,
            },
            {
              name: 'Namespace',
              value: policyReport.scope?.namespace,
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
  const results = policyReport.results ?? [];

  return (
    <SectionBox title="Results">
      <Table
        data={results}
        columns={[
          {
            header: 'Policy',
            accessorFn: (report: PolicyReportResults) => report.policy,
            gridTemplate: '0.5fr',
          },
          {
            header: 'Rule',
            accessorFn: (report: PolicyReportResults) => report.rule,
            gridTemplate: '0.5fr',
          },
          {
            header: 'Result',
            accessorFn: (report: PolicyReportResults) => report.result,
            gridTemplate: 'min-content',
          },
          {
            header: 'Severity',
            accessorFn: (report: PolicyReportResults) => report.severity,
            gridTemplate: 'min-content',
          },
          {
            header: 'Message',
            accessorFn: (report: PolicyReportResults) => report.message?.replaceAll('`', '"'),
            gridTemplate: 'auto',
          },
        ]}
      />
    </SectionBox>
  );
}
