context BS {
    // @cds.persistence.exists
    entity V2_CODE_NOTIFICATION {
        key CODE : String(4) not null;
            NAME : String(256) not null;
    }

    // @cds.persistence.exists
    entity V2_CODE_NOTIFICATION_STATUS {
        key CODE : String(4) not null;
            NAME : String(256) not null;
    }
}

context NT {
    // @cds.persistence.exists
    entity V2_NOTIFICATION_KANRI {
        key CASE_NO                   : Integer64 not null    @title: '通知ケース番号';
            TYPE_CODE                 : String(4) not null    @title: '通知コード';
            MESSAGE                   : String(5000) not null @title: 'メッセージ';
            NOTIFICATION_AT           : Timestamp not null    @title: '通知発生日時';
            MANAGE_DEPARTMENT         : String(256)           @title: '処置担当部門';
            MANAGE_USER_ID            : String(256)           @title: '処置担当ユーザID';
            STATUS_CODE               : String(4) not null    @title: '処理ステータス';
            STATUS_MODIFIED_AT        : Timestamp             @title: 'ステータス更新日時';
            UPDATED_USER_ID           : String(256)           @title: 'ステータス更新ユーザID';
            UPDATED_USER_NAME         : String(256)           @title: 'ステータス更新ユーザ名';
            NT_V2_NOTIFICATION_DETAIL : Composition of many V2_NOTIFICATION_DETAIL
                                            on NT_V2_NOTIFICATION_DETAIL.CASE_NO = CASE_NO;
    }

    // @cds.persistence.exists
    entity V2_NOTIFICATION_DETAIL {
        key CASE_NO     : Integer64 not null   @title: '例外ケース番号';
            SCREEN_NAME : String(300) not null @title: '遷移先オブジェクト名';
            SCREEN_KEY  : String(300) not null @title: '遷移先Key情報';
            CONTEXT     : String(300) not null @title: '内容';
        key SHELLHASH   : String(300) not null @title: 'シェルハッシュ';
    }
}
