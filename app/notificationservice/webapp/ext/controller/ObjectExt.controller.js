sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('notificationservice.ext.controller.ObjectExt', {
		override: {
			onInit: async function () {
			},
			onAfterRendering: function () {
				const oView = this.getView();
				const aTables = oView.findAggregatedObjects(true, c =>
					c.getMetadata && c.getMetadata().getName().includes("Table")
				);
				aTables.forEach(oTable => {
					const sType = oTable.getMetadata().getName();
					if (sType === "sap.ui.mdc.Table") {
						oTable.attachEventOnce("modelContextChange", () => {
							const aInner = oTable.findAggregatedObjects(true, c =>
								c.getMetadata && c.getMetadata().getName() === "sap.m.Table"
							);
							if (aInner.length) {
								const oInner = aInner[0];
								oInner.attachEventOnce("updateFinished", () => {									
									oInner.attachItemPress(this._onRowPress, this);
									oInner.getItems().forEach(item => {
										if (item.setType) item.setType("Active");
									});
								});
							} else {
								oTable.attachRowPress(this._onRowPress, this);
							}
						});
					}
				});
			}
		},
		_onRowPress: async function (oEvent) {
			const data = oEvent.getParameter("listItem").getBindingContext().getObject();
			const shellHash = data.SHELLHASH;

			sap.ushell.Container.getServiceAsync("CrossApplicationNavigation")
				.then(nav => {
					nav.toExternal({ target: { shellHash: shellHash } });
				});
		}
	});
});
