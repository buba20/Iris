angular.module("irisApp.Services").service("notificationService", ["toaster", function (toaster) {
    return {
        show: function (msgOption) {
            /*{
             type:      null,
             title:     null,
             body:      null,
             timeout:   null,
             toasterId: 'CategoryMenu',
             toastId:   'CategoryMenuAlert'
             }
             */
            toaster.pop(msgOption.type, msgOption.title, msgOption.msg);
        }
    }
}]);