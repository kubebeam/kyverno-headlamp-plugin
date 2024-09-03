import { makeCustomResourceClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/crd';

const apiKyvernoGroupVersion = [{ group: 'kyverno.io', version: 'v1' }];
const apiWgPolicyGroupVersion = [{ group: 'wgpolicyk8s.io', version: 'v1alpha2' }];

export const policyReportClass = makeCustomResourceClass({
  apiInfo: apiWgPolicyGroupVersion,
  isNamespaced: true,
  singularName: 'policyreport',
  pluralName: 'policyreports',
});

export const clusterPolicyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersion,
  isNamespaced: false,
  singularName: 'clusterpolicy',
  pluralName: 'clusterpolicies',
});
