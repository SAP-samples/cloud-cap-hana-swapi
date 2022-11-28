export enum FilmEpisode_id {
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6,
    VII = 7,
    VIII = 8,
    IX = 9,
    X = 10,
    OTHER
}

export interface IFilm {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    title: string;
    episode_id: FilmEpisode_id;
    opening_crawl: string;
    director: string;
    producer: string;
    release_date: Date;
    characters: IFilm2People[];
    planets: IFilm2Planets[];
    starships: IFilm2Starships[];
    vehicles: IFilm2Vehicles[];
    species: IFilm2Species[];
}

export interface IPeople {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
    homeworld?: IPlanet;
    homeworld_ID?: string;
    films: IFilm2People[];
    species: ISpecies2People[];
    vehicles: IVehicle2Pilot[];
    starships: IStarship2Pilot[];
}

export interface IPlanet {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    name: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    films: IFilm2Planets[];
    residents: IPlanet2People[];
}

export interface ISpecies {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    average_lifespan: string;
    hair_colors: string;
    skin_colors: string;
    eye_colors: string;
    homeworld?: IPlanet;
    homeworld_ID?: string;
    language: string;
    people: ISpecies2People[];
    films: IFilm2Species[];
}

export interface IStarship {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    name: string;
    model: string;
    starship_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    cargo_capacity: string;
    consumables: string;
    films: IFilm2Starships[];
    pilots: IStarship2Pilot[];
}

export interface IVehicles {
    ID?: string;
    createdAt?: Date;
    createdBy?: string;
    modifiedAt?: Date;
    modifiedBy?: string;
    name: string;
    model: string;
    vehicle_class: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    crew: string;
    passengers: string;
    max_atmosphering_speed: string;
    cargo_capacity: string;
    consumables: string;
    films: IFilm2Vehicles[];
    pilots: IVehicle2Pilot[];
}

export interface IFilm2People {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    people?: IPeople;
    people_ID?: string;
}

export interface IFilm2Planets {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    planet?: IPlanet;
    planet_ID?: string;
}

export interface IFilm2Starships {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    starship?: IStarship;
    starship_ID?: string;
}

export interface IFilm2Species {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    specie?: ISpecies;
    specie_ID?: string;
}

export interface IFilm2Vehicles {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    vehicle?: IVehicles;
    vehicle_ID?: string;
}

export interface IDirectors {
    director: string;
}

export interface IProducers {
    producer: string;
}

export enum FilmEpisodeDescEpisode_id {
    I = 1,
    II = 2,
    III = 3,
    IV = 4,
    V = 5,
    VI = 6,
    VII = 7,
    VIII = 8,
    IX = 9,
    X = 10,
    OTHER
}

export interface IFilmEpisodeDesc {
    ID?: string;
    episode_id: FilmEpisodeDescEpisode_id;
    title: string;
    episodeIDDesc?: string;
}

export interface ISpecies2People {
    ID?: string;
    species?: ISpecies;
    species_ID?: string;
    people?: IPeople;
    people_ID?: string;
}

export interface IVehicle2Pilot {
    ID?: string;
    vehicle?: IVehicles;
    vehicle_ID?: string;
    pilot?: IPeople;
    pilot_ID?: string;
}

export interface IStarship2Pilot {
    ID?: string;
    starship?: IStarship;
    starship_ID?: string;
    pilot?: IPeople;
    pilot_ID?: string;
}

export interface IPlanet2People {
    ID?: string;
    planet?: IPlanet;
    planet_ID?: string;
    people?: IPeople;
    people_ID?: string;
}

export enum Entity {
    Film = "StarWarsFilm.Film",
    People = "StarWarsFilm.People",
    Planet = "StarWarsFilm.Planet",
    Species = "StarWarsFilm.Species",
    Starship = "StarWarsFilm.Starship",
    Vehicles = "StarWarsFilm.Vehicles",
    Film2People = "StarWarsFilm.Film2People",
    Film2Planets = "StarWarsFilm.Film2Planets",
    Film2Starships = "StarWarsFilm.Film2Starships",
    Film2Species = "StarWarsFilm.Film2Species",
    Film2Vehicles = "StarWarsFilm.Film2Vehicles",
    Directors = "StarWarsFilm.directors",
    Producers = "StarWarsFilm.producers",
    FilmEpisodeDesc = "StarWarsFilm.FilmEpisodeDesc",
    Species2People = "StarWarsFilm.Species2People",
    Vehicle2Pilot = "StarWarsFilm.Vehicle2Pilot",
    Starship2Pilot = "StarWarsFilm.Starship2Pilot",
    Planet2People = "StarWarsFilm.Planet2People"
}

export enum SanitizedEntity {
    Film = "Film",
    People = "People",
    Planet = "Planet",
    Species = "Species",
    Starship = "Starship",
    Vehicles = "Vehicles",
    Film2People = "Film2People",
    Film2Planets = "Film2Planets",
    Film2Starships = "Film2Starships",
    Film2Species = "Film2Species",
    Film2Vehicles = "Film2Vehicles",
    Directors = "Directors",
    Producers = "Producers",
    FilmEpisodeDesc = "FilmEpisodeDesc",
    Species2People = "Species2People",
    Vehicle2Pilot = "Vehicle2Pilot",
    Starship2Pilot = "Starship2Pilot",
    Planet2People = "Planet2People"
}
