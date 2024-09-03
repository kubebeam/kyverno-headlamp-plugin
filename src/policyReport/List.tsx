import { K8s } from '@kinvolk/headlamp-plugin/lib';
import { DateLabel, LightTooltip, Link, SectionBox, Table } from '@kinvolk/headlamp-plugin/lib/components/common';
import { StatusLabel, StatusLabelProps } from '@kinvolk/headlamp-plugin/lib/components/common';
import { KubeObject } from '@kinvolk/headlamp-plugin/lib/lib/k8s/cluster';
import { Box } from '@mui/material';
import React from 'react';

export const className = 'policyreports.wgpolicyk8s.io'

export default function KyvernoPolicyReportList() {

  const [policyReportCRD] = K8s.ResourceClasses.CustomResourceDefinition.useGet(className);

  const policyReportResourceClass = React.useMemo(() => {
    return policyReportCRD?.makeCRClass();
  }, [policyReportCRD]);

  return (
    <div>
      {policyReportResourceClass && (
        <PolicyReportListView
          resourceClass={policyReportResourceClass}
        />
      )}
    </div>
  );
}

function PolicyReportListView(props: {
  resourceClass: KubeObject;
}) {
  const resourceClass = props.resourceClass;
  const [resource] = resourceClass.useList();

  return (
    <SectionBox title="Policy Reports">
      <Table
        data={resource}
        columns={[
          {
            header: 'Name',
            accessorFn: item => {
              return (
                <Link
                  routeName={`/kyverno/policyreports/:namespace/:type/:name`}
                  params={{
                    name: item.metadata.name,
                    namespace: item.metadata.namespace,
                    type: "policyreports",
                  }}
                >
                  {item.jsonData.scope.name}
                </Link>
              );
            },
          },
          {
            header: 'Kind',
            accessorFn: item => {
              return item.jsonData.scope.kind;
            },
          },
          {
            header: 'Namespace',
            accessorFn: item => (
              <Link
                routeName="namespace"
                params={{
                  name: item.metadata.namespace,
                }}
              >
                {item.metadata.namespace}
              </Link>
            ),
          },
          {
            header: 'Pass',
            accessorFn: item => item.jsonData.summary?.pass,
            gridTemplate: 'min-content',
          },
          {
            header: 'Fail',
            accessorFn: item => makeStatusLabel(item),
            gridTemplate: 'min-content',
          },
          {
            header: 'Warn',
            accessorFn: item => item.jsonData.summary?.warn,
            gridTemplate: 'min-content',
          },
          {
            header: 'Error',
            accessorFn: item => item.jsonData.summary?.error,
            gridTemplate: 'min-content',
          },
          {
            header: 'Skip',
            accessorFn: item => item.jsonData.summary?.skip,
            gridTemplate: 'min-content',
          },
          {
            header: 'Age',
            accessorFn: item => <DateLabel date={item.metadata.creationTimestamp} />,
            gridTemplate: 'min-content',
          },
        ]}
      />
    </SectionBox>
  );
}

function makeStatusLabel(item) {
  const tooltip = item.jsonData.results.map((r) => `- ${r.message}`).join('\n\n');
  let status: StatusLabelProps['status'] = '';
  const fail: number = item.jsonData.summary.fail

  if (fail > 0) {
    status = 'error';
  } else {
    status = 'success';
  }

  return (
    <LightTooltip title={tooltip} interactive>
      <Box display="inline">
        <StatusLabel status={status}>
          {fail}
          {(status === 'error') && (
            <Box
              aria-label="hidden"
              display="inline"
              paddingTop={1}
              paddingLeft={0.5}
              style={{ verticalAlign: 'text-top' }}
            >
            </Box>
          )}
        </StatusLabel>
      </Box>
    </LightTooltip>
  );
}
