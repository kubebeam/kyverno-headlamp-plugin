import { registerRoute, registerSidebarEntry } from '@kinvolk/headlamp-plugin/lib';

// Kyverno sidebar 
registerSidebarEntry({
  parent: null,
  name: 'kyverno',
  label: 'Kyverno',
  icon: 'mdi:yeast', 
  url: '/kyverno/clusterpolicies',
});


// Kyverno ClusterPolicies 
import KyvernoClusterPolicyDetails from './clusterPolicy/Details';
import KyvernoClusterPolicyList from './clusterPolicy/List';
const clusterpolicies: string = "clusterpolicies";

registerSidebarEntry({
  parent: 'kyverno',
  name: clusterpolicies,
  label: 'Cluster Policies',
  url: '/kyverno/clusterpolicies',
});

registerRoute({
  path: '/kyverno/clusterpolicies',
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyList/>,
  exact: true,
  name: clusterpolicies,
});

registerRoute({
  path: '/kyverno/clusterpolicies/:name',
  parent: 'kyverno',
  sidebar: clusterpolicies,
  component: () => <KyvernoClusterPolicyDetails />,
  exact: true,
  name: 'clusterpolicy',
});

// Kyverno PolicyReports 
import KyvernoPolicyReportDetails from './policyReport/Details';
import KyvernoPolicyReportList from './policyReport/List';
const policyreports: string = "policyreports";

registerSidebarEntry({
  parent: 'kyverno',
  name: policyreports,
  label: 'Policy Reports',
  url: '/kyverno/policyreports',
});

registerRoute({
  path: '/kyverno/policyreports',
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportList />,
  exact: true,
  name: policyreports,
});

registerRoute({
  path: '/kyverno/policyreports/:namespace/:type/:name',
  parent: 'kyverno',
  sidebar: policyreports,
  component: () => <KyvernoPolicyReportDetails />,
  exact: true,
  name: 'policyreport',
});

