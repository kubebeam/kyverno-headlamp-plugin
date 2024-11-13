# Generate typescript interface with https://github.com/yaacov/crdtoapi?tab=readme-ov-file

# Steps
# 1. Get CRD into yaml 
# 2. Run crdtoapi to generate openapi file 
# 3. Run crdtotypes to generate typescript files 
# 4. After generation, the field metadata has been made mandatory. 

rm -rf ./crdtoapi 
rm -rf ./crdtoapi-generated
mkdir -p ./crdtoapi
mkdir -p crdtoapi-generated
rm -rf makeCustomResourceClass.ts

crd_def_list=(
    "admissionreport;admissionreports;kyverno.io;v2;namespaced" 
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
    crd_singular=${crd_def_fields[0]} 
    crd_plural=${crd_def_fields[1]} 
    crd_group=${crd_def_fields[2]}  
    crd_version=${crd_def_fields[3]}  
    if [ "${crd_def_fields[4]}" == "namespaced" ]; then 
        isNamespaced=true
    else 
        isNamespaced=false
    fi 
 
    # get CRD
    kubectl get crd ${crd_plural}.${crd_group} -o yaml > crdtoapi/${crd_plural}.yaml

    # generate object class for use in model.tx
    echo "export const ${crd_singular}Class = makeCustomResourceClass({ \
    apiInfo: $crd_group/$crd_version, \
    isNamespaced: ${isNamespaced}, \
    singularName: '$crd_singular', \
    pluralName: '${crd_plural}', \
    });" >> ./makeCustomResourceClass.ts

    # generate OpenAPI for CRDs in the folder ./crdtoapi
    crdtoapi -i ./crdtoapi -o ./crdtoapi-generated/openapi.yaml --noApiVersionPrefix

    mkdir ./crdtoapi-generated/$crd_singular

    # generate Typescript interfaces 
    crdtotypes -i ./crdtoapi-generated/openapi.yaml -o ./crdtoapi-generated/$crd_singular --metadataType ObjectMeta 
done 

