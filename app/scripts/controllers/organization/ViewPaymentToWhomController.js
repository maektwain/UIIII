(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewPaymentToWhomController: function (scope, routeParams, resourceFactory, location, $modal, route) {
            scope.paymentToWhom = [];
            scope.formData = [];
            resourceFactory.paymentToWhomResources.getAll( function (data) {
                scope.paymentToWhom = data;
            });

            scope.showEdit = function(id){
                location.path('/editpaymenttowhom/' + id);
            }

           var PaymentToWhomDeleteCtrl = function ($scope, $modalInstance,paymentTypeId) {
               $scope.delete = function () {
                   resourceFactory.paymentToWhomResources.delete({paymentToWhomId: paymentToWhomId}, {}, function (data) {
                       $modalInstance.close('delete');
                       route.reload();
                   });
               };
               $scope.cancel = function () {
                   $modalInstance.dismiss('cancel');
               };
           }
                scope.deletePaymentToWhom = function (id) {
                    $modal.open({
                        templateUrl: 'deletePaymentToWhom.html',
                        controller: PaymentToWhomDeleteCtrl,
                        resolve: {
                            paymentToWhomId: function () {
                                return id;
                            }
                        }
                    });
                };

                }
    });
    mifosX.ng.application.controller('ViewPaymentToWhomController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$modal', '$route', mifosX.controllers.ViewPaymentToWhomController]).run(function ($log) {
        $log.info("ViewPaymentToWhomController initialized");
    });
}(mifosX.controllers || {}));
