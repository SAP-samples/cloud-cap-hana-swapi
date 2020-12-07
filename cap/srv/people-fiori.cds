using StarWarsService as sws from './service';

annotate sws.Planet with @( 
    UI.TextArrangement : #TextOnly
);
annotate sws.People with @( // header-level annotations
    // ---------------------------------------------------------------------------
    // List Report
    // ---------------------------------------------------------------------------
    // People List
    UI : {
        TextArrangement  : #TextOnly,
        LineItem        : [
        {
            $Type : 'UI.DataField',
            Value : name,

        },
        {
            $Type : 'UI.DataField',
            Value : homeworld_ID,
            ![@UI.Importance] : #High
        }
        ],
        SelectionFields : [
        homeworld_ID
        ],
    },
    // ---------------------------------------------------------------------------
    // Object Page
    // ---------------------------------------------------------------------------
    // Page Header
    UI : {
        HeaderInfo          : {Title : {
            $Type : 'UI.DataField',
            Value : name,
        }, },
        HeaderFacets        : [{
            $Type  : 'UI.ReferenceFacet',
            Target : '@UI.FieldGroup#Details',
        }, ],
        FieldGroup #Details : {Data : [
        {
            $Type : 'UI.DataField',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Value : homeworld_ID,
        }        
        ], }

    }
);
