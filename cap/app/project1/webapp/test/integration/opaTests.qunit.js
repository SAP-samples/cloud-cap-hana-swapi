sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'project1/test/integration/FirstJourney',
		'project1/test/integration/pages/PeopleList',
		'project1/test/integration/pages/PeopleObjectPage',
		'project1/test/integration/pages/Film2PeopleObjectPage'
    ],
    function(JourneyRunner, opaJourney, PeopleList, PeopleObjectPage, Film2PeopleObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('project1') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePeopleList: PeopleList,
					onThePeopleObjectPage: PeopleObjectPage,
					onTheFilm2PeopleObjectPage: Film2PeopleObjectPage
                }
            },
            opaJourney.run
        );
    }
);