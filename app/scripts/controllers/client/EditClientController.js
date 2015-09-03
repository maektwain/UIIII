(function (module) {
    mifosX.controllers = _.extend(module, {
        EditClientController: function (scope, routeParams, resourceFactory, location, http, dateFilter, API_VERSION, $upload, $rootScope) {
            scope.offices = [];
            scope.date = {};
            scope.restrictDate = new Date();
            scope.savingproducts = [];
            scope.clientId = routeParams.id;
            scope.showSavingOptions = 'false';
            scope.opensavingsproduct = 'false';
            resourceFactory.clientResource.get({clientId: routeParams.id, template:'true', staffInSelectedOfficeOnly:true}, function (data) {
                scope.offices = data.officeOptions;
                scope.staffs = data.staffOptions;
                scope.savingproducts = data.savingProductOptions;
                scope.genderOptions = data.genderOptions;
                scope.educationOptions = data.educationOptions;
                scope.maritalOptions = data.maritalOptions;
                scope.clienttypeOptions = data.clientTypeOptions;
                scope.clientClassificationOptions = data.clientClassificationOptions;
                scope.dependentOptions = data.dependentOptions;
                scope.religionOptions = data.religionOptions;
                scope.officeId = data.officeId;
                scope.formData = {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    middlename: data.middlename,
                    fathername: data.fathername,
                    active: data.active,
                    accountNo: data.accountNo,
                    emailAddress: data.emailAddress,
                    educationId: data.education.id,
                    dependentId: data.dependent.id,
                    staffId: data.staffId,
                    externalId: data.externalId,
                    mobileNo: data.mobileNo,
                    savingsProductId: data.savingsProductId,
                    genderId: data.gender.id,
                    maritalId: data.marital.id,
                    religionId: data.religion.id,
                    

                };

                if(data.gender){
                    scope.formData.genderId = data.gender.id;
                }

                if(data.clientType){
                    scope.formData.clientTypeId = data.clientType.id;
                }

                if(data.clientClassification){
                    scope.formData.clientClassificationId = data.clientClassification.id;
                }
                if (data.marital){
                  scope.formData.maritalId = data.marital.id;
                }
                if(data.religion){
                  scope.formData.religionId = data.religion.id;
                }
                if(data.dependent){
                  scope.formData.dependentId = data.dependent.id;
                }
                if(data.education){
                  scope.formData.educationId = data.education.id;
                }

                // if (data.savingsProductId != null) {
                //     scope.opensavingsproduct = 'true';
                //     scope.showSavingOptions = 'true';
                // } else if (data.savingProductOptions.length > 0) {
                //     scope.showSavingOptions = 'true';
                // }

                if (data.dateOfBirth) {
                    var dobDate = dateFilter(data.dateOfBirth, scope.df);
                    scope.date.dateOfBirth = new Date(dobDate);
                }
              //  if (data.validity) {
              //      var vDate = dateFilter(data.validity, scope.df);
              //      scope.date.validity = new Date(vDate);
              //  }

                var actDate = dateFilter(data.activationDate, scope.df);
                scope.date.activationDate = new Date(actDate);
                if (data.active) {
                    scope.choice = 1;
                    scope.showSavingOptions = 'false';
                    scope.opensavingsproduct = 'false';
                }

                if (data.timeline.submittedOnDate) {
                    var submittedOnDate = dateFilter(data.timeline.submittedOnDate, scope.df);
                    scope.date.submittedOnDate = new Date(submittedOnDate);
                }

            });
            scope.submit = function () {
                console.log(this.formData);
                this.formData.locale = scope.optlang.code;
                this.formData.dateFormat = scope.df;
                if (scope.opensavingsproduct == 'false') {
                    this.formData.savingsProductId = null;
                }
                if (scope.choice === 1) {
                    if (scope.date.activationDate) {
                        this.formData.activationDate = dateFilter(scope.date.activationDate, scope.df);
                    }
                }
                if(scope.date.dateOfBirth){
                    this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,  scope.df);
                }

                if(scope.date.submittedOnDate){
                    this.formData.submittedOnDate = dateFilter(scope.date.submittedOnDate,  scope.df);
                }

                resourceFactory.clientResource.update({'clientId': routeParams.id}, this.formData, function (data) {
                    location.path('/viewclient/' + routeParams.id);
                });
            };
        }
    });
    mifosX.ng.application.controller('EditClientController', ['$scope', '$routeParams', 'ResourceFactory', '$location', '$http', 'dateFilter', 'API_VERSION', '$upload', '$rootScope', mifosX.controllers.EditClientController]).run(function ($log) {
        $log.info("EditClientController initialized");
    });
}(mifosX.controllers || {}));
