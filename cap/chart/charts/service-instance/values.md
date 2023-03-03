# Schema Docs

|                           |                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                 |
| **Additional properties** | [![Not allowed](https://img.shields.io/badge/Not%20allowed-red)](# "Additional Properties not allowed.") |

| Property                                       | Pattern | Type            | Deprecated | Definition | Title/Description                                                                                                                                                                |
| ---------------------------------------------- | ------- | --------------- | ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - [global](#global )                           | No      | object          | No         | -          | Helm global values                                                                                                                                                               |
| - [nameOverride](#nameOverride )               | No      | string          | No         | -          | Chart name override                                                                                                                                                              |
| - [fullnameOverride](#fullnameOverride )       | No      | string          | No         | -          | Override for the \`.fullname\` helper function.                                                                                                                                  |
| + [serviceOfferingName](#serviceOfferingName ) | No      | string          | No         | -          | The name of the SAP BTP service offering.                                                                                                                                        |
| + [servicePlanName](#servicePlanName )         | No      | string          | No         | -          | The plan to use for the service instance.                                                                                                                                        |
| - [externalName](#externalName )               | No      | string          | No         | -          | The name for the service instance in SAP BTP.                                                                                                                                    |
| - [customTags](#customTags )                   | No      | array of string | No         | -          | List of custom tags describing the ServiceInstance, will be copied to \`ServiceBinding\` secret in the key called \`tags\`.                                                      |
| - [parameters](#parameters )                   | No      | object          | No         | -          | Some services support the provisioning of additional configuration parameters. For the list of supported parameters, check the documentation of the particular service offering. |
| - [jsonParameters](#jsonParameters )           | No      | string          | No         | -          | Some services support the provisioning of additional configuration parameters. For the list of supported parameters, check the documentation of the particular service offering. |
| - [parametersFrom](#parametersFrom )           | No      | array of object | No         | -          | List of sources to populate parameters.                                                                                                                                          |

## <a name="global"></a>1. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `global<br />`

**Title:** Helm global values

|                           |                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                          |
| **Additional properties** | [![Any type: allowed](https://img.shields.io/badge/Any%20type-allowed-green)](# "Additional Properties of any type are allowed.") |

**Description:** For more information, see https://helm.sh/docs/chart_template_guide/subcharts_and_globals/#global-chart-values

## <a name="nameOverride"></a>2. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `nameOverride<br />`

**Title:** Chart name override

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** Will be used instead of the `.Chart.Name`, e.g. when generating the Deployment name.

| Restrictions                      |                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Must match regular expression** | ```[0-9a-z][0-9a-z-.]*``` [Test](https://regex101.com/?regex=%5B0-9a-z%5D%5B0-9a-z-.%5D%2A) |

## <a name="fullnameOverride"></a>3. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `fullnameOverride<br />`

**Title:** Override for the `.fullname` helper function.

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** Will be used as an override for the `.fullname` helper function (i.e. `.Release.Name-.Chart.Name`).

| Restrictions                      |                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Must match regular expression** | ```[0-9a-z][0-9a-z-.]*``` [Test](https://regex101.com/?regex=%5B0-9a-z%5D%5B0-9a-z-.%5D%2A) |

## <a name="serviceOfferingName"></a>4. ![Required](https://img.shields.io/badge/Required-blue) Property `serviceOfferingName<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** The name of the SAP BTP service offering.

| Restrictions                      |                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Must match regular expression** | ```[0-9a-z][0-9a-z-.]*``` [Test](https://regex101.com/?regex=%5B0-9a-z%5D%5B0-9a-z-.%5D%2A) |

## <a name="servicePlanName"></a>5. ![Required](https://img.shields.io/badge/Required-blue) Property `servicePlanName<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** The plan to use for the service instance.

| Restrictions                      |                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Must match regular expression** | ```[0-9a-z][0-9a-z-.]*``` [Test](https://regex101.com/?regex=%5B0-9a-z%5D%5B0-9a-z-.%5D%2A) |

## <a name="externalName"></a>6. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `externalName<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** The name for the service instance in SAP BTP.

| Restrictions                      |                                                                                             |
| --------------------------------- | ------------------------------------------------------------------------------------------- |
| **Must match regular expression** | ```[0-9a-z][0-9a-z-.]*``` [Test](https://regex101.com/?regex=%5B0-9a-z%5D%5B0-9a-z-.%5D%2A) |

## <a name="customTags"></a>7. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `customTags<br />`

|          |                   |
| -------- | ----------------- |
| **Type** | `array of string` |

**Description:** List of custom tags describing the ServiceInstance, will be copied to `ServiceBinding` secret in the key called `tags`.

| Each item of this array must be       | Description |
| ------------------------------------- | ----------- |
| [customTags items](#customTags_items) | -           |

### <a name="autogenerated_heading_2"></a>7.1. customTags items<br />

|          |          |
| -------- | -------- |
| **Type** | `string` |

## <a name="parameters"></a>8. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `parameters<br />`

|                           |                                                                                                                                   |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                                          |
| **Additional properties** | [![Any type: allowed](https://img.shields.io/badge/Any%20type-allowed-green)](# "Additional Properties of any type are allowed.") |

**Description:** Some services support the provisioning of additional configuration parameters. For the list of supported parameters, check the documentation of the particular service offering.

## <a name="jsonParameters"></a>9. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `jsonParameters<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** Some services support the provisioning of additional configuration parameters. For the list of supported parameters, check the documentation of the particular service offering.

## <a name="parametersFrom"></a>10. ![Optional](https://img.shields.io/badge/Optional-yellow) Property `parametersFrom<br />`

|          |                   |
| -------- | ----------------- |
| **Type** | `array of object` |

**Description:** List of sources to populate parameters.

| Each item of this array must be               | Description                               |
| --------------------------------------------- | ----------------------------------------- |
| [parametersFrom items](#parametersFrom_items) | Kubernetes Secret as a parameters source. |

### <a name="autogenerated_heading_3"></a>10.1. parametersFrom items<br />

|                           |                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                 |
| **Additional properties** | [![Not allowed](https://img.shields.io/badge/Not%20allowed-red)](# "Additional Properties not allowed.") |

**Description:** Kubernetes Secret as a parameters source.

| Property                                              | Pattern | Type   | Deprecated | Definition | Title/Description                         |
| ----------------------------------------------------- | ------- | ------ | ---------- | ---------- | ----------------------------------------- |
| - [secretKeyRef](#parametersFrom_items_secretKeyRef ) | No      | object | No         | -          | Kubernetes Secret as a parameters source. |

#### <a name="parametersFrom_items_secretKeyRef"></a>10.1.1. Property `secretKeyRef<br />`

|                           |                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Type**                  | `object`                                                                                                 |
| **Additional properties** | [![Not allowed](https://img.shields.io/badge/Not%20allowed-red)](# "Additional Properties not allowed.") |

**Description:** Kubernetes Secret as a parameters source.

| Property                                           | Pattern | Type   | Deprecated | Definition | Title/Description                                                                                                                  |
| -------------------------------------------------- | ------- | ------ | ---------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| + [name](#parametersFrom_items_secretKeyRef_name ) | No      | string | No         | -          | Name of a Secret.                                                                                                                  |
| + [key](#parametersFrom_items_secretKeyRef_key )   | No      | string | No         | -          | Key in that Secret, which contains a string that represents the json to include in the set of parameters to be sent to the broker. |

##### <a name="parametersFrom_items_secretKeyRef_name"></a>10.1.1.1. Property `name<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** Name of a Secret.

##### <a name="parametersFrom_items_secretKeyRef_key"></a>10.1.1.2. Property `key<br />`

|          |          |
| -------- | -------- |
| **Type** | `string` |

**Description:** Key in that Secret, which contains a string that represents the json to include in the set of parameters to be sent to the broker.

----------------------------------------------------------------------------------------------------------------------------
