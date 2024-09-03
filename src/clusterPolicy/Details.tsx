import { MainInfoSection, SectionBox } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import { useLocation } from 'react-router';
import YAML from 'yaml';
import { clusterPolicyClass } from '../model';

export default function KyvernoClusterPolicyDetails() {
  const location = useLocation();
  const segments = location.pathname.split('/');

  // The last segment is the name
  const name = segments[segments.length - 1];

  return <ClusterPolicyDetailView name={name} />;
}

function prepareExtraInfo(clusterPolicy) {
  const extraInfo = [];

  return extraInfo;
}

function ClusterPolicyDetailView(props) {
  const { name } = props;
  const [clusterPolicy, setClusterPolicy] = React.useState(null);

  clusterPolicyClass.useApiGet(setClusterPolicy, name);

  return (
    <>
      <MainInfoSection
        title="Cluster Policy"
        resource={clusterPolicy}
        extraInfo={prepareExtraInfo(clusterPolicy)}
        actions={[]}
      />

      <SectionBox title="Rules">
        <pre>{YAML.stringify(clusterPolicy?.jsonData?.spec?.rules)}</pre>
      </SectionBox>
    </>
  );
}
