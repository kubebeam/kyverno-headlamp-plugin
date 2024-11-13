/* 
  Overview  page for configuration controls and resources. 
*/
import {
  DateLabel,
  Link as HeadlampLink,
  SectionBox,
  StatusLabel,
  StatusLabelProps,
  Table as HeadlampTable,
  Tabs as HeadlampTabs,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box, FormControlLabel, Switch } from '@mui/material';
import { useState } from 'react';
import { RoutingPath } from '..';
import { clusterpolicyreportClass, policyReportClass } from '../model';
import { PolicyReport } from '../types/policyreport/PolicyReport';
import { PolicyReportResults } from '../types/policyreport/PolicyReportResults';
import { NamespaceView } from './NamespaceView';

export default function KyvernoPolicyReportList() {
  const [policyReportObjects, setPolicyReports] = useState<KubeObject>(null);
  const [clusterPolicyReportObjects, setClusterPolicyReports] = useState(null);

  policyReportClass.useApiList(setPolicyReports);
  clusterpolicyreportClass.useApiList(setClusterPolicyReports);

  if (!policyReportObjects || !clusterPolicyReportObjects) {
    return <></>;
  }

  const policyReports = [...clusterPolicyReportObjects, ...policyReportObjects].map(
    (object: KubeObject) => object.jsonData
  );
  return (
    <>
      <h1>Compliance</h1>
      <HeadlampTabs
        tabs={[
          {
            label: 'Rules',
            component: <ResultsView policyReports={policyReports} />,
          },
          {
            label: 'Resources',
            component: <div />,
          },
          {
            label: 'Namespaces',
            component: <NamespaceView policyReports={policyReports} />,
          },
        ]}
        ariaLabel="Navigation Tabs"
      />
    </>
  );
}

function ResultsView(props: { policyReports: PolicyReport[] }) {
  const { policyReports } = props;
  const [isFailedRulesSwitchChecked, setIsFailedRulesSwitchChecked] = useState(true);

  class PolicyResult {
    report: PolicyReport;
    result: PolicyReportResults;

    constructor(report: PolicyReport, result: PolicyReportResults) {
      this.report = report;
      this.result = result;
    }
  }

  function getPolicyResults(policyReports: PolicyReport[]): PolicyResult[] {
    return policyReports.flatMap((p: PolicyReport) =>
      p.results ? p.results.map(r => new PolicyResult(p, r)) : []
    );
  }

  let results = getPolicyResults(policyReports);

  if (isFailedRulesSwitchChecked) {
    results = results.filter(r => r.result.result === 'fail');
  }

  return (
    <SectionBox>
      <FormControlLabel
        checked={isFailedRulesSwitchChecked}
        control={<Switch color="primary" />}
        label={'Failed rules'}
        onChange={(event: any, checked: boolean) => {
          setIsFailedRulesSwitchChecked(checked);
        }}
      />
      <HeadlampTable
        data={results}
        columns={[
          {
            header: 'Status',
            accessorFn: (r: PolicyResult) => r.result.result,
            Cell: ({ cell }: any) => makeStatusLabel(cell.getValue()),
            gridTemplate: 'min-content',
          },
          {
            header: 'Name',
            accessorFn: (r: PolicyResult) => r.report?.scope?.name,
            Cell: ({ cell, row }: any) => (
              <HeadlampLink
                routeName={RoutingPath.Report}
                params={{
                  name: row.original.report.metadata.name,
                  namespace: row.original.report.metadata.namespace ?? '-',
                }}
              >
                {cell.getValue()}
              </HeadlampLink>
            ),
            gridTemplate: 'min-content',
          },
          {
            header: 'Kind',
            accessorFn: (r: PolicyResult) => {
              return r.report?.scope?.kind;
            },
            gridTemplate: 'min-content',
          },
          {
            header: 'Namespace',
            accessorFn: (r: PolicyResult) => r.report.metadata.namespace,
            Cell: ({ cell }: any) => {
              if (cell.getValue())
                return (
                  <HeadlampLink
                    routeName="namespace"
                    params={{
                      name: cell.getValue(),
                    }}
                  >
                    {cell.getValue()}
                  </HeadlampLink>
                );
            },
            gridTemplate: 'min-content',
          },
          {
            header: 'Category',
            accessorKey: 'result.category',
            gridTemplate: 'auto',
          },
          {
            header: 'Policy',
            accessorKey: 'result.policy',
            gridTemplate: 'auto',
          },
          {
            header: 'Rule',
            accessorKey: 'result.rule',
            gridTemplate: 'auto',
          },
          {
            header: 'Severity',
            accessorFn: (r: PolicyResult) => r.result.severity,
            gridTemplate: 'min-content',
          },
          {
            header: 'Message',
            accessorFn: (r: PolicyResult) => r.result?.message?.replaceAll('`', '"'),
            gridTemplate: '2fr',
          },
          {
            header: 'Age',
            accessorFn: (r: PolicyResult) => (
              <DateLabel date={r.report?.metadata?.creationTimestamp ?? ''} />
            ),
            gridTemplate: 'min-content',
          },
        ]}
      />
    </SectionBox>
  );
}

function makeStatusLabel(result: string) {
  let status: StatusLabelProps['status'] = '';

  if (result === 'fail') {
    status = 'error';
  } else {
    status = 'success';
  }

  return (
    <Box display="inline">
      <StatusLabel status={status}>
        {result}
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
  );
}
