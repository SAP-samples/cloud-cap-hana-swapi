using {
    managed,
    sap,
    cuid
} from '@sap/cds/common';

namespace star.wars;

entity Film : cuid, managed {
    title         : String;
    episode_id    : Integer;
    opening_crawl : String;
    director      : String;
    producer      : String;
    release_date  : Date;
    characters    : Association to many Film2People
                        on characters.film = $self;
    planets       : Association to many Film2Planets
                        on planets.film = $self;
    starships     : Association to many Film2Starships
                        on starships.film = $self;
    vehicles      : Association to many Film2Vehicles
                        on vehicles.film = $self;
    species       : Association to many Film2Species
                        on species.film = $self;
}

annotate Film with @(title : '{i18n>Film}') {
    ID            @(
        Core.Computed,
        Common.Text : {
            $value                 : title,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    title         @title : '{i18n>title}';
    episode_id    @title : '{i18n>episode_id}';
    opening_crawl @(
        title            : '{i18n>opening_crawl}',
        UI.MultiLineText : true
    );
    director      @title : '{i18n>director}';
    producer      @title : '{i18n>producer}';
    release_date  @title : '{i18n>release_date}';
    characters    @title : '{i18n>characters}';
    planets       @title : '{i18n>planets}';
    starships     @title : '{i18n>starships}';
    vehicles      @title : '{i18n>vehicles}';
    species       @title : '{i18n>species}';
}

entity Film2People : cuid {
    film   : Association to Film;
    people : Association to People;
}

annotate Film2People with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : {
            $value                 : film.title,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },]
        }
    );
    people @Common.Text : {
        $value                 : people.name,
        ![@UI.TextArrangement] : #TextOnly
    };
};

entity Film2Planets {
    key film   : Association to Film;
    key planet : Association to Planet;
}

entity Film2Starships {
    key film     : Association to Film;
    key starship : Association to Starship;
}

entity Film2Vehicles {
    key film    : Association to Film;
    key vehicle : Association to Vehicles;
}

entity Film2Species {
    key film   : Association to Film;
    key specie : Association to Species;
}

entity People : cuid, managed {
    name       : String;
    height     : String;
    mass       : String;
    hair_color : String;
    skin_color : String;
    eye_color  : String;
    birth_year : String;
    gender     : String;
    homeworld  : Association to Planet;
    films      : Composition of many Film2People
                     on films.people = $self;
    species    : Association to many Species2People
                     on species.people = $self;
    vehicles   : Association to many Vehicle2Pilot
                     on vehicles.pilot = $self;
    starships  : Association to many Starship2Pilot
                     on starships.pilot = $self;
}

define view genders as
    select from People distinct {
        key gender
    };

define view hairColors as
    select from People distinct {
        key hair_color
    };

define view eyeColors as
    select from People distinct {
        key eye_color
    };

define view skinColors as
    select from People distinct {
        key skin_color
    };

annotate People with @(
    title              : '{i18n>People}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [name],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : name

    }, ]
) {
    ID         @Core.Computed;
    name       @(
        title                           : '{i18n>peopleName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'name',
                ValueListProperty : 'name'
            }]
        }
    );
    height     @title : '{i18n>height}';
    mass       @title : '{i18n>mass}';
    hair_color @(
        title                           : '{i18n>hair_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'hairColors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'hair_color',
                ValueListProperty : 'hair_color'
            }]
        }
    );
    skin_color @(
        title                           : '{i18n>skin_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'skinColors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'skin_color',
                ValueListProperty : 'skin_color'
            }]
        }
    );
    eye_color  @(
        title                           : '{i18n>eye_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'eyeColors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'eye_color',
                ValueListProperty : 'eye_color'
            }]
        }
    );
    birth_year @title : '{i18n>birth_year}';
    gender     @(
        title                           : '{i18n>gender}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'genders',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'gender',
                ValueListProperty : 'gender'
            }]
        }
    );
    homeworld  @(
        title            : '{i18n>homeworld}',
        Common.Text      : {
            $value                 : homeworld.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueList : {
            CollectionPath  : 'Planet',
            SearchSupported : true,
            Parameters      : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'homeworld_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'climate'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'terrain'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'population'
            }
            ]
        }
    );
    films      @title : '{i18n>peopleFilms}';
    species    @title : '{i18n>species}';
    vehicles   @title : '{i18n>vehicles}';
    starships  @title : '{i18n>starships}';
}

@cds.odata.valuelist
entity Planet : cuid, managed {
    name            : String;
    diameter        : String;
    rotation_period : String;
    orbital_period  : String;
    gravity         : String;
    population      : String;
    climate         : String;
    terrain         : String;
    surface_water   : String;
    films           : Association to many Film2Planets
                          on films.planet = $self;
    residents       : Association to many Planet2People
                          on residents.planet = $self;
}

annotate Planet with {
    ID @Common.Text : name;
}

annotate Planet with @(
    title              : '{i18n>Planet}',
    cds.odata.valuelist,
    Common.SemanticKey : [name],
    UI.TextArrangement : #TextOnly,
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : name,
    }, ]
) {
    ID              @(
        ObjectModel.text.element : [name],
        UI.Hidden                : true,
        UI.HiddenFilter          : true
    );
    name            @(
        title          : '{i18n>planetName}',
        Common.TextFor : ID
    );
    diameter        @title : '{i18n>diameter}';
    rotation_period @title : '{i18n>rotation_period}';
    orbital_period  @title : '{i18n>orbital_period}';
    gravity         @title : '{i18n>gravity}';
    population      @title : '{i18n>population}';
    climate         @title : '{i18n>climate}';
    terrain         @title : '{i18n>terrain}';
    surface_water   @title : '{i18n>surface_water}';
    films           @title : '{i18n>films}';
    residents       @title : '{i18n>residents}';
}

@cds.odata.valuelist
entity Planet2People {
    key planet : Association to Planet;
    key people : Association to People;
}

entity Species : cuid, managed {
    name             : String;
    classification   : String;
    designation      : String;
    average_height   : String;
    average_lifespan : String;
    hair_colors      : String;
    skin_colors      : String;
    eye_colors       : String;
    homeworld        : Association to Planet;
    language         : String;
    people           : Association to many Species2People
                           on people.species = $self;
    films            : Association to many Film2Species
                           on films.specie = $self;
}

annotate Species with @(title : '{i18n>Species}') {
    name             @title : '{i18n>speciesName}';
    classification   @title : '{i18n>classification}';
    designation      @title : '{i18n>designation}';
    average_height   @title : '{i18n>average_height}';
    average_lifespan @title : '{i18n>average_lifespan}';
    hair_colors      @title : '{i18n>hair_colors}';
    skin_colors      @title : '{i18n>skin_colors}';
    eye_colors       @title : '{i18n>eye_colors}';
    homeworld        @title : '{i18n>homeworld}';
    language         @title : '{i18n>language}';
    people           @title : '{i18n>people}';
    films            @title : '{i18n>films}';
}

entity Species2People {
    key species : Association to Species;
    key people  : Association to People;
}

entity Starship : cuid, managed {
    name                   : String;
    model                  : String;
    starship_class         : String;
    manufacturer           : String;
    cost_in_credits        : String;
    length                 : String;
    crew                   : String;
    passengers             : String;
    max_atmosphering_speed : String;
    hyperdrive_rating      : String;
    MGLT                   : String;
    cargo_capacity         : String;
    consumables            : String;
    films                  : Association to many Film2Starships
                                 on films.starship = $self;
    pilots                 : Association to many Starship2Pilot
                                 on pilots.starship = $self;
}

annotate Starship with @(title : '{i18n>Starship}') {
    name                   @title : '{i18n>starshipName}';
    model                  @title : '{i18n>model}';
    starship_class         @title : '{i18n>starship_class}';
    manufacturer           @title : '{i18n>manufacturer}';
    cost_in_credits        @title : '{i18n>cost_in_credits}';
    length                 @title : '{i18n>length}';
    crew                   @title : '{i18n>crew}';
    passengers             @title : '{i18n>passengers}';
    max_atmosphering_speed @title : '{i18n>max_atmosphering_speed}';
    hyperdrive_rating      @title : '{i18n>hyperdrive_rating}';
    MGLT                   @title : '{i18n>MGLT}';
    cargo_capacity         @title : '{i18n>cargo_capacity}';
    consumables            @title : '{i18n>consumables}';
    films                  @title : '{i18n>starshipFilms}';
    pilots                 @title : '{i18n>starshipPilots}';
}


entity Starship2Pilot {
    key starship : Association to Starship;
    key pilot    : Association to People;
}

entity Vehicles : cuid, managed {
    name                   : String;
    model                  : String;
    vehicle_class          : String;
    manufacturer           : String;
    cost_in_credits        : String;
    length                 : String;
    crew                   : String;
    passengers             : String;
    max_atmosphering_speed : String;
    cargo_capacity         : String;
    consumables            : String;
    films                  : Association to many Film2Vehicles
                                 on films.vehicle = $self;
    pilots                 : Association to many Vehicle2Pilot
                                 on pilots.vehicle = $self;
}

annotate Vehicles with @(title : '{i18n>Vehicles}') {
    name                   @title : '{i18n>vehicleName}';
    model                  @title : '{i18n>vehicleModel}';
    vehicle_class          @title : '{i18n>vehicle_class}';
    manufacturer           @title : '{i18n>vehicleManufacturer}';
    cost_in_credits        @title : '{i18n>vehicleCost_in_credits}';
    length                 @title : '{i18n>vehicleLength}';
    crew                   @title : '{i18n>vehicleCrew}';
    passengers             @title : '{i18n>vehiclePassengers}';
    max_atmosphering_speed @title : '{i18n>max_atmosphering_speed}';
    cargo_capacity         @title : '{i18n>vehicleCargo_capacity}';
    consumables            @title : '{i18n>vehicleConsumables}';
    films                  @title : '{i18n>vehicleFilms}';
    pilots                 @title : '{i18n>vehiclePilots}';
}

entity Vehicle2Pilot {
    key vehicle : Association to Vehicles;
    key pilot   : Association to People;
}
