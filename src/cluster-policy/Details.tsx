import { MainInfoSection, SectionBox } from '@kinvolk/headlamp-plugin/lib/components/common';
import React from 'react';
import YAML from 'yaml';
import { clusterPolicyClass } from '../model';
import { getLastURLSegment } from '../utils/url';

export default function KyvernoClusterPolicyDetails() {
  const name = getLastURLSegment();
  const [clusterPolicy, setClusterPolicy] = React.useState(null);

  clusterPolicyClass.useApiGet(setClusterPolicy, name);

  return (
    <>
      <MainInfoSection title="Cluster Policy" resource={clusterPolicy} actions={[]} />

      <SectionBox title="Rules">
        <pre>{YAML.stringify(clusterPolicy?.jsonData?.spec?.rules)}</pre>
      </SectionBox>
    </>
  );
}
