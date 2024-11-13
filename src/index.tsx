import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';

const policyreports: string = 'policyreports';
const clusterpolicies: string = 'clusterpolicies';

export namespace RoutingPath {
  export const Policies = '/kyverno/policies';
  export const Policy = '/kyverno/policies/:namespace/:name';
  export const Reports = '/kyverno/reports';
  export const Report = '/kyverno/reports/:namespace/:name';
}

// Kyverno main sidebar
registerSidebarEntry({
  parent: null,
  name: 'kyverno',
  label: 'Kyverno',
  icon: 'mdi:table-check',
  url: RoutingPath.Policies,
});

registerSidebarEntry({
  parent: 'kyverno',
  name: clusterpolicies,
  label: 'Policies',
  url: RoutingPath.Policies,
});

registerSidebarEntry({
  parent: 'kyverno',
  name: policyreports,
  label: 'Policy Reports',
  url: RoutingPath.Reports,
});

import KyvernoClusterPolicyList from './policy/List';

registerRoute({
  path: RoutingPath.Policies,
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyList />,
  exact: true,
  name: 'Policies',
});

import KyvernoClusterPolicyDetails from './policy/Details';

registerRoute({
  path: RoutingPath.Policy,
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyDetails />,
  exact: true,
  name: 'Policy',
});

import KyvernoPolicyReportList from './policy-report/List';

registerRoute({
  path: RoutingPath.Reports,
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportList />,
  exact: true,
  name: 'Policy Reports',
});

import KyvernoPolicyReportDetails from './policy-report/Details';

registerRoute({
  path: RoutingPath.Report,
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportDetails />,
  exact: true,
  name: 'Policy Report',
});
