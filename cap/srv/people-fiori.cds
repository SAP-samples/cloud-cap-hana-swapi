using StarWarsPeople as sws from './people-service';

annotate sws.Planet with @(UI.TextArrangement : #TextOnly);

annotate sws.People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // People List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type             : 'UI.DataField',
            Value             : homeworld_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : gender,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : birth_year,
            ![@UI.Importance] : #High
        }
        ],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : name}]
        },
        SelectionFields     : [
        name,
        gender,
        homeworld_ID,
        birth_year
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
                Value : name,
            },
            TypeName       : '{i18n>People}',
            TypeNamePlural : '{i18n>PeopleM}',
            Description    : {Value : homeworld_ID}
        },
        HeaderFacets            : [{
            $Type             : 'UI.ReferenceFacet',
            Target            : '@UI.FieldGroup#Admin',
            ![@UI.Importance] : #Medium
        }],
        FieldGroup #Description : {Data : [{
            $Type : 'UI.DataField',
            Value : name,
        }, ]},
        FieldGroup #Details     : {Data : [
        {
            $Type : 'UI.DataField',
            Value : homeworld_ID,
        },
        {
            $Type : 'UI.DataField',
            Value : height,
        },
        {
            $Type : 'UI.DataField',
            Value : mass,
        },
        {
            $Type : 'UI.DataField',
            Value : hair_color,
        },
        {
            $Type : 'UI.DataField',
            Value : skin_color,
        },
        {
            $Type : 'UI.DataField',
            Value : eye_color,
        },
        {
            $Type : 'UI.DataField',
            Value : birth_year,
        },
        {
            $Type : 'UI.DataField',
            Value : gender,
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
        ID     : 'PeopleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Details'
        }]
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>Films}',
        Target : 'films/@UI.LineItem'
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
    // Film List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : film_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.episode_id,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.release_date,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.director,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.producer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.opening_crawl,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : film.release_date,
            Descending : false
        }]}
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Film Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : people.name
            },
            TypeName       : '{i18n>Film}',
            TypeNamePlural : '{i18n>Films}',
            Description    : {Value : film.title}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : film_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.episode_id,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.release_date,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.director,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.producer,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : film.opening_crawl,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]

        }

    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'PeopleFilmDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Species2People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Species List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : species_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.classification,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.designation,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.language,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : species.name,
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
                Value : people.name
            },
            TypeName       : '{i18n>Species}',
            TypeNamePlural : '{i18n>Species}',
            Description    : {Value : species.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : species_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.classification,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.designation,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.language,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : species.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]}
    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'PeopleSpeciesDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Vehicle2Pilot with @( // header-level annotations
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
                Value : pilot.name
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
        ID     : 'PeopleVehicleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);


annotate sws.Starship2Pilot with @( // header-level annotations
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
                Value : pilot.name
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
        ID     : 'PeopleVehicleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);
