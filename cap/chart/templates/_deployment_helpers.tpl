{{/*
Generate VCAP_APPLICATION
*/}}
{{- define "cap.vcapApplication" -}}
    {{- $deploymentHost := include "cap.deploymentHost" . -}}
    {{- $VCAP_APPLICATION := dict "application_uris" (list (print $deploymentHost "." .Values.global.domain)) }}
    {{- $VCAP_APPLICATION | toJson }}
{{- end -}}

{{/*
Add custom env variables
*/}}
{{- define "cap.env" -}}
    {{- if . -}}
        {{- range $name, $value := . }}
- name: {{ $name | quote }}
  value: {{ $value | quote }}
        {{- end -}}
    {{- end -}}
{{- end -}}

{{- define "cap.bindingsVolumes" -}}
{{- if $.Values.newBindings -}}
{{- include "cap.newBindingsVolumes" $ }}
{{- else -}}
{{- include "cap.oldBindingsVolumes" $ }}
{{- end -}}
{{- end -}}

{{/*
Old Service Bindings: volumes
*/}}
{{- define "cap.oldBindingsVolumes" -}}
    {{- $ := . -}}
    {{ range $bindingName, $binding := .deployment.bindings -}}
        {{- $secret := include "cap.bindingSecretName" (dict "Release" $.Release "name" $.name "bindingName" $bindingName "binding" $binding) }}
- name: {{ $bindingName }}-secret
  secret:
    secretName: {{ $secret | quote }}
        {{- if and (eq $bindingName "db") $.deployment.multitenancy }}
    # the "plan" property must not be in the secret for the service manager
    # it would be used as plan for HANA
    items:
    - key: clientid
      path: clientid
    - key: clientsecret
      path: clientsecret
    - key: sm_url
      path: sm_url
    - key: url
      path: url
    - key: xsappname
      path: xsappname
          {{- end -}}
          {{- if eq $.deployment.language "Node" }}
- name: {{ $bindingName }}-metadata
  secret:
    secretName: {{ $secret | quote }}
    optional: true
    items:
    - key: label
      path: label
    - key: plan
      path: plan
    - key: tags
      path: tags
        {{- end -}}
    {{- end -}}
{{- end -}}

{{/*
New Service Bindings: volumes
*/}}
{{- define "cap.newBindingsVolumes" -}}
    {{- $ := . -}}
    {{ range $bindingName, $binding := .deployment.bindings -}}
        {{- $secret := include "cap.bindingSecretName" (dict "Release" $.Release "name" $.name "bindingName" $bindingName "binding" $binding) }}
- name: {{ $bindingName }}-secret
  secret:
    secretName: {{ $secret | quote }}
    {{- end -}}
{{- end -}}


{{- define "cap.bindingsEnv" -}}
{{- if $.Values.newBindings -}}
{{- include "cap.newBindingsEnv" $ }}
{{- else -}}
{{- include "cap.oldBindingsEnv" $ }}
{{- end -}}
{{- end -}}

{{/*
Old Service Bindings: env vars
*/}}
{{- define "cap.oldBindingsEnv" }}
    {{- $ := . }}
    {{- if eq .deployment.language "Java" }}
        {{- range $key, $binding := .deployment.bindings }}
            {{- $cleanKey := $key | upper | replace "-" "" | replace "_" "" | replace "." "" }}
            {{- $prefix := print "CDS_ENVIRONMENT_K8S_SERVICEBINDINGS_" $cleanKey }}
            {{- $secret := default (print $.Release.Name "-" $.name "-" $key) $binding.secret }}
- name: {{ $prefix }}_SERVICE
  valueFrom:
    secretKeyRef:
      name: {{ $secret | quote }}
      key: label
- name: {{ $prefix }}_PLAN
  valueFrom:
    secretKeyRef:
      name: {{ $secret | quote }}
      key: plan
      optional: true
- name: {{ $prefix }}_SECRETSPATH
  value: /etc/secrets/cds/requires/{{ $key }}/credentials
        {{- end }}
    {{- else }}
  {{- /* Read credentials from file system */ -}}
- name: CDS_CONFIG
  value: /etc/secrets/cds
    {{ end }}
{{- end }}

{{/*
New Service Bindings: env vars
*/}}
{{- define "cap.newBindingsEnv" }}
- name: SERVICE_BINDING_ROOT
  value: /bindings
{{- end }}


{{- define "cap.bindingsVolumeMounts" -}}
{{- if $.Values.newBindings -}}
{{- include "cap.newBindingsVolumeMounts" $ }}
{{- else -}}
{{- include "cap.oldBindingsVolumeMounts" $ }}
{{- end -}}
{{- end -}}

{{/*
Old Service Bindings: volume mounts
*/}}
{{- define "cap.oldBindingsVolumeMounts" }}
    {{- $ := . -}}
    {{- range $key, $binding := .deployment.bindings }}
- name: {{ $key }}-secret
  mountPath: /etc/secrets/cds/requires/{{ $key }}/credentials
  readOnly: true
        {{- if eq $.deployment.language "Node" }}
- name: {{ $key }}-metadata
  mountPath: /etc/secrets/cds/requires/{{ $key }}/vcap
  readOnly: true
        {{- end }}
    {{- end }}
{{- end }}

{{/*
New Service Bindings: volume mounts
*/}}
{{- define "cap.newBindingsVolumeMounts" }}
    {{- $ := . -}}
    {{- range $key, $binding := .deployment.bindings }}
- name: {{ $key }}-secret
  mountPath: /bindings/{{ $key }}
  readOnly: true
    {{- end }}
{{- end }}


{{/*
Get list of deployment names
*/}}
{{- define "cap.deploymentNames" -}}
{{- $defaultDeployments := (list "srv") -}}
  {{- if .mtx -}}
{{-   $_ := (append $defaultDeployments "mtx") -}}
  {{- end -}}
{{ .deploymentNames | default $defaultDeployments | join ";" }}
{{- end -}}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.

copied from web-application: web-application.fullname

*/}}
{{- define "cap.deploymentHost" -}}
{{- if .deployment.expose.host }}
{{- .deployment.expose.host }}
{{- else }}
{{- $name := (include "cap.web-application.fullname" .) }}
{{- if hasPrefix $name .Release.Namespace }}
{{- .Release.Namespace }}
{{- else }}
{{- printf "%s-%s" $name .Release.Namespace | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{- define "cap.web-application.fullname" -}}
{{- if .deployment.fullnameOverride }}
{{- .deployment.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .name .deployment.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Get FQDN of a deployment
*/}}
{{- define "cap.deploymentHostFull" -}}
{{ include "cap.deploymentHost" $ }}.{{ $.Values.global.domain }}
{{- end -}}