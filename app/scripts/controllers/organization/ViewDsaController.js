(function (module) {
    mifosX.controllers = _.extend(module, {
        ViewDsaController: function (scope, routeParams, resourceFactory) {
            scope.dsa = [];
            resourceFactory.dsaResource.get({dsaId: routeParams.id}, function (data) {
                scope.dsa = data;
            });
        }
    });
    mifosX.ng.application.controller('ViewDsaController', ['$scope', '$routeParams', 'ResourceFactory', mifosX.controllers.ViewDsaController]).run(function ($log) {
        $log.info("ViewDsaController initialized");
    });
}(mifosX.controllers || {}));
