import {
  DateLabel,
  LightTooltip,
  Link,
  SectionBox,
  Table,
} from '@kinvolk/headlamp-plugin/lib/components/common';
import { StatusLabel, StatusLabelProps } from '@kinvolk/headlamp-plugin/lib/components/common';
import { Box } from '@mui/material';
import { policyReportClass } from '../model';

export const className = 'policyreports.wgpolicyk8s.io';

export default function KyvernoPolicyReportList() {
  return (
    <div>
      <PolicyReportListView />
    </div>
  );
}

function PolicyReportListView() {
  const [resource] = policyReportClass.useList();

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
                    type: 'policyreports',
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
  const tooltip = item.jsonData.results.map(r => `- ${r.message}`).join('\n\n');
  let status: StatusLabelProps['status'] = '';
  const fail: number = item.jsonData.summary.fail;

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
    </LightTooltip>
  );
}
