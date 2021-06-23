using {
    managed,
    sap,
    cuid
} from '@sap/cds/common';

namespace star.wars;

entity Film : cuid, managed {
    title         : String;
    @assert.range
    episode_id    : Integer enum {
        I     = 1;
        II    = 2;
        III   = 3;
        IV    = 4;
        V     = 5;
        VI    = 6;
        VII   = 7;
        VIII  = 8;
        IX    = 9;
        X     = 10;
        OTHER = 0;
    };
    opening_crawl : String;
    director      : String;
    producer      : String;
    release_date  : Date;
    characters    : Composition of many Film2People
                        on characters.film = $self;
    planets       : Composition of many Film2Planets
                        on planets.film = $self;
    starships     : Composition of many Film2Starships
                        on starships.film = $self;
    vehicles      : Composition of many Film2Vehicles
                        on vehicles.film = $self;
    species       : Composition of many Film2Species
                        on species.film = $self;
}

annotate Film with @(
    title              : '{i18n>Film}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [title],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : title

    }]
) {
    ID            @(
        Core.Computed,
        Common.Text : {
            $value                 : title,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    title         @(
        title                           : '{i18n>title}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'title',
                ValueListProperty : 'title'
            }]
        }
    );
    episode_id    @(
        title                           : '{i18n>episode_id}',
        assert.enum,
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'FilmEpisodeDesc',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'episode_id',
                ValueListProperty : 'episode_id'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'episodeIDDesc'
            }
            ]
        }
    );
    opening_crawl @(
        title            : '{i18n>opening_crawl}',
        UI.MultiLineText : true
    );
    director      @(
        title                           : '{i18n>director}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'directors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'director',
                ValueListProperty : 'director'
            }]
        }
    );
    producer      @(
        title                           : '{i18n>producer}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'producers',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'producer',
                ValueListProperty : 'producer'
            }]
        }
    );
    release_date  @title : '{i18n>release_date}';
    characters    @title : '{i18n>characters}';
    planets       @title : '{i18n>planets}';
    starships     @title : '{i18n>starships}';
    vehicles      @title : '{i18n>vehicles}';
    species       @title : '{i18n>species}';
}

define view directors as
    select from Film distinct {
        key director
    };

define view producers as
    select from Film distinct {
        key producer
    };

define view FilmEpisodeDesc as
    select from Film {
        key ID,
            episode_id,
            title,
            @title : '{i18n>episodeIDDesc}'
            case
                when
                    episode_id = 1
                then
                    'I'
                when
                    episode_id = 2
                then
                    'II'
                when
                    episode_id = 3
                then
                    'III'
                when
                    episode_id = 4
                then
                    'IV'
                when
                    episode_id = 5
                then
                    'V'
                when
                    episode_id = 6
                then
                    'VI'
                when
                    episode_id = 7
                then
                    'VII'
                when
                    episode_id = 8
                then
                    'VIII'
                when
                    episode_id = 9
                then
                    'IX'
                when
                    episode_id = 10
                then
                    'X'
                else
                    'Other'

            end as![episodeIDDesc] : String
    };

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
        title                           : '{i18n>title}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },
            ]
        }
    );
    people @(
        Common.Text                     : {
            $value                 : people.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>People}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'people_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
};

entity Film2Planets : cuid {
    film   : Association to Film;
    planet : Association to Planet;
}

annotate Film2Planets with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : {
            $value                 : film.title,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>title}',
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },
            ]
        }
    );
    planet @(
        Common.Text                     : {
            $value                 : planet.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Planet}',
        Common.ValueList                : {
            CollectionPath : 'Planet',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'planet_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'terrain'
            },
            ]
        }

    );
};

entity Film2Starships : cuid {
    film     : Association to Film;
    starship : Association to Starship;
}

annotate Film2Starships with {
    ID       @Core.Computed;
    film     @(
        Common.Text                     : {
            $value                 : film.title,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>title}',
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },
            ]
        }
    );
    starship @(
        Common.Text                     : {
            $value                 : starship.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Starship}',
        Common.ValueList                : {
            CollectionPath : 'Starship',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'starship_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'model'
            },
            ]
        }
    );
};

entity Film2Vehicles : cuid {
    film    : Association to Film;
    vehicle : Association to Vehicles;
}

annotate Film2Vehicles with {
    ID      @Core.Computed;
    film    @(
        Common.Text                     : {
            $value                 : film.title,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>title}',
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },
            ]
        }
    );
    vehicle @(
        Common.Text                     : {
            $value                 : vehicle.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Vehicle}',
        Common.ValueList                : {
            CollectionPath : 'Vehicles',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'vehicle_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'model'
            },
            ]
        }
    );
};

entity Film2Species : cuid {
    film   : Association to Film;
    specie : Association to Species;
}

annotate Film2Species with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : {
            $value                 : film.title,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>title}',
        Common.ValueList                : {
            CollectionPath : 'Film',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'film_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'title'
            },
            ]
        }
    );
    specie @(
        Common.Text                     : {
            $value                 : specie.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>Species}',
        Common.ValueList                : {
            CollectionPath : 'Species',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'specie_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'classification'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'language'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'homeworld.name'
            }
            ]
        }
    );
};

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
    species    : Composition of many Species2People
                     on species.people = $self;
    vehicles   : Composition of many Vehicle2Pilot
                     on vehicles.pilot = $self;
    starships  : Composition of many Starship2Pilot
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
    ID         @(
        Core.Computed,
        Common.Text : {
            $value                 : name,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
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
    films           : Composition of many Film2Planets
                          on films.planet = $self;
    residents       : Composition of many Planet2People
                          on residents.planet = $self;
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
        Core.Computed,
        Common.Text : {
            $value                 : name,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    name            @(
        title                           : '{i18n>planetName}',
        Common.TextFor                  : ID,
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Planet',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'name',
                ValueListProperty : 'name'
            }]
        }
    );
    diameter        @title : '{i18n>diameter}';
    rotation_period @title : '{i18n>rotation_period}';
    orbital_period  @title : '{i18n>orbital_period}';
    gravity         @title : '{i18n>gravity}';
    population      @title : '{i18n>population}';
    climate         @(
        title                           : '{i18n>climate}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'climate',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'climate',
                ValueListProperty : 'climate'
            }]
        }
    );
    terrain         @(
        title                           : '{i18n>terrain}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'terrain',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'terrain',
                ValueListProperty : 'terrain'
            }]
        }
    );
    surface_water   @title : '{i18n>surface_water}';
    films           @title : '{i18n>films}';
    residents       @title : '{i18n>residents}';
}

@cds.odata.valuelist
entity Planet2People : cuid {
    planet : Association to Planet;
    people : Association to People;
}

annotate Planet2People with {
    ID     @Core.Computed;
    planet @(
        Common.Text                     : {
            $value                 : planet.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>planetName}',
        Common.ValueList                : {
            CollectionPath : 'Planet',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'planet_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
    people @(
        Common.Text                     : {
            $value                 : people.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>residents}',
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'people_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
};

define view climate as
    select from Planet distinct {
        key climate
    };

define view terrain as
    select from Planet distinct {
        key terrain
    };

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
    people           : Composition of many Species2People
                           on people.species = $self;
    films            : Composition of many Film2Species
                           on films.specie = $self;
}

define view classification as
    select from Species distinct {
        key classification
    };

define view designation as
    select from Species distinct {
        key designation
    };

define view hair_colors as
    select from Species distinct {
        key hair_colors
    };

define view skin_colors as
    select from Species distinct {
        key skin_colors
    };

define view language as
    select from Species distinct {
        key language
    };

define view eye_colors as
    select from Species distinct {
        key eye_colors
    };

annotate Species with @(
    title              : '{i18n>Species}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [name],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : name

    }]
) {
    ID               @(
        Core.Computed,
        Common.Text : {
            $value                 : name,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    name             @(
        title                           : '{i18n>speciesName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Species',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'name',
                ValueListProperty : 'name'
            }]
        }
    );
    classification   @(
        title                           : '{i18n>classification}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'classification',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'classification',
                ValueListProperty : 'classification'
            }]
        }
    );
    designation      @(
        title                           : '{i18n>designation}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'designation',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'designation',
                ValueListProperty : 'designation'
            }]
        }
    );
    average_height   @title : '{i18n>average_height}';
    average_lifespan @title : '{i18n>average_lifespan}';
    hair_colors      @(
        title                           : '{i18n>hair_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'hair_colors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'hair_colors',
                ValueListProperty : 'hair_colors'
            }]
        }
    );
    skin_colors      @(
        title                           : '{i18n>skin_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'skin_colors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'skin_colors',
                ValueListProperty : 'skin_colors'
            }]
        }
    );
    eye_colors       @(
        title                           : '{i18n>eye_color}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'eye_colors',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'eye_colors',
                ValueListProperty : 'eye_colors'
            }]
        }
    );
    homeworld        @(
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
    language         @(
        title                           : '{i18n>language}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'language',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'language',
                ValueListProperty : 'language'
            }]
        }
    );
    people           @title : '{i18n>people}';
    films            @title : '{i18n>films}';
}

entity Species2People : cuid {
    species : Association to Species;
    people  : Association to People;
}

annotate Species2People with {
    ID      @Core.Computed;
    species @(
        Common.Text                     : {
            $value                 : species.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>Species}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Species',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'species_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
    people  @(
        Common.Text                     : {
            $value                 : people.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>People}',
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'people_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
};

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
    films                  : Composition of many Film2Starships
                                 on films.starship = $self;
    pilots                 : Composition of many Starship2Pilot
                                 on pilots.starship = $self;
}

annotate Starship with @(
    title              : '{i18n>Starship}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [name],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : name

    }]
) {
    ID                     @(
        Core.Computed,
        Common.Text : {
            $value                 : name,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    name                   @(
        title                           : '{i18n>starshipName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Starship',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'name',
                ValueListProperty : 'name'
            }]
        }
    );
    model                  @(
        title                           : '{i18n>model}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'ssModels',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'model',
                ValueListProperty : 'model'
            }]
        }
    );
    starship_class         @(
        title                           : '{i18n>starship_class}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'ssClass',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'starship_class',
                ValueListProperty : 'starship_class'
            }]
        }
    );
    manufacturer           @(
        title                           : '{i18n>manufacturer}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'ssManufacturer',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'manufacturer',
                ValueListProperty : 'manufacturer'
            }]
        }
    );
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

define view ssModels as
    select from Starship distinct {
        key model
    };

define view ssClass as
    select from Starship distinct {
        key starship_class
    };

define view ssManufacturer as
    select from Starship distinct {
        key manufacturer
    };

entity Starship2Pilot : cuid {
    starship : Association to Starship;
    pilot    : Association to People;
}

annotate Starship2Pilot with {
    ID       @Core.Computed;
    starship @(
        Common.Text                     : {
            $value                 : starship.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>starshipName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Starship',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'starship_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'model'
            }
            ]
        }
    );
    pilot    @(
        Common.Text                     : {
            $value                 : pilot.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>Pilot}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'pilot_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
};

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
    films                  : Composition of many Film2Vehicles
                                 on films.vehicle = $self;
    pilots                 : Composition of many Vehicle2Pilot
                                 on pilots.vehicle = $self;
}

annotate Vehicles with @(
    title              : '{i18n>Vehicles}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [name],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : name

    }]
) {
    ID                     @(
        Core.Computed,
        Common.Text : {
            $value                 : name,
            ![@UI.TextArrangement] : #TextOnly
        }
    );
    name                   @(
        title                           : '{i18n>vehicleName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Vehicles',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'name',
                ValueListProperty : 'name'
            }]
        }
    );
    model                  @(
        title                           : '{i18n>model}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'vModels',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'model',
                ValueListProperty : 'model'
            }]
        }
    );
    vehicle_class          @(
        title                           : '{i18n>vehicle_class}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'vClass',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'vehicle_class',
                ValueListProperty : 'vehicle_class'
            }]
        }
    );
    manufacturer           @(
        title                           : '{i18n>manufacturer}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'vManufacturer',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'manufacturer',
                ValueListProperty : 'manufacturer'
            }]
        }
    );
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


define view vModels as
    select from Vehicles distinct {
        key model
    };

define view vClass as
    select from Vehicles distinct {
        key vehicle_class
    };

define view vManufacturer as
    select from Vehicles distinct {
        key manufacturer
    };

entity Vehicle2Pilot : cuid {
    vehicle : Association to Vehicles;
    pilot   : Association to People;
}

annotate Vehicle2Pilot with {
    ID      @Core.Computed;
    vehicle @(
        Common.Text                     : {
            $value                 : vehicle.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>vehicleName}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'Vehicles',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'vehicle_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'model'
            },
            ]
        }
    );
    pilot   @(
        Common.Text                     : {
            $value                 : pilot.name,
            ![@UI.TextArrangement] : #TextOnly
        },
        title                           : '{i18n>Pilot}',
        Common.ValueListWithFixedValues : false,
        Common.ValueList                : {
            CollectionPath : 'People',
            Parameters     : [
            {
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'pilot_ID',
                ValueListProperty : 'ID'
            },
            {
                $Type             : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name'
            },
            ]
        }
    );
};
