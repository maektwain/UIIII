(function (module) {
    mifosX.controllers = _.extend(module, {
        ClientAddressController: function (scope, routeParams,location, resourceFactory) {
            scope.clientId = routeParams.clientId;
            scope.formData = {};



            scope.addressTypes = [];
            resourceFactory.clientAddressTemplateResource.get({clientId: routeParams.clientId}, function (data) {
                scope.addressTypes = data.allowedAddressTypes;
                scope.formData.addressTypeId = data.allowedAddressTypes[0].id;
            });

            scope.stateTypes = [];
            resourceFactory.clientAddressTemplateResource.get({clientId: routeParams.clientId}, function (data){
              scope.stateTypes = data.allowedStateTypes;
              scope.formData.stateTypeId = data.allowedStateTypes[0].id;

            });
            scope.submit = function () {
                if (scope.formData.isBoth === false){
                    this.formData.isBoth = false;
                }else {
                  this.formData.isBoth = true;
                }

              //this.formData.locale = scope.optlang.code;
              //this.formData.dateFormat = scope.df;
              //this.formData.validity = dateFilter(scope.formData.validity, scope.df);
                resourceFactory.clientAddressResource.save({clientId: scope.clientId}, this.formData, function (data) {
                    location.path('/viewclient/' + data.clientId);
                });
            };

        }
    });
    mifosX.ng.application.controller('ClientAddressController', ['$scope', '$routeParams', '$location', 'ResourceFactory', mifosX.controllers.ClientAddressController]).run(function ($log) {
        $log.info("ClientAddressController initialized");
    });
}(mifosX.controllers || {}));
