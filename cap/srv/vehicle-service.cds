using {star.wars as StarWars} from '../db/schema';

service StarWarsVehicle @(path : '/StarWarsVehicle') {
    @odata.draft.enabled : true
    entity Vehicles      as projection on StarWars.Vehicles;

    @readonly : true
    entity Film          as projection on StarWars.Film;

    @readonly : true
    entity People        as projection on StarWars.People

    @readonly : true
    entity Planet        as projection on StarWars.Planet

    entity Film2Vehicles as projection on StarWars.Film2Vehicles {
        * , vehicle : redirected to Vehicles
    }


    entity Vehicle2Pilot as projection on StarWars.Vehicle2Pilot {
        * , pilot : redirected to People, vehicle : redirected to Vehicles
    }

    @readonly : true
    entity vModels       as projection on StarWars.vModels;

    @readonly : true
    entity vClass        as projection on StarWars.vClass;

    @readonly : true
    entity vManufacturer as projection on StarWars.vManufacturer;
}
