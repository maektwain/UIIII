(function (module) {
    mifosX.controllers = _.extend(module, {
        CreateDsaController: function (scope, resourceFactory, location) {
            scope.offices = [];
            resourceFactory.officeResource.getAllOfficesInAlphabeticalOrder(function (data) {
                scope.offices = data;
                scope.formData = {
                    officeId: scope.offices[0].id,
                };
            });

            scope.submit = function () {
                resourceFactory.dsaResource.save(this.formData, function (data) {
                    location.path('/viewdsa/' + data.resourceId);
                });
            };
        }
    });
    mifosX.ng.application.controller('CreateDsaController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.CreateDsaController]).run(function ($log) {
        $log.info("CreateDsaController initialized");
    });
}(mifosX.controllers || {}));
