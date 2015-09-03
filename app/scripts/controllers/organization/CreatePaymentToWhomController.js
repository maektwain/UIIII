(function (module) {
    mifosX.controllers = _.extend(module, {
        CreatePaymentToWhomController: function (scope, routeParams, resourceFactory, location, $modal, route) {

            scope.formData = {};
            scope.isCashPayment =true;


            scope.submit = function () {
                this.formData.isCashPayment = this.formData.isCashPayment || false;
                resourceFactory.paymentToWhomResources.save(this.formData, function (data) {
                    location.path('/viewpaymenttowhom/');
                });
            };

        }
    });
    mifosX.ng.application.controller('CreatePaymentToWhomController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$modal', '$route', mifosX.controllers.CreatePaymentToWhomController]).run(function ($log) {
        $log.info("CreatePaymentToWhomController initialized");
    });
}(mifosX.controllers || {}));
