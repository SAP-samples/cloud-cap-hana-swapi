using StarWarsShow as sws from './show-service';

annotate sws.Media with @(UI.TextArrangement : #TextOnly);

annotate sws.Media with @(
    UI : {
        LineItem : [
            { $Type : 'UI.DataField', Value : title },
            { $Type : 'UI.DataField', Value : media_type,    ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : show_type,     ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : release_date,  ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : director,      ![@UI.Importance] : #High },
            { $Type : 'UI.DataField', Value : seasons,       ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : episode_count, ![@UI.Importance] : #Medium },
            { $Type : 'UI.DataField', Value : network,       ![@UI.Importance] : #Medium }
        ],
        SelectionFields : [media_type, show_type, network, director, release_date],
        HeaderInfo : {
            TypeName       : 'Media',
            TypeNamePlural : 'Media',
            Title          : { Value : title },
            Description    : { Value : media_type }
        },
        Facets : [
            {
                $Type  : 'UI.ReferenceFacet',
                Label  : 'General',
                Target : '@UI.FieldGroup#General'
            },
            {
                $Type         : 'UI.ReferenceFacet',
                Label         : 'Show Details',
                Target        : '@UI.FieldGroup#ShowDetails',
                ![@UI.Hidden] : { $edmJson : { $Ne : [{ $Path : 'media_type' }, 'SHOW'] } }
            },
            {
                $Type         : 'UI.ReferenceFacet',
                Label         : 'Film Details',
                Target        : '@UI.FieldGroup#FilmDetails',
                ![@UI.Hidden] : { $edmJson : { $Ne : [{ $Path : 'media_type' }, 'FILM'] } }
            }
        ],
        FieldGroup#General : {
            Data : [
                {
                    $Type : 'UI.DataFieldWithUrl',
                    Label : 'Open in Edit App',
                    Value : edit_url,
                    Url   : edit_url
                },
                { $Type : 'UI.DataField', Value : title },
                { $Type : 'UI.DataField', Value : media_type },
                { $Type : 'UI.DataField', Value : director },
                { $Type : 'UI.DataField', Value : producer },
                { $Type : 'UI.DataField', Value : release_date }
            ]
        },
        FieldGroup#ShowDetails : {
            Data : [
                { $Type : 'UI.DataField', Value : show_type },
                { $Type : 'UI.DataField', Value : seasons },
                { $Type : 'UI.DataField', Value : episode_count },
                { $Type : 'UI.DataField', Value : network }
            ]
        },
        FieldGroup#FilmDetails : {
            Data : [
                { $Type : 'UI.DataField', Value : episode_id },
                { $Type : 'UI.DataField', Value : opening_crawl, ![@UI.MultiLineText] : true }
            ]
        }
    }
);
