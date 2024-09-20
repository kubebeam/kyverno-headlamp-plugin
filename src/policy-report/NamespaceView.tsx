/* 
  Information about a control and failed workloads. 
*/
import {
  Link as HeadlampLink,
  SectionBox,
  Table,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { PolicyReport } from '../kyverno-types/PolicyReport';

export default function NamespaceView(props: { policyReports: PolicyReport[] }) {
  const { policyReports } = props;

  const namespaces = new Set();
  for (const report of policyReports) {
    namespaces.add(report.metadata.namespace);
  }
  return (
    <SectionBox>
      <Table
        data={Array.from(namespaces)}
        columns={[
          {
            header: 'Namespace',
            accessorFn: (namespace: string) => (
              <HeadlampLink
                routeName=""
                params={{
                  namespace: namespace,
                }}
              >
                {namespace}
              </HeadlampLink>
            ),
          },
          {
            header: 'Passed',
            accessorFn: (namespace: string) => {
              return (
                <progress
                  value={
                    getCount(policyReports, namespace, PolicyReport.ResultStatus.Pass) /
                    getCount(policyReports, namespace)
                  }
                />
              );
            },
          },
          {
            header: 'Failed',
            accessorFn: (namespace: string) =>
              String(getCount(policyReports, namespace, PolicyReport.ResultStatus.Fail)),
            gridTemplate: 'min-content',
          },
          {
            header: 'Passed',
            accessorFn: (namespace: string) =>
              String(getCount(policyReports, namespace, PolicyReport.ResultStatus.Pass)),
            gridTemplate: 'min-content',
          },
        ]}
      />
    </SectionBox>
  );
}

function getCount(
  policyReports: PolicyReport[],
  namespace: string,
  status?: PolicyReport.ResultStatus
): number {
  let count = 0;
  const namespaceReports = policyReports.filter(report => report.metadata.namespace === namespace);
  namespaceReports.map(
    report =>
      (count += report.results.filter(r => status === undefined || r.result == status).length)
  );
  return count;
}
