{{/*
Expand the name of the chart.
*/}}
{{- define "content-deployment.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "content-deployment.fullname" -}}
{{- if .Values.fullnameOverride }}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- $name := default .Chart.Name .Values.nameOverride }}
{{- if contains $name .Release.Name }}
{{- .Release.Name | trunc 63 | trimSuffix "-" }}
{{- else }}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Define a name for the Job object
*/}}
{{- define "content-deployment.jobName" -}}
{{- printf "%s-%04d" ((include "content-deployment.fullname" . ) | trunc 59) (mod .Release.Revision 1000) }}
{{- end }}

{{/*
Define a name for a ServiceBinding object
*/}}
{{- define "content-deployment.bindingName" -}}
{{- printf "%s-%s" (include "content-deployment.fullname" .root ) .name }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "content-deployment.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "content-deployment.labels" -}}
helm.sh/revision: {{ .Release.Revision | quote }}
helm.sh/chart: {{ include "content-deployment.chart" . }}
{{ include "content-deployment.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "content-deployment.selectorLabels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/name: {{ include "content-deployment.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- if .Values.global}}
{{- if .Values.global.component }}
app.kubernetes.io/component:{{ .Values.global.component }}
{{- end }}
{{- if .Values.global.partOf }}
app.kubernetes.io/partOf: {{ .Values.global.partOf }}
{{- end }}
{{- end }}
{{- end }}

{{/*
Service Binding secret mounts
*/}}
{{- define "content-deployment.serviceMounts" -}}
{{- range $name, $params := .Values.bindings }}
- mountPath: /bindings/{{ $name }}/
  name: {{ $name }}-binding
  readOnly: true
{{- end }}
{{- end }}

{{/*
Service Binding secret volumes
*/}}
{{- define "content-deployment.serviceVolumes" -}}
{{- range $name, $params := .Values.bindings }}
{{- $secretName := (include "content-deployment.bindingName" (dict "root" $ "name" $name)) }}
{{- if $params.fromSecret }}
{{- $secretName = $params.fromSecret}}
{{- else if $params.secretName }}
{{- $secretName = $params.secretName }}
{{- end }}
- name: {{ $name }}-binding
  secret:
    secretName: {{ $secretName }}
{{- end }}
{{- end }}

{{/*
Name of the imagePullSecret
*/}}
{{- define "content-deployment.imagePullSecretName" -}}
{{ $ips := (dict "local" .Values.imagePullSecret "global" .Values.global.imagePullSecret) }}
{{- if $ips.local.name }}
{{- $ips.local.name }}
{{- else if $ips.global.name }}
{{- $ips.global.name }}
{{- else if or $ips.local.dockerconfigjson $ips.global.dockerconfigjson }}
{{- include "content-deployment.fullname" . }}
{{- end }}
{{- end }}

{{/*
Calculate the final image name
*/}}
{{- define "content-deployment.imageName" -}}
{{- $tag := .Values.image.tag | default .Values.global.image.tag | default "latest" }}
{{- $registry := .Values.image.registry | default .Values.global.image.registry }}
{{- if $registry }}
{{- $registry | trimSuffix "/" }}/{{ .Values.image.repository }}:{{ $tag }}
{{- else }}
{{- .Values.image.repository }}:{{ $tag }}
{{- end }}
{{- end }}

{{/*
Create the name of a service instance.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as service insatnce name.
*/}}
{{- define "content-deployment.serviceInstanceName" -}}
 {{- if .binding.serviceInstanceFullname }}
    {{- if gt (len .binding.serviceInstanceFullname) 63 }}
      {{- fail (printf "name exceeds 63 characters: '%s'" .binding.serviceInstanceFullname) }}
    {{- end }}
    {{- .binding.serviceInstanceFullname }}
  {{- else }}
    {{- $name := .binding.serviceInstanceName }}
    {{- if not (hasPrefix .release $name)}}
      {{- $name = printf "%s-%s" .release $name }}
    {{- end }}
    {{- if gt (len $name) 63 }}
      {{- fail (printf "name exceeds 63 characters: '%s'" $name) }}
    {{- end }}
    {{- $name }}
  {{- end }}
{{- end }}

{{- define "content-deployment.processEnv" -}}
{{- $result := dict }}
{{- $variables := list }}
{{- range $k, $v := . }}
  {{- $variable := dict }}
  {{- if (kindIs "string" $k) }}
    {{- $_ := set $variable "name" $k -}}
    {{- if (kindIs "map" $v)}}
    {{- $_ := set $variable "valueFrom" $v}}
    {{- else }}
    {{- $_ := set $variable "value" ($v | toString) }}
    {{- end }}
  {{- else }}
    {{- $_ := set $variable "name" $v.name }}
    {{- if $v.value }}
      {{- $_ := set $variable "value" ($v.value | toString)}}
    {{- else }}
      {{- $_ := set $variable "valueFrom" (omit $v "name")}}
    {{- end }}
  {{- end }}
  {{- $variables = append $variables $variable}}
{{- end }}
{{- $_ := set $result "vars" $variables }}
{{- $result | mustToJson }}
{{- end }}

{{- define "web-application.processEnvFrom" -}}
{{- $ := . -}}
{{- $result := dict }}
{{- $variables := list }}
{{- range $secretName := .Values.envSecretNames }}
  {{- $variable := dict }}
  {{- $_ := set $variable "name" $secretName -}}
  {{- $variables = append $variables (dict "secretRef" $variable)}}
{{- end }}
{{- range $envFrom := .Values.envFrom }}
  {{- if hasKey $envFrom "configMapRef" }}
    {{- if and (hasKey $envFrom.configMapRef "tpl") ($envFrom.configMapRef.tpl) }}
    {{- $name := (tpl $envFrom.configMapRef.name $) }}
    {{- $_ := set $envFrom.configMapRef "name" $name }}
    {{- end }}
    {{- $_ := unset $envFrom.configMapRef "tpl" }}
  {{- else }}
    {{- if and (hasKey $envFrom.secretRef "tpl") ($envFrom.secretRef.tpl) }}
    {{- $name := (tpl $envFrom.secretRef.name $) }}
    {{- $_ := set $envFrom.secretRef "name" $name }}
    {{- end }}
    {{- $_ := unset $envFrom.secretRef "tpl" }}
  {{- end }}
  {{- $variables = append $variables $envFrom }}
{{- end }}
{{- $_ := set $result "vars" $variables }}
{{- $result | mustToJson }}
{{- end }}
