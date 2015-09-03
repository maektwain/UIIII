(function (module) {
    mifosX.controllers = _.extend(module, {
        EditPaymentToWhomController: function (scope, routeParams, resourceFactory, location, $modal, route) {
/*
            scope.formData = {};*/

            resourceFactory.paymentToWhomResources.get({paymentToWhomId: routeParams.id}, function (data) {
                scope.formData = {
                    name: data.name,
                    description: data.description,
                    isCashPayment: data.isCashPayment,
                    position : data.position
                };
            });

            scope.submit = function () {
                this.formData.isCashPayment = this.formData.isCashPayment || false;
                resourceFactory.paymentToWhomResources.update({paymentToWhomId: routeParams.id},this.formData, function (data) {
                    location.path('/viewpaymenttowhom/');
                });
            };

        }
    });
    mifosX.ng.application.controller('EditPaymentToWhomController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$modal', '$route', mifosX.controllers.EditPaymentToWhomController]).run(function ($log) {
        $log.info("EditPaymentToWhomController initialized");
    });
}(mifosX.controllers || {}));
