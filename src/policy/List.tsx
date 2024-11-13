import {
  Link as HeadlampLink,
  SectionBox,
  Table as HeadlampTable,
} from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { useState } from 'react';
import { RoutingPath } from '..';
import { clusterPolicyClass, policyClass, policyReportClass } from '../model';
import { ClusterPolicy } from '../types/clusterpolicy/ClusterPolicy';
import { PolicyReport } from '../types/policyreport/PolicyReport';

export default function KyvernoClusterPolicyList() {
  const [policyObjects, setPolicies] = useState<KubeObject[] | null>(null);
  const [clusterPolicyObjects, setClusterPolicies] = useState<KubeObject[] | null>(null);
  const [policyReports, setPolicyReports] = useState<KubeObject[] | null>(null);

  policyClass.useApiList(setPolicies);
  clusterPolicyClass.useApiList(setClusterPolicies);
  policyReportClass.useApiList(setPolicyReports);

  if (!policyObjects || !clusterPolicyObjects || !policyReports) {
    return <></>;
  }

  const policies = [...policyObjects, ...clusterPolicyObjects].map(
    (item: KubeObject) => item.jsonData
  );

  return (
    <SectionBox title="Policies">
      <HeadlampTable
        data={policies}
        columns={[
          {
            header: 'Name',
            accessorKey: 'metadata.name',
            Cell: ({ cell, row }: any) => (
              <HeadlampLink
                routeName={RoutingPath.Policy}
                params={{
                  name: cell.getValue(),
                  namespace: row.original.metadata.namespace ?? '-',
                }}
              >
                {cell.getValue()}
              </HeadlampLink>
            ),
          },
          {
            header: 'Namespace',
            accessorFn: (policy: ClusterPolicy) => policy.metadata.namespace,
          },
          {
            header: 'Title',
            accessorFn: (policy: ClusterPolicy) =>
              policy.metadata.annotations['policies.kyverno.io/title'],
          },
          {
            header: 'Category',
            accessorFn: (policy: ClusterPolicy) =>
              policy.metadata.annotations['policies.kyverno.io/category'],
          },
          {
            header: 'Severity',
            accessorFn: (policy: ClusterPolicy) =>
              policy.metadata.annotations['policies.kyverno.io/severity'],
          },
          {
            header: 'Background',
            accessorFn: (policy: ClusterPolicy) => (policy.spec.background ? 'Yes' : ''),
          },
          {
            header: 'Resources',
            accessorFn: (policy: ClusterPolicy) => {
              return makeResultsLabel(
                policyReports.map((item: KubeObject) => item.jsonData),
                policy
              );
            },
            gridTemplate: 'auto',
          },
        ]}
      />
    </SectionBox>
  );
}

function makeResultsLabel(policyReports: PolicyReport[], clusterpolicy: ClusterPolicy) {
  const appliedChecks = policyReports.flatMap(report =>
    report.results
      ? report.results.filter(result => result.policy === clusterpolicy.metadata.name)
      : []
  );
  const failCount = appliedChecks.filter(check => check.result === 'fail').length;

  if (failCount > 0) {
    return (
      <div>
        {failCount} of {appliedChecks.length} Failed
      </div>
    );
  } else {
    return failCount;
  }
}
