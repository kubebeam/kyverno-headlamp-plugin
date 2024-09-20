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

  export enum Severity {
    Critical = 'critical',
    High = 'high',
    Low = 'low',
    Medium = 'medium',
    Info = 'info',
  }

  export interface Result {
    policy: string;
    category: string;
    rule: ResultStatus;
    result: string;
    severity: Severity;
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
