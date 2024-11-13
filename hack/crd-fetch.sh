crd_def_list=(
    "admissionreport;admissionreports;kyverno.io;v2;namespaced"  # https://kyverno.io/docs/policy-reports/validatingadmissionpolicy-reports/
    "backgroundscanreport;backgroundscanreports;kyverno.io;v2;namespaced" 
    "cleanuppolicy;cleanuppolicies;kyverno.io;v2;namespaced"
    "clusteradmissionreport;clusteradmissionreports;kyverno.io;v2;cluster"
    "clusterbackgroundscanreport;clusterbackgroundscanreports;kyverno.io;v2;cluster"
    "clustercleanuppolicy;clustercleanuppolicies;kyverno.io;v2;cluster"
    "clusterephemeralreport;clusterephemeralreports;reports.kyverno.io;v1;cluster" 
    "clusterpolicy;clusterpolicies;kyverno.io;v1;cluster"
    "clusterpolicyreport;clusterpolicyreports;wgpolicyk8s.io;v1alpha2;cluster"
    "ephemeralreport;ephemeralreports;reports.kyverno.io;v1;namespaced"
    "globalcontextentry;globalcontextentries;kyverno.io;v2alpha1;cluster"
    "policy;policies;kyverno.io;v1;namespaced"
    "policyexception;policyexceptions;kyverno.io;v2;namespaced"
    "policyreport;policyreports;wgpolicyk8s.io;v1alpha2;namespaced"
    "updaterequest;updaterequests;kyverno.io;v2;namespaced"
)

for crd_def in "${crd_def_list[@]}"
do 
    rm -rf ./crdtoapi/*.yaml 

    crd_def_fields=(${crd_def//;/ })
    crd_plural=${crd_def_fields[1]} 
 
    kubectl get ${crd_plural} -A -o yaml 
done 

