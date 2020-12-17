using StarWarsStarship as sws from './starship-service';

annotate sws.Starship with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Starship List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type             : 'UI.DataField',
            Value             : model,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : starship_class,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : manufacturer,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : cost_in_credits,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : length,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : crew,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : passengers,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : max_atmosphering_speed,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : hyperdrive_rating,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : MGLT,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : cargo_capacity,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : consumables,
            ![@UI.Importance] : #High
        }
        ],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : name}]
        },
        SelectionFields     : [
        name,
        model,
        starship_class,
        manufacturer
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
            TypeName       : '{i18n>Starship}',
            TypeNamePlural : '{i18n>Starships}',
            Description    : {Value : model}
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
            $Type             : 'UI.DataField',
            Value             : model,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : starship_class,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : manufacturer,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : cost_in_credits,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : length,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : crew,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : passengers,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : max_atmosphering_speed,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : hyperdrive_rating,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : MGLT,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : cargo_capacity,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : consumables,
            ![@UI.Importance] : #High
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
        ID     : 'StarshipDetails',
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
        Label  : '{i18n>Pilots}',
        Target : 'pilots/@UI.LineItem'
    }
    ]
);


annotate sws.Film2Starships with @( // header-level annotations
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
                Value : starship.name
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
        ID     : 'StarshipFilmDetails',
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
    // People List
    UI        : {
        TextArrangement     : #TextOnly,
        LineItem            : [
        {
            $Type             : 'UI.DataField',
            Value             : pilot_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.height,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.mass,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.hair_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.skin_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.eye_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.birth_year,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.gender,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ],
        PresentationVariant : {SortOrder : [{
            $Type      : 'Common.SortOrderType',
            Property   : pilot.name,
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
                Value : starship.name
            },
            TypeName       : '{i18n>Pilot}',
            TypeNamePlural : '{i18n>Pilots}',
            Description    : {Value : pilot.name}
        },
        FieldGroup #Description : {Data : [
        {
            $Type : 'UI.DataField',
            Value : pilot_ID,
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.height,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.mass,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.hair_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.skin_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.eye_color,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.birth_year,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.gender,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        },
        {
            $Type                   : 'UI.DataField',
            Value                   : pilot.homeworld.name,
            ![@Common.FieldControl] : #ReadOnly,
            ![@UI.Importance]       : #High
        }
        ]

        }

    },
    // Page Facets
    UI.Facets : [{
        $Type  : 'UI.CollectionFacet',
        ID     : 'StarshipPeopleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);
