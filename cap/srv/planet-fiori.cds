using StarWarsPlanet as sws from './planet-service';

annotate sws.Planet with @(UI.TextArrangement : #TextOnly);

annotate sws.Planet with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Planet List
    UI        : {
        LineItem            : [
        {
            $Type : 'UI.DataField',
            Value : name
        },
        {
            $Type             : 'UI.DataField',
            Value             : diameter,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : rotation_period,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : orbital_period,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : gravity,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : population,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : climate,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : terrain,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : surface_water,
            ![@UI.Importance] : #High
        }
        ],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : name}]
        },
        SelectionFields     : [
        name,
        climate,
        terrain,
        gravity,
        population
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
            TypeName       : '{i18n>Planet}',
            TypeNamePlural : '{i18n>Planets}',
            Description    : {Value : climate}
        },
        HeaderFacets            : [{
            $Type             : 'UI.ReferenceFacet',
            Target            : '@UI.FieldGroup#Admin',
            ![@UI.Importance] : #Medium
        }],
        FieldGroup #Description : {Data : [{
            $Type : 'UI.DataField',
            Value : name
        }, ]},
        FieldGroup #Details     : {Data : [
        {
            $Type             : 'UI.DataField',
            Value             : diameter,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : rotation_period,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : orbital_period,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : gravity,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : population,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : climate,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : terrain,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : surface_water,
            ![@UI.Importance] : #High
        }
        ]},
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
        ID     : 'PlanetDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Details'
        }]
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>residents}',
        Target : 'residents/@UI.LineItem'
    },
    {
        $Type  : 'UI.ReferenceFacet',
        Label  : '{i18n>films}',
        Target : 'films/@UI.LineItem'
    }
    ]
);

annotate sws.Planet2People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Residents List
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
    // Residents Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : planet.name
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
        ID     : 'PlanetPeopleDetails',
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
                Value : planet.name
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
        ID     : 'PlanetFilmDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);