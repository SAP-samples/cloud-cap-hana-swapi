using {
    managed,
    cuid
} from '@sap/cds/common';

using from '@sap/cds-common-content';

namespace star.wars;

type NumericString : String @assert.format: '^[0-9][0-9,]*(?:\\.[0-9]+)?$';
type IntegerLikeString : String @assert.format: '^[0-9][0-9,]*$';
type YearString : String @assert.format: '^[0-9]+(?:BBY|ABY)$';

/**
 * All Films in the Star Wars Skywalker Saga
 */
@cds.persistence.journal
entity Film : cuid, managed {
    title         : String @mandatory;
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
    opening_crawl : String(2500);
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
    Common.Label       : '{i18n>Film}',
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
        Common.Text            : title,
        Common.TextArrangement : #TextOnly
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

annotate Film2People with @assert.unique.filmPeoplePair : [film, people];

annotate Film2People with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : film.title,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : people.name,
        Common.TextArrangement          : #TextOnly,
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

annotate Film2Planets with @assert.unique.filmPlanetPair : [film, planet];

annotate Film2Planets with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : film.title,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : planet.name,
        Common.TextArrangement          : #TextOnly,
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

annotate Film2Starships with @assert.unique.filmStarshipPair : [film, starship];

annotate Film2Starships with {
    ID       @Core.Computed;
    film     @(
        Common.Text                     : film.title,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : starship.name,
        Common.TextArrangement          : #TextOnly,
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

annotate Film2Vehicles with @assert.unique.filmVehiclePair : [film, vehicle];

annotate Film2Vehicles with {
    ID      @Core.Computed;
    film    @(
        Common.Text                     : film.title,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : vehicle.name,
        Common.TextArrangement          : #TextOnly,
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

annotate Film2Species with @assert.unique.filmSpeciesPair : [film, specie];

annotate Film2Species with {
    ID     @Core.Computed;
    film   @(
        Common.Text                     : film.title,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : specie.name,
        Common.TextArrangement          : #TextOnly,
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

/**
 * All Star Wars TV Shows, Animated Series, and Streaming Content
 */
@cds.persistence.journal
entity Show : cuid, managed {
    title         : String @mandatory;
    @assert.range
    show_type     : String enum {
        LIVE_ACTION_SERIES  = 'LIVE_ACTION_SERIES';
        ANIMATED_SERIES     = 'ANIMATED_SERIES';
        ANIMATED_FILM       = 'ANIMATED_FILM';
        // Anthology theatrical films (Rogue One, Solo) go in Film using episode_id = 0.
        // ANTHOLOGY is reserved for potential future short-form anthology series only.
        ANTHOLOGY           = 'ANTHOLOGY';
    };
    seasons       : Integer;
    episode_count : Integer;
    network       : String;
    director      : String;
    producer      : String;
    release_date  : Date;
    characters    : Composition of many Show2People    on characters.show = $self;
    episodes      : Composition of many Episode         on episodes.show   = $self;
}

annotate Show with @(
    title              : '{i18n>Show}',
    Common.Label       : '{i18n>Show}',
    UI.TextArrangement : #TextOnly,
    cds.odata.valuelist,
    Common.SemanticKey : [title],
    UI.Identification  : [{
        $Type : 'UI.DataField',
        Value : title
    }]
) {
    ID        @(
        Core.Computed,
        Common.Text            : title,
        Common.TextArrangement : #TextOnly
    );
    title     @title : '{i18n>title}';
    show_type @(
        title                           : '{i18n>show_type}',
        assert.enum,
        Common.ValueListWithFixedValues : true,
        Common.ValueList                : {
            CollectionPath : 'Show',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterOut',
                LocalDataProperty : show_type,
                ValueListProperty : 'show_type'
            }]
        }
    );
    seasons   @title : '{i18n>seasons}';
    episode_count @title : '{i18n>episode_count}';
    network   @title : '{i18n>network}';
    director  @title : '{i18n>director}';
    producer  @title : '{i18n>producer}';
    release_date @title : '{i18n>release_date}';
}

entity Show2People : cuid {
    show   : Association to Show;
    people : Association to People;
}

annotate Show2People with @assert.unique.showPeoplePair : [show, people];

annotate Show2People with {
    ID     @Core.Computed;
    show   @(
        Common.Text                     : show.title,
        Common.TextArrangement          : #TextOnly,
        Common.ValueListWithFixedValues : false,
        title                           : '{i18n>title}',
        Common.ValueList                : {
            CollectionPath : 'Show',
            Parameters     : [
                {
                    $Type             : 'Common.ValueListParameterInOut',
                    LocalDataProperty : 'show_ID',
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
        Common.Text                     : people.name,
        Common.TextArrangement          : #TextOnly,
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

// ─── Episode ──────────────────────────────────────────────────────────────────
/**
 * A single episode of a Star Wars TV show.
 * Owned by Show via composition (cascade delete applies).
 */
entity Episode : cuid, managed {
    show          : Association to Show;
    title         : String @mandatory;
    season_number : Integer;
    episode_number: Integer;
    air_date      : Date;
    director      : String;
    writer        : String;
    runtime       : Integer;     // minutes
    timeline      : String;      // e.g. "19 BBY"
}

entity Episode2People    : cuid, managed { episode: Association to Episode; people:   Association to People;   }
entity Episode2Planets   : cuid, managed { episode: Association to Episode; planet:   Association to Planet;   }
entity Episode2Starships : cuid, managed { episode: Association to Episode; starship: Association to Starship; }
entity Episode2Vehicles  : cuid, managed { episode: Association to Episode; vehicle:  Association to Vehicles; }
entity Episode2Species   : cuid, managed { episode: Association to Episode; specie:   Association to Species;  }

annotate Episode2People    with @assert.unique.episodePeoplePair    : [episode, people];
annotate Episode2Planets   with @assert.unique.episodePlanetPair    : [episode, planet];
annotate Episode2Starships with @assert.unique.episodeStarshipPair  : [episode, starship];
annotate Episode2Vehicles  with @assert.unique.episodeVehiclePair   : [episode, vehicle];
annotate Episode2Species   with @assert.unique.episodeSpeciesPair   : [episode, specie];

// ─── Show2* Derived Views ─────────────────────────────────────────────────────
// These replace the former physical junction tables.
// Show-level entity relationships are derived by aggregating over Episode2* tables.
// ─────────────────────────────────────────────────────────────────────────────
define view Show2Planets as select from Episode2Planets {
    key episode.show.ID as show_ID,
    key planet.ID       as planet_ID
};

define view Show2Starships as select from Episode2Starships {
    key episode.show.ID as show_ID,
    key starship.ID     as starship_ID
};

define view Show2Vehicles as select from Episode2Vehicles {
    key episode.show.ID as show_ID,
    key vehicle.ID      as vehicle_ID
};

define view Show2Species as select from Episode2Species {
    key episode.show.ID as show_ID,
    key specie.ID       as specie_ID
};

// ─── Clone Wars Chronological Episode Order ───────────────────────────────────
// Official sequential order published by StarWars.com (March 17, 2014).
// Positions 1–2 precede the theatrical film (not an Episode entity); positions
// 3–133 follow.  The theatrical film itself is stored as a Film entity and is
// intentionally excluded here.
// Source: https://www.starwars.com/news/star-wars-the-clone-wars-chronological-episodeorder/
// ─────────────────────────────────────────────────────────────────────────────
define view CloneWarsChronologicalOrder as
    select from Episode {
        key ID,
        show,
        title,
        season_number,
        episode_number,
        air_date,
        director,
        writer,
        runtime,
        timeline,
        // season_number * 100 + episode_number gives a unique key per episode
        // (e.g. Season 2 Ep 16 → 216) used in each WHEN to map to chronological position.
        // Positions follow the official StarWars.com sequential order; position T
        // (the 2008 theatrical film) is a Film entity and is not listed here.
        case
            when season_number * 100 + episode_number = 216 then 1
            when season_number * 100 + episode_number = 116 then 2
            when season_number * 100 + episode_number = 301 then 3
            when season_number * 100 + episode_number = 303 then 4
            when season_number * 100 + episode_number = 101 then 5
            when season_number * 100 + episode_number = 102 then 6
            when season_number * 100 + episode_number = 103 then 7
            when season_number * 100 + episode_number = 104 then 8
            when season_number * 100 + episode_number = 105 then 9
            when season_number * 100 + episode_number = 106 then 10
            when season_number * 100 + episode_number = 107 then 11
            when season_number * 100 + episode_number = 108 then 12
            when season_number * 100 + episode_number = 109 then 13
            when season_number * 100 + episode_number = 110 then 14
            when season_number * 100 + episode_number = 111 then 15
            when season_number * 100 + episode_number = 112 then 16
            when season_number * 100 + episode_number = 113 then 17
            when season_number * 100 + episode_number = 114 then 18
            when season_number * 100 + episode_number = 115 then 19
            when season_number * 100 + episode_number = 117 then 20
            when season_number * 100 + episode_number = 118 then 21
            when season_number * 100 + episode_number = 119 then 22
            when season_number * 100 + episode_number = 120 then 23
            when season_number * 100 + episode_number = 121 then 24
            when season_number * 100 + episode_number = 201 then 25
            when season_number * 100 + episode_number = 202 then 26
            when season_number * 100 + episode_number = 203 then 27
            when season_number * 100 + episode_number = 217 then 28
            when season_number * 100 + episode_number = 218 then 29
            when season_number * 100 + episode_number = 219 then 30
            when season_number * 100 + episode_number = 204 then 31
            when season_number * 100 + episode_number = 205 then 32
            when season_number * 100 + episode_number = 206 then 33
            when season_number * 100 + episode_number = 207 then 34
            when season_number * 100 + episode_number = 208 then 35
            when season_number * 100 + episode_number = 209 then 36
            when season_number * 100 + episode_number = 210 then 37
            when season_number * 100 + episode_number = 211 then 38
            when season_number * 100 + episode_number = 212 then 39
            when season_number * 100 + episode_number = 213 then 40
            when season_number * 100 + episode_number = 214 then 41
            when season_number * 100 + episode_number = 220 then 42
            when season_number * 100 + episode_number = 221 then 43
            when season_number * 100 + episode_number = 222 then 44
            when season_number * 100 + episode_number = 305 then 45
            when season_number * 100 + episode_number = 306 then 46
            when season_number * 100 + episode_number = 307 then 47
            when season_number * 100 + episode_number = 302 then 48
            when season_number * 100 + episode_number = 304 then 49
            when season_number * 100 + episode_number = 308 then 50
            when season_number * 100 + episode_number = 122 then 51
            when season_number * 100 + episode_number = 309 then 52
            when season_number * 100 + episode_number = 310 then 53
            when season_number * 100 + episode_number = 311 then 54
            when season_number * 100 + episode_number = 215 then 55
            when season_number * 100 + episode_number = 312 then 56
            when season_number * 100 + episode_number = 313 then 57
            when season_number * 100 + episode_number = 314 then 58
            when season_number * 100 + episode_number = 315 then 59
            when season_number * 100 + episode_number = 316 then 60
            when season_number * 100 + episode_number = 317 then 61
            when season_number * 100 + episode_number = 318 then 62
            when season_number * 100 + episode_number = 319 then 63
            when season_number * 100 + episode_number = 320 then 64
            when season_number * 100 + episode_number = 321 then 65
            when season_number * 100 + episode_number = 322 then 66
            when season_number * 100 + episode_number = 401 then 67
            when season_number * 100 + episode_number = 402 then 68
            when season_number * 100 + episode_number = 403 then 69
            when season_number * 100 + episode_number = 404 then 70
            when season_number * 100 + episode_number = 405 then 71
            when season_number * 100 + episode_number = 406 then 72
            when season_number * 100 + episode_number = 407 then 73
            when season_number * 100 + episode_number = 408 then 74
            when season_number * 100 + episode_number = 409 then 75
            when season_number * 100 + episode_number = 410 then 76
            when season_number * 100 + episode_number = 411 then 77
            when season_number * 100 + episode_number = 412 then 78
            when season_number * 100 + episode_number = 413 then 79
            when season_number * 100 + episode_number = 414 then 80
            when season_number * 100 + episode_number = 415 then 81
            when season_number * 100 + episode_number = 416 then 82
            when season_number * 100 + episode_number = 417 then 83
            when season_number * 100 + episode_number = 418 then 84
            when season_number * 100 + episode_number = 419 then 85
            when season_number * 100 + episode_number = 420 then 86
            when season_number * 100 + episode_number = 421 then 87
            when season_number * 100 + episode_number = 422 then 88
            when season_number * 100 + episode_number = 502 then 89
            when season_number * 100 + episode_number = 503 then 90
            when season_number * 100 + episode_number = 504 then 91
            when season_number * 100 + episode_number = 505 then 92
            when season_number * 100 + episode_number = 506 then 93
            when season_number * 100 + episode_number = 507 then 94
            when season_number * 100 + episode_number = 508 then 95
            when season_number * 100 + episode_number = 509 then 96
            when season_number * 100 + episode_number = 510 then 97
            when season_number * 100 + episode_number = 511 then 98
            when season_number * 100 + episode_number = 512 then 99
            when season_number * 100 + episode_number = 513 then 100
            when season_number * 100 + episode_number = 501 then 101
            when season_number * 100 + episode_number = 514 then 102
            when season_number * 100 + episode_number = 515 then 103
            when season_number * 100 + episode_number = 516 then 104
            when season_number * 100 + episode_number = 517 then 105
            when season_number * 100 + episode_number = 518 then 106
            when season_number * 100 + episode_number = 519 then 107
            when season_number * 100 + episode_number = 520 then 108
            when season_number * 100 + episode_number = 601 then 109
            when season_number * 100 + episode_number = 602 then 110
            when season_number * 100 + episode_number = 603 then 111
            when season_number * 100 + episode_number = 604 then 112
            when season_number * 100 + episode_number = 605 then 113
            when season_number * 100 + episode_number = 606 then 114
            when season_number * 100 + episode_number = 607 then 115
            when season_number * 100 + episode_number = 608 then 116
            when season_number * 100 + episode_number = 609 then 117
            when season_number * 100 + episode_number = 610 then 118
            when season_number * 100 + episode_number = 611 then 119
            when season_number * 100 + episode_number = 612 then 120
            when season_number * 100 + episode_number = 613 then 121
            when season_number * 100 + episode_number = 705 then 122
            when season_number * 100 + episode_number = 706 then 123
            when season_number * 100 + episode_number = 707 then 124
            when season_number * 100 + episode_number = 708 then 125
            when season_number * 100 + episode_number = 701 then 126
            when season_number * 100 + episode_number = 702 then 127
            when season_number * 100 + episode_number = 703 then 128
            when season_number * 100 + episode_number = 704 then 129
            when season_number * 100 + episode_number = 709 then 130
            when season_number * 100 + episode_number = 710 then 131
            when season_number * 100 + episode_number = 711 then 132
            when season_number * 100 + episode_number = 712 then 133
            else null
        end as![chronological_order] : Integer
    }
    where show.title = 'Star Wars: The Clone Wars';

// ─── Unified Media Views ──────────────────────────────────────────────────────
// Read-only UNION views across Film and Show.
// media_type is always 'FILM' or 'SHOW' — use show_type on the Show entity
// itself for finer-grained show classification.
// ─────────────────────────────────────────────────────────────────────────────

define view Media as
    select from Film {
        key ID,
        title,
        'FILM'        as media_type    : String,
        director,
        producer,
        release_date,
        episode_id,
        opening_crawl,
        null          as show_type     : String,
        null          as seasons       : Integer,
        null          as episode_count : Integer,
        null          as network       : String
    }
    union all select from Show {
        key ID,
        title,
        'SHOW'        as media_type    : String,
        director,
        producer,
        release_date,
        null          as episode_id    : Integer,
        null          as opening_crawl : String(2500),
        show_type,
        seasons,
        episode_count,
        network
    };

define view MediaCharacters as
    select from Film2People    { key film.ID as media_ID,    'FILM' as media_type : String, people }
    union all
    select from Show2People    { key show.ID as media_ID,    'SHOW' as media_type : String, people }
    union all
    select from Episode2People { key episode.show.ID as media_ID, 'SHOW' as media_type : String, people };

define view MediaPlanets as
    select from Film2Planets    { key film.ID as media_ID,    'FILM' as media_type : String, planet }
    union all
    select from Episode2Planets { key episode.show.ID as media_ID, 'SHOW' as media_type : String, planet };

define view MediaSpecies as
    select from Film2Species    { key film.ID as media_ID,    'FILM' as media_type : String, specie }
    union all
    select from Episode2Species { key episode.show.ID as media_ID, 'SHOW' as media_type : String, specie };

define view MediaStarships as
    select from Film2Starships    { key film.ID as media_ID,    'FILM' as media_type : String, starship }
    union all
    select from Episode2Starships { key episode.show.ID as media_ID, 'SHOW' as media_type : String, starship };

define view MediaVehicles as
    select from Film2Vehicles    { key film.ID as media_ID,    'FILM' as media_type : String, vehicle }
    union all
    select from Episode2Vehicles { key episode.show.ID as media_ID, 'SHOW' as media_type : String, vehicle };

/**
 * All People and Aliens in Star Wars
 */
@cds.autoexpose : true
entity People : cuid, managed {
    name       : String @mandatory;
    height     : IntegerLikeString;
    mass       : NumericString;
    /**
     * Person's Hair Color
     */
    hair_color : String;
    skin_color : String;
    eye_color  : String;
    birth_year : YearString;
    gender     : String;
    scoundrel  : Boolean default false;
    @assert.target
    homeworld  : Association to Planet;
    films      : Composition of many Film2People
                     on films.people = $self;
    species    : Composition of many Species2People
                     on species.people = $self;
    vehicles   : Composition of many Vehicle2Pilot
                     on vehicles.pilot = $self;
    starships  : Composition of many Starship2Pilot
                     on starships.pilot = $self;
    shows      : Composition of many Show2People
                     on shows.people = $self;
}

 annotate People with @PersonalData : {
    DataSubjectRole : 'Person',
    EntitySemantics : 'DataSubject'
}{
    ID @PersonalData.FieldSemantics: 'DataSubjectID';
    name @PersonalData.IsPotentiallyPersonal;
    mass @PersonalData.IsPotentiallySensitive;
} 


define view peopleCount as
    select from People distinct {
        count(
            *
        ) over(
            partition by homeworld.ID order by
                homeworld.name
        ) as people_count: Integer,
        homeworld.name,
    }
    order by
                people_count desc;

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
        Common.Text            : name,
        Common.TextArrangement : #TextOnly
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
        title                  : '{i18n>homeworld}',
        Common.Text            : homeworld.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueList       : {
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
    name            : String @mandatory;
    diameter        : IntegerLikeString;
    rotation_period : IntegerLikeString;
    orbital_period  : IntegerLikeString;
    gravity         : String;
    population      : IntegerLikeString;
    climate         : String;
    terrain         : String;
    surface_water   : IntegerLikeString;
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
        Common.Text            : name,
        Common.TextArrangement : #TextOnly
    );
    name            @(
        title                           : '{i18n>planetName}',
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
            CollectionPath : 'climateValues',
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
            CollectionPath : 'terrainValues',
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

annotate Planet2People with @assert.unique.planetPeoplePair : [planet, people];

annotate Planet2People with {
    ID     @Core.Computed;
    planet @(
        Common.Text                     : planet.name,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : people.name,
        Common.TextArrangement          : #TextOnly,
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

define view climateValues as
    select from Planet distinct {
        key climate
    };

define view terrainValues as
    select from Planet distinct {
        key terrain
    };


entity Species : cuid, managed {
    name             : String @mandatory;
    classification   : String;
    designation      : String;
    average_height   : IntegerLikeString;
    average_lifespan : IntegerLikeString;
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

define view classificationValues as
    select from Species distinct {
        key classification
    };

define view designationValues as
    select from Species distinct {
        key designation
    };

define view hairColorValues as
    select from Species distinct {
        key hair_colors
    };

define view skinColorValues as
    select from Species distinct {
        key skin_colors
    };

define view languageValues as
    select from Species distinct {
        key language
    };

define view eyeColorValues as
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
        Common.Text            : name,
        Common.TextArrangement : #TextOnly
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
            CollectionPath : 'classificationValues',
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
            CollectionPath : 'designationValues',
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
            CollectionPath : 'hairColorValues',
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
            CollectionPath : 'skinColorValues',
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
            CollectionPath : 'eyeColorValues',
            Parameters     : [{
                $Type             : 'Common.ValueListParameterInOut',
                LocalDataProperty : 'eye_colors',
                ValueListProperty : 'eye_colors'
            }]
        }
    );
    homeworld        @(
        title                  : '{i18n>homeworld}',
        Common.Text            : homeworld.name,
        Common.TextArrangement : #TextOnly,
        Common.ValueList       : {
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
            CollectionPath : 'languageValues',
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

annotate Species2People with @assert.unique.speciesPeoplePair : [species, people];

annotate Species2People with {
    ID      @Core.Computed;
    species @(
        Common.Text                     : species.name,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : people.name,
        Common.TextArrangement          : #TextOnly,
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

@cds.autoexpose : true
entity Starship : cuid, managed {
    name                   : String @mandatory;
    model                  : String;
    starship_class         : String;
    manufacturer           : String;
    cost_in_credits        : IntegerLikeString;
    length                 : NumericString;
    crew                   : IntegerLikeString;
    passengers             : IntegerLikeString;
    max_atmosphering_speed : IntegerLikeString;
    hyperdrive_rating      : NumericString;
    MGLT                   : IntegerLikeString;
    cargo_capacity         : IntegerLikeString;
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
        Common.Text            : name,
        Common.TextArrangement : #TextOnly
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

annotate Starship2Pilot with @assert.unique.starshipPilotPair : [starship, pilot];

annotate Starship2Pilot with {
    ID       @Core.Computed;
    starship @(
        Common.Text                     : starship.name,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : pilot.name,
        Common.TextArrangement          : #TextOnly,
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

@cds.autoexpose : true
entity Vehicles : cuid, managed {
    name                   : String @mandatory;
    model                  : String;
    vehicle_class          : String;
    manufacturer           : String;
    cost_in_credits        : IntegerLikeString;
    length                 : NumericString;
    crew                   : IntegerLikeString;
    passengers             : IntegerLikeString;
    max_atmosphering_speed : IntegerLikeString;
    cargo_capacity         : IntegerLikeString;
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
        Common.Text            : name,
        Common.TextArrangement : #TextOnly
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

annotate Vehicle2Pilot with @assert.unique.vehiclePilotPair : [vehicle, pilot];

annotate Vehicle2Pilot with {
    ID      @Core.Computed;
    vehicle @(
        Common.Text                     : vehicle.name,
        Common.TextArrangement          : #TextOnly,
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
        Common.Text                     : pilot.name,
        Common.TextArrangement          : #TextOnly,
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
