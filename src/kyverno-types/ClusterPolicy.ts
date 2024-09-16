// https://github.com/kyverno/kyverno/tree/main/api/kyverno/v1
// Only fields as used in this project are declared

import { Metadata } from './Metadata';

export interface ClusterPolicy {
  metadata: Metadata;
  spec: {
    background: boolean;
  };
}

export namespace ClusterPolicy {}
