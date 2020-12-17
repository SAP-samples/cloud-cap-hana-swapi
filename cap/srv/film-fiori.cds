using StarWarsFilm as sws from './film-service';

annotate sws.Film with @(UI.TextArrangement : #TextOnly);

annotate sws.Film with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Film List
    UI        : {
        LineItem            : [
        {
            $Type : 'UI.DataField',
            Value : title
        },
        {
            $Type             : 'UI.DataField',
            Value             : episode_id,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : director,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : producer,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : release_date,
            ![@UI.Importance] : #High
        }
        ],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : release_date}]
        },
        SelectionFields     : [
        title,
        episode_id,
        director,
        producer,
        release_date
        ]
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : title,
            },
            TypeName       : '{i18n>People}',
            TypeNamePlural : '{i18n>PeopleM}',
            Description    : {Value : episode_id}
        },
        HeaderFacets            : [{
            $Type             : 'UI.ReferenceFacet',
            Target            : '@UI.FieldGroup#Admin',
            ![@UI.Importance] : #Medium
        }],
        FieldGroup #Description : {Data : [{
            $Type : 'UI.DataField',
            Value : title
        }, ]},
        FieldGroup #Details     : {Data : [
        {
            $Type : 'UI.DataField',
            Value : episode_id,
        },
        {
            $Type : 'UI.DataField',
            Value : opening_crawl,
        },
        {
            $Type : 'UI.DataField',
            Value : director,
        },
        {
            $Type : 'UI.DataField',
            Value : producer,
        },
        {
            $Type : 'UI.DataField',
            Value : release_date,
        }
        ]

        },
        FieldGroup #Admin       : {Data : [
        {
            $Type : 'UI.DataField',
            Value : createdBy
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedBy
        },
        {
            $Type : 'UI.DataField',
            Value : createdAt
        },
        {
            $Type : 'UI.DataField',
            Value : modifiedAt
        }
        ]}

    },
    // Page Facets
    UI.Facets : [
    {
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Details'
        }]
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>characters}',
        Target : 'characters/@UI.LineItem'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>planets}',
        Target : 'planets/@UI.LineItem'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>Species}',
        Target : 'species/@UI.LineItem'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>Starships}',
        Target : 'starships/@UI.LineItem'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>Vehicles}',
        Target : 'vehicles/@UI.LineItem'
    }
    ]
);

annotate sws.Film2People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // People List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : people_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.height,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.mass,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.hair_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.skin_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.eye_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.birth_year,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.gender,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : people.name,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // People Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : film.title
            },
            TypeName       : '{i18n>People}',
            TypeNamePlural : '{i18n>PeopleM}',
            Description    : {Value : people.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : people_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.height,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.mass,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.hair_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.skin_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.eye_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.birth_year,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.gender,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : people.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]

        }

    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmPeopleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Film2Species with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Species List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : specie_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.classification,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.designation,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.language,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : specie.name,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Species Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : film.title
            },
            TypeName       : '{i18n>Species}',
            TypeNamePlural : '{i18n>Species}',
            Description    : {Value : specie.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : specie_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.classification,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.designation,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.language,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : specie.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]}
    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmSpeciesDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Film2Vehicles with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Vehicle List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : vehicle_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.model,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.vehicle_class,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.manufacturer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.crew,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.passengers,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.cost_in_credits,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.length,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.max_atmosphering_speed,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.cargo_capacity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.consumables,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : vehicle.name,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Vehicle Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : film.title
            },
            TypeName       : '{i18n>Vehicle}',
            TypeNamePlural : '{i18n>Vehicles}',
            Description    : {Value : vehicle.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : vehicle_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.model,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.vehicle_class,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.manufacturer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.crew,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.passengers,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.cost_in_credits,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.length,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.max_atmosphering_speed,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.cargo_capacity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : vehicle.consumables,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]}
    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmVehicleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Film2Starships with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Vehicle List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : starship_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.model,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.starship_class,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.manufacturer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.crew,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.passengers,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.cost_in_credits,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.length,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.max_atmosphering_speed,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.cargo_capacity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.consumables,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.hyperdrive_rating,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.MGLT,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : starship.name,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Vehicle Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : film.title
            },
            TypeName       : '{i18n>Starship}',
            TypeNamePlural : '{i18n>Starships}',
            Description    : {Value : starship.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : starship_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.model,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.starship_class,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.manufacturer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.crew,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.passengers,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.cost_in_credits,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.length,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.max_atmosphering_speed,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.cargo_capacity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.consumables,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.hyperdrive_rating,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : starship.MGLT,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]}
    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmStarshipDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Film2Planets with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Planets List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : planet_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.diameter,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.rotation_period,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.orbital_period,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.gravity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.population,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.climate,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.terrain,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.surface_water,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : planet.name,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Planet Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : film.title
            },
            TypeName       : '{i18n>Planet}',
            TypeNamePlural : '{i18n>Planets}',
            Description    : {Value : planet.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : planet_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.diameter,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.rotation_period,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.orbital_period,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.gravity,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.population,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.climate,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.terrain,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : planet.surface_water,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]}
    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'FilmPlanetDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);
