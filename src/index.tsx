import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';

const policyreports: string = 'policyreports';
const clusterpolicies: string = 'clusterpolicies';

// Kyverno main sidebar
registerSidebarEntry({
  parent: null,
  name: 'kyverno',
  label: 'Kyverno',
  icon: 'mdi:yeast',
  url: '/kyverno/clusterpolicies',
});

registerSidebarEntry({
  parent: 'kyverno',
  name: clusterpolicies,
  label: 'Cluster Policies',
  url: '/kyverno/clusterpolicies',
});

registerSidebarEntry({
  parent: 'kyverno',
  name: policyreports,
  label: 'Policy Reports',
  url: '/kyverno/policyreports',
});

import KyvernoClusterPolicyList from './cluster-policy/List';

registerRoute({
  path: '/kyverno/clusterpolicies',
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyList />,
  exact: true,
  name: 'Cluster Policies',
});

import KyvernoClusterPolicyDetails from './cluster-policy/Details';

registerRoute({
  path: '/kyverno/clusterpolicies/:name',
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyDetails />,
  exact: true,
  name: 'Cluster Policy',
});

import KyvernoPolicyReportList from './policy-report/List';

registerRoute({
  path: '/kyverno/policyreports',
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportList />,
  exact: true,
  name: 'Policy Reports',
});

import KyvernoPolicyReportDetails from './policy-report/Details';

registerRoute({
  path: '/kyverno/policyreports/:namespace/:name',
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportDetails />,
  exact: true,
  name: 'Policy Report',
});
