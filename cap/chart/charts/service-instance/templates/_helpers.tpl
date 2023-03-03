{{/*
Expand the name of the chart.
*/}}
{{- define "service-instance.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "service-instance.fullname" -}}
  {{- if .Values.fullnameOverride }}
    {{- if gt (len .Values.fullnameOverride) 63 }}
      {{- fail (printf "name exceeds 63 characters: '%s'" .Values.fullnameOverride) }}
    {{- end }}
    {{- .Values.fullnameOverride }}
  {{- else }}
    {{- $name := default .Chart.Name .Values.nameOverride }}
    {{- if not (hasPrefix .Release.Name $name)}}
      {{- $name = printf "%s-%s" .Release.Name $name }}
    {{- end }}
    {{- if gt (len $name) 63 }}
      {{- fail (printf "name exceeds 63 characters: '%s'" $name) }}
    {{- end }}
    {{- $name }}
  {{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "service-instance.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "service-instance.labels" -}}
helm.sh/revision: {{ .Release.Revision | quote }}
helm.sh/chart: {{ include "service-instance.chart" . }}
{{ include "service-instance.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "service-instance.selectorLabels" -}}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/name: {{ include "service-instance.name" . }}
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
