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

export interface IFilm2Vehicles {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    vehicle?: IVehicles;
    vehicle_ID?: string;
}

export interface IFilm2Species {
    ID?: string;
    film?: IFilm;
    film_ID?: string;
    specie?: ISpecies;
    specie_ID?: string;
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

export interface ITallestPerson {
    tallest_name?: string;
}

export interface IPeopleCount {
    people_count?: number;
    name: string;
}

export interface IGenders {
    gender: string;
}

export interface IHairColors {
    hair_color: string;
}

export interface IEyeColors {
    eye_color: string;
}

export interface ISkinColors {
    skin_color: string;
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

export interface IPlanet2People {
    ID?: string;
    planet?: IPlanet;
    planet_ID?: string;
    people?: IPeople;
    people_ID?: string;
}

export interface IClimate {
    climate: string;
}

export interface ITerrain {
    terrain: string;
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

export interface IClassification {
    classification: string;
}

export interface IDesignation {
    designation: string;
}

export interface IHair_colors {
    hair_colors: string;
}

export interface ISkin_colors {
    skin_colors: string;
}

export interface ILanguage {
    language: string;
}

export interface IEye_colors {
    eye_colors: string;
}

export interface ISpecies2People {
    ID?: string;
    species?: ISpecies;
    species_ID?: string;
    people?: IPeople;
    people_ID?: string;
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

export interface ISsModels {
    model: string;
}

export interface ISsClass {
    starship_class: string;
}

export interface ISsManufacturer {
    manufacturer: string;
}

export interface IStarship2Pilot {
    ID?: string;
    starship?: IStarship;
    starship_ID?: string;
    pilot?: IPeople;
    pilot_ID?: string;
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

export interface IVModels {
    model: string;
}

export interface IVClass {
    vehicle_class: string;
}

export interface IVManufacturer {
    manufacturer: string;
}

export interface IVehicle2Pilot {
    ID?: string;
    vehicle?: IVehicles;
    vehicle_ID?: string;
    pilot?: IPeople;
    pilot_ID?: string;
}

export enum Entity {
    Film = "star.wars.Film",
    Directors = "star.wars.directors",
    Producers = "star.wars.producers",
    FilmEpisodeDesc = "star.wars.FilmEpisodeDesc",
    Film2People = "star.wars.Film2People",
    Film2Planets = "star.wars.Film2Planets",
    Film2Starships = "star.wars.Film2Starships",
    Film2Vehicles = "star.wars.Film2Vehicles",
    Film2Species = "star.wars.Film2Species",
    People = "star.wars.People",
    TallestPerson = "star.wars.tallestPerson",
    PeopleCount = "star.wars.peopleCount",
    Genders = "star.wars.genders",
    HairColors = "star.wars.hairColors",
    EyeColors = "star.wars.eyeColors",
    SkinColors = "star.wars.skinColors",
    Planet = "star.wars.Planet",
    Planet2People = "star.wars.Planet2People",
    Climate = "star.wars.climate",
    Terrain = "star.wars.terrain",
    Species = "star.wars.Species",
    Classification = "star.wars.classification",
    Designation = "star.wars.designation",
    Hair_colors = "star.wars.hair_colors",
    Skin_colors = "star.wars.skin_colors",
    Language = "star.wars.language",
    Eye_colors = "star.wars.eye_colors",
    Species2People = "star.wars.Species2People",
    Starship = "star.wars.Starship",
    SsModels = "star.wars.ssModels",
    SsClass = "star.wars.ssClass",
    SsManufacturer = "star.wars.ssManufacturer",
    Starship2Pilot = "star.wars.Starship2Pilot",
    Vehicles = "star.wars.Vehicles",
    VModels = "star.wars.vModels",
    VClass = "star.wars.vClass",
    VManufacturer = "star.wars.vManufacturer",
    Vehicle2Pilot = "star.wars.Vehicle2Pilot"
}

export enum SanitizedEntity {
    Film = "Film",
    Directors = "Directors",
    Producers = "Producers",
    FilmEpisodeDesc = "FilmEpisodeDesc",
    Film2People = "Film2People",
    Film2Planets = "Film2Planets",
    Film2Starships = "Film2Starships",
    Film2Vehicles = "Film2Vehicles",
    Film2Species = "Film2Species",
    People = "People",
    TallestPerson = "TallestPerson",
    PeopleCount = "PeopleCount",
    Genders = "Genders",
    HairColors = "HairColors",
    EyeColors = "EyeColors",
    SkinColors = "SkinColors",
    Planet = "Planet",
    Planet2People = "Planet2People",
    Climate = "Climate",
    Terrain = "Terrain",
    Species = "Species",
    Classification = "Classification",
    Designation = "Designation",
    Hair_colors = "Hair_colors",
    Skin_colors = "Skin_colors",
    Language = "Language",
    Eye_colors = "Eye_colors",
    Species2People = "Species2People",
    Starship = "Starship",
    SsModels = "SsModels",
    SsClass = "SsClass",
    SsManufacturer = "SsManufacturer",
    Starship2Pilot = "Starship2Pilot",
    Vehicles = "Vehicles",
    VModels = "VModels",
    VClass = "VClass",
    VManufacturer = "VManufacturer",
    Vehicle2Pilot = "Vehicle2Pilot"
}
