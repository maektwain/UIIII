(function (module) {
    mifosX.controllers = _.extend(module, {
        EditLoanCollateralController: function (scope,$rootScope, resourceFactory, routeParams, location) {

          scope.collateralTypes = [];
          scope.goldfineTypes = [];
          scope.jewelleryTypes = [];
          scope.maketwoTypes = [];
          scope.formData = {};
            scope.loanId = routeParams.loanId;
            scope.collateralId = routeParams.id;




            resourceFactory.loanResource.get({ resourceType: 'collaterals', loanId: scope.loanId, resourceId: scope.collateralId, template: true }, function (data) {
                scope.formData = {collateralTypeId: data.type.id, goldfineTypeId: data.goldfine.id, jewelleryTypeId: data.jewellery.id,gross: data.gross,impurity:data.impurity,maketwoTypeId: data.maketwo.id, stone: data.stone, actualcost:data.actualcost, value: data.value, description: data.description};
                scope.collateralTypes = data.allowedCollateralTypes;
              //  scope.
            });

            resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function (data) {
                scope.collateralTypes = data.allowedCollateralTypes;
                scope.formData.collateralTypeId = data.allowedCollateralTypes[0].id;
            });

            resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function(data){
              scope.goldfineTypes = data.allowedGoldfineTypes;
              scope.formData.goldfineTypeId = data.allowedGoldfineTypes[0].id;
            });

            resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function(data){
              scope.jewelleryTypes = data.allowedJewelleryTypes;
              scope.formData.jewelleryTypeId = data.allowedJewelleryTypes[0].id;
            });
            resourceFactory.loanCollateralTemplateResource.get({loanId: scope.loanId}, function(data){
              scope.maketwoTypes = data.allowedMakeTwoTypes;
              scope.formData.maketwoTypeId = data.allowedMakeTwoTypes[0].id;
            });






            scope.cancel = function () {
                location.path('/viewloanaccount/' + scope.loanId);
            };

            scope.submit = function () {
              $rootScope.gr = 2000;
              if(scope.formData.goldfineTypeId == 84){
                $rootScope.gr = (83 / 100) * $rootScope.gr
                console.log($rootScope.gr);
              } else if (scope.formData.goldfineTypeId == 81){
                $rootScope.gr = (91 / 100) * $rootScope.gr
                console.log($rootScope.gr);
              }

                this.formData.locale = scope.optlang.code;
                if (scope.formData.collateralTypeId == 69 ){
                  scope.formData.net = scope.formData.gross - scope.formData.stone;
                  scope.formData.value = scope.gr * ((scope.formData.net*((100-scope.formData.impurity)/100)));
                }else if (scope.formData.collateralTypeId == 73) {
                  scope.formData.value = scope.formData.actualcost * (85 / 100) ;
                }else {
                  scope.formData.value = scope.formData.actualcost*(60/100);
                }
                resourceFactory.loanResource.put({resourceType: 'collaterals', resourceId: scope.collateralId, loanId: scope.loanId}, this.formData, function (data) {
                    location.path('/viewloanaccount/' + data.loanId);
                });
            };

        }
    });
    mifosX.ng.application.controller('EditLoanCollateralController', ['$scope', '$rootScope','ResourceFactory', '$routeParams', '$location', mifosX.controllers.EditLoanCollateralController]).run(function ($log) {
        $log.info("EditLoanCollateralController initialized");
    });
}(mifosX.controllers || {}));
