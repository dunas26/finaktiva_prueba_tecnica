# Intructions

## Summary

Develop an application that allows to manage events called "Logs".

## Requirements

- Register an event to the database through an API Gateway or an Endpoint
- A form to register an event manually. These events will be stored in the database and the same event table
- Check the information about all the registered events in the database
- The query form must have filters
  - Type of event - API or Manual Event Form
  - Date range

## Details

A collection or table called "EventLogs" needs to be created in a database called "Registration".
The following must be identifiable
- Date of an event
- Description of the event
- Type of event

## Must have's

- Good transaction rates - 100 TPS, decoupled database management
- NO ORMs allowed.
- Registry of exceptions within the application that allow to identify what happened in case of exception

## Bonuses
- NodeJS
- C#
- Angular
- MySQL
- MongoDB
- AWS

## Gradings

- Code design: Code structure, modularity, legibility and good coding practices
- Functionality: All the actions described could be done correctly using the application
- Code quality: Error management and exception handling, code efficiency
- UI Design: Usability and Accesibility of the User Interface

## Deliverables

- Clone the test repo in your GitHub account
- Publish the functionality on a cloud hosted service AWS, GCP, Azure
- Create a README file that explains how to deploy your application and anything that is important regarding design and implementation.




