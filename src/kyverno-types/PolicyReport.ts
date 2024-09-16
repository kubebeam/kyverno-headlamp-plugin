// https://github.com/kyverno/kyverno/tree/main/api/kyverno/v1
// Only fields as used in this project are declared

import { Metadata } from './Metadata';

export interface PolicyReport {
  metadata: Metadata;
  scope: PolicyReport.Scope;
  results: PolicyReport.Result[];
  summary: PolicyReport.Summary;
}

export namespace PolicyReport {
  export enum ResultStatus {
    Error = 'error',
    Fail = 'fail',
    Pass = 'pass',
    Skip = 'skip',
    Warn = 'warn',
  }

  export interface Result {
    policy: string;
    rule: ResultStatus;
    result: string;
    severity: string;
    message: string;
  }

  export interface Scope {
    kind: string;
    name: string;
    namespace: string;
  }

  export interface Summary {
    error: number;
    fail: number;
    pass: number;
    skip: number;
    warn: number;
  }
}
