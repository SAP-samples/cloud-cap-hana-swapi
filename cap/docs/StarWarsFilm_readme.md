---
title: Service for namespace StarWarsFilm v
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

<h1 id="">Service for namespace StarWarsFilm v</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

This service is located at [/odata/v4/StarWarsFilm/](/odata/v4/StarWarsFilm/)

## Entity Data Model
![ER Diagram](https://yuml.me/diagram/class/[Film{bg:lightslategray}],[Film]0..1-*[Film2People],[Film]++-0..1>[DraftAdministrativeData],[Film]-0..1>[Film],[People{bg:lightslategray}],[People]-0..1>[Planet],[People]0..1-*[Film2People],[Planet{bg:lightslategray}],[Planet]0..1-*[Film2Planets],[Species{bg:lightslategray}],[Species]-0..1>[Planet],[Species]0..1-*[Species2People],[Species]0..1-*[Film2Species],[Starship{bg:lightslategray}],[Starship]0..1-*[Film2Starships],[Starship]0..1-*[Starship2Pilot],[Vehicles{bg:lightslategray}],[Vehicles]0..1-*[Film2Vehicles],[Vehicles]0..1-*[Vehicle2Pilot],[Film2People{bg:lightslategray}],[Film2People]++-0..1>[DraftAdministrativeData],[Film2People]-0..1>[Film2People],[Film2Planets{bg:lightslategray}],[Film2Planets]*-0..1[Film],[Film2Planets]++-0..1>[DraftAdministrativeData],[Film2Planets]-0..1>[Film2Planets],[Film2Starships{bg:lightslategray}],[Film2Starships]*-0..1[Film],[Film2Starships]++-0..1>[DraftAdministrativeData],[Film2Starships]-0..1>[Film2Starships],[Film2Species{bg:lightslategray}],[Film2Species]*-0..1[Film],[Film2Species]++-0..1>[DraftAdministrativeData],[Film2Species]-0..1>[Film2Species],[Film2Vehicles{bg:lightslategray}],[Film2Vehicles]*-0..1[Film],[Film2Vehicles]++-0..1>[DraftAdministrativeData],[Film2Vehicles]-0..1>[Film2Vehicles],[directors{bg:lightslategray}],[producers{bg:lightslategray}],[FilmEpisodeDesc{bg:lightslategray}],[Species2People{bg:lightslategray}],[Species2People]*-0..1[People],[Vehicle2Pilot{bg:lightslategray}],[Vehicle2Pilot]*-0..1[People],[Starship2Pilot{bg:lightslategray}],[Starship2Pilot]*-0..1[People],[Planet2People{bg:lightslategray}],[Planet2People]*-0..1[Planet],[Planet2People]-0..1>[People],[DraftAdministrativeData{bg:lightslategray}],[Planet2People%20{bg:lawngreen}]++-*>[Planet2People],[Starship2Pilot%20{bg:lawngreen}]++-*>[Starship2Pilot],[Vehicle2Pilot%20{bg:lawngreen}]++-*>[Vehicle2Pilot],[Species2People%20{bg:lawngreen}]++-*>[Species2People],[FilmEpisodeDesc%20{bg:lawngreen}]++-*>[FilmEpisodeDesc],[producers%20{bg:lawngreen}]++-*>[producers],[directors%20{bg:lawngreen}]++-*>[directors],[Film2Vehicles%20{bg:lawngreen}]++-*>[Film2Vehicles],[Film2Species%20{bg:lawngreen}]++-*>[Film2Species],[Film2Starships%20{bg:lawngreen}]++-*>[Film2Starships],[Film2Planets%20{bg:lawngreen}]++-*>[Film2Planets],[Film2People%20{bg:lawngreen}]++-*>[Film2People],[Vehicles%20{bg:lawngreen}]++-*>[Vehicles],[Starship%20{bg:lawngreen}]++-*>[Starship],[Species%20{bg:lawngreen}]++-*>[Species],[Planet%20{bg:lawngreen}]++-*>[Planet],[People%20{bg:lawngreen}]++-*>[People],[Film%20{bg:lawngreen}]++-*>[Film])

### Legend
![Legend](https://yuml.me/diagram/plain;dir:TB;scale:60/class/[External.Type{bg:whitesmoke}],[ComplexType],[EntityType{bg:lightslategray}],[EntitySet/Singleton/Operation{bg:lawngreen}])

Base URLs:

* <a href="/odata/v4/StarWarsFilm">/odata/v4/StarWarsFilm</a>

<h1 id="--i18n-film-">{i18n>Film}</h1>

All Films in the Star Wars Skywalker Saga

## Retrieves a list of film.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film`

<h3 id="retrieves-a-list-of-film.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|title|
|$orderby|title desc|
|$orderby|episode_id|
|$orderby|episode_id desc|
|$orderby|opening_crawl|
|$orderby|opening_crawl desc|
|$orderby|director|
|$orderby|director desc|
|$orderby|producer|
|$orderby|producer desc|
|$orderby|release_date|
|$orderby|release_date desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film',
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

r = requests.post('/odata/v4/StarWarsFilm/Film', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film`

> Body parameter

```json
{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film-create](#schemastarwarsfilm.film-create)|true|All Films in the Star Wars Skywalker Saga|

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film-update](#schemastarwarsfilm.film-update)|true|All Films in the Star Wars Skywalker Saga|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-a-single-film.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of characters of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters`

<h3 id="retrieves-a-list-of-characters-of-a-{i18n>-film}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|people_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|people|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-characters-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved characters|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-characters-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single character of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/characters`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-character-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2People-create](#schemastarwarsfilm.film2people-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-character-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created character|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-character-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of planets of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets`

<h3 id="retrieves-a-list-of-planets-of-a-{i18n>-film}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|planet_ID|
|$orderby|planet_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|planet_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|planet|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-planets-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planets|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-planets-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Planets*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single planet of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/planets`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-planet-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Planets-create](#schemastarwarsfilm.film2planets-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-planet-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-planet-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Planets*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of species of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species`

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-film}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|specie_ID|
|$orderby|specie_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|specie_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|specie|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Species*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single species of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/species`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-species-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Species-create](#schemastarwarsfilm.film2species-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-species-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-species-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of starships of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships`

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-film}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|starship_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|starship|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starships|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Starships*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single starship of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/starships`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-starship-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Starships-create](#schemastarwarsfilm.film2starships-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-starship-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-starship-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Starships*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of vehicles of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles`

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-film}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|vehicle_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|vehicle|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicles|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Vehicles*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single vehicle of a {i18n> film}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles',
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

r = requests.post('/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicles`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-vehicle-of-a-{i18n>-film}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Vehicles-create](#schemastarwarsfilm.film2vehicles-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-vehicle-of-a-{i18n>-film}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-vehicle-of-a-{i18n>-film}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of film episode desc.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/FilmEpisodeDesc \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/FilmEpisodeDesc HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/FilmEpisodeDesc',
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

result = RestClient.get '/odata/v4/StarWarsFilm/FilmEpisodeDesc',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/FilmEpisodeDesc', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/FilmEpisodeDesc', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/FilmEpisodeDesc");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/FilmEpisodeDesc", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /FilmEpisodeDesc`

<h3 id="retrieves-a-list-of-film-episode-desc.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|episode_id|
|$orderby|episode_id desc|
|$orderby|title|
|$orderby|title desc|
|$orderby|episodeIDDesc|
|$orderby|episodeIDDesc desc|
|$select|ID|
|$select|episode_id|
|$select|title|
|$select|episodeIDDesc|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "ID": "01234567-89ab-cdef-0123-456789abcdef",
      "episode_id": 0,
      "title": "string",
      "episodeIDDesc": "string"
    }
  ]
}
```

<h3 id="retrieves-a-list-of-film-episode-desc.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film episode desc|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film-episode-desc.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of FilmEpisodeDesc*

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
|» value|[[StarWarsFilm.FilmEpisodeDesc](#schemastarwarsfilm.filmepisodedesc)]|false|none|none|
|»» All Films in the Star Wars Skywalker Saga|[StarWarsFilm.FilmEpisodeDesc](#schemastarwarsfilm.filmepisodedesc)|false|none|none|
|»»» ID|string(uuid)|false|none|none|
|»»» episode_id|integer(int32)¦null|false|none|none|
|»»» title|string¦null|false|none|none|
|»»» episodeIDDesc|string¦null|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film episode desc.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/FilmEpisodeDesc({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/FilmEpisodeDesc({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/FilmEpisodeDesc({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /FilmEpisodeDesc({ID})`

<h3 id="retrieves-a-single-film-episode-desc.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|episode_id|
|$select|title|
|$select|episodeIDDesc|

> Example responses

> 200 Response

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "episode_id": 0,
  "title": "string",
  "episodeIDDesc": "string"
}
```

<h3 id="retrieves-a-single-film-episode-desc.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film episode desc|[StarWarsFilm.FilmEpisodeDesc](#schemastarwarsfilm.filmepisodedesc)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of directors.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/directors \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/directors HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/directors',
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

result = RestClient.get '/odata/v4/StarWarsFilm/directors',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/directors', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/directors', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/directors");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/directors", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /directors`

<h3 id="retrieves-a-list-of-directors.-parameters">Parameters</h3>

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
|$orderby|director|
|$orderby|director desc|
|$select|director|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "director": "string"
    }
  ]
}
```

<h3 id="retrieves-a-list-of-directors.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved directors|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-directors.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of directors*

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
|» value|[[StarWarsFilm.directors](#schemastarwarsfilm.directors)]|false|none|none|
|»» All Films in the Star Wars Skywalker Saga|[StarWarsFilm.directors](#schemastarwarsfilm.directors)|false|none|none|
|»»» director|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single director.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/directors('{director}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/directors('{director}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/directors('{director}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/directors('{director}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/directors('{director}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/directors('{director}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/directors('{director}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/directors('{director}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /directors('{director}')`

<h3 id="retrieves-a-single-director.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|director|path|string|true|key: director|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|director|

> Example responses

> 200 Response

```json
{
  "director": "string"
}
```

<h3 id="retrieves-a-single-director.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved director|[StarWarsFilm.directors](#schemastarwarsfilm.directors)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of producers.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/producers \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/producers HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/producers',
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

result = RestClient.get '/odata/v4/StarWarsFilm/producers',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/producers', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/producers', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/producers");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/producers", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /producers`

<h3 id="retrieves-a-list-of-producers.-parameters">Parameters</h3>

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
|$orderby|producer|
|$orderby|producer desc|
|$select|producer|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {
      "producer": "string"
    }
  ]
}
```

<h3 id="retrieves-a-list-of-producers.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved producers|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-producers.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of producers*

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
|» value|[[StarWarsFilm.producers](#schemastarwarsfilm.producers)]|false|none|none|
|»» All Films in the Star Wars Skywalker Saga|[StarWarsFilm.producers](#schemastarwarsfilm.producers)|false|none|none|
|»»» producer|string|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single producer.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/producers('{producer}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/producers('{producer}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/producers('{producer}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/producers('{producer}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/producers('{producer}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/producers('{producer}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/producers('{producer}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/producers('{producer}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /producers('{producer}')`

<h3 id="retrieves-a-single-producer.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|producer|path|string|true|key: producer|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|producer|

> Example responses

> 200 Response

```json
{
  "producer": "string"
}
```

<h3 id="retrieves-a-single-producer.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved producer|[StarWarsFilm.producers](#schemastarwarsfilm.producers)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="--i18n-people-">{i18n>People}</h1>

All People and Aliens in Star Wars

## Retrieves a list of people.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People`

<h3 id="retrieves-a-list-of-people.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|height|
|$orderby|height desc|
|$orderby|mass|
|$orderby|mass desc|
|$orderby|hair_color|
|$orderby|hair_color desc|
|$orderby|skin_color|
|$orderby|skin_color desc|
|$orderby|eye_color|
|$orderby|eye_color desc|
|$orderby|birth_year|
|$orderby|birth_year desc|
|$orderby|gender|
|$orderby|gender desc|
|$orderby|scoundrel|
|$orderby|scoundrel desc|
|$orderby|homeworld_ID|
|$orderby|homeworld_ID desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-people.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-people.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})`

<h3 id="retrieves-a-single-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of films of a {i18n> people}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID})/films \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID})/films HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})/films',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})/films',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})/films', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})/films");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})/films`

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-people}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|people_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|people|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-people}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved films|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-people}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves homeworld of a {i18n> people}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID})/homeworld \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID})/homeworld HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})/homeworld',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})/homeworld',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})/homeworld', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})/homeworld', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})/homeworld");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})/homeworld", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})/homeworld`

<h3 id="retrieves-homeworld-of-a-{i18n>-people}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-homeworld-of-a-{i18n>-people}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved homeworld|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-homeworld-of-a-{i18n>-people}.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of species of a {i18n> people}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID})/species \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID})/species HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})/species',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})/species',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})/species', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})/species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})/species");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})/species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})/species`

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-people}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|species_ID|
|$orderby|species_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$select|ID|
|$select|species_ID|
|$select|people_ID|
|$expand|*|
|$expand|species|
|$expand|people|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-people}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-species-of-a-{i18n>-people}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Species2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of starships of a {i18n> people}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID})/starships \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID})/starships HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})/starships',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})/starships',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})/starships', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})/starships', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})/starships");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})/starships", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})/starships`

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-people}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|starship_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|starship|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-people}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starships|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-starships-of-a-{i18n>-people}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Starship2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of vehicles of a {i18n> people}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/People({ID})/vehicles \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/People({ID})/vehicles HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/People({ID})/vehicles',
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

result = RestClient.get '/odata/v4/StarWarsFilm/People({ID})/vehicles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/People({ID})/vehicles', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/People({ID})/vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/People({ID})/vehicles");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/People({ID})/vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /People({ID})/vehicles`

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-people}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|vehicle_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|vehicle|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-people}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicles|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-vehicles-of-a-{i18n>-people}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Vehicle2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="--i18n-planet-">{i18n>Planet}</h1>

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

## Retrieves a list of planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet`

<h3 id="retrieves-a-list-of-planet.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|diameter|
|$orderby|diameter desc|
|$orderby|rotation_period|
|$orderby|rotation_period desc|
|$orderby|orbital_period|
|$orderby|orbital_period desc|
|$orderby|gravity|
|$orderby|gravity desc|
|$orderby|population|
|$orderby|population desc|
|$orderby|climate|
|$orderby|climate desc|
|$orderby|terrain|
|$orderby|terrain desc|
|$orderby|surface_water|
|$orderby|surface_water desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-planet.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Planet*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet({ID})`

<h3 id="retrieves-a-single-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-planet.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of films of a {i18n> planet}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet({ID})/films \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet({ID})/films HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet({ID})/films',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet({ID})/films',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet({ID})/films', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet({ID})/films");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet({ID})/films`

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-planet}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|planet_ID|
|$orderby|planet_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|planet_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|planet|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-planet}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved films|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-planet}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Planets*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film of a {i18n> planet}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Planet({ID})/films \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Planet({ID})/films HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet({ID})/films',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Planet({ID})/films',
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

r = requests.post('/odata/v4/StarWarsFilm/Planet({ID})/films', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Planet({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet({ID})/films");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Planet({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Planet({ID})/films`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film-of-a-{i18n>-planet}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Planets-create](#schemastarwarsfilm.film2planets-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film-of-a-{i18n>-planet}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film-of-a-{i18n>-planet}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Planets*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of residents of a {i18n> planet}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet({ID})/residents \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet({ID})/residents HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet({ID})/residents',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet({ID})/residents',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet({ID})/residents', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet({ID})/residents', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet({ID})/residents");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet({ID})/residents", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet({ID})/residents`

<h3 id="retrieves-a-list-of-residents-of-a-{i18n>-planet}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|planet_ID|
|$orderby|planet_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$select|ID|
|$select|planet_ID|
|$select|people_ID|
|$expand|*|
|$expand|planet|
|$expand|people|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-residents-of-a-{i18n>-planet}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved residents|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-residents-of-a-{i18n>-planet}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Planet2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single resident of a {i18n> planet}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Planet({ID})/residents \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Planet({ID})/residents HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet({ID})/residents',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Planet({ID})/residents',
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

r = requests.post('/odata/v4/StarWarsFilm/Planet({ID})/residents', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Planet({ID})/residents', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet({ID})/residents");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Planet({ID})/residents", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Planet({ID})/residents`

> Body parameter

```json
{
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}
```

<h3 id="creates-a-single-resident-of-a-{i18n>-planet}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Planet2People-create](#schemastarwarsfilm.planet2people-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-resident-of-a-{i18n>-planet}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created resident|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-resident-of-a-{i18n>-planet}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Planet2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="--i18n-species-">{i18n>Species}</h1>

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

## Retrieves a list of species.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species`

<h3 id="retrieves-a-list-of-species.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|classification|
|$orderby|classification desc|
|$orderby|designation|
|$orderby|designation desc|
|$orderby|average_height|
|$orderby|average_height desc|
|$orderby|average_lifespan|
|$orderby|average_lifespan desc|
|$orderby|hair_colors|
|$orderby|hair_colors desc|
|$orderby|skin_colors|
|$orderby|skin_colors desc|
|$orderby|eye_colors|
|$orderby|eye_colors desc|
|$orderby|homeworld_ID|
|$orderby|homeworld_ID desc|
|$orderby|language|
|$orderby|language desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|classification|
|$select|designation|
|$select|average_height|
|$select|average_lifespan|
|$select|hair_colors|
|$select|skin_colors|
|$select|eye_colors|
|$select|homeworld_ID|
|$select|language|
|$expand|*|
|$expand|homeworld|
|$expand|people|
|$expand|films|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-species.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-species.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Species*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single species.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species({ID})`

<h3 id="retrieves-a-single-species.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|classification|
|$select|designation|
|$select|average_height|
|$select|average_lifespan|
|$select|hair_colors|
|$select|skin_colors|
|$select|eye_colors|
|$select|homeworld_ID|
|$select|language|
|$expand|*|
|$expand|homeworld|
|$expand|people|
|$expand|films|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-species.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-species.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of films of a {i18n> species}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species({ID})/films \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species({ID})/films HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})/films',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species({ID})/films',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species({ID})/films', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})/films");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species({ID})/films`

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-species}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|specie_ID|
|$orderby|specie_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|specie_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|specie|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-species}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved films|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-species}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Species*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film of a {i18n> species}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Species({ID})/films \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Species({ID})/films HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})/films',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Species({ID})/films',
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

r = requests.post('/odata/v4/StarWarsFilm/Species({ID})/films', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Species({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})/films");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Species({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Species({ID})/films`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film-of-a-{i18n>-species}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Species-create](#schemastarwarsfilm.film2species-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film-of-a-{i18n>-species}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film-of-a-{i18n>-species}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves homeworld of a {i18n> species}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species({ID})/homeworld \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species({ID})/homeworld HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})/homeworld',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species({ID})/homeworld',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species({ID})/homeworld', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species({ID})/homeworld', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})/homeworld");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species({ID})/homeworld", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species({ID})/homeworld`

<h3 id="retrieves-homeworld-of-a-{i18n>-species}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-homeworld-of-a-{i18n>-species}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved homeworld|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-homeworld-of-a-{i18n>-species}.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of people of a {i18n> species}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species({ID})/people \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species({ID})/people HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})/people',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species({ID})/people',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species({ID})/people', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species({ID})/people', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})/people");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species({ID})/people", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species({ID})/people`

<h3 id="retrieves-a-list-of-people-of-a-{i18n>-species}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|species_ID|
|$orderby|species_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$select|ID|
|$select|species_ID|
|$select|people_ID|
|$expand|*|
|$expand|species|
|$expand|people|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-people-of-a-{i18n>-species}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-people-of-a-{i18n>-species}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Species2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single person of a {i18n> species}.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Species({ID})/people \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Species({ID})/people HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "species_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species({ID})/people',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Species({ID})/people',
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

r = requests.post('/odata/v4/StarWarsFilm/Species({ID})/people', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Species({ID})/people', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species({ID})/people");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Species({ID})/people", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Species({ID})/people`

> Body parameter

```json
{
  "species_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}
```

<h3 id="creates-a-single-person-of-a-{i18n>-species}.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Species2People-create](#schemastarwarsfilm.species2people-create)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-person-of-a-{i18n>-species}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-person-of-a-{i18n>-species}.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Species2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="--i18n-starship-">{i18n>Starship}</h1>

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

## Retrieves a list of starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship`

<h3 id="retrieves-a-list-of-starship.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|model|
|$orderby|model desc|
|$orderby|starship_class|
|$orderby|starship_class desc|
|$orderby|manufacturer|
|$orderby|manufacturer desc|
|$orderby|cost_in_credits|
|$orderby|cost_in_credits desc|
|$orderby|length|
|$orderby|length desc|
|$orderby|crew|
|$orderby|crew desc|
|$orderby|passengers|
|$orderby|passengers desc|
|$orderby|max_atmosphering_speed|
|$orderby|max_atmosphering_speed desc|
|$orderby|hyperdrive_rating|
|$orderby|hyperdrive_rating desc|
|$orderby|MGLT|
|$orderby|MGLT desc|
|$orderby|cargo_capacity|
|$orderby|cargo_capacity desc|
|$orderby|consumables|
|$orderby|consumables desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|starship_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|hyperdrive_rating|
|$select|MGLT|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-starship.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Starship*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship({ID})`

<h3 id="retrieves-a-single-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|starship_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|hyperdrive_rating|
|$select|MGLT|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-starship.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Starship*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of films of a {i18n> starship}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship({ID})/films \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship({ID})/films HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship({ID})/films',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship({ID})/films',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship({ID})/films', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship({ID})/films");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship({ID})/films`

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-starship}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|starship_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|starship|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-starship}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved films|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-starship}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Starships*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of pilots of a {i18n> starship}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship({ID})/pilots \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship({ID})/pilots HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship({ID})/pilots',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship({ID})/pilots',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship({ID})/pilots', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship({ID})/pilots', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship({ID})/pilots");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship({ID})/pilots", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship({ID})/pilots`

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-starship}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|starship_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|starship|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-starship}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved pilots|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-starship}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Starship2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="--i18n-vehicles-">{i18n>Vehicles}</h1>

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

## Retrieves a list of vehicles.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicles \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicles HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicles',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicles', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicles");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicles`

<h3 id="retrieves-a-list-of-vehicles.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|createdAt|
|$orderby|createdAt desc|
|$orderby|createdBy|
|$orderby|createdBy desc|
|$orderby|modifiedAt|
|$orderby|modifiedAt desc|
|$orderby|modifiedBy|
|$orderby|modifiedBy desc|
|$orderby|name|
|$orderby|name desc|
|$orderby|model|
|$orderby|model desc|
|$orderby|vehicle_class|
|$orderby|vehicle_class desc|
|$orderby|manufacturer|
|$orderby|manufacturer desc|
|$orderby|cost_in_credits|
|$orderby|cost_in_credits desc|
|$orderby|length|
|$orderby|length desc|
|$orderby|crew|
|$orderby|crew desc|
|$orderby|passengers|
|$orderby|passengers desc|
|$orderby|max_atmosphering_speed|
|$orderby|max_atmosphering_speed desc|
|$orderby|cargo_capacity|
|$orderby|cargo_capacity desc|
|$orderby|consumables|
|$orderby|consumables desc|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|vehicle_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-vehicles.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicles|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-vehicles.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Vehicles*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicles({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicles({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicles({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicles({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicles({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicles({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicles({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicles({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicles({ID})`

<h3 id="retrieves-a-single-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|vehicle_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-vehicle.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of films of a {i18n> vehicles}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicles({ID})/films \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicles({ID})/films HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicles({ID})/films',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicles({ID})/films',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicles({ID})/films', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicles({ID})/films', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicles({ID})/films");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicles({ID})/films", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicles({ID})/films`

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-vehicles}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|vehicle_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|vehicle|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-vehicles}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved films|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-films-of-a-{i18n>-vehicles}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Vehicles*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a list of pilots of a {i18n> vehicles}.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicles({ID})/pilots \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicles({ID})/pilots HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicles({ID})/pilots',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicles({ID})/pilots',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicles({ID})/pilots', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicles({ID})/pilots', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicles({ID})/pilots");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicles({ID})/pilots", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicles({ID})/pilots`

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-vehicles}.-parameters">Parameters</h3>

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
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$orderby|ID|
|$orderby|ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|vehicle_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|vehicle|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-vehicles}.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved pilots|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-pilots-of-a-{i18n>-vehicles}.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Vehicle2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-film2people">Film2People</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of film2 people.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People`

<h3 id="retrieves-a-list-of-film2-people.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|people_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|people|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film2-people.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film2-people.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film2 person.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2People \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2People HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2People',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2People', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2People', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2People", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2People`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2People-create](#schemastarwarsfilm.film2people-create)|true|Aspect for entities with canonical universal IDs|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film2 person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film2-person.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|people_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|people|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film2 person.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2People-update](#schemastarwarsfilm.film2people-update)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

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

<h3 id="changes-a-single-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film2 person.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|people_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|people|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-film2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves film of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film`

<h3 id="retrieves-film-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-film-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-film-of-a-film2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves people of a film2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2People(ID={ID},IsActiveEntity='{IsActiveEntity}')/people`

<h3 id="retrieves-people-of-a-film2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-people-of-a-film2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-people-of-a-film2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-film2planets">Film2Planets</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of film2 planets.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets`

<h3 id="retrieves-a-list-of-film2-planets.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|planet_ID|
|$orderby|planet_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|planet_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|planet|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film2-planets.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 planets|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film2-planets.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Planets*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film2 planet.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Planets \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Planets HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Planets',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Planets', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Planets', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Planets", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Planets`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Planets-create](#schemastarwarsfilm.film2planets-create)|true|Aspect for entities with canonical universal IDs|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film2 planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film2-planet.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Planets*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film2 planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|planet_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|planet|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film2-planet.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Planets*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film2 planet.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Planets-update](#schemastarwarsfilm.film2planets-update)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

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

<h3 id="changes-a-single-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film2 planet.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|planet_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|planet|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-film2-planet.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Planets*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves film of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film`

<h3 id="retrieves-film-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-film-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-film-of-a-film2-planet.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves planet of a film2 planet.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Planets(ID={ID},IsActiveEntity='{IsActiveEntity}')/planet`

<h3 id="retrieves-planet-of-a-film2-planet.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-planet-of-a-film2-planet.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-planet-of-a-film2-planet.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-film2species">Film2Species</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of film2 species.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species`

<h3 id="retrieves-a-list-of-film2-species.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|specie_ID|
|$orderby|specie_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|specie_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|specie|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film2-species.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film2-species.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Species*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film2 specy.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Species \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Species HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Species',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Species', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Species`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Species-create](#schemastarwarsfilm.film2species-create)|true|Aspect for entities with canonical universal IDs|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film2 specy|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film2-specy.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film2 specy.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|specie_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|specie|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 specy|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film2-specy.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film2 specy.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Species-update](#schemastarwarsfilm.film2species-update)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

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

<h3 id="changes-a-single-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film2 specy.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|specie_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|specie|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-film2-specy.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves film of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film`

<h3 id="retrieves-film-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-film-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-film-of-a-film2-specy.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves specie of a film2 specy.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Species(ID={ID},IsActiveEntity='{IsActiveEntity}')/specie`

<h3 id="retrieves-specie-of-a-film2-specy.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|classification|
|$select|designation|
|$select|average_height|
|$select|average_lifespan|
|$select|hair_colors|
|$select|skin_colors|
|$select|eye_colors|
|$select|homeworld_ID|
|$select|language|
|$expand|*|
|$expand|homeworld|
|$expand|people|
|$expand|films|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-specie-of-a-film2-specy.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved specie|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-specie-of-a-film2-specy.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-film2starships">Film2Starships</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of film2 starships.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships`

<h3 id="retrieves-a-list-of-film2-starships.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|starship_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|starship|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film2-starships.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 starships|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film2-starships.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Starships*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film2 starship.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Starships \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Starships HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Starships',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Starships', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Starships', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Starships", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Starships`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Starships-create](#schemastarwarsfilm.film2starships-create)|true|Aspect for entities with canonical universal IDs|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film2 starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film2-starship.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Starships*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film2 starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|starship_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|starship|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film2-starship.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Starships*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film2 starship.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Starships-update](#schemastarwarsfilm.film2starships-update)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

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

<h3 id="changes-a-single-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film2 starship.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|starship_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|starship|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-film2-starship.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Starships*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves film of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film`

<h3 id="retrieves-film-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-film-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-film-of-a-film2-starship.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves starship of a film2 starship.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Starships(ID={ID},IsActiveEntity='{IsActiveEntity}')/starship`

<h3 id="retrieves-starship-of-a-film2-starship.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|starship_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|hyperdrive_rating|
|$select|MGLT|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-starship-of-a-film2-starship.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-starship-of-a-film2-starship.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Starship*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-film2vehicles">Film2Vehicles</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of film2 vehicles.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles`

<h3 id="retrieves-a-list-of-film2-vehicles.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|film_ID|
|$orderby|film_ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|IsActiveEntity|
|$orderby|IsActiveEntity desc|
|$orderby|HasActiveEntity|
|$orderby|HasActiveEntity desc|
|$orderby|HasDraftEntity|
|$orderby|HasDraftEntity desc|
|$select|ID|
|$select|film_ID|
|$select|vehicle_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|vehicle|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-film2-vehicles.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 vehicles|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-film2-vehicles.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Film2Vehicles*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Creates a single film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Vehicles \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Vehicles HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Vehicles',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Vehicles', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Vehicles', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Vehicles", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Vehicles`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="creates-a-single-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Vehicles-create](#schemastarwarsfilm.film2vehicles-create)|true|Aspect for entities with canonical universal IDs|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

> Example responses

> 201 Response

```json
{}
```

<h3 id="creates-a-single-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Created film2 vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="creates-a-single-film2-vehicle.-responseschema">Response Schema</h3>

Status Code **201**

*See StarWarsFilm.Film2Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="retrieves-a-single-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|vehicle_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|vehicle|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film2 vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-film2-vehicle.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Changes a single film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')`

> Body parameter

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}
```

<h3 id="changes-a-single-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.Film2Vehicles-update](#schemastarwarsfilm.film2vehicles-update)|true|Aspect for entities with canonical universal IDs|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Detailed descriptions

**body**: Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

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

<h3 id="changes-a-single-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes a single film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}') HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')`

<h3 id="deletes-a-single-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-a-single-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves draft administrative data of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="retrieves-draft-administrative-data-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|DraftUUID|
|$select|CreationDateTime|
|$select|CreatedByUser|
|$select|DraftIsCreatedByMe|
|$select|LastChangeDateTime|
|$select|LastChangedByUser|
|$select|InProcessByUser|
|$select|DraftIsProcessedByMe|

> Example responses

> 200 Response

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="retrieves-draft-administrative-data-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved draft administrative data|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Changes draft administrative data of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X PATCH /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
PATCH /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.patch '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

r = requests.patch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('PATCH','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("PATCH", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`PATCH /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

> Body parameter

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}
```

<h3 id="changes-draft-administrative-data-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[StarWarsFilm.DraftAdministrativeData-update](#schemastarwarsfilm.draftadministrativedata-update)|true|New property values|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="changes-draft-administrative-data-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Deletes draft administrative data of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X DELETE /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData \
  -H 'Accept: application/json'

```

```http
DELETE /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
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

result = RestClient.delete '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.delete('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', headers = headers)

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
    $response = $client->request('DELETE','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData");
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
    req, err := http.NewRequest("DELETE", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`DELETE /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/DraftAdministrativeData`

<h3 id="deletes-draft-administrative-data-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

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

<h3 id="deletes-draft-administrative-data-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|[No Content](https://tools.ietf.org/html/rfc7231#section-6.3.5)|Success|None|
|4XX|Unknown|Error|[error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves sibling entity of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/SiblingEntity`

<h3 id="retrieves-sibling-entity-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|film_ID|
|$select|vehicle_ID|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|film|
|$expand|vehicle|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-sibling-entity-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved sibling entity|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-sibling-entity-of-a-film2-vehicle.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film2Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftPrepare

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "SideEffectsQualifier": "string"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftPrepare`

> Body parameter

```json
{
  "SideEffectsQualifier": "string"
}
```

<h3 id="invokes-action-draftprepare-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» SideEffectsQualifier|body|string¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftprepare-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftprepare-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves film of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film`

<h3 id="retrieves-film-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|title|
|$select|episode_id|
|$select|opening_crawl|
|$select|director|
|$select|producer|
|$select|release_date|
|$select|IsActiveEntity|
|$select|HasActiveEntity|
|$select|HasDraftEntity|
|$expand|*|
|$expand|characters|
|$expand|planets|
|$expand|starships|
|$expand|vehicles|
|$expand|species|
|$expand|DraftAdministrativeData|
|$expand|SiblingEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-film-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved film|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-film-of-a-film2-vehicle.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Film*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftActivate

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
{
  method: 'POST',

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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.post('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate");
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
        "Accept": []string{"application/json"},
    }

    data := bytes.NewBuffer([]byte{jsonReq})
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftActivate`

<h3 id="invokes-action-draftactivate-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftactivate-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftactivate-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Invokes action draftEdit

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'

```

```http
POST /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit HTTP/1.1

Content-Type: application/json
Accept: application/json

```

```javascript
const inputBody = '{
  "PreserveChanges": true
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

result = RestClient.post '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit',
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

r = requests.post('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`POST /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/film/StarWarsFilm.draftEdit`

> Body parameter

```json
{
  "PreserveChanges": true
}
```

<h3 id="invokes-action-draftedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|
|body|body|object|false|Action parameters|
|» PreserveChanges|body|boolean¦null|false|none|

> Example responses

> 200 Response

```json
{}
```

<h3 id="invokes-action-draftedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Success|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="invokes-action-draftedit-responseschema">Response Schema</h3>

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves vehicle of a film2 vehicle.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Film2Vehicles(ID={ID},IsActiveEntity='{IsActiveEntity}')/vehicle`

<h3 id="retrieves-vehicle-of-a-film2-vehicle.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|
|IsActiveEntity|path|boolean|true|key: IsActiveEntity|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|vehicle_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-vehicle-of-a-film2-vehicle.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-vehicle-of-a-film2-vehicle.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-planet2people">Planet2People</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of planet2 people.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet2People \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet2People HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet2People',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet2People',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet2People', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet2People', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet2People");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet2People", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet2People`

<h3 id="retrieves-a-list-of-planet2-people.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|planet_ID|
|$orderby|planet_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$select|ID|
|$select|planet_ID|
|$select|people_ID|
|$expand|*|
|$expand|planet|
|$expand|people|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-planet2-people.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet2 people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-planet2-people.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Planet2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single planet2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet2People({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet2People({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet2People({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet2People({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet2People({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet2People({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet2People({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet2People({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet2People({ID})`

<h3 id="retrieves-a-single-planet2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|planet_ID|
|$select|people_ID|
|$expand|*|
|$expand|planet|
|$expand|people|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-planet2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet2 person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-planet2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves people of a planet2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet2People({ID})/people \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet2People({ID})/people HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet2People({ID})/people',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet2People({ID})/people',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet2People({ID})/people', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet2People({ID})/people', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet2People({ID})/people");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet2People({ID})/people", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet2People({ID})/people`

<h3 id="retrieves-people-of-a-planet2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-people-of-a-planet2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-people-of-a-planet2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves planet of a planet2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Planet2People({ID})/planet \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Planet2People({ID})/planet HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Planet2People({ID})/planet',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Planet2People({ID})/planet',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Planet2People({ID})/planet', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Planet2People({ID})/planet', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Planet2People({ID})/planet");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Planet2People({ID})/planet", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Planet2People({ID})/planet`

<h3 id="retrieves-planet-of-a-planet2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|diameter|
|$select|rotation_period|
|$select|orbital_period|
|$select|gravity|
|$select|population|
|$select|climate|
|$select|terrain|
|$select|surface_water|
|$expand|*|
|$expand|films|
|$expand|residents|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-planet-of-a-planet2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved planet|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-planet-of-a-planet2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Planet*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-species2people">Species2People</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of species2 people.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species2People \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species2People HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species2People',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species2People',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species2People', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species2People', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species2People");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species2People", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species2People`

<h3 id="retrieves-a-list-of-species2-people.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|species_ID|
|$orderby|species_ID desc|
|$orderby|people_ID|
|$orderby|people_ID desc|
|$select|ID|
|$select|species_ID|
|$select|people_ID|
|$expand|*|
|$expand|species|
|$expand|people|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-species2-people.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species2 people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-species2-people.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Species2People*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single species2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species2People({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species2People({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species2People({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species2People({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species2People({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species2People({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species2People({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species2People({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species2People({ID})`

<h3 id="retrieves-a-single-species2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|species_ID|
|$select|people_ID|
|$expand|*|
|$expand|species|
|$expand|people|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-species2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species2 person|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-species2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Species2People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves people of a species2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species2People({ID})/people \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species2People({ID})/people HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species2People({ID})/people',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species2People({ID})/people',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species2People({ID})/people', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species2People({ID})/people', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species2People({ID})/people");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species2People({ID})/people", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species2People({ID})/people`

<h3 id="retrieves-people-of-a-species2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-people-of-a-species2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved people|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-people-of-a-species2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves species of a species2 person.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Species2People({ID})/species \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Species2People({ID})/species HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Species2People({ID})/species',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Species2People({ID})/species',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Species2People({ID})/species', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Species2People({ID})/species', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Species2People({ID})/species");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Species2People({ID})/species", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Species2People({ID})/species`

<h3 id="retrieves-species-of-a-species2-person.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|classification|
|$select|designation|
|$select|average_height|
|$select|average_lifespan|
|$select|hair_colors|
|$select|skin_colors|
|$select|eye_colors|
|$select|homeworld_ID|
|$select|language|
|$expand|*|
|$expand|homeworld|
|$expand|people|
|$expand|films|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-species-of-a-species2-person.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved species|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-species-of-a-species2-person.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Species*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-starship2pilot">Starship2Pilot</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of starship2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship2Pilot \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship2Pilot HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship2Pilot',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship2Pilot',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship2Pilot', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship2Pilot', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship2Pilot");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship2Pilot", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship2Pilot`

<h3 id="retrieves-a-list-of-starship2-pilot.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|starship_ID|
|$orderby|starship_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|starship_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|starship|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-starship2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship2 pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-starship2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Starship2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single starship2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship2Pilot({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship2Pilot({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship2Pilot({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship2Pilot({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship2Pilot({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship2Pilot({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship2Pilot({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship2Pilot({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship2Pilot({ID})`

<h3 id="retrieves-a-single-starship2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|starship_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|starship|
|$expand|pilot|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-starship2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship2 pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-starship2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Starship2Pilot*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves pilot of a starship2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship2Pilot({ID})/pilot", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship2Pilot({ID})/pilot`

<h3 id="retrieves-pilot-of-a-starship2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-pilot-of-a-starship2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-pilot-of-a-starship2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves starship of a starship2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Starship2Pilot({ID})/starship", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Starship2Pilot({ID})/starship`

<h3 id="retrieves-starship-of-a-starship2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|starship_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|hyperdrive_rating|
|$select|MGLT|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-starship-of-a-starship2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved starship|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-starship-of-a-starship2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Starship*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-vehicle2pilot">Vehicle2Pilot</h1>

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

## Retrieves a list of vehicle2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicle2Pilot \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicle2Pilot HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicle2Pilot',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicle2Pilot',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicle2Pilot', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicle2Pilot', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicle2Pilot");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicle2Pilot", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicle2Pilot`

<h3 id="retrieves-a-list-of-vehicle2-pilot.-parameters">Parameters</h3>

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
|$orderby|ID|
|$orderby|ID desc|
|$orderby|vehicle_ID|
|$orderby|vehicle_ID desc|
|$orderby|pilot_ID|
|$orderby|pilot_ID desc|
|$select|ID|
|$select|vehicle_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|vehicle|
|$expand|pilot|

> Example responses

> 200 Response

```json
{
  "@count": 0,
  "value": [
    {}
  ]
}
```

<h3 id="retrieves-a-list-of-vehicle2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicle2 pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-list-of-vehicle2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*Collection of Vehicle2Pilot*

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
|» value|[object]|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves a single vehicle2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID}) \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID}) HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicle2Pilot({ID})`

<h3 id="retrieves-a-single-vehicle2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|vehicle_ID|
|$select|pilot_ID|
|$expand|*|
|$expand|vehicle|
|$expand|pilot|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-a-single-vehicle2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicle2 pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-a-single-vehicle2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Vehicle2Pilot*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves pilot of a vehicle2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/pilot", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicle2Pilot({ID})/pilot`

<h3 id="retrieves-pilot-of-a-vehicle2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|height|
|$select|mass|
|$select|hair_color|
|$select|skin_color|
|$select|eye_color|
|$select|birth_year|
|$select|gender|
|$select|scoundrel|
|$select|homeworld_ID|
|$expand|*|
|$expand|homeworld|
|$expand|films|
|$expand|species|
|$expand|vehicles|
|$expand|starships|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-pilot-of-a-vehicle2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved pilot|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-pilot-of-a-vehicle2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.People*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

## Retrieves vehicle of a vehicle2 pilot.

> Code samples

```shell
# You can also use wget
curl -X GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle \
  -H 'Accept: application/json'

```

```http
GET /odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle HTTP/1.1

Accept: application/json

```

```javascript

const headers = {
  'Accept':'application/json'
};

fetch('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle',
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

result = RestClient.get '/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle',
  params: {
  }, headers: headers

p JSON.parse(result)

```

```python
import requests
headers = {
  'Accept': 'application/json'
}

r = requests.get('/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle', headers = headers)

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
    $response = $client->request('GET','/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle");
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
    req, err := http.NewRequest("GET", "/odata/v4/StarWarsFilm/Vehicle2Pilot({ID})/vehicle", data)
    req.Header = headers

    client := &http.Client{}
    resp, err := client.Do(req)
    // ...
}

```

`GET /Vehicle2Pilot({ID})/vehicle`

<h3 id="retrieves-vehicle-of-a-vehicle2-pilot.-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|$select|query|array[string]|false|Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)|
|$expand|query|array[string]|false|The value of $expand query option is a comma-separated list of navigation property names, stream property names, or $value indicating the stream content of a media-entity. The corresponding related entities and stream values will be represented inline, see [Expand](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionexpand)|
|ID|path|string(uuid)|true|key: ID|

#### Enumerated Values

|Parameter|Value|
|---|---|
|$select|ID|
|$select|createdAt|
|$select|createdBy|
|$select|modifiedAt|
|$select|modifiedBy|
|$select|name|
|$select|model|
|$select|vehicle_class|
|$select|manufacturer|
|$select|cost_in_credits|
|$select|length|
|$select|crew|
|$select|passengers|
|$select|max_atmosphering_speed|
|$select|cargo_capacity|
|$select|consumables|
|$expand|*|
|$expand|films|
|$expand|pilots|

> Example responses

> 200 Response

```json
{}
```

<h3 id="retrieves-vehicle-of-a-vehicle2-pilot.-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Retrieved vehicle|Inline|
|4XX|Unknown|Error|[error](#schemaerror)|

<h3 id="retrieves-vehicle-of-a-vehicle2-pilot.-responseschema">Response Schema</h3>

Status Code **200**

*See StarWarsFilm.Vehicles*

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="-batch-requests">Batch Requests</h1>

## Sends a group of requests

> Code samples

```shell
# You can also use wget
curl -X POST /odata/v4/StarWarsFilm/$batch \
  -H 'Content-Type: multipart/mixed;boundary=request-separator' \
  -H 'Accept: multipart/mixed'

```

```http
POST /odata/v4/StarWarsFilm/$batch HTTP/1.1

Content-Type: multipart/mixed;boundary=request-separator
Accept: multipart/mixed

```

```javascript
const inputBody = 'string';
const headers = {
  'Content-Type':'multipart/mixed;boundary=request-separator',
  'Accept':'multipart/mixed'
};

fetch('/odata/v4/StarWarsFilm/$batch',
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

result = RestClient.post '/odata/v4/StarWarsFilm/$batch',
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

r = requests.post('/odata/v4/StarWarsFilm/$batch', headers = headers)

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
    $response = $client->request('POST','/odata/v4/StarWarsFilm/$batch', array(
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
URL obj = new URL("/odata/v4/StarWarsFilm/$batch");
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
    req, err := http.NewRequest("POST", "/odata/v4/StarWarsFilm/$batch", data)
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

<h2 id="tocS_StarWarsFilm.DraftAdministrativeData">StarWarsFilm.DraftAdministrativeData</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.draftadministrativedata"></a>
<a id="schema_StarWarsFilm.DraftAdministrativeData"></a>
<a id="tocSstarwarsfilm.draftadministrativedata"></a>
<a id="tocsstarwarsfilm.draftadministrativedata"></a>

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}

```

DraftAdministrativeData

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DraftUUID|string(uuid)|false|none|none|
|CreationDateTime|string(date-time)¦null|false|none|none|
|CreatedByUser|string¦null|false|none|none|
|DraftIsCreatedByMe|boolean¦null|false|none|none|
|LastChangeDateTime|string(date-time)¦null|false|none|none|
|LastChangedByUser|string¦null|false|none|none|
|InProcessByUser|string¦null|false|none|none|
|DraftIsProcessedByMe|boolean¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.DraftAdministrativeData-create">StarWarsFilm.DraftAdministrativeData-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.draftadministrativedata-create"></a>
<a id="schema_StarWarsFilm.DraftAdministrativeData-create"></a>
<a id="tocSstarwarsfilm.draftadministrativedata-create"></a>
<a id="tocsstarwarsfilm.draftadministrativedata-create"></a>

```json
{
  "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}

```

DraftAdministrativeData (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|DraftUUID|string(uuid)|true|none|none|
|CreationDateTime|string(date-time)¦null|false|none|none|
|CreatedByUser|string¦null|false|none|none|
|DraftIsCreatedByMe|boolean¦null|false|none|none|
|LastChangeDateTime|string(date-time)¦null|false|none|none|
|LastChangedByUser|string¦null|false|none|none|
|InProcessByUser|string¦null|false|none|none|
|DraftIsProcessedByMe|boolean¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.DraftAdministrativeData-update">StarWarsFilm.DraftAdministrativeData-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.draftadministrativedata-update"></a>
<a id="schema_StarWarsFilm.DraftAdministrativeData-update"></a>
<a id="tocSstarwarsfilm.draftadministrativedata-update"></a>
<a id="tocsstarwarsfilm.draftadministrativedata-update"></a>

```json
{
  "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
  "CreatedByUser": "string",
  "DraftIsCreatedByMe": true,
  "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
  "LastChangedByUser": "string",
  "InProcessByUser": "string",
  "DraftIsProcessedByMe": true
}

```

DraftAdministrativeData (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|CreationDateTime|string(date-time)¦null|false|none|none|
|CreatedByUser|string¦null|false|none|none|
|DraftIsCreatedByMe|boolean¦null|false|none|none|
|LastChangeDateTime|string(date-time)¦null|false|none|none|
|LastChangedByUser|string¦null|false|none|none|
|InProcessByUser|string¦null|false|none|none|
|DraftIsProcessedByMe|boolean¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film">StarWarsFilm.Film</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film"></a>
<a id="schema_StarWarsFilm.Film"></a>
<a id="tocSstarwarsfilm.film"></a>
<a id="tocsstarwarsfilm.film"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {}
  ],
  "characters@count": 0,
  "planets": [
    {}
  ],
  "planets@count": 0,
  "starships": [
    {}
  ],
  "starships@count": 0,
  "vehicles": [
    {}
  ],
  "vehicles@count": 0,
  "species": [
    {}
  ],
  "species@count": 0,
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

All Films in the Star Wars Skywalker Saga

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|title|string¦null|false|none|none|
|episode_id|integer(int32)¦null|false|none|none|
|opening_crawl|string¦null|false|none|none|
|director|string¦null|false|none|none|
|producer|string¦null|false|none|none|
|release_date|string(date)¦null|false|none|none|
|characters|[object]|false|none|none|
|characters@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|planets|[object]|false|none|none|
|planets@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|starships|[object]|false|none|none|
|starships@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|vehicles|[object]|false|none|none|
|vehicles@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|species|[object]|false|none|none|
|species@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film|

<h2 id="tocS_StarWarsFilm.Film-create">StarWarsFilm.Film-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film-create"></a>
<a id="schema_StarWarsFilm.Film-create"></a>
<a id="tocSstarwarsfilm.film-create"></a>
<a id="tocsstarwarsfilm.film-create"></a>

```json
{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

All Films in the Star Wars Skywalker Saga (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string¦null|false|none|none|
|episode_id|integer(int32)¦null|false|none|none|
|opening_crawl|string¦null|false|none|none|
|director|string¦null|false|none|none|
|producer|string¦null|false|none|none|
|release_date|string(date)¦null|false|none|none|
|characters|[[StarWarsFilm.Film2People-create](#schemastarwarsfilm.film2people-create)]|false|none|none|
|planets|[[StarWarsFilm.Film2Planets-create](#schemastarwarsfilm.film2planets-create)]|false|none|none|
|starships|[[StarWarsFilm.Film2Starships-create](#schemastarwarsfilm.film2starships-create)]|false|none|none|
|vehicles|[[StarWarsFilm.Film2Vehicles-create](#schemastarwarsfilm.film2vehicles-create)]|false|none|none|
|species|[[StarWarsFilm.Film2Species-create](#schemastarwarsfilm.film2species-create)]|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film-update">StarWarsFilm.Film-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film-update"></a>
<a id="schema_StarWarsFilm.Film-update"></a>
<a id="tocSstarwarsfilm.film-update"></a>
<a id="tocsstarwarsfilm.film-update"></a>

```json
{
  "title": "string",
  "episode_id": 0,
  "opening_crawl": "string",
  "director": "string",
  "producer": "string",
  "release_date": "2017-04-13",
  "characters": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "planets": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "starships": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "vehicles": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "species": [
    {
      "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
      "IsActiveEntity": true,
      "HasActiveEntity": false,
      "HasDraftEntity": false,
      "DraftAdministrativeData": {
        "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
        "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
        "CreatedByUser": "string",
        "DraftIsCreatedByMe": true,
        "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
        "LastChangedByUser": "string",
        "InProcessByUser": "string",
        "DraftIsProcessedByMe": true
      }
    }
  ],
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

All Films in the Star Wars Skywalker Saga (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string¦null|false|none|none|
|episode_id|integer(int32)¦null|false|none|none|
|opening_crawl|string¦null|false|none|none|
|director|string¦null|false|none|none|
|producer|string¦null|false|none|none|
|release_date|string(date)¦null|false|none|none|
|characters|[[StarWarsFilm.Film2People-create](#schemastarwarsfilm.film2people-create)]|false|none|none|
|planets|[[StarWarsFilm.Film2Planets-create](#schemastarwarsfilm.film2planets-create)]|false|none|none|
|starships|[[StarWarsFilm.Film2Starships-create](#schemastarwarsfilm.film2starships-create)]|false|none|none|
|vehicles|[[StarWarsFilm.Film2Vehicles-create](#schemastarwarsfilm.film2vehicles-create)]|false|none|none|
|species|[[StarWarsFilm.Film2Species-create](#schemastarwarsfilm.film2species-create)]|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2People">StarWarsFilm.Film2People</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2people"></a>
<a id="schema_StarWarsFilm.Film2People"></a>
<a id="tocSstarwarsfilm.film2people"></a>
<a id="tocsstarwarsfilm.film2people"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "film": {},
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people": {},
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|film|object¦null|false|none|See StarWarsFilm.Film|
|film_ID|string(uuid)¦null|false|none|none|
|people|object¦null|false|none|See StarWarsFilm.People|
|people_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film2People|

<h2 id="tocS_StarWarsFilm.Film2People-create">StarWarsFilm.Film2People-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2people-create"></a>
<a id="schema_StarWarsFilm.Film2People-create"></a>
<a id="tocSstarwarsfilm.film2people-create"></a>
<a id="tocsstarwarsfilm.film2people-create"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|people_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2People-update">StarWarsFilm.Film2People-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2people-update"></a>
<a id="schema_StarWarsFilm.Film2People-update"></a>
<a id="tocSstarwarsfilm.film2people-update"></a>
<a id="tocsstarwarsfilm.film2people-update"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|people_ID|string(uuid)¦null|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Planets">StarWarsFilm.Film2Planets</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2planets"></a>
<a id="schema_StarWarsFilm.Film2Planets"></a>
<a id="tocSstarwarsfilm.film2planets"></a>
<a id="tocsstarwarsfilm.film2planets"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "film": {},
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet": {},
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|film|object¦null|false|none|See StarWarsFilm.Film|
|film_ID|string(uuid)¦null|false|none|none|
|planet|object¦null|false|none|See StarWarsFilm.Planet|
|planet_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film2Planets|

<h2 id="tocS_StarWarsFilm.Film2Planets-create">StarWarsFilm.Film2Planets-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2planets-create"></a>
<a id="schema_StarWarsFilm.Film2Planets-create"></a>
<a id="tocSstarwarsfilm.film2planets-create"></a>
<a id="tocsstarwarsfilm.film2planets-create"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|planet_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Planets-update">StarWarsFilm.Film2Planets-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2planets-update"></a>
<a id="schema_StarWarsFilm.Film2Planets-update"></a>
<a id="tocSstarwarsfilm.film2planets-update"></a>
<a id="tocsstarwarsfilm.film2planets-update"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|planet_ID|string(uuid)¦null|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Species">StarWarsFilm.Film2Species</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2species"></a>
<a id="schema_StarWarsFilm.Film2Species"></a>
<a id="tocSstarwarsfilm.film2species"></a>
<a id="tocsstarwarsfilm.film2species"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "film": {},
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie": {},
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|film|object¦null|false|none|See StarWarsFilm.Film|
|film_ID|string(uuid)¦null|false|none|none|
|specie|object¦null|false|none|See StarWarsFilm.Species|
|specie_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film2Species|

<h2 id="tocS_StarWarsFilm.Film2Species-create">StarWarsFilm.Film2Species-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2species-create"></a>
<a id="schema_StarWarsFilm.Film2Species-create"></a>
<a id="tocSstarwarsfilm.film2species-create"></a>
<a id="tocsstarwarsfilm.film2species-create"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|specie_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Species-update">StarWarsFilm.Film2Species-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2species-update"></a>
<a id="schema_StarWarsFilm.Film2Species-update"></a>
<a id="tocSstarwarsfilm.film2species-update"></a>
<a id="tocsstarwarsfilm.film2species-update"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "specie_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|specie_ID|string(uuid)¦null|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Starships">StarWarsFilm.Film2Starships</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2starships"></a>
<a id="schema_StarWarsFilm.Film2Starships"></a>
<a id="tocSstarwarsfilm.film2starships"></a>
<a id="tocsstarwarsfilm.film2starships"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "film": {},
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship": {},
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|film|object¦null|false|none|See StarWarsFilm.Film|
|film_ID|string(uuid)¦null|false|none|none|
|starship|object¦null|false|none|See StarWarsFilm.Starship|
|starship_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film2Starships|

<h2 id="tocS_StarWarsFilm.Film2Starships-create">StarWarsFilm.Film2Starships-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2starships-create"></a>
<a id="schema_StarWarsFilm.Film2Starships-create"></a>
<a id="tocSstarwarsfilm.film2starships-create"></a>
<a id="tocsstarwarsfilm.film2starships-create"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|starship_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Starships-update">StarWarsFilm.Film2Starships-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2starships-update"></a>
<a id="schema_StarWarsFilm.Film2Starships-update"></a>
<a id="tocSstarwarsfilm.film2starships-update"></a>
<a id="tocsstarwarsfilm.film2starships-update"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|starship_ID|string(uuid)¦null|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Vehicles">StarWarsFilm.Film2Vehicles</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2vehicles"></a>
<a id="schema_StarWarsFilm.Film2Vehicles"></a>
<a id="tocSstarwarsfilm.film2vehicles"></a>
<a id="tocsstarwarsfilm.film2vehicles"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "film": {},
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle": {},
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  },
  "SiblingEntity": {}
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|film|object¦null|false|none|See StarWarsFilm.Film|
|film_ID|string(uuid)¦null|false|none|none|
|vehicle|object¦null|false|none|See StarWarsFilm.Vehicles|
|vehicle_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData](#schemastarwarsfilm.draftadministrativedata)¦null|false|none|none|
|SiblingEntity|object¦null|false|none|See StarWarsFilm.Film2Vehicles|

<h2 id="tocS_StarWarsFilm.Film2Vehicles-create">StarWarsFilm.Film2Vehicles-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2vehicles-create"></a>
<a id="schema_StarWarsFilm.Film2Vehicles-create"></a>
<a id="tocSstarwarsfilm.film2vehicles-create"></a>
<a id="tocsstarwarsfilm.film2vehicles-create"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "IsActiveEntity": true,
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|vehicle_ID|string(uuid)¦null|false|none|none|
|IsActiveEntity|boolean|true|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Film2Vehicles-update">StarWarsFilm.Film2Vehicles-update</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.film2vehicles-update"></a>
<a id="schema_StarWarsFilm.Film2Vehicles-update"></a>
<a id="tocSstarwarsfilm.film2vehicles-update"></a>
<a id="tocsstarwarsfilm.film2vehicles-update"></a>

```json
{
  "film_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "HasActiveEntity": false,
  "HasDraftEntity": false,
  "DraftAdministrativeData": {
    "DraftUUID": "01234567-89ab-cdef-0123-456789abcdef",
    "CreationDateTime": "2017-04-13T15:51:04.0000000Z",
    "CreatedByUser": "string",
    "DraftIsCreatedByMe": true,
    "LastChangeDateTime": "2017-04-13T15:51:04.0000000Z",
    "LastChangedByUser": "string",
    "InProcessByUser": "string",
    "DraftIsProcessedByMe": true
  }
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for update)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|film_ID|string(uuid)¦null|false|none|none|
|vehicle_ID|string(uuid)¦null|false|none|none|
|HasActiveEntity|boolean|false|none|none|
|HasDraftEntity|boolean|false|none|none|
|DraftAdministrativeData|[StarWarsFilm.DraftAdministrativeData-create](#schemastarwarsfilm.draftadministrativedata-create)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.FilmEpisodeDesc">StarWarsFilm.FilmEpisodeDesc</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.filmepisodedesc"></a>
<a id="schema_StarWarsFilm.FilmEpisodeDesc"></a>
<a id="tocSstarwarsfilm.filmepisodedesc"></a>
<a id="tocsstarwarsfilm.filmepisodedesc"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "episode_id": 0,
  "title": "string",
  "episodeIDDesc": "string"
}

```

All Films in the Star Wars Skywalker Saga

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|episode_id|integer(int32)¦null|false|none|none|
|title|string¦null|false|none|none|
|episodeIDDesc|string¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.People">StarWarsFilm.People</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.people"></a>
<a id="schema_StarWarsFilm.People"></a>
<a id="tocSstarwarsfilm.people"></a>
<a id="tocsstarwarsfilm.people"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "name": "string",
  "height": "Test",
  "mass": "string",
  "hair_color": "string",
  "skin_color": "string",
  "eye_color": "string",
  "birth_year": "string",
  "gender": "string",
  "scoundrel": false,
  "homeworld": {},
  "homeworld_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "films": [
    {}
  ],
  "films@count": 0,
  "species": [
    {}
  ],
  "species@count": 0,
  "vehicles": [
    {}
  ],
  "vehicles@count": 0,
  "starships": [
    {}
  ],
  "starships@count": 0
}

```

All People and Aliens in Star Wars

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|name|string¦null|false|none|none|
|height|string¦null|false|none|none|
|mass|string¦null|false|none|none|
|hair_color|string¦null|false|none|none|
|skin_color|string¦null|false|none|none|
|eye_color|string¦null|false|none|none|
|birth_year|string¦null|false|none|none|
|gender|string¦null|false|none|none|
|scoundrel|boolean¦null|false|none|none|
|homeworld|object¦null|false|none|See StarWarsFilm.Planet|
|homeworld_ID|string(uuid)¦null|false|none|none|
|films|[object]|false|none|none|
|films@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|species|[object]|false|none|none|
|species@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|vehicles|[object]|false|none|none|
|vehicles@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|starships|[object]|false|none|none|
|starships@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_StarWarsFilm.Planet">StarWarsFilm.Planet</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.planet"></a>
<a id="schema_StarWarsFilm.Planet"></a>
<a id="tocSstarwarsfilm.planet"></a>
<a id="tocsstarwarsfilm.planet"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "name": "string",
  "diameter": "string",
  "rotation_period": "string",
  "orbital_period": "string",
  "gravity": "string",
  "population": "string",
  "climate": "string",
  "terrain": "string",
  "surface_water": "string",
  "films": [
    {}
  ],
  "films@count": 0,
  "residents": [
    {}
  ],
  "residents@count": 0
}

```

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|name|string¦null|false|none|none|
|diameter|string¦null|false|none|none|
|rotation_period|string¦null|false|none|none|
|orbital_period|string¦null|false|none|none|
|gravity|string¦null|false|none|none|
|population|string¦null|false|none|none|
|climate|string¦null|false|none|none|
|terrain|string¦null|false|none|none|
|surface_water|string¦null|false|none|none|
|films|[object]|false|none|none|
|films@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|residents|[object]|false|none|none|
|residents@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_StarWarsFilm.Planet2People">StarWarsFilm.Planet2People</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.planet2people"></a>
<a id="schema_StarWarsFilm.Planet2People"></a>
<a id="tocSstarwarsfilm.planet2people"></a>
<a id="tocsstarwarsfilm.planet2people"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "planet": {},
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people": {},
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|planet|object¦null|false|none|See StarWarsFilm.Planet|
|planet_ID|string(uuid)¦null|false|none|none|
|people|object¦null|false|none|See StarWarsFilm.People|
|people_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Planet2People-create">StarWarsFilm.Planet2People-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.planet2people-create"></a>
<a id="schema_StarWarsFilm.Planet2People-create"></a>
<a id="tocSstarwarsfilm.planet2people-create"></a>
<a id="tocsstarwarsfilm.planet2people-create"></a>

```json
{
  "planet_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|planet_ID|string(uuid)¦null|false|none|none|
|people_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Species">StarWarsFilm.Species</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.species"></a>
<a id="schema_StarWarsFilm.Species"></a>
<a id="tocSstarwarsfilm.species"></a>
<a id="tocsstarwarsfilm.species"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "name": "string",
  "classification": "string",
  "designation": "string",
  "average_height": "string",
  "average_lifespan": "string",
  "hair_colors": "string",
  "skin_colors": "string",
  "eye_colors": "string",
  "homeworld": {},
  "homeworld_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "language": "string",
  "people": [
    {}
  ],
  "people@count": 0,
  "films": [
    {}
  ],
  "films@count": 0
}

```

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|name|string¦null|false|none|none|
|classification|string¦null|false|none|none|
|designation|string¦null|false|none|none|
|average_height|string¦null|false|none|none|
|average_lifespan|string¦null|false|none|none|
|hair_colors|string¦null|false|none|none|
|skin_colors|string¦null|false|none|none|
|eye_colors|string¦null|false|none|none|
|homeworld|object¦null|false|none|See StarWarsFilm.Planet|
|homeworld_ID|string(uuid)¦null|false|none|none|
|language|string¦null|false|none|none|
|people|[object]|false|none|none|
|people@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|films|[object]|false|none|none|
|films@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_StarWarsFilm.Species2People">StarWarsFilm.Species2People</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.species2people"></a>
<a id="schema_StarWarsFilm.Species2People"></a>
<a id="tocSstarwarsfilm.species2people"></a>
<a id="tocsstarwarsfilm.species2people"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "species": {},
  "species_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people": {},
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|species|object¦null|false|none|See StarWarsFilm.Species|
|species_ID|string(uuid)¦null|false|none|none|
|people|object¦null|false|none|See StarWarsFilm.People|
|people_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Species2People-create">StarWarsFilm.Species2People-create</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.species2people-create"></a>
<a id="schema_StarWarsFilm.Species2People-create"></a>
<a id="tocSstarwarsfilm.species2people-create"></a>
<a id="tocsstarwarsfilm.species2people-create"></a>

```json
{
  "species_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "people_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid (for create)

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|species_ID|string(uuid)¦null|false|none|none|
|people_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Starship">StarWarsFilm.Starship</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.starship"></a>
<a id="schema_StarWarsFilm.Starship"></a>
<a id="tocSstarwarsfilm.starship"></a>
<a id="tocsstarwarsfilm.starship"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "name": "string",
  "model": "string",
  "starship_class": "string",
  "manufacturer": "string",
  "cost_in_credits": "string",
  "length": "string",
  "crew": "string",
  "passengers": "string",
  "max_atmosphering_speed": "string",
  "hyperdrive_rating": "string",
  "MGLT": "string",
  "cargo_capacity": "string",
  "consumables": "string",
  "films": [
    {}
  ],
  "films@count": 0,
  "pilots": [
    {}
  ],
  "pilots@count": 0
}

```

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|name|string¦null|false|none|none|
|model|string¦null|false|none|none|
|starship_class|string¦null|false|none|none|
|manufacturer|string¦null|false|none|none|
|cost_in_credits|string¦null|false|none|none|
|length|string¦null|false|none|none|
|crew|string¦null|false|none|none|
|passengers|string¦null|false|none|none|
|max_atmosphering_speed|string¦null|false|none|none|
|hyperdrive_rating|string¦null|false|none|none|
|MGLT|string¦null|false|none|none|
|cargo_capacity|string¦null|false|none|none|
|consumables|string¦null|false|none|none|
|films|[object]|false|none|none|
|films@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|pilots|[object]|false|none|none|
|pilots@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_StarWarsFilm.Starship2Pilot">StarWarsFilm.Starship2Pilot</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.starship2pilot"></a>
<a id="schema_StarWarsFilm.Starship2Pilot"></a>
<a id="tocSstarwarsfilm.starship2pilot"></a>
<a id="tocsstarwarsfilm.starship2pilot"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "starship": {},
  "starship_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "pilot": {},
  "pilot_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|starship|object¦null|false|none|See StarWarsFilm.Starship|
|starship_ID|string(uuid)¦null|false|none|none|
|pilot|object¦null|false|none|See StarWarsFilm.People|
|pilot_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Vehicle2Pilot">StarWarsFilm.Vehicle2Pilot</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.vehicle2pilot"></a>
<a id="schema_StarWarsFilm.Vehicle2Pilot"></a>
<a id="tocSstarwarsfilm.vehicle2pilot"></a>
<a id="tocsstarwarsfilm.vehicle2pilot"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "vehicle": {},
  "vehicle_ID": "01234567-89ab-cdef-0123-456789abcdef",
  "pilot": {},
  "pilot_ID": "01234567-89ab-cdef-0123-456789abcdef"
}

```

Aspect for entities with canonical universal IDs

See https://cap.cloud.sap/docs/cds/common#aspect-cuid

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|vehicle|object¦null|false|none|See StarWarsFilm.Vehicles|
|vehicle_ID|string(uuid)¦null|false|none|none|
|pilot|object¦null|false|none|See StarWarsFilm.People|
|pilot_ID|string(uuid)¦null|false|none|none|

<h2 id="tocS_StarWarsFilm.Vehicles">StarWarsFilm.Vehicles</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.vehicles"></a>
<a id="schema_StarWarsFilm.Vehicles"></a>
<a id="tocSstarwarsfilm.vehicles"></a>
<a id="tocsstarwarsfilm.vehicles"></a>

```json
{
  "ID": "01234567-89ab-cdef-0123-456789abcdef",
  "createdAt": "2017-04-13T15:51:04.0000000Z",
  "createdBy": "string",
  "modifiedAt": "2017-04-13T15:51:04.0000000Z",
  "modifiedBy": "string",
  "name": "string",
  "model": "string",
  "vehicle_class": "string",
  "manufacturer": "string",
  "cost_in_credits": "string",
  "length": "string",
  "crew": "string",
  "passengers": "string",
  "max_atmosphering_speed": "string",
  "cargo_capacity": "string",
  "consumables": "string",
  "films": [
    {}
  ],
  "films@count": 0,
  "pilots": [
    {}
  ],
  "pilots@count": 0
}

```

Aspect to capture changes by user and name

See https://cap.cloud.sap/docs/cds/common#aspect-managed

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|ID|string(uuid)|false|none|none|
|createdAt|string(date-time)¦null|false|none|none|
|createdBy|string¦null|false|none|none|
|modifiedAt|string(date-time)¦null|false|none|none|
|modifiedBy|string¦null|false|none|none|
|name|string¦null|false|none|none|
|model|string¦null|false|none|none|
|vehicle_class|string¦null|false|none|none|
|manufacturer|string¦null|false|none|none|
|cost_in_credits|string¦null|false|none|none|
|length|string¦null|false|none|none|
|crew|string¦null|false|none|none|
|passengers|string¦null|false|none|none|
|max_atmosphering_speed|string¦null|false|none|none|
|cargo_capacity|string¦null|false|none|none|
|consumables|string¦null|false|none|none|
|films|[object]|false|none|none|
|films@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|
|pilots|[object]|false|none|none|
|pilots@count|[count](#schemacount)|false|none|The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.|

<h2 id="tocS_StarWarsFilm.directors">StarWarsFilm.directors</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.directors"></a>
<a id="schema_StarWarsFilm.directors"></a>
<a id="tocSstarwarsfilm.directors"></a>
<a id="tocsstarwarsfilm.directors"></a>

```json
{
  "director": "string"
}

```

All Films in the Star Wars Skywalker Saga

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|director|string|false|none|none|

<h2 id="tocS_StarWarsFilm.producers">StarWarsFilm.producers</h2>
<!-- backwards compatibility -->
<a id="schemastarwarsfilm.producers"></a>
<a id="schema_StarWarsFilm.producers"></a>
<a id="tocSstarwarsfilm.producers"></a>
<a id="tocsstarwarsfilm.producers"></a>

```json
{
  "producer": "string"
}

```

All Films in the Star Wars Skywalker Saga

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|producer|string|false|none|none|

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

