/* 
  Information about a control and failed workloads. 
*/
import {
  Link as HeadlampLink,
  SectionBox,
  Table,
} from '@kinvolk/headlamp-plugin/lib/CommonComponents';
import { PolicyReport } from '../types/policyreport/PolicyReport';

export function NamespaceView(props: { policyReports: PolicyReport[] }) {
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
                    getCount(policyReports, namespace, 'pass') /
                    getCount(policyReports, namespace, undefined)
                  }
                />
              );
            },
          },
          {
            header: 'Failed',
            accessorFn: (namespace: string) => String(getCount(policyReports, namespace, 'fail')),
            gridTemplate: 'min-content',
          },
          {
            header: 'Passed',
            accessorFn: (namespace: string) => String(getCount(policyReports, namespace, 'pass')),
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
  status: string | undefined
): number {
  return policyReports
    .filter(report => report.metadata.namespace === namespace)
    .flatMap(report => report.results?.filter(r => status === undefined || r.result === status))
    .length;
}
