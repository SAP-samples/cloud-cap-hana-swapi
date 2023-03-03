# Templating Values

This functionality is enabled only for some of the templates provided by this helm chart. The feature itself comes with some performance costs that you should keep in mind. More details on this feature can be found in the official [documentation](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-tpl-function).

The following values can be used in the template:

1. [Global values](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)
2. Values passed to the chart directly
3. [Built-in objects](https://helm.sh/docs/chart_template_guide/builtin_objects/) 

Here's a full list of values with examples, where you can use templates:

```yaml
serviceAccountName: my-service-account-{{ .Release.Name }}
env:
  - name: key1
    value: value1-{{ .Release.Name }}
  - name: key2
    configMapKeyRef:
      name: my-configmap-{{ .Release.Name }}
      key: my-key
envFrom:
- configMapRef:
    name: my-configmap1-{{ .Release.Name }}
- secretRef:
    name: my-secret-ref1-{{ .Release.Name }}
additionalVolumes:
- name: my-volume
  secret:
    secretName: my-secret-{{ .Release.Name }}
  volumeMount:
    mountPath: /etc/mysecret
    readOnly: true
bindings:
  hana:
    serviceInstanceName: hana-{{ .Release.Name }}
    secretName: hana-secret-{{ .Release.Name }}
    parametersFrom:
      - secretKeyRef:
          key: my-key
          name: test-RELEASE-NAME
  serviceManager:
    fromSecret: manual-secret-{{ .Release.Name }}
```
