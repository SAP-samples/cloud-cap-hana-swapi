---
title: Exposes data + entity metadata v
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="">Exposes data + entity metadata v</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This service is located at [/odata/v4/-data/](/odata/v4/-data/)

## Entity Data Model
![ER Diagram](https://yuml.me/diagram/class/[Entities{bg:lightslategray}],[Entities]-*[Entities_columns],[Data{bg:lightslategray}],[Data]++-*[Data_record],[Entities_columns{bg:lightslategray}],[Data_record],[Entities_columns%20{bg:lawngreen}]++-*>[Entities_columns],[Data%20{bg:lawngreen}]++-*>[Data],[Entities%20{bg:lawngreen}]++-*>[Entities])

### Legend
![Legend](https://yuml.me/diagram/plain;dir:TB;scale:60/class/[External.Type{bg:whitesmoke}],[ComplexType],[EntityType{bg:lightslategray}],[EntitySet/Singleton/Operation{bg:lawngreen}])

Base URLs:

* <a href="/odata/v4/-data">/odata/v4/-data</a>

<h1 id="-data">Data</h1>

The actual data, organized by column name

## Retrieves a list of data.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Data \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Data HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Data',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Data',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Data', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Data', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Data");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Data", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Data`

<h3 id="retrieves-a-list-of-data.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$top|query|integer|false|Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)|
|$skip|query|integer|false|Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip)|
|$search|query|string|false|Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch)|
|$filter|query|string|false|Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter)|
|$count|query|boolean|false|Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount)|
|$orderby|query|array[string]|false|Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby)|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|dummy|
|$orderby|dummy desc|
|$orderby|record/column|
|$orderby|record/column desc|
|$orderby|record/data|
|$orderby|record/data desc|
|$select|dummy|
|$select|record|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "dummy": "string",
      "record": [
        {
          "column": "string",
          "data": "string"
        }
      ]
    }
  ]
}
```

<h3 id="retrieves-a-list-of-data.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved data|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-data.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Data*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» @count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» value|[[DataService.Data](#schemadataservice.data)]|false|none|none|
|»» The actual data, organized by column name|[DataService.Data](#schemadataservice.data)|false|none|none|
|»»» dummy|string|false|none|none|
|»»» record|[allOf]|false|none|none|
|»»»» Data_record|[DataService.Data_record](#schemadataservice.data_record)¦null|false|none|none|
|»»»»» column|string¦null|false|none|none|
|»»»»» data|string¦null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single datum.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/-data/Data \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/-data/Data HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Data',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/odata/v4/-data/Data',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/-data/Data', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/odata/v4/-data/Data', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Data");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/-data/Data", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Data`

> Body parameter

```json
{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}
```

<h3 id="creates-a-single-datum.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Data-create](#schemadataservice.data-create)|true|The actual data, organized by column name|

> Example responses

> 201 Response

```json
{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}
```

<h3 id="creates-a-single-datum.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created datum|[DataService.Data](#schemadataservice.data)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single datum.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Data('{dummy}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Data('{dummy}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Data('{dummy}')',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Data('{dummy}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Data('{dummy}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Data('{dummy}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Data('{dummy}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Data('{dummy}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Data('{dummy}')`

<h3 id="retrieves-a-single-datum.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|dummy|path|string|true|key: dummy|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|dummy|
|$select|record|

> Example responses

> 200 Response

```json
{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}
```

<h3 id="retrieves-a-single-datum.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved datum|[DataService.Data](#schemadataservice.data)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single datum.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/-data/Data('{dummy}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/-data/Data('{dummy}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Data('{dummy}')',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.patch '/odata/v4/-data/Data('{dummy}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.patch('/odata/v4/-data/Data('{dummy}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','/odata/v4/-data/Data('{dummy}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Data('{dummy}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/odata/v4/-data/Data('{dummy}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Data('{dummy}')`

> Body parameter

```json
{
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}
```

<h3 id="changes-a-single-datum.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Data-update](#schemadataservice.data-update)|true|The actual data, organized by column name|
|dummy|path|string|true|key: dummy|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="changes-a-single-datum.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single datum.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/-data/Data('{dummy}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/-data/Data('{dummy}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Data('{dummy}')',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/odata/v4/-data/Data('{dummy}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/-data/Data('{dummy}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/odata/v4/-data/Data('{dummy}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Data('{dummy}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/odata/v4/-data/Data('{dummy}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Data('{dummy}')`

<h3 id="deletes-a-single-datum.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|dummy|path|string|true|key: dummy|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="deletes-a-single-datum.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-entities">Entities</h1>

Metadata like name and columns/elements

## Retrieves a list of entities.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities`

<h3 id="retrieves-a-list-of-entities.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$top|query|integer|false|Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)|
|$skip|query|integer|false|Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip)|
|$search|query|string|false|Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch)|
|$filter|query|string|false|Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter)|
|$count|query|boolean|false|Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount)|
|$orderby|query|array[string]|false|Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby)|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|name|
|$orderby|name desc|
|$select|name|
|$expand|*|
|$expand|columns|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "name": "string",
      "columns": [
        {
          "up_": {},
          "up__name": "string",
          "name": "string",
          "type": "string",
          "isKey": true
        }
      ],
      "columns@count": 0
    }
  ]
}
```

<h3 id="retrieves-a-list-of-entities.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved entities|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-entities.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Entities*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» @count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» value|[[DataService.Entities](#schemadataservice.entities)]|false|none|none|
|»» Metadata like name and columns/elements|[DataService.Entities](#schemadataservice.entities)|false|none|none|
|»»» name|string|false|none|none|
|»»» columns|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|»»»» Entities_columns|[DataService.Entities_columns](#schemadataservice.entities_columns)|false|none|none|
|»»»»» up_|[DataService.Entities](#schemadataservice.entities)|false|none|none|
|»»»»» up__name|string|false|none|none|
|»»»»» name|string¦null|false|none|none|
|»»»»» type|string¦null|false|none|none|
|»»»»» isKey|boolean¦null|false|none|none|
|»»» columns@count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single entity.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/-data/Entities \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/-data/Entities HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/odata/v4/-data/Entities',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/-data/Entities', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/odata/v4/-data/Entities', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/-data/Entities", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Entities`

> Body parameter

```json
{
  "name": "string",
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}
```

<h3 id="creates-a-single-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Entities-create](#schemadataservice.entities-create)|true|Metadata like name and columns/elements|

> Example responses

> 201 Response

```json
{
  "name": "string",
  "columns": [
    {
      "up_": {
        "name": "string",
        "columns": [],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ],
  "columns@count": 0
}
```

<h3 id="creates-a-single-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created entity|[DataService.Entities](#schemadataservice.entities)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single entity.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities('{name}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities('{name}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities('{name}')',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities('{name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities('{name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities('{name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities('{name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities('{name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities('{name}')`

<h3 id="retrieves-a-single-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|name|path|string|true|key: name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|name|
|$expand|*|
|$expand|columns|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "columns": [
    {
      "up_": {
        "name": "string",
        "columns": [],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ],
  "columns@count": 0
}
```

<h3 id="retrieves-a-single-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved entity|[DataService.Entities](#schemadataservice.entities)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single entity.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/-data/Entities('{name}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/-data/Entities('{name}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities('{name}')',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.patch '/odata/v4/-data/Entities('{name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.patch('/odata/v4/-data/Entities('{name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','/odata/v4/-data/Entities('{name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities('{name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/odata/v4/-data/Entities('{name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Entities('{name}')`

> Body parameter

```json
{
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}
```

<h3 id="changes-a-single-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Entities-update](#schemadataservice.entities-update)|true|Metadata like name and columns/elements|
|name|path|string|true|key: name|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="changes-a-single-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single entity.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/-data/Entities('{name}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/-data/Entities('{name}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities('{name}')',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/odata/v4/-data/Entities('{name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/-data/Entities('{name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/odata/v4/-data/Entities('{name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities('{name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/odata/v4/-data/Entities('{name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Entities('{name}')`

<h3 id="deletes-a-single-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|name|path|string|true|key: name|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="deletes-a-single-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of columns of a entity.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities('{name}')/columns \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities('{name}')/columns HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities('{name}')/columns',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities('{name}')/columns',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities('{name}')/columns', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities('{name}')/columns', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities('{name}')/columns");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities('{name}')/columns", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities('{name}')/columns`

<h3 id="retrieves-a-list-of-columns-of-a-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$top|query|integer|false|Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)|
|$skip|query|integer|false|Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip)|
|$search|query|string|false|Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch)|
|$filter|query|string|false|Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter)|
|$count|query|boolean|false|Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount)|
|$orderby|query|array[string]|false|Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby)|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|name|path|string|true|key: name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|up__name|
|$orderby|up__name desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|type|
|$orderby|type desc|
|$orderby|isKey|
|$orderby|isKey desc|
|$select|up__name|
|$select|name|
|$select|type|
|$select|isKey|
|$expand|*|
|$expand|up_|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "up_": {
        "name": "string",
        "columns": [
          {}
        ],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}
```

<h3 id="retrieves-a-list-of-columns-of-a-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved columns|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-columns-of-a-entity.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Entities_columns*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» @count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» value|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|»» Entities_columns|[DataService.Entities_columns](#schemadataservice.entities_columns)|false|none|none|
|»»» up_|[DataService.Entities](#schemadataservice.entities)|false|none|none|
|»»»» name|string|false|none|none|
|»»»» columns|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|»»»»» Entities_columns|[DataService.Entities_columns](#schemadataservice.entities_columns)|false|none|none|
|»»»» columns@count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|»»» up__name|string|false|none|none|
|»»» name|string¦null|false|none|none|
|»»» type|string¦null|false|none|none|
|»»» isKey|boolean¦null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single column of a entity.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/-data/Entities('{name}')/columns \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/-data/Entities('{name}')/columns HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities('{name}')/columns',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/odata/v4/-data/Entities('{name}')/columns',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/-data/Entities('{name}')/columns', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/odata/v4/-data/Entities('{name}')/columns', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities('{name}')/columns");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/-data/Entities('{name}')/columns", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Entities('{name}')/columns`

> Body parameter

```json
{
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="creates-a-single-column-of-a-entity.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Entities_columns-create](#schemadataservice.entities_columns-create)|true|New column|
|name|path|string|true|key: name|

> Example responses

> 201 Response

```json
{
  "up_": {
    "name": "string",
    "columns": [
      {
        "up_": {},
        "up__name": "string",
        "name": "string",
        "type": "string",
        "isKey": true
      }
    ],
    "columns@count": 0
  },
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="creates-a-single-column-of-a-entity.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created column|[DataService.Entities_columns](#schemadataservice.entities_columns)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-entities_columns">Entities_columns</h1>

## Retrieves a list of entities_columns.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities_columns \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities_columns HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities_columns',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities_columns', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities_columns', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities_columns", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities_columns`

<h3 id="retrieves-a-list-of-entities_columns.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$top|query|integer|false|Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)|
|$skip|query|integer|false|Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip)|
|$search|query|string|false|Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch)|
|$filter|query|string|false|Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter)|
|$count|query|boolean|false|Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount)|
|$orderby|query|array[string]|false|Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby)|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|up__name|
|$orderby|up__name desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|type|
|$orderby|type desc|
|$orderby|isKey|
|$orderby|isKey desc|
|$select|up__name|
|$select|name|
|$select|type|
|$select|isKey|
|$expand|*|
|$expand|up_|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "up_": {
        "name": "string",
        "columns": [
          {}
        ],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}
```

<h3 id="retrieves-a-list-of-entities_columns.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved entities_columns|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-entities_columns.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Entities_columns*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» @count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

*anyOf*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|number|false|none|none|

*or*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|»» *anonymous*|string|false|none|none|

*continued*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|» value|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|»» Entities_columns|[DataService.Entities_columns](#schemadataservice.entities_columns)|false|none|none|
|»»» up_|[DataService.Entities](#schemadataservice.entities)|false|none|none|
|»»»» name|string|false|none|none|
|»»»» columns|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|»»»»» Entities_columns|[DataService.Entities_columns](#schemadataservice.entities_columns)|false|none|none|
|»»»» columns@count|any|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|»»» up__name|string|false|none|none|
|»»» name|string¦null|false|none|none|
|»»» type|string¦null|false|none|none|
|»»» isKey|boolean¦null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single entities_column.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/-data/Entities_columns \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/-data/Entities_columns HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.post '/odata/v4/-data/Entities_columns',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/-data/Entities_columns', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/odata/v4/-data/Entities_columns', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/-data/Entities_columns", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Entities_columns`

> Body parameter

```json
{
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="creates-a-single-entities_column.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Entities_columns-create](#schemadataservice.entities_columns-create)|true|New entities_column|

> Example responses

> 201 Response

```json
{
  "up_": {
    "name": "string",
    "columns": [
      {
        "up_": {},
        "up__name": "string",
        "name": "string",
        "type": "string",
        "isKey": true
      }
    ],
    "columns@count": 0
  },
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="creates-a-single-entities_column.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created entities_column|[DataService.Entities_columns](#schemadataservice.entities_columns)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single entities_column.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities_columns('{up__name}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities_columns('{up__name}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns('{up__name}')',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities_columns('{up__name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities_columns('{up__name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities_columns('{up__name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns('{up__name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities_columns('{up__name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities_columns('{up__name}')`

<h3 id="retrieves-a-single-entities_column.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|up__name|path|string|true|key: up__name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|up__name|
|$select|name|
|$select|type|
|$select|isKey|
|$expand|*|
|$expand|up_|

> Example responses

> 200 Response

```json
{
  "up_": {
    "name": "string",
    "columns": [
      {
        "up_": {},
        "up__name": "string",
        "name": "string",
        "type": "string",
        "isKey": true
      }
    ],
    "columns@count": 0
  },
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="retrieves-a-single-entities_column.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved entities_column|[DataService.Entities_columns](#schemadataservice.entities_columns)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single entities_column.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/-data/Entities_columns('{up__name}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/-data/Entities_columns('{up__name}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "name": "string",
  "type": "string",
  "isKey": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns('{up__name}')',
{
  method: 'PATCH',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'application/json',
  'Accept' => 'application/json'
}

result = RestClient.patch '/odata/v4/-data/Entities_columns('{up__name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

r = requests.patch('/odata/v4/-data/Entities_columns('{up__name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'application/json',
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('PATCH','/odata/v4/-data/Entities_columns('{up__name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns('{up__name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("PATCH");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"application/json"},
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("PATCH", "/odata/v4/-data/Entities_columns('{up__name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Entities_columns('{up__name}')`

> Body parameter

```json
{
  "name": "string",
  "type": "string",
  "isKey": true
}
```

<h3 id="changes-a-single-entities_column.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[DataService.Entities_columns-update](#schemadataservice.entities_columns-update)|true|New property values|
|up__name|path|string|true|key: up__name|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="changes-a-single-entities_column.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single entities_column.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/-data/Entities_columns('{up__name}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/-data/Entities_columns('{up__name}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns('{up__name}')',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.delete '/odata/v4/-data/Entities_columns('{up__name}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/-data/Entities_columns('{up__name}')', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('DELETE','/odata/v4/-data/Entities_columns('{up__name}')', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns('{up__name}')");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("DELETE");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("DELETE", "/odata/v4/-data/Entities_columns('{up__name}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Entities_columns('{up__name}')`

<h3 id="deletes-a-single-entities_column.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|up__name|path|string|true|key: up__name|

> Example responses

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="deletes-a-single-entities_column.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves up_ of a entities_column.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/-data/Entities_columns('{up__name}')/up_ \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/-data/Entities_columns('{up__name}')/up_ HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/-data/Entities_columns('{up__name}')/up_',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Accept' => 'application/json'
}

result = RestClient.get '/odata/v4/-data/Entities_columns('{up__name}')/up_',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/-data/Entities_columns('{up__name}')/up_', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Accept' => 'application/json',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('GET','/odata/v4/-data/Entities_columns('{up__name}')/up_', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/Entities_columns('{up__name}')/up_");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("GET");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("GET", "/odata/v4/-data/Entities_columns('{up__name}')/up_", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Entities_columns('{up__name}')/up_`

<h3 id="retrieves-up_-of-a-entities_column.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|up__name|path|string|true|key: up__name|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|name|
|$expand|*|
|$expand|columns|

> Example responses

> 200 Response

```json
{
  "name": "string",
  "columns": [
    {
      "up_": {
        "name": "string",
        "columns": [],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ],
  "columns@count": 0
}
```

<h3 id="retrieves-up_-of-a-entities_column.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved up_|[DataService.Entities](#schemadataservice.entities)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-batch-requests">Batch Requests</h1>

## Sends a group of requests

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/-data/$batch \
  -H 'Content-Type: multipart/mixed;boundary=request-separator' \
  -H 'Accept: multipart/mixed'

```

```http
POST /odata/v4/-data/$batch HTTP/1.1

Content-Type: multipart/mixed;boundary=request-separator
Accept: multipart/mixed

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'multipart/mixed;boundary=request-separator',
  'Accept':'multipart/mixed'
};

fetch('/odata/v4/-data/$batch',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

```ruby
require 'rest-client'
require 'json'

headers = {
  'Content-Type' => 'multipart/mixed;boundary=request-separator',
  'Accept' => 'multipart/mixed'
}

result = RestClient.post '/odata/v4/-data/$batch',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Content-Type': 'multipart/mixed;boundary=request-separator',
  'Accept': 'multipart/mixed'
}

r = requests.post('/odata/v4/-data/$batch', headers = headers)

print(r.json())

```

```php
<?php

require 'vendor/autoload.php';

$headers = array(
    'Content-Type' => 'multipart/mixed;boundary=request-separator',
    'Accept' => 'multipart/mixed',
);

$client = new \GuzzleHttp\Client();

// Define array of request body.
$request_body = array();

try {
    $response = $client->request('POST','/odata/v4/-data/$batch', array(
        'headers' => $headers,
        'json' => $request_body,
       )
    );
    print_r($response->getBody()->getContents());
 }
 catch (\GuzzleHttp\Exception\BadResponseException $e) {
    // handle exception or api errors.
    print_r($e->getMessage());
 }

 // ...

```

```java
URL obj = new URL("/odata/v4/-data/$batch");
HttpURLConnection con = (HttpURLConnection) obj.openConnection();
con.setRequestMethod("POST");
int responseCode = con.getResponseCode();
BufferedReader in = new BufferedReader(
    new InputStreamReader(con.getInputStream()));
String inputLine;
StringBuffer response = new StringBuffer();
while ((inputLine = in.readLine()) != null) {
    response.append(inputLine);
}
in.close();
System.out.println(response.toString());

```

```go
package main

import (
       "bytes"
       "net/http"
)

func main() {

    headers := map[string][]string{
        "Content-Type": []string{"multipart/mixed;boundary=request-separator"},
        "Accept": []string{"multipart/mixed"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/-data/$batch", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /$batch`

Group multiple requests into a single request payload, see [Batch Requests](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_BatchRequests).

*Please note that "Try it out" is not supported for this request.*

> Body parameter

<h3 id="sends-a-group-of-requests-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|string|true|Batch request|

> Example responses

> 200 Response

> 4XX Response

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}
```

<h3 id="sends-a-group-of-requests-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Batch response|string|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_DataService.Data">DataService.Data</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data"></a>
<a id="schema_DataService.Data"></a>
<a id="tocSdataservice.data"></a>
<a id="tocsdataservice.data"></a>

```json
{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}

```

The actual data, organized by column name

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|dummy|string|false|none|none|
|record|[allOf]|false|none|none|

<h2 id="tocS_DataService.Data-create">DataService.Data-create</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data-create"></a>
<a id="schema_DataService.Data-create"></a>
<a id="tocSdataservice.data-create"></a>
<a id="tocsdataservice.data-create"></a>

```json
{
  "dummy": "string",
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}

```

The actual data, organized by column name (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|dummy|string|true|none|none|
|record|[allOf]|false|none|none|

<h2 id="tocS_DataService.Data-update">DataService.Data-update</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data-update"></a>
<a id="schema_DataService.Data-update"></a>
<a id="tocSdataservice.data-update"></a>
<a id="tocsdataservice.data-update"></a>

```json
{
  "record": [
    {
      "column": "string",
      "data": "string"
    }
  ]
}

```

The actual data, organized by column name (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|record|[allOf]|false|none|none|

<h2 id="tocS_DataService.Data_record">DataService.Data_record</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data_record"></a>
<a id="schema_DataService.Data_record"></a>
<a id="tocSdataservice.data_record"></a>
<a id="tocsdataservice.data_record"></a>

```json
{
  "column": "string",
  "data": "string"
}

```

Data_record

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column|string¦null|false|none|none|
|data|string¦null|false|none|none|

<h2 id="tocS_DataService.Data_record-create">DataService.Data_record-create</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data_record-create"></a>
<a id="schema_DataService.Data_record-create"></a>
<a id="tocSdataservice.data_record-create"></a>
<a id="tocsdataservice.data_record-create"></a>

```json
{
  "column": "string",
  "data": "string"
}

```

Data_record (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column|string¦null|false|none|none|
|data|string¦null|false|none|none|

<h2 id="tocS_DataService.Data_record-update">DataService.Data_record-update</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.data_record-update"></a>
<a id="schema_DataService.Data_record-update"></a>
<a id="tocSdataservice.data_record-update"></a>
<a id="tocsdataservice.data_record-update"></a>

```json
{
  "column": "string",
  "data": "string"
}

```

Data_record (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|column|string¦null|false|none|none|
|data|string¦null|false|none|none|

<h2 id="tocS_DataService.Entities">DataService.Entities</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities"></a>
<a id="schema_DataService.Entities"></a>
<a id="tocSdataservice.entities"></a>
<a id="tocsdataservice.entities"></a>

```json
{
  "name": "string",
  "columns": [
    {
      "up_": {
        "name": "string",
        "columns": [],
        "columns@count": 0
      },
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ],
  "columns@count": 0
}

```

Metadata like name and columns/elements

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|columns|[[DataService.Entities_columns](#schemadataservice.entities_columns)]|false|none|none|
|columns@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_DataService.Entities-create">DataService.Entities-create</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities-create"></a>
<a id="schema_DataService.Entities-create"></a>
<a id="tocSdataservice.entities-create"></a>
<a id="tocsdataservice.entities-create"></a>

```json
{
  "name": "string",
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}

```

Metadata like name and columns/elements (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|true|none|none|
|columns|[[DataService.Entities_columns-create](#schemadataservice.entities_columns-create)]|false|none|none|

<h2 id="tocS_DataService.Entities-update">DataService.Entities-update</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities-update"></a>
<a id="schema_DataService.Entities-update"></a>
<a id="tocSdataservice.entities-update"></a>
<a id="tocsdataservice.entities-update"></a>

```json
{
  "columns": [
    {
      "up__name": "string",
      "name": "string",
      "type": "string",
      "isKey": true
    }
  ]
}

```

Metadata like name and columns/elements (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|columns|[[DataService.Entities_columns-create](#schemadataservice.entities_columns-create)]|false|none|none|

<h2 id="tocS_DataService.Entities_columns">DataService.Entities_columns</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities_columns"></a>
<a id="schema_DataService.Entities_columns"></a>
<a id="tocSdataservice.entities_columns"></a>
<a id="tocsdataservice.entities_columns"></a>

```json
{
  "up_": {
    "name": "string",
    "columns": [
      {
        "up_": {},
        "up__name": "string",
        "name": "string",
        "type": "string",
        "isKey": true
      }
    ],
    "columns@count": 0
  },
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}

```

Entities_columns

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|up_|[DataService.Entities](#schemadataservice.entities)|false|none|none|
|up__name|string|false|none|none|
|name|string¦null|false|none|none|
|type|string¦null|false|none|none|
|isKey|boolean¦null|false|none|none|

<h2 id="tocS_DataService.Entities_columns-create">DataService.Entities_columns-create</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities_columns-create"></a>
<a id="schema_DataService.Entities_columns-create"></a>
<a id="tocSdataservice.entities_columns-create"></a>
<a id="tocsdataservice.entities_columns-create"></a>

```json
{
  "up__name": "string",
  "name": "string",
  "type": "string",
  "isKey": true
}

```

Entities_columns (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|up__name|string|true|none|none|
|name|string¦null|false|none|none|
|type|string¦null|false|none|none|
|isKey|boolean¦null|false|none|none|

<h2 id="tocS_DataService.Entities_columns-update">DataService.Entities_columns-update</h2>
<!-- backwards compatibility -->
<a id="schemadataservice.entities_columns-update"></a>
<a id="schema_DataService.Entities_columns-update"></a>
<a id="tocSdataservice.entities_columns-update"></a>
<a id="tocsdataservice.entities_columns-update"></a>

```json
{
  "name": "string",
  "type": "string",
  "isKey": true
}

```

Entities_columns (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string¦null|false|none|none|
|type|string¦null|false|none|none|
|isKey|boolean¦null|false|none|none|

<h2 id="tocS_count">count</h2>
<!-- backwards compatibility -->
<a id="schemacount"></a>
<a id="schema_count"></a>
<a id="tocScount"></a>
<a id="tocscount"></a>

```json
0

```

The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.

### Properties

anyOf

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|number|false|none|none|

or

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|string|false|none|none|

<h2 id="tocS_error">error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "error": {
    "code": "string",
    "message": "string",
    "target": "string",
    "details": [
      {
        "code": "string",
        "message": "string",
        "target": "string"
      }
    ],
    "innererror": {}
  }
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|error|object|true|none|none|
|» code|string|true|none|none|
|» message|string|true|none|none|
|» target|string|false|none|none|
|» details|[object]|false|none|none|
|»» code|string|true|none|none|
|»» message|string|true|none|none|
|»» target|string|false|none|none|
|» innererror|object|false|none|The structure of this object is service-specific|

