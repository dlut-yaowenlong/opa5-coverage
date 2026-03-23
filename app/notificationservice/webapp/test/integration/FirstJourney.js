sap.ui.define([
    "sap/ui/test/opaQunit",
    "./pages/JourneyRunner"
], function (opaTest, runner) {
    "use strict";

    function journey() {
        QUnit.module("First journey");

        opaTest("Start application", function (Given, When, Then) {
            Given.iStartMyApp();
            // Given.iStartMyApp({
            //     hash: "NotificationService-display"
            // });
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iSeeThisPage();
        });

        opaTest("unit test", function (Given, When, Then) {
            // 普通フィルター項目(例外ケース番号)：文字列入力
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("CASE_NO_STR", "tom");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("CASE_NO_STR", "小数桁の無い数値を入力してください");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 普通フィルター項目(例外ケース番号)：20桁の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("CASE_NO_STR", 11234567890123456789);
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("CASE_NO_STR", "最大19文字（スペースを含む）のテキストを入力してください");            
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("CASE_NO_STR", "Enter a text with a maximum of 19 characters and spaces");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // リストアップフィルター項目(種別)：プルダウンリスト以外の値を指定
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("TYPE_CODE", "05 (契約異動予約以外)");
            // // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("TYPE_CODE", "値\"契約電力量以外\"が存在しません。");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("TYPE_CODE", "Value \"契約異動予約以外\" does not exist.");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // // リストアップフィルター項目(処理ステータス)：プルダウンリスト以外の値を指定
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("STATUS_CODE_SF", "5 (新規作成)");
            // // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_CODE_SF", "値\"新規作成\"が存在しません。");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_CODE_SF", "Value \"新規作成\" does not exist.");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 日付フィルター項目(例外発生日)：日付フォーマット以外の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("NOTIFICATION_DATE", "1920--01");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("NOTIFICATION_DATE", "値が不適切");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("NOTIFICATION_DATE", "Incorrect value");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 日付フィルター項目(例外発生日)：1970/01/01 - 9999/12/31範囲外の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("NOTIFICATION_DATE", "1920/12/01");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("NOTIFICATION_DATE", "日付範囲エラー");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("NOTIFICATION_DATE", "Incorrect value");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 日付フィルター項目(ステータス更新日)：日付フォーマット以外の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("STATUS_UPDATED_DATE", "joson");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_UPDATED_DATE", "値が不適切");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_UPDATED_DATE", "Incorrect value");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 日付フィルター項目(ステータス更新日)：1970/01/01 - 9999/12/31範囲外の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("STATUS_UPDATED_DATE", "1920/12/01");
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_UPDATED_DATE", "日付範囲エラー");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("STATUS_UPDATED_DATE", "Incorrect value");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 普通フィルター項目(処理者)：257桁の値を指定
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("UPDATED_USER_NAME", "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
            );
            // Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("UPDATED_USER_NAME", "最大256文字（スペースを含む）のテキストを入力してください");
            Then.onTheNT_V2_NOTIFICATION_KANRIList.iShouldSeeError("UPDATED_USER_NAME", "Enter a text with a maximum of 256 characters and spaces");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();
            // 普通フィルター項目(例外ケース番号)：直接入力
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("CASE_NO_STR", 2);
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 普通フィルター項目(例外ケース番号)：カタログ入力
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextByCatalog("CASE_NO_STR", 2);
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // リストアップフィルター項目(種別)：直接入力
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("TYPE_CODE", "0001 (システム異常)");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // // リストアップフィルター項目(種別)：リストアップ入力
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterListFilterValueByCatalog("TYPE_CODE", "0001 (システム異常)");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // リストアップフィルター項目(処理ステータス)：直接入力
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("STATUS_CODE_SF", "0001 (未対応)");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // // リストアップフィルター項目(処理ステータス)：リストアップ入力
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterListFilterValueByCatalog("STATUS_CODE_SF", "0001 (未対応)");
            // // 全てのフィルター項目：クリア
            // When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 普通フィルター項目(処理者)：直接入力
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextManually("UPDATED_USER_NAME", "tom");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();

            // 普通フィルター項目(処理者)：カタログ入力
            When.onTheNT_V2_NOTIFICATION_KANRIList.iEnterTextByCatalog("UPDATED_USER_NAME", "tom");
            // 全てのフィルター項目：クリア
            When.onTheNT_V2_NOTIFICATION_KANRIList.iClearFilters();
            // Given.iTearDownMyApp();
            // Given.iStartMyApp();
        });

        // opaTest("Navigate to ObjectPage", function (Given, When, Then) {
        //     // Note: this test will fail if the ListReport page doesn't show any data
        //     // When.onTheNT_V2_NOTIFICATION_KANRIList.onFilterBar().iExecuteSearch();

        //     // Then.onTheNT_V2_NOTIFICATION_KANRIList.onTable().iCheckRows();

        //     // When.onTheNT_V2_NOTIFICATION_KANRIList.onTable().iPressRow(0);
        //     // Then.onTheNT_V2_NOTIFICATION_KANRIObjectPage.iSeeThisPage();

        // });

        opaTest("Teardown", function (Given, When, Then) {
            // Cleanup
            Given.iTearDownMyApp();
        });
    }

    runner.run([journey]);
});