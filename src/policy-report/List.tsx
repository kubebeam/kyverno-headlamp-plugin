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
import { PolicyReport } from '../kyverno-types/PolicyReport';
import { policyReportClass } from '../model';
import NamespaceView from './NamespaceView';

export default function KyvernoPolicyReportList() {
  const [policyReportObjects, setPolicyReports] = useState<KubeObject>(null);

  policyReportClass.useApiList(setPolicyReports);

  if (!policyReportObjects) {
    return <div></div>;
  }

  const policyReports = policyReportObjects.map((object: KubeObject) => object.jsonData);
  return (
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
  );
}

function ResultsView(props: { policyReports: PolicyReport[] }) {
  const { policyReports } = props;
  const [isFailedRulesSwitchChecked, setIsFailedRulesSwitchChecked] = useState(true);

  class PolicyResult {
    report: PolicyReport;
    result: PolicyReport.Result;

    constructor(report: PolicyReport, result: PolicyReport.Result) {
      this.report = report;
      this.result = result;
    }
  }

  let results: PolicyResult[] = policyReports.flatMap((p: PolicyReport) =>
    p.results.map(r => new PolicyResult(p, r))
  );
  if (isFailedRulesSwitchChecked) {
    results = results.filter(r => r.result.result === 'fail');
  }

  return (
    <SectionBox title="Policy Reports">
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
            header: 'Name',
            accessorFn: (r: PolicyResult) => {
              return (
                <HeadlampLink
                  routeName={'/kyverno/policyreports/:namespace/:name'}
                  params={{
                    name: r.report.metadata.name,
                    namespace: r.report.metadata.namespace,
                  }}
                >
                  {r.report.scope.name}
                </HeadlampLink>
              );
            },
            gridTemplate: 'min-content',
          },
          {
            header: 'Kind',
            accessorFn: (r: PolicyResult) => {
              return r.report.scope.kind;
            },
            gridTemplate: 'min-content',
          },
          {
            header: 'Namespace',
            accessorFn: (r: PolicyResult) => (
              <HeadlampLink
                routeName="namespace"
                params={{
                  name: r.report.metadata.namespace,
                }}
              >
                {r.report.metadata.namespace}
              </HeadlampLink>
            ),
            gridTemplate: 'min-content',
          },
          {
            header: 'Category',
            accessorFn: (r: PolicyResult) => r.result.category,
            gridTemplate: 'auto',
          },
          {
            header: 'Policy',
            accessorFn: (r: PolicyResult) => r.result.policy,
            gridTemplate: 'auto',
          },
          {
            header: 'Rule',
            accessorFn: (r: PolicyResult) => r.result.rule,
            gridTemplate: 'auto',
          },
          {
            header: 'Severity',
            accessorFn: (r: PolicyResult) => r.result.severity,
            gridTemplate: 'min-content',
          },
          {
            header: 'Message',
            accessorFn: (r: PolicyResult) => r.result.message.replaceAll('`', '"'),
            gridTemplate: '2fr',
          },
          {
            header: 'Status',
            accessorFn: (r: PolicyResult) => makeStatusLabel(r.result),
            gridTemplate: 'min-content',
          },
          {
            header: 'Age',
            accessorFn: (r: PolicyResult) => (
              <DateLabel date={r.report.metadata.creationTimestamp} />
            ),
            gridTemplate: 'min-content',
          },
        ]}
      />
    </SectionBox>
  );
}

function makeStatusLabel(result: PolicyReport.Result) {
  let status: StatusLabelProps['status'] = '';

  if (result.result === 'fail') {
    status = 'error';
  } else {
    status = 'success';
  }

  return (
    <Box display="inline">
      <StatusLabel status={status}>
        {result.result}
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
