# Star Wars API

## Routes Documentation

All successful requests return a *200 OK* response. Non successful requests are non 200 OK and return
an **Error** object(described below in the *Object Definitions* section).

### Get Movies

This endpoint retrieves the list of all Star Wars Movies

Method | URL
------ | ---
GET | api/swapi/v1/movies

#### Response Object

Name | Type | description
---- | ---- |  -----------
movies | array | List object containing **Movie** objects

### Get Characters For Movie

This endpoint retrieves the list of Star Wars Movies Characters for a particular movie

Method | URL
------ | ---
GET | api/swapi/v1/movie/:id/characters

#### Request Parameter

ParamType| Name | Type | description
-------- | ---- | ---- |  -----------
URL Parameter | id | int | Movie ID
Query | sort | string | Accepts one of name, gender or height as a sort filter
Query | order | string | Accepts *asc* or *desc* as order for sort. Ascending or Descending respectively. Defaults to *asc*
Query | filter | string | Accepts male, female, hermaphrodite, n/a or none to filter by gender

#### Response Object

Name | Type | description
---- | ---- |  -----------
characters | array | List object containing **Character** objects
count | int| Count of Characters that pass filter for current Page set
heights | Height | Total height of all characters that pass filter for current Page set as a **Height** object

### Get Comments For Movie

This endpoint retrieves the list of all Comments for a particular movie

Method | URL
------ | ---
GET | api/swapi/v1/movie/:id/comments

#### Request Parameter

ParamType| Name | Type | description
-------- | ---- | ---- |  -----------
URL Parameter | id | int | Movie ID
Query | offset | int | Number of comments to skip while fetching
Query | limit | int | maximum number of comments to retrieve

#### Response Object

Name | Type | description
---- | ---- |  -----------
comments | array | List object containing **Comment** objects
total_count | int | Total count of comments

## Object Definitions

### Movie

Name | Type | description 
---- | ---- | -----------
id | integer | The id of this film
title | string | The title of this film
release_date | string | The ISO 8601 date format of film release at original creator country
opening_crawl | string | The opening paragraphs at the beginning of this film
comments | int | The number of comments for this film

### Character

Name | Type | description
---- | ---- |  -----------
id | int | The id of this person
name | string | The name of this person
height | int(nullable) | The height of the person in centimeters. Null if this value is unknown.
mass | double(nullable) | The mass of the person in kilograms. Null if this value is unknown.
gender | string(nullable) | The gender of this person. Either "Male", "Female" or null if the person does not have a gender

### Comment

Name | Type | description
---- | ---- | -----------
id | int | The id of this comment
movie_id | int | The id of the movie the comment belongs to
created_at | string | The ISO 8601 date format of the comment post date
content | string | The contents of this comment
ip_address | string | The IP Address of the poster

### Height

Name | Type | description
---- | ---- | -----------
type | string | Unit Length Type
value | double | Height Value
text_value | string | Human understandable height value

#### Error

Name | Type | description
---- | ---- | -----------
message | string | Error description
