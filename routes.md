# Star Wars API

## Routes Documentation

All successful requests return a *200 OK* response. Non successful requests are non 200 OK and return
an **Error** object(described below in the *Object Definitions* section).

### Get Movies

This endpoint retrieves the list of all Star Wars Movies

Method | URL
------ | ---
GET | api/swapi/v1/movies

#### Request Parameter
ParamType| Name | Type | description
-------- | ---- | ---- |  -----------
Query | page | int | Page Number

#### Response Object
Name | Type | description
---- | ---- |  -----------
movies | array | List object containing **Movie** objects
next | int(nullable) | Next page number
previous | int(nullable) | Previous Page Number

### Get Characters

This endpoint retrieves the list of all Star Wars Movies Characters

Method | URL
------ | ---
GET | api/swapi/v1/characters

#### Request Parameter
ParamType| Name | Type | description
-------- | ---- | ---- |  -----------
Query | page | int | Page Number
Query | sort | string | Accepts one of name, gender or height as a sort filter
Query | order | string | Accepts ASC or DSC as order for sort. Ascending or Descending respectively. Defaults to ASC
Query | filter | string | Accepts male, female or unknown to filter by gender

#### Response Object
Name | Type | description
---- | ---- |  -----------
characters | array | List object containing **Character** objects
next | int(nullable) | Next page number
previous | int(nullable) | Previous Page Number
count | int| Count of Characters that pass filter for current Page set
total_height | Height | Total height of all characters that pass filter for current Page set as a **Height** object

### Get Comments

This endpoint retrieves the list of all Comments

Method | URL
------ | ---
GET | api/swapi/v1/comments

#### Request Parameter
ParamType| Name | Type | description
-------- | ---- | ---- |  -----------
Query | page | int | Page Number
Query | limit | int | maximum number of comments to retrieve

#### Response Object
Name | Type | description
---- | ---- |  -----------
comments | array | List object containing **Comment** objects
next | int(nullable) | Next page number
previous | int(nullable) | Previous Page Number

## Object Definitions

### Movie

Name | Type | description 
---- | ---- | -----------
id | integer | The id of this film
title | string | The title of this film
release_date | string | The ISO 8601 date format of film release at original creator country
opening_crawl | string | The opening paragraphs at the beginning of this film
comment_count | int | The number of comments for this film


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
id | string | The id of this comment
date | string | The ISO 8601 date format of the comment post date 
content | string | The contents of this comment
ip_address | string | The IP Address of the poster

### Height
Name | Type | description
---- | ---- | -----------
height_cm | int | Height in cm
date | string | The ISO 8601 date format of the comment post date 
content | string | The contents of this comment
ip_address | string | The IP Address of the poster


#### Error
Name | Type | description
---- | ---- | -----------
code | string | Short code for the error
message | string | Error description



