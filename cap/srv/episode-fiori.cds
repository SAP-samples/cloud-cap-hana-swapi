using StarWarsEpisode from './episode-service';

annotate StarWarsEpisode.Episodes with @UI.LineItem: [
    { $Type: 'UI.DataField', Value: season_number },
    { $Type: 'UI.DataField', Value: episode_number },
    { $Type: 'UI.DataField', Value: title },
    { $Type: 'UI.DataField', Value: air_date },
    { $Type: 'UI.DataField', Value: director },
];
