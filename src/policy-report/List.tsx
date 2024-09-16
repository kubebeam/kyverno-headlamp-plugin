import {
  DateLabel,
  Link as HeadlampLink,
  SectionBox,
  Table as HeadlampTable,
} from '@kinvolk/headlamp-plugin/lib/components/common';
import { StatusLabel, StatusLabelProps } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, Tooltip } from '@mui/material';
import { useState } from 'react';
import { PolicyReport } from '../kyverno-types/PolicyReport';
import { policyReportClass } from '../model';

export default function KyvernoPolicyReportList() {
  const [policyReports, setPolicyReports] = useState<KubeObject>(null);

  policyReportClass.useApiList(setPolicyReports);

  if (!policyReports) {
    return <div></div>;
  }

  return (
    <SectionBox title="Policy Reports">
      <HeadlampTable
        data={policyReports.map((item: KubeObject) => item.jsonData)}
        columns={[
          {
            header: 'Name',
            accessorFn: (report: PolicyReport) => {
              return (
                <HeadlampLink
                  routeName={'/kyverno/policyreports/:namespace/:name'}
                  params={{
                    name: report.metadata.name,
                    namespace: report.metadata.namespace,
                  }}
                >
                  {report.scope.name}
                </HeadlampLink>
              );
            },
          },
          {
            header: 'Kind',
            accessorFn: (report: PolicyReport) => {
              return report.scope.kind;
            },
          },
          {
            header: 'Namespace',
            accessorFn: (report: PolicyReport) => (
              <HeadlampLink
                routeName="namespace"
                params={{
                  name: report.metadata.namespace,
                }}
              >
                {report.metadata.namespace}
              </HeadlampLink>
            ),
          },
          {
            header: 'Pass',
            accessorFn: (report: PolicyReport) => report.summary?.pass,
            gridTemplate: 'min-content',
          },
          {
            header: 'Fail',
            accessorFn: (report: PolicyReport) => makeStatusLabel(report),
            gridTemplate: 'min-content',
          },
          {
            header: 'Warn',
            accessorFn: (report: PolicyReport) => report.summary?.warn,
            gridTemplate: 'min-content',
          },
          {
            header: 'Error',
            accessorFn: (report: PolicyReport) => report.summary?.error,
            gridTemplate: 'min-content',
          },
          {
            header: 'Skip',
            accessorFn: (report: PolicyReport) => report.summary?.skip,
            gridTemplate: 'min-content',
          },
          {
            header: 'Age',
            accessorFn: (report: PolicyReport) => (
              <DateLabel date={report.metadata.creationTimestamp} />
            ),
            gridTemplate: 'min-content',
          },
        ]}
      />
    </SectionBox>
  );
}

function makeStatusLabel(report: PolicyReport) {
  const tooltip = report.results
    .map(result => `- ${result.message}`)
    .join('\n\n')
    .replaceAll('`', '"');
  let status: StatusLabelProps['status'] = '';
  const fail: number = report.summary.fail;

  if (fail > 0) {
    status = 'error';
  } else {
    status = 'success';
  }

  return (
    <Tooltip title={tooltip} slotProps={{ tooltip: { sx: { fontSize: '0.9em' } } }}>
      <Box display="inline">
        <StatusLabel status={status}>
          {fail}
          {status === 'error' && (
            <Box
              aria-label="hidden"
              display="inline"
              paddingTop={1}
              paddingLeft={0.5}
              style={{ verticalAlign: 'text-top' }}
            ></Box>
          )}
        </StatusLabel>
      </Box>
    </Tooltip>
  );
}
