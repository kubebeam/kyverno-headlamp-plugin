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

/**
 * ObjectReference contains enough information to let you inspect or modify the referred object.
---
New uses of this type are discouraged because of difficulty describing its usage when embedded in APIs.
 1. Ignored fields.  It includes many fields which are not generally honored.  For instance, ResourceVersion and FieldPath are both very rarely valid in actual usage.
 2. Invalid usage help.  It is impossible to add specific help for individual usage.  In most embedded usages, there are particular
    restrictions like, &quot;must refer only to types A and B&quot; or &quot;UID not honored&quot; or &quot;name must be restricted&quot;.
    Those cannot be well described when embedded.
 3. Inconsistent validation.  Because the usages are different, the validation rules are different by usage, which makes it hard for users to predict what will happen.
 4. The fields are both imprecise and overly precise.  Kind is not a precise mapping to a URL. This can produce ambiguity
    during interpretation and require a REST mapping.  In most cases, the dependency is on the group,resource tuple
    and the version of the actual struct is irrelevant.
 5. We cannot easily change it.  Because this type is embedded in many locations, updates to this type
    will affect numerous schemas.  Don&#39;t make new APIs embed an underspecified API type they do not control.


Instead of using this type, create a locally provided and used type that is well-focused on your reference.
For example, ServiceReferences for admission registration: https:&#x2F;&#x2F;github.com&#x2F;kubernetes&#x2F;api&#x2F;blob&#x2F;release-1.17&#x2F;admissionregistration&#x2F;v1&#x2F;types.go#L533 .
 *
 * @export
 */
export interface PolicyReportResultsResources {
  /** apiVersion
   * API version of the referent.
   *
   * @required {false}
   */
  apiVersion?: string;
  /** fieldPath
   * If referring to a piece of an object instead of an entire object, this string
should contain a valid JSON/Go field access statement, such as desiredState.manifest.containers[2].
For example, if the object reference is to a container within a pod, this would take on a value like:
"spec.containers{name}" (where "name" refers to the name of the container that triggered
the event) or if no container name is specified "spec.containers[2]" (container with
index 2 in this pod). This syntax is chosen only to have some well-defined way of
referencing a part of an object.
TODO: this design is not final and this field is subject to change in the future.
   *
   * @required {false}
   */
  fieldPath?: string;
  /** kind
   * Kind of the referent.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   *
   * @required {false}
   */
  kind?: string;
  /** name
   * Name of the referent.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
   *
   * @required {false}
   */
  name?: string;
  /** namespace
   * Namespace of the referent.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/
   *
   * @required {false}
   */
  namespace?: string;
  /** resourceVersion
   * Specific resourceVersion to which this reference is made, if any.
More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   *
   * @required {false}
   */
  resourceVersion?: string;
  /** uid
   * UID of the referent.
More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#uids
   *
   * @required {false}
   */
  uid?: string;
}