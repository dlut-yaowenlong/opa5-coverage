sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('notificationservice.ext.controller.ListreportExt', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf notificationservice.ext.controller.ListreportExt
			 */
			onInit: async function () {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				// var oModel = this.base.getExtensionAPI().getModel();

				// FilterBarコントロールを取得
				const filterBar = this.getView().getController()._getFilterBarControl?.();

				// FilterBarの初期化完了を待機
				await filterBar.initialized();
				if (filterBar && filterBar.attachFiltersChanged) {
					// filtersChangedイベントにハンドラを登録（フィルター条件が変更されたときに実行される）
					filterBar.attachFiltersChanged(this._onFiltersChanged.bind(this));
				}
			}
		},

		//フィルター条件が変更されたときに呼び出されるイベントハンドラ
		_onFiltersChanged: function (oEvent) {

			// イベントの発火元（FilterBar）を取得
			const filterBar = oEvent.getSource();
			if (!filterBar) return;

			// 現在の条件を検証する
			this.validateFilterConditions(filterBar);
		},
		// バリデーション処理関数
		validateFilterConditions: function (filterBar) {

			const mConditions = filterBar.getConditions();
			const aFilterItems = filterBar.getFilterItems();
			// 全ての検索欄のエラーステートをリセット
			aFilterItems.forEach(oItem => {
				oItem.setValueState("None");
			});

			// 各フィールドの条件を個別に検証
			Object.entries(mConditions).forEach(([fieldKey, conditions]) => {
				conditions.forEach(condition => {
					const { operator, values } = condition;

					// casenoの範囲チェック
					if (fieldKey === "CASE_NO_STR") {
						const value = values[0];

						// 整数チェック
						if (!/^\d+$/.test(value)) {
							aFilterItems.forEach(oItem => {
								const sKey = oItem.getPropertyKey?.();
								if (sKey === "CASE_NO_STR") {
									const oFilterField = oItem;
									oFilterField.setValueState("Error");
									oFilterField.setValueStateText("小数桁の無い数値を入力してください");
								}
							});
							return; // エラー時は範囲チェックをスキップ
						}
					}

					// NOTIFICATION_DATEの範囲チェック
					if (fieldKey === "NOTIFICATION_DATE") {
						const value = values[0];

						if (value === undefined) {
							return; 
						}

						let inputDate = typeof value === "string" ? new Date(value) : value;

						const minDate = new Date("1970-01-01");
						const maxDate = new Date("9999-12-31");

						if (isNaN(inputDate) || inputDate < minDate || inputDate > maxDate) {
							// 範囲外ならエラーメッセージ表示
							// 該当検索欄の背景色を赤にする
							aFilterItems.forEach(oItem => {
								const sKey = oItem.getPropertyKey?.();
								if (sKey === "NOTIFICATION_DATE") {
									const oFilterField = oItem;
									oFilterField.setValueState("Error");
									oFilterField.setValueStateText("日付範囲エラー");
								}
							})
						}
					}

					// STATUS_UPDATED_DATEの範囲チェック
					if (fieldKey === "STATUS_UPDATED_DATE") {
						const value = values[0];
						if (value === undefined) {
							return; 
						}
						let inputDate = typeof value === "string" ? new Date(value) : value;

						const minDate = new Date("1970-01-01");
						const maxDate = new Date("9999-12-31");

						if (isNaN(inputDate) || inputDate < minDate || inputDate > maxDate) {
							// 範囲外ならエラーメッセージ表示
							// 該当検索欄の背景色を赤にする
							aFilterItems.forEach(oItem => {
								const sKey = oItem.getPropertyKey?.();
								if (sKey === "STATUS_UPDATED_DATE") {
									const oFilterField = oItem;
									oFilterField.setValueState("Error");
									oFilterField.setValueStateText("日付範囲エラー");
								}
							})
						}
					}
				});
			})
		}
	});
});
