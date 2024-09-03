import { K8s } from '@kinvolk/headlamp-plugin/lib';
import {
  MainInfoSection,
  SectionBox,
  Table,
} from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useLocation } from 'react-router';
import { className } from './List'

export default function KyvernoPolicyReportDetails(props) {
  const location = useLocation();
  const segments = location.pathname.split('/');
  // The fourth last segment is the kind
  const namespace = segments[segments.length - 3];
  // The second last segment is the type
  const type = segments[segments.length - 2];
  // The last segment is the name
  const name = segments[segments.length - 1];
  const [resource] = K8s.ResourceClasses.CustomResourceDefinition.useGet(className);

  return (
    resource && <PolicyReportDetailView name={name} namespace={namespace} resource={resource} />
  );
}

function prepareExtraInfo(cr) {
  const extraInfo = [];

  extraInfo.push({
    name: 'Scope',
    value: cr?.jsonData.scope.name,
  });
  return extraInfo;
}

function PolicyReportDetailView(props) {
  const { name, namespace, resource } = props;
  const [cr, setCr] = React.useState(null);
  const resourceClass = React.useMemo(() => {
    return resource.makeCRClass();
  }, [resource]);

  resourceClass.useApiGet(setCr, name, namespace);

  return (
    <>
      <MainInfoSection
        title="Policy Report"
        resource={cr}
        extraInfo={prepareExtraInfo(cr)}
        actions={[
        ]}
      />
      {cr && <Results cr={cr} />}

    </>
  );
}

function Results(props) {
  const { cr } = props;
  const results = cr?.jsonData.results

  return (
    <SectionBox title="Results">
       <Table
        data={results}
        columns={[
          {
            header: 'Policy',
            accessorFn: item => item.policy,
          },
          {
            header: 'Rule',
            accessorFn: item => item.rule,
          },
          {
            header: 'Result',
            accessorFn: item => item.result,
          },
          {
            header: 'Severity',
            accessorFn: item => item.severity,
          },
          {
            header: 'Message',
            accessorFn: item => item.message,
          },
        ]}
      />
    </SectionBox>
  );
}