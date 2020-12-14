using StarWarsService as sws from './service';

annotate sws.Planet with @(UI.TextArrangement : #TextOnly);

annotate sws.People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // People List
    UI        : {
        TextArrangement : #TextOnly,
        LineItem        : [
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
        SelectionFields : [
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
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Description',
        }, ],
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
        ], }

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
    }
    ]
);

annotate sws.Film2People with @( // header-level annotations
// ---------------------------------------------------------------------------
// List Report
// ---------------------------------------------------------------------------
// People List
UI : {
    TextArrangement     : #TextOnly,
    LineItem            : [
    {
        $Type                   : 'UI.DataField',
        Value                   : film_ID,
        ![@UI.Importance]       : #High
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
}

);
