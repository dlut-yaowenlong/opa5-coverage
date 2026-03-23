using {
    BS,
    NT
} from '../db/notification-service-entity';

service NOTIFICATION_SERVICE {

    entity BS_V2_CODE_NOTIFICATION        as projection on BS.V2_CODE_NOTIFICATION;
    entity BS_V2_CODE_NOTIFICATION_STATUS as projection on BS.V2_CODE_NOTIFICATION_STATUS;

    entity NT_V2_NOTIFICATION_KANRI       as
        projection on NT.V2_NOTIFICATION_KANRI {
            CASE_NO,
            cast(
                CASE_NO as String(19)
            )           as CASE_NO_STR,
            TYPE_CODE,
            ascNOTIFICATION_CODE      : Association to BS_V2_CODE_NOTIFICATION
                                            on ascNOTIFICATION_CODE.CODE = TYPE_CODE,
            MESSAGE,
            NOTIFICATION_AT,
            cast(
                DATEADD(
                    'HOUR', 9, NOTIFICATION_AT
                ) as Date
            )           as NOTIFICATION_DATE,
            MANAGE_DEPARTMENT,
            MANAGE_USER_ID,
            STATUS_CODE,
            ascSTATUS_CODE            : Association to BS_V2_CODE_NOTIFICATION_STATUS
                                            on ascSTATUS_CODE.CODE = STATUS_CODE,
            STATUS_CODE as STATUS_CODE_SF,
            STATUS_MODIFIED_AT,
            cast(
                STATUS_MODIFIED_AT as Date
            )           as STATUS_UPDATED_DATE,
            UPDATED_USER_ID,
            UPDATED_USER_NAME,
            NT_V2_NOTIFICATION_DETAIL : Composition of many NT_V2_NOTIFICATION_DETAIL
                                            on NT_V2_NOTIFICATION_DETAIL.CASE_NO = CASE_NO,
        }

    @readonly
    entity NT_V2_NOTIFICATION_DETAIL      as
        projection on NT.V2_NOTIFICATION_DETAIL {
            CASE_NO,
            SCREEN_NAME,
            SCREEN_KEY,
            CONTEXT,
            SHELLHASH
        };
}

annotate NOTIFICATION_SERVICE.NT_V2_NOTIFICATION_KANRI with @odata.draft.enabled: true;
