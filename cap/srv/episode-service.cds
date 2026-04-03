using {star.wars as StarWars} from '../db/schema';

@title : 'Star Wars Episode Information'
@protocol: ['odata-v4', 'graphql', 'rest']
service StarWarsEpisode @(path : 'StarWarsEpisode') {

    @readonly : true
    entity Episodes          as projection on StarWars.Episode;

    @readonly : true
    entity Episode2People    as projection on StarWars.Episode2People;

    @readonly : true
    entity Episode2Planets   as projection on StarWars.Episode2Planets;

    @readonly : true
    entity Episode2Starships as projection on StarWars.Episode2Starships;

    @readonly : true
    entity Episode2Vehicles  as projection on StarWars.Episode2Vehicles;

    @readonly : true
    entity Episode2Species              as projection on StarWars.Episode2Species;

    @readonly : true
    @cds.redirection.target: false
    entity CloneWarsChronologicalOrder  as projection on StarWars.CloneWarsChronologicalOrder;
}
