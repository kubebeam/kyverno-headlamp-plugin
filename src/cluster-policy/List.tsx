import {
  Link as HeadlampLink,
  SectionBox,
  Table as HeadlampTable,
} from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { useState } from 'react';
import { ClusterPolicy } from '../kyverno-types/ClusterPolicy';
import { PolicyReport } from '../kyverno-types/PolicyReport';
import { clusterPolicyClass, policyReportClass } from '../model';

export default function KyvernoClusterPolicyList() {
  const [clusterPolicies, setClusterPolicies] = useState<KubeObject[]>(null);
  const [policyReports, setPolicyReports] = useState<KubeObject>(null);

  clusterPolicyClass.useApiList(setClusterPolicies);
  policyReportClass.useApiList(setPolicyReports);

  if (!clusterPolicies) {
    return <div></div>;
  }
  return (
    <SectionBox title="Cluster Policies">
      <HeadlampTable
        data={clusterPolicies.map((item: KubeObject) => item.jsonData)}
        columns={[
          {
            header: 'Name',
            accessorFn: (item: ClusterPolicy) => {
              return (
                <HeadlampLink
                  routeName={'/kyverno/clusterpolicies/:name'}
                  params={{
                    name: item.metadata.name,
                  }}
                >
                  {item.metadata.name}
                </HeadlampLink>
              );
            },
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
              if (policyReports) {
                return makeResultsLabel(
                  policyReports.map((item: KubeObject) => item.jsonData),
                  policy
                );
              }
            },
            gridTemplate: 'auto',
          },
        ]}
      />

      {/* <pre>{YAML.stringify(clusterPolicies)}</pre> */}
    </SectionBox>
  );
}

function makeResultsLabel(policyReports: PolicyReport[], clusterpolicy: ClusterPolicy) {
  let failCount = 0;

  for (const report of policyReports) {
    for (const result of report.results) {
      if (
        result.policy === clusterpolicy.metadata.name &&
        result.result === PolicyReport.ResultStatus.Fail
      ) {
        failCount++;
      }
    }
  }

  if (failCount > 0) {
    return <div>{failCount} Failed</div>;
  } else {
    return failCount;
  }
}
