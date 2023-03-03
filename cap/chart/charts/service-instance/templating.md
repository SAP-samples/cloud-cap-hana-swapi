# Templating Values

This functionality is enabled only for some of the templates provided by this helm chart. The feature itself comes with some performance costs that you should keep in mind. More details on this feature can be found in the official [documentation](https://helm.sh/docs/howto/charts_tips_and_tricks/#using-the-tpl-function).

The following values can be used in the template:

1. [Global values](https://helm.sh/docs/chart_template_guide/subcharts_and_globals/)
2. Values passed to the chart directly
3. [Built-in objects](https://helm.sh/docs/chart_template_guide/builtin_objects/) 

Here's a full list of values with examples, where you can use templates:

```yaml
parametersFrom:
  - secretKeyRef:
      key: my-key
      name: test-{{Release.Name}}
```
