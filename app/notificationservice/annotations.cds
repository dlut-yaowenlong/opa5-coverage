using NOTIFICATION_SERVICE as service from '../../srv/notification-service-services';

annotate service.NT_V2_NOTIFICATION_KANRI with @(
    Capabilities                          : {
        FilterRestrictions           : {FilterExpressionRestrictions: [
            {
                Property          : 'NOTIFICATION_DATE',
                AllowedExpressions: 'SingleRange'
            },
            {
                Property          : 'STATUS_UPDATED_DATE',
                AllowedExpressions: 'SingleRange'
            }
        ]},
        InsertRestrictions.Insertable: false,
        DeleteRestrictions.Deletable : false,
    },

    UI.SelectionPresentationVariant #table: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem',
            ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : CASE_NO,
                Descending: true,
            }]
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
    },
    UI.HeaderInfo                         : {
        TypeName      : '例外通知',
        TypeNamePlural: '例外通知',
        Title         : {
            $Type: 'UI.DataField',
            Value: CASE_NO_STR,
        },
    },
    UI.SelectionFields                    : [
        CASE_NO_STR,
        TYPE_CODE,
        STATUS_CODE_SF,
        NOTIFICATION_DATE,
        STATUS_UPDATED_DATE,
        UPDATED_USER_NAME,
    ],
    UI.LineItem                           : [
        {
            $Type: 'UI.DataField',
            Value: CASE_NO_STR,
        },
        {
            $Type: 'UI.DataField',
            Value: ascNOTIFICATION_CODE.NAME,
            Label: '種別',
        },
        {
            $Type: 'UI.DataField',
            Value: MESSAGE,
        },
        {
            $Type: 'UI.DataField',
            Value: ascSTATUS_CODE.NAME,
            Label: '処理ステータス',
        },
        {
            $Type: 'UI.DataField',
            Value: NOTIFICATION_AT,
            Label: '例外発生日時',
        },
        {
            $Type: 'UI.DataField',
            Value: STATUS_MODIFIED_AT,
        },
        {
            $Type: 'UI.DataField',
            Value: UPDATED_USER_NAME,
            Label: '処理者(ユーザ名)',
        },
        {
            $Type: 'UI.DataField',
            Value: UPDATED_USER_ID,
            Label: '処理者(ユーザID)',
        },
    ],
    UI.Facets                             : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : '例外通知',
            ID    : '_',
            Target: '@UI.FieldGroup#_',
        },
        {
            $Type : 'UI.ReferenceFacet',
            Label : '対象情報',
            ID    : '_1',
            Target: 'NT_V2_NOTIFICATION_DETAIL/@UI.SelectionPresentationVariant#_',
        },
    ],
    UI.FieldGroup #_                      : {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Value: CASE_NO_STR,
            },
            {
                $Type: 'UI.DataField',
                Value: ascNOTIFICATION_CODE.NAME,
                Label: '種別',
            },
            {
                $Type: 'UI.DataField',
                Value: MESSAGE,
            },
            {
                $Type: 'UI.DataField',
                Value: STATUS_CODE,
            },
            {
                $Type: 'UI.DataField',
                Value: NOTIFICATION_AT,
                Label: '例外発生日時',
            },
            {
                $Type: 'UI.DataField',
                Value: STATUS_MODIFIED_AT,
            },
            {
                $Type: 'UI.DataField',
                Value: UPDATED_USER_NAME,
                Label: '処理者(ユーザ名)',
            },
            {
                $Type: 'UI.DataField',
                Value: UPDATED_USER_ID,
                Label: '処理者(ユーザID)',
            },
        ],
    },
);

annotate service.NT_V2_NOTIFICATION_KANRI with {
    CASE_NO_STR @(
        Common.Label       : '例外ケース番号',
        Common.FieldControl: #ReadOnly,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    NOTIFICATION_DATE @Common.Label: '例外発生日'
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_UPDATED_DATE @Common.Label: 'ステータス更新日'
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    TYPE_CODE @(
        Common.Label                   : '種別',
        Common.ValueList               : {
            $Type                       : 'Common.ValueListType',
            CollectionPath              : 'BS_V2_CODE_NOTIFICATION',
            Parameters                  : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: TYPE_CODE,
                ValueListProperty: 'CODE',
            }, ],
            PresentationVariantQualifier: 'vh_NT_V2_NOTIFICATION_KANRI_NOTIFICATION_CODE',
        },
        Common.ValueListWithFixedValues: true,
        Common.Text                    : ascNOTIFICATION_CODE.NAME,
        Common.FieldControl            : #ReadOnly,
        Common.Text.@UI.TextArrangement: #TextLast,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    UPDATED_USER_NAME @(
        Common.Label       : '処理者',
        Common.FieldControl: #ReadOnly,
    )
};

annotate service.BS_V2_CODE_NOTIFICATION with @(UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_NOTIFICATION_CODE: {
    $Type    : 'UI.PresentationVariantType',
    SortOrder: [{
        $Type     : 'Common.SortOrderType',
        Property  : CODE,
        Descending: false,
    }, ],
});

annotate service.BS_V2_CODE_NOTIFICATION with {
    CODE @(
        Common.Text                    : NAME,
        Common.Text.@UI.TextArrangement: #TextLast,
    )
};

annotate service.BS_V2_CODE_NOTIFICATION_STATUS with @(
    UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE : {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
    UI.PresentationVariant #vh_BS_V2_CODE_NOTIFICATION_STATUS_NAME  : {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
    UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE1: {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
    UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_CASE_NO_STR : {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
    UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE2: {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
    UI.PresentationVariant #vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE3: {
        $Type    : 'UI.PresentationVariantType',
        SortOrder: [{
            $Type     : 'Common.SortOrderType',
            Property  : CODE,
            Descending: false,
        }, ],
    },
);

annotate service.BS_V2_CODE_NOTIFICATION_STATUS with {
    CODE @(
        Common.Text                    : NAME,
        Common.Text.@UI.TextArrangement: #TextLast,
    )
};

annotate service.NT_V2_NOTIFICATION_DETAIL with @(
    UI.LineItem #_                    : [
        {
            $Type: 'UI.DataField',
            Value: SCREEN_NAME,
            Label: '飛び先オブジェクト',
        },
        {
            $Type: 'UI.DataField',
            Value: SCREEN_KEY,
            Label: 'キー',
        },
        {
            $Type: 'UI.DataField',
            Value: CONTEXT,
        },
    ],
    UI.SelectionPresentationVariant #_: {
        $Type              : 'UI.SelectionPresentationVariantType',
        PresentationVariant: {
            $Type         : 'UI.PresentationVariantType',
            Visualizations: ['@UI.LineItem#_',
            ],
            SortOrder     : [{
                $Type     : 'Common.SortOrderType',
                Property  : SCREEN_NAME,
                Descending: false,
            }, ],
        },
        SelectionVariant   : {
            $Type        : 'UI.SelectionVariantType',
            SelectOptions: [],
        },
    },
);

annotate service.NT_V2_NOTIFICATION_KANRI with {
    MESSAGE @Common.FieldControl: #ReadOnly
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    NOTIFICATION_AT @Common.FieldControl: #ReadOnly
};

annotate service.BS_V2_CODE_NOTIFICATION with {
    NAME @Common.FieldControl: #ReadOnly
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_MODIFIED_AT @Common.FieldControl: #ReadOnly
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    UPDATED_USER_ID @Common.FieldControl: #ReadOnly
};

annotate service.BS_V2_CODE_NOTIFICATION_STATUS with {
    NAME @(
        Common.ValueList               : {
            $Type                       : 'Common.ValueListType',
            CollectionPath              : 'BS_V2_CODE_NOTIFICATION_STATUS',
            Parameters                  : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: NAME,
                ValueListProperty: 'CODE',
            }, ],
            PresentationVariantQualifier: 'vh_BS_V2_CODE_NOTIFICATION_STATUS_NAME',
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_CODE_SF @(
        Common.Text                    : ascSTATUS_CODE.NAME,
        Common.Text.@UI.TextArrangement: #TextLast,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_CODE_SF @(
        Common.ValueList               : {
            $Type                       : 'Common.ValueListType',
            CollectionPath              : 'BS_V2_CODE_NOTIFICATION_STATUS',
            Parameters                  : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: STATUS_CODE_SF,
                ValueListProperty: 'CODE',
            }, ],
            PresentationVariantQualifier: 'vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE3',
        },
        Common.ValueListWithFixedValues: true,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_CODE @(
        Common.Text                    : ascSTATUS_CODE.NAME,
        Common.Text.@UI.TextArrangement: #TextOnly,
    )
};

annotate service.NT_V2_NOTIFICATION_KANRI with {
    STATUS_CODE @(
        Common.ValueList               : {
            $Type                       : 'Common.ValueListType',
            CollectionPath              : 'BS_V2_CODE_NOTIFICATION_STATUS',
            Parameters                  : [{
                $Type            : 'Common.ValueListParameterInOut',
                LocalDataProperty: STATUS_CODE,
                ValueListProperty: 'CODE',
            }, ],
            PresentationVariantQualifier: 'vh_NT_V2_NOTIFICATION_KANRI_STATUS_CODE3',
        },
        Common.ValueListWithFixedValues: true,
    )
};

