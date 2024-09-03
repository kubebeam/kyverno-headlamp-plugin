import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { Link, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import React from 'react';

export const className = 'clusterpolicies.kyverno.io';

export default function KyvernoClusterPolicyList() {
  const [ClusterPolicyCRD] = K8s.ResourceClasses.CustomResourceDefinition.useGet(className);

  const clusterPolicyResourceClass = React.useMemo(() => {
    return ClusterPolicyCRD?.makeCRClass();
  }, [ClusterPolicyCRD]);
 
  return (
    <div>
      {clusterPolicyResourceClass && (
        <ClusterPolicyListView
          resourceClass={clusterPolicyResourceClass}
        />
      )}
    </div>
  );
}

function ClusterPolicyListView(props: {
  resourceClass: KubeObject;
}) {
  const resourceClass = props.resourceClass;
  const [resource] = resourceClass.useList();

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
