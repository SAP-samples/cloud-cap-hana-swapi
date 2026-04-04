using StarWarsShow as sws from './show-service';

annotate sws.Show with @(UI.TextArrangement : #TextOnly);

annotate sws.Show with @(
    UI : {
        LineItem : [
            { $Type : 'UI.DataField', Value : title },
            { $Type : 'UI.DataField', Value : show_type,     ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : director,      ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : release_date,  ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : seasons,       ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : episode_count, ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : network,       ![@UI.Importance] : #Medium }
        ],
        SelectionFields : [show_type, network, director, release_date],
        HeaderInfo : {
            TypeName       : '{i18n>Show}',
            TypeNamePlural : '{i18n>Shows}',
            Title          : { Value : title },
            Description    : { Value : show_type }
        },
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>ShowDetails}',
                Target : '@UI.FieldGroup#Main'
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>episodes}',
                Target : 'episodes/@UI.LineItem'
            },
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : '{i18n>characters}',
                Target : 'characters/@UI.LineItem'
            }
        ],
        FieldGroup#Main : {
            Data : [
                { $Type : 'UI.DataField', Value : title },
                { $Type : 'UI.DataField', Value : show_type },
                { $Type : 'UI.DataField', Value : seasons },
                { $Type : 'UI.DataField', Value : episode_count },
                { $Type : 'UI.DataField', Value : network },
                { $Type : 'UI.DataField', Value : director },
                { $Type : 'UI.DataField', Value : producer },
                { $Type : 'UI.DataField', Value : release_date }
            ]
        }
    }
);

annotate sws.Episode with @(
    UI.TextArrangement : #TextOnly,
    UI.LineItem : [
        { $Type : 'UI.DataField', Value : season_number,  ![@UI.Importance] : #High },
        { $Type : 'UI.DataField', Value : episode_number, ![@UI.Importance] : #High },
        { $Type : 'UI.DataField', Value : title,          ![@UI.Importance] : #High },
        { $Type : 'UI.DataField', Value : air_date,       ![@UI.Importance] : #High },
        { $Type : 'UI.DataField', Value : director },
        { $Type : 'UI.DataField', Value : writer },
        { $Type : 'UI.DataField', Value : runtime },
        { $Type : 'UI.DataField', Value : timeline }
    ],
    UI.HeaderInfo : {
        TypeName       : 'Episode',
        TypeNamePlural : 'Episodes',
        Title          : { Value : title },
        Description    : { Value : season_number }
    },
    UI.Facets : [{
        $Type  : 'UI.ReferenceFacet',
        Label  : 'Episode Details',
        Target : '@UI.FieldGroup#EpisodeDetails'
    }],
    UI.FieldGroup#EpisodeDetails : {
        Data : [
            { $Type : 'UI.DataField', Value : season_number },
            { $Type : 'UI.DataField', Value : episode_number },
            { $Type : 'UI.DataField', Value : title },
            { $Type : 'UI.DataField', Value : air_date },
            { $Type : 'UI.DataField', Value : director },
            { $Type : 'UI.DataField', Value : writer },
            { $Type : 'UI.DataField', Value : runtime },
            { $Type : 'UI.DataField', Value : timeline }
        ]
    }
);

annotate sws.Show2People with @UI.LineItem : [
    { $Type : 'UI.DataField', Value : people.name, Label : '{i18n>peopleName}' }
];
