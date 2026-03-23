sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'notificationservice',
            componentId: 'NT_V2_NOTIFICATION_KANRIObjectPage',
            contextPath: '/NT_V2_NOTIFICATION_KANRI'
        },
        CustomPageDefinitions
    );
});