using { StarWarsFilm } from './film-service';
using { StarWarsPeople } from './people-service';
using { StarWarsPlanet } from './planet-service';
using { StarWarsSpecies } from './species-service';
using { StarWarsStarship } from './starship-service';
using { StarWarsVehicle } from './vehicle-service';

annotate StarWarsFilm with @(requires: 'any');
annotate StarWarsPeople with @(requires: 'any');
annotate StarWarsPlanet with @(requires: 'any');
annotate StarWarsSpecies with @(requires: 'any');
annotate StarWarsStarship with @(requires: 'any');
annotate StarWarsVehicle with @(requires: 'any');
