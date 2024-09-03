import { Link, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/components/common';
import { clusterPolicyClass } from '../model';

export const className = 'clusterpolicies.kyverno.io';

export default function KyvernoClusterPolicyList() {
  return (
    <div>
      <ClusterPolicyListView />
    </div>
  );
}

function ClusterPolicyListView() {
  const [resource] = clusterPolicyClass.useList();

  return (
    <SectionBox title="Cluster Policies">
      <Table
        data={resource}
        columns={[
          {
            header: 'Name',
            accessorFn: item => {
              return (
                <Link
                  routeName={`/kyverno/clusterpolicies/:name`}
                  params={{
                    name: item.metadata.name,
                  }}
                >
                  {item.metadata.name}
                </Link>
              );
            },
          },
        ]}
      />
    </SectionBox>
  );
}
