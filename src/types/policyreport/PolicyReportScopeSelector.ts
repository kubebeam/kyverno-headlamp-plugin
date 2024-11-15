/**
 * 
 * 
 *
 * The version of the OpenAPI document: 
 * Contact Email: 
 * License: 
 *
 * NOTE: This file is auto generated by crdtotypes (https://github.com/yaacov/crdtoapi/).
 * https://github.com/yaacov/crdtoapi/README.crdtotypes
 */

import { PolicyReportScopeSelectorMatchExpressions } from './PolicyReportScopeSelectorMatchExpressions';

/**
 * ScopeSelector is an optional selector for multiple scopes (e.g. Pods).
Either one of, or none of, but not both of, Scope or ScopeSelector should be specified.
 *
 * @export
 */
export interface PolicyReportScopeSelector {
  /** matchExpressions
   * A label selector requirement is a selector that contains values, a key, and an operator that
relates the key and values.
   *
   * @required {false}
   */
  matchExpressions?: PolicyReportScopeSelectorMatchExpressions[];
  /** matchLabels
   * matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels
map is equivalent to an element of matchExpressions, whose key field is "key", the
operator is "In", and the values array contains only "value". The requirements are ANDed.
   *
   * @required {false}
   * @originalType {PolicyReportScopeSelectorMatchLabels}
   */
  matchLabels?: {[key: string]: string};
}
