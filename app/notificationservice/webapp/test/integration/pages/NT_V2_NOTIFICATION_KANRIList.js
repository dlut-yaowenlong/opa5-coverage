sap.ui.define(['sap/fe/test/ListReport',
    "sap/ui/test/Opa5",
    "sap/ui/test/actions/EnterText",
    "sap/ui/test/actions/Press",
    "sap/ui/test/matchers/PropertyStrictEquals",
    "sap/ui/test/matchers/Ancestor",
    "sap/ui/test/matchers/Properties",
    "sap/ui/unified/DateRange"
], function (ListReport, Opa5, EnterText, Press, PropertyStrictEquals, Ancestor, Properties, DateRange) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {
            /**
             * 指定した検索欄に対してユーザーが手入力する操作をシミュレートして文字列を入力するメソッド。
             *
             * ValueHelp や API 直接操作ではなく、EnterText アクションを使用することで、実際の画面操作に近い形で入力を行う。
             *
             * @param {string} searchFieldName
             *        入力対象となる検索欄の識別子（FilterField の propertyKey）。
             * @param {string} inputValue
             *        検索欄に手入力する文字列。
             */
            iEnterTextManually: function (searchFieldName, inputValue) {
                return this.waitFor({
                    controlType: "sap.ui.mdc.FilterField",
                    matchers: new PropertyStrictEquals({
                        name: "propertyKey",
                        value: searchFieldName
                    }),
                    actions: new EnterText({ text: inputValue }),
                    success: function () {
                        Opa5.assert.ok(true, searchFieldName + "に" + inputValue + "を直接入力した");
                    },
                    errorMessage: searchFieldName + "の FilterField が見つからなかった"
                });
            },

            /**
            * 指定した検索欄に対して、ValueHelpダイアログを操作し、ダイアログ内で値を入力・追加・確定する一連の操作を実行するメソッド。
            *
            * @param {string} searchFieldName
            *        操作対象となる検索欄の識別子（FilterField の propertyKey）。
            * @param {string} inputValue
            *        ValueHelp ダイアログ内で入力する値。
            */
            iEnterTextByCatalog: function (searchFieldName, inputValue) {
                return this.waitFor({
                    controlType: "sap.ui.mdc.FilterField",
                    matchers: new PropertyStrictEquals({
                        name: "propertyKey",
                        value: searchFieldName
                    }),
                    success: function (aFields) {
                        const oField = aFields[0];

                        this.waitFor({
                            controlType: "sap.ui.core.Icon",
                            matchers: [
                                new Ancestor(oField, false),
                                new Properties({ src: "sap-icon://value-help" })
                            ],
                            actions: new Press(),
                            success: function () {
                                this.waitFor({
                                    controlType: "sap.m.Dialog",
                                    searchOpenDialogs: true,
                                    success: function () {
                                        this.waitFor({
                                            controlType: "sap.m.Input",
                                            searchOpenDialogs: true,
                                            matchers: new Properties({
                                                placeholder: "Value"
                                            }),
                                            actions: function (oInput) {
                                                oInput.focus();
                                                oInput.setValue(inputValue);
                                                oInput.fireChange({ value: inputValue });
                                                oInput.fireSubmit && oInput.fireSubmit();
                                            },
                                            success: function () {
                                                this.waitFor({
                                                    controlType: "sap.m.Button",
                                                    searchOpenDialogs: true,
                                                    matchers: new sap.ui.test.matchers.PropertyStrictEquals({
                                                        name: "text",
                                                        value: "Add"
                                                    }),
                                                    actions: new sap.ui.test.actions.Press(),
                                                });

                                                this.waitFor({
                                                    controlType: "sap.m.Button",
                                                    searchOpenDialogs: true,
                                                    matchers: new PropertyStrictEquals({
                                                        name: "text",
                                                        value: "OK"
                                                    }),
                                                    actions: new Press(),
                                                    success: function () {
                                                        Opa5.assert.ok(true, "ダイアログ経由で" + searchFieldName + "に" + inputValue + "を入力した");
                                                    }
                                                });
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    },
                    errorMessage: searchFieldName + "の FilterField が見つからなかった"
                });
            },

            /**
            * 指定した検索欄に対して、ValueHelpを開き、表示された一覧から指定した項目を選択するメソッド。
            *
            * 主にコード値＋名称で構成されるリストアップ型フィルター項目の選択テストに使用する。
            *
            * @param {string} searchFieldName
            *        操作対象となる検索欄の識別子（FilterField の propertyKey）。
            * @param {string} inputValue
            *        下拉一覧から選択する項目の表示文字列。（例："01 (契約異動予約)"）
            */
            iEnterListFilterValueByCatalog: function (searchFieldName, inputValue) {
                return this.waitFor({
                    controlType: "sap.ui.mdc.FilterField",
                    matchers: new PropertyStrictEquals({
                        name: "propertyKey",
                        value: searchFieldName
                    }),
                    success: function (aFields) {
                        const oField = aFields[0];
                        this.waitFor({
                            controlType: "sap.ui.core.Icon",
                            matchers: [
                                new Ancestor(oField, false),
                                function (oIcon) {
                                    return oIcon.$().hasClass("sapMInputBaseIcon");
                                }
                            ],
                            actions: new Press(),
                            success: function () {
                                this.waitFor({
                                    controlType: "sap.m.ColumnListItem",
                                    searchOpenDialogs: true,
                                    matchers: function (oItem) {
                                        return oItem.$().text().trim() === inputValue;
                                    },
                                    actions: new Press(),
                                    success: function () {
                                        Opa5.assert.ok(true, "リストアップ経由で" + searchFieldName + "に" + inputValue + "を入力した");
                                    },
                                    errorMessage: inputValue + "が見つからなかった"
                                });
                            },
                            errorMessage: searchFieldName + "の FilterField が見つからなかった"
                        });
                    }
                });
            },

            /**
             * 画面上の FilterBar に設定されているすべてのフィルター条件をクリアするメソッド。
             */
            iClearFilters: function () {
                return this.waitFor({
                    controlType: "sap.ui.mdc.FilterBar",
                    success: async function (aFilterBars) {
                        const filterBar = aFilterBars[0];
                        filterBar.setFilterConditions({});

                        const aFields = filterBar.getFilterItems();
                        aFields.forEach(field => {
                            field.setConditions([]);
                            const inner = field._getContent && field._getContent();
                            if (inner) {
                                if (inner.setValue) inner.setValue("");
                                if (inner.setDateValue) inner.setDateValue(null);
                            }

                            field.setValueState("None");
                            field.setValueStateText("");
                        });

                        const oMessageManager = sap.ui.getCore().getMessageManager();
                        oMessageManager.removeAllMessages();
                        
                        await filterBar.initialized();
                        await filterBar._waitForInitialFiltersApplied?.();

                        Opa5.assert.ok(true, "フィルター条件を完全にクリアした");
                    },
                    errorMessage: "FilterBar が見つからなかった"
                });
            },
        },


        assertions: {
            /**
            * 指定した検索欄が Error 状態になっていることを確認し、表示されているエラーメッセージが期待値と一致しているかを検証するメソッド。
            * 
            * @param {string} searchFieldName
            *        検索欄を識別するためのキー（FilterField の propertyKey）。
            * @param {string} errorMessageText
            *        検索欄が Error 状態のときに表示されることを期待するエラーメッセージ（ValueStateText）。
            */
            iShouldSeeError: function (searchFieldName, errorMessageText) {
                return this.waitFor({
                    controlType: "sap.ui.mdc.FilterField",
                    matchers: [
                        new PropertyStrictEquals({
                            name: "valueState",
                            value: "Error"
                        }),
                        new PropertyStrictEquals({
                            name: "propertyKey",
                            value: searchFieldName
                        })
                    ],
                    success: function (aFields) {
                        const f = aFields[0];
                        Opa5.assert.ok(
                            f.getValueStateText() === errorMessageText,
                            searchFieldName + "のエラーメッセージが期待値と一致している：" + f.getValueStateText()
                        );
                    },
                    errorMessage: searchFieldName + "のエラーメッセージが期待値と一致していない"
                });
            }
        }
    };

    return new ListReport(
        {
            appId: 'notificationservice',
            componentId: 'NT_V2_NOTIFICATION_KANRIList',
            contextPath: '/NT_V2_NOTIFICATION_KANRI'
        },
        CustomPageDefinitions
    );
});