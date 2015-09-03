  (function (module) {
    mifosX.controllers = _.extend(module, {
        AddLoanCollateralController: function (scope,$rootScope, resourceFactory, routeParams, location) {

            scope.collateralTypes = [];
            scope.goldfineTypes = [];
            scope.jewelleryTypes = [];
            scope.maketwoTypes = [];
            scope.formData = {};
            scope.loanId = routeParams.id;



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



                resourceFactory.loanResource.save({resourceType: 'collaterals', loanId: scope.loanId}, this.formData, function (data) {
                    location.path('/loan/' + data.loanId + '/viewcollateral/' + data.resourceId);
                });
                console.log(this.formData);

            };

        }
    });
    mifosX.ng.application.controller('AddLoanCollateralController', ['$scope','$rootScope', 'ResourceFactory', '$routeParams', '$location', mifosX.controllers.AddLoanCollateralController]).run(function ($log) {
        $log.info("AddLoanCollateralController initialized");
    });
}(mifosX.controllers || {}));
