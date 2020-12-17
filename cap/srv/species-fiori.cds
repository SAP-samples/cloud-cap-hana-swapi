using StarWarsSpecies as sws from './species-service';

annotate sws.Species with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // Species List
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
            Value             : classification,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : designation,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : language,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : average_height,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : average_lifespan,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : hair_colors,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : skin_colors,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : eye_colors,
            ![@UI.Importance] : #High
        }
        ],
        PresentationVariant : {
            $Type     : 'UI.PresentationVariantType',
            SortOrder : [{Property : name}]
        },
        SelectionFields     : [
        name,
        homeworld_ID,
        classification,
        designation,
        hair_colors,
        skin_colors,
        eye_colors,
        language
        ]
    }, // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : name,
            },
            TypeName       : '{i18n>Species}',
            TypeNamePlural : '{i18n>SpeciesM}',
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
            $Type             : 'UI.DataField',
            Value             : homeworld_ID,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : classification,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : designation,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : language,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : average_height,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : average_lifespan,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : hair_colors,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : skin_colors,
            ![@UI.Importance] : #High
        },
        {
            $Type             : 'UI.DataField',
            Value             : eye_colors,
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
        ID     : 'SpeciesDetails',
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
        Label  : '{i18n>People}',
        Target : 'people/@UI.LineItem'
    }
    ]
);


annotate sws.Film2Species with @( // header-level annotations
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
                Value : specie.name
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
        ID     : 'SpeciesFilmDetails',
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
    // Film List
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
    // Film Page Header
    UI        : {
        HeaderInfo              : {
            Title          : {
                $Type : 'UI.DataField',
                Value : species.name
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
        ID     : 'SpeciesPeopleDetails',
        Label  : '{i18n>details}',
        Facets : [{
            $Type  : 'UI.ReferenceFacet',
            Label  : '{i18n>details}',
            Target : '@UI.FieldGroup#Description'
        }]
    }]
);
