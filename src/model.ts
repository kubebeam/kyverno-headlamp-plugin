import { makeCustomResourceClass } from '@kinvolk/headlamp-plugin/lib/lib/k8s/crd';

const apiKyvernoGroupVersionV1 = [{ group: 'kyverno.io', version: 'v1' }];
const apiKyvernoGroupVersionV2 = [{ group: 'kyverno.io', version: 'v2' }];
const apiKyvernoGroupVersionV2alpha1 = [{ group: 'kyverno.io', version: 'v2alpha1' }];
const apiWgPolicyGroupVersionV1alpha2 = [{ group: 'wgpolicyk8s.io', version: 'v1alpha2' }];
const apiReportsKyvernoGroupVersionV1 = [{ group: 'reports.kyverno.io', version: 'v1' }];

export const admissionreportClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: true,
  singularName: 'admissionreport',
  pluralName: 'admissionreports',
});
export const backgroundscanreportClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: true,
  singularName: 'backgroundscanreport',
  pluralName: 'backgroundscanreports',
});
export const cleanuppolicyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: true,
  singularName: 'cleanuppolicy',
  pluralName: 'cleanuppolicies',
});
export const clusteradmissionreportClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: false,
  singularName: 'clusteradmissionreport',
  pluralName: 'clusteradmissionreports',
});
export const clusterbackgroundscanreportClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: false,
  singularName: 'clusterbackgroundscanreport',
  pluralName: 'clusterbackgroundscanreports',
});
export const clustercleanuppolicyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: false,
  singularName: 'clustercleanuppolicy',
  pluralName: 'clustercleanuppolicies',
});
export const clusterpolicyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV1,
  isNamespaced: false,
  singularName: 'clusterpolicy',
  pluralName: 'clusterpolicies',
});
export const globalcontextentryClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2alpha1,
  isNamespaced: false,
  singularName: 'globalcontextentry',
  pluralName: 'globalcontextentries',
});
export const policyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV1,
  isNamespaced: true,
  singularName: 'policy',
  pluralName: 'policies',
});
export const policyexceptionClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: true,
  singularName: 'policyexception',
  pluralName: 'policyexceptions',
});
export const updaterequestClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV2,
  isNamespaced: true,
  singularName: 'updaterequest',
  pluralName: 'updaterequests',
});
export const clusterephemeralreportClass = makeCustomResourceClass({
  apiInfo: apiReportsKyvernoGroupVersionV1,
  isNamespaced: false,
  singularName: 'clusterephemeralreport',
  pluralName: 'clusterephemeralreports',
});
export const ephemeralreportClass = makeCustomResourceClass({
  apiInfo: apiReportsKyvernoGroupVersionV1,
  isNamespaced: true,
  singularName: 'ephemeralreport',
  pluralName: 'ephemeralreports',
});
export const policyreportClass = makeCustomResourceClass({
  apiInfo: apiWgPolicyGroupVersionV1alpha2,
  isNamespaced: true,
  singularName: 'policyreport',
  pluralName: 'policyreports',
});
export const clusterpolicyreportClass = makeCustomResourceClass({
  apiInfo: apiWgPolicyGroupVersionV1alpha2,
  isNamespaced: false,
  singularName: 'clusterpolicyreport',
  pluralName: 'clusterpolicyreports',
});
export const policyReportClass = makeCustomResourceClass({
  apiInfo: apiWgPolicyGroupVersionV1alpha2,
  isNamespaced: true,
  singularName: 'policyreport',
  pluralName: 'policyreports',
});
export const clusterPolicyClass = makeCustomResourceClass({
  apiInfo: apiKyvernoGroupVersionV1,
  isNamespaced: false,
  singularName: 'clusterpolicy',
  pluralName: 'clusterpolicies',
});
