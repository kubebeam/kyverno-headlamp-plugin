import { NameValueTable, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Editor } from '@monaco-editor/react';
import * as yaml from 'js-yaml';
import { useState } from 'react';
import {
  clusterPolicyClass,
  clusterpolicyreportClass,
  policyClass,
  policyreportClass,
} from '../model';
import { Policy } from '../types/policy/Policy';
import { PolicyReport } from '../types/policyreport/PolicyReport';
import { PolicyReportResults } from '../types/policyreport/PolicyReportResults';
import { getURLSegments } from '../utils/url';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';

export default function KyvernopolicyDetails() {
  const [name, namespace] = getURLSegments(-1, -2);
  const [policyObject, setPolicyObject] = useState<KubeObject | null>(null);
  const [policyReportObjects, setPolicyReports] = useState<KubeObject[] | null>(null);
  const [clusterPolicyReports, setClusterPolicyReports] = useState<KubeObject[] | null>(null);

  if (namespace === '-') {
    clusterPolicyClass.useApiGet(setPolicyObject, name);
  } else {
    policyClass.useApiGet(setPolicyObject, name, namespace);
  }

  policyreportClass.useApiList(setPolicyReports);
  clusterpolicyreportClass.useApiList(setClusterPolicyReports);

  if (!policyObject || !policyReportObjects || !clusterPolicyReports) return <></>;

  const policy: Policy = policyObject.jsonData;
  const reports = [...policyReportObjects, ...clusterPolicyReports].map(report => report.jsonData);

  return (
    <>
      <SectionBox title="Cluster Policy">
        <NameValueTable
          rows={[
            {
              name: 'Name',
              value: policy.metadata.name,
            },
            {
              name: 'Title',
              value: policy.metadata.annotations['policies.kyverno.io/title'],
            },
            {
              name: 'Category',
              value: policy.metadata.annotations['policies.kyverno.io/category'],
            },
            {
              name: 'Description',
              value: policy.metadata.annotations['policies.kyverno.io/description']?.replaceAll(
                '`',
                "'"
              ),
            },
            {
              name: 'Severity',
              value: policy.metadata.annotations['policies.kyverno.io/severity'],
            },
            {
              name: 'Created',
              value: policy.metadata.creationTimestamp,
            },
          ]}
        />
      </SectionBox>
      <YAML policy={policy} />
      <Results policyName={name} policyReports={reports} />
    </>
  );
}

function YAML(props: { policy: Policy }) {
  const { policy } = props;

  // strip status
  const strippedResource = Object.fromEntries(
    Object.entries(policy).filter(([key]) => key !== 'status')
  );
  // strip managedFields
  strippedResource.metadata = Object.fromEntries(
    Object.entries(strippedResource.metadata).filter(
      ([key]) => !['managedFields', 'uid', 'resourceVersion', 'generation'].includes(key)
    )
  );
  // strip annotations
  strippedResource.metadata.annotations = Object.fromEntries(
    Object.entries(strippedResource.metadata.annotations).filter(
      ([key]) => !key.endsWith('last-applied-configuration')
    )
  );

  const original = yaml.dump(strippedResource);

  return (
    <SectionBox title="YAML">
      <Editor theme="vs-dark" language="yaml" value={original} height={300} automaticLayout />
    </SectionBox>
  );
}

function Results(props: { policyName: string; policyReports: PolicyReport[] }) {
  const { policyName, policyReports } = props;

  interface ReportResult {
    report: PolicyReport;
    result: PolicyReportResults;
  }

  const appliedChecks = policyReports.flatMap(report =>
    report.results
      ? report.results
          .filter(result => result.policy === policyName)
          .map(result => {
            return { report: report, result: result };
          })
      : []
  );

  return (
    <SectionBox title="Results">
      <Table
        data={appliedChecks}
        columns={[
          {
            header: 'Result',
            accessorFn: (report: ReportResult) => report.result.result,
            gridTemplate: 'min-content',
          },
          {
            header: 'Resource',
            accessorFn: (report: ReportResult) => report.report.scope?.name,
          },
          {
            header: 'Kind',
            accessorFn: (report: ReportResult) => report.report.scope?.kind,
          },
          {
            header: 'Namespace',
            accessorFn: (report: ReportResult) => report.report.scope?.namespace,
          },
          {
            header: 'Rule',
            accessorFn: (report: ReportResult) => report.result.rule,
          },
          {
            header: 'Severity',
            accessorFn: (report: ReportResult) => report.result.severity,
            gridTemplate: 'min-content',
          },
          {
            header: 'Message',
            accessorFn: (report: ReportResult) => report.result.message?.replaceAll('`', '"'),
          },
        ]}
      />
    </SectionBox>
  );
}
