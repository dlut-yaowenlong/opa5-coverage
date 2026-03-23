sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"notificationservice/test/integration/pages/NT_V2_NOTIFICATION_KANRIList",
	"notificationservice/test/integration/pages/NT_V2_NOTIFICATION_KANRIObjectPage"
], function (JourneyRunner, NT_V2_NOTIFICATION_KANRIList, NT_V2_NOTIFICATION_KANRIObjectPage) {
    'use strict';

    var runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('notificationservice') + '/test/flpSandbox.html#notificationservice-tile?sap-language=JA',
        pages: {
			onTheNT_V2_NOTIFICATION_KANRIList: NT_V2_NOTIFICATION_KANRIList,
			onTheNT_V2_NOTIFICATION_KANRIObjectPage: NT_V2_NOTIFICATION_KANRIObjectPage
        },
        async: true
    });

    return runner;
});

