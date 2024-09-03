import { K8s } from '@kinvolk/headlamp-plugin/lib';
import {
  MainInfoSection, SectionBox
} from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useLocation } from 'react-router';
import YAML from 'yaml'
import { className } from './List'

export default function KyvernoClusterPolicyDetails(props) {
  const location = useLocation();
  const segments = location.pathname.split('/');
 
  // The last segment is the name
  const name = segments[segments.length - 1];
  
  const [resource] = K8s.ResourceClasses.CustomResourceDefinition.useGet(className);

  return (
    resource && <ClusterPolicyDetailView name={name} resource={resource} />
  );
}

function prepareExtraInfo(cr) {
  const extraInfo = [];

  return extraInfo;
}

function ClusterPolicyDetailView(props) {
  const { name, resource } = props;
  const [cr, setCr] = React.useState(null);
  const resourceClass = React.useMemo(() => {
    return resource.makeCRClass();
  }, [resource]);

  resourceClass.useApiGet(setCr, name);

  return (
    <>
      <MainInfoSection
        title="Cluster Policy"
        resource={cr}
        extraInfo={prepareExtraInfo(cr)}
        actions={[
        ]}
      />

     <SectionBox title="Rules">
        <pre>
          {YAML.stringify(cr?.jsonData?.spec?.rules)}
        </pre>
        </SectionBox>
    </>
  );
}
