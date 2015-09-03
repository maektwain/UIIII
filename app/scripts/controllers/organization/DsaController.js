(function (module) {
    mifosX.controllers = _.extend(module, {
        DsaController: function (scope, resourceFactory, location) {
            scope.dsas = [];
            scope.routeTo = function (id) {
                location.path('/viewdsa/' + id);
            };

            if (!scope.searchCriteria.dsas) {
                scope.searchCriteria.dsas = null;
                scope.saveSC();
            }
            scope.filterText = scope.searchCriteria.dsas;

            scope.onFilter = function () {
                scope.searchCriteria.dsas = scope.filterText;
                scope.saveSC();
            };

            resourceFactory.dsaResource.getAllDsas(function (data) {
                scope.dsas = data;
            });
        }
    });
    mifosX.ng.application.controller('DsaController', ['$scope', 'ResourceFactory', '$location', mifosX.controllers.DsaController]).run(function ($log) {
        $log.info("DsaController initialized");
    });
}(mifosX.controllers || {}));
