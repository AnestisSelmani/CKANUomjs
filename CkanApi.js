$(document).ready(function () {

        //$.extend($.fn.dataTable.defaults, {
        //    "language": greekInspiniaDataTable()
        //});

        //var table = $('#packageListTable').DataTable({
        //    "lengthMenu": [[-1, 10, 20, 50], ["Σύνολο", 10, 20, 50]]
    //});
    //var a = "";

    //var c = $.getJSON('http://demo.ckan.org/api/3/action/package_list', function (data) {
    //    a = data;
    //});
    //var b = a;

    //var client = new CKAN.Client('http://demo.ckan.org');
    //var a = client.action('package_list',
    //    "",
    //    function(data) {
    //        var c = data;
    //    });
    var c = ckan.Action_Enum;
    var d = ckan.Action_Enum.PackageList;
    var a = ckan.getAll(ckan.getActions.PackageList);
    var b = $.getJSON('http://data.dai.uom.gr/api/3/action/package_list?callback=?', function (data) {
        a = data.result[3];
        getPackage(a);
    });
    
    //$.ajax({
    //    url: 'http://demo.ckan.org/api/3/action/package_list?callback=?',
    //    type: "GET",
    //    dataType: "json",
    //    contentType: "application/x-www-form-urlencoded",
    //    crossDomain: true
    //    data: JSON.stringify({ studyProfileId: studyProfileId, pausedAt: pausedAt }),
    //}).done(function (result) {
    //    if (result.success) {
    //        location.reload();
    //    }
    //    else if (result.error != null && result.error != "") {
    //        toastr["error"](result.error, StudentRegistration.studentUpdateTitle);
    //    }
    //}).error(function(jqXHR,textStatus, errorThrown) {
    //    var a = jqXHR;
    //});
});
var ckan_Instance = function() {
    var ckan_instance_endpoint = 'http://data.dai.uom.gr/api/3/action/',
    id = '?id=',
    callback = "?callback=?";

    var Action_Enum = {
        PackageList: 'package_list',
        GroupList: 'group_list',
        TagList: 'tag_list',
        PackageShow: 'package_show',
        TagShow: 'tag_show',
        GroupShow: 'group_show'
    };

    var TypeofAction_Enum = {
        GET: 0,
        GETALL: 1
    };

    //var result;


    return {
        getActions: function () { return Action_Enum; },
        buildUrl: function (action, typeOfAction) {
            var url = '';
            switch(typeOfAction) {
                case 0:
                    url = ckan_instance_endpoint + action + id;
                    break;
                case 1:
                    url = ckan_instance_endpoint + action + callback;
                    break;
                default:
                    break;
            }
            return url;
        },
        getAll: function(action) {
            var result;
            var url = this.buildUrl(action, TypeofAction_Enum.GETALL);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                contentType: "application/x-www-form-urlencoded",
                crossDomain: true
            }).done(function (data) {
                if (data.result) {
                    result = data.result;
                }
                else if (result.error != null && result.error != "") {
                }
            }).error(function (jqXHR, textStatus, errorThrown) {
                var a = jqXHR;
            });
        }

    }
}

var ckan = ckan_Instance();

var package_list_endpoint = 'http://data.dai.uom.gr/api/3/action/package_list?callback=?',
    group_list_endpoint = 'http://data.dai.uom.gr/api/3/action/group_list?callback=?',
    tag_list_enpoint = 'http://data.dai.uom.gr/api/3/action/tag_list?callback=?';
var package_show_endpoint = 'http://data.dai.uom.gr/api/3/action/package_show?id=',
    tag_show_endpoint = 'http://data.dai.uom.gr/api/3/action/tag_show?id=',
    group_show_endpoint = 'http://data.dai.uom.gr/api/3/action/group_show?id=',
    callback = "?callback=?";
var package_show_endpoint = 'http://data.dai.uom.gr/api/3/action/package_show?id=',
    tag_show_endpoint = 'http://data.dai.uom.gr/api/3/action/tag_show?id=',
    group_show_endpoint = 'http://data.dai.uom.gr/api/3/action/group_show?id=',
    callback = "?callback=?";

function BuildUrl() {
    
}

function getPackage(packageId) {
    var package;
    var url = package_show_endpoint + "?id=" + packageId;

    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        contentType: "application/x-www-form-urlencoded",
        crossDomain: true
        //data: JSON.stringify({ studyProfileId: studyProfileId, pausedAt: pausedAt }),
    }).done(function (data) {
        if (data.result) {
            var a = data.result;
        }
        else if (result.error != null && result.error != "") {
            //toastr["error"](result.error, StudentRegistration.studentUpdateTitle);
        }
    }).error(function (jqXHR, textStatus, errorThrown) {
        var a = jqXHR;
    });
}



function greekInspiniaDataTable() {
    return {
        "lengthMenu": "_MENU_ ανά σελίδα",
        "zeroRecords": "Δεν υπάρχουν εγγραφές στην λίστα",
        "info": "Σελίδα _PAGE_ από _PAGES_",
        "infoEmpty": "Δεν υπάρχουν εγγραφές στην λίστα",
        "infoFiltered": "(Από φιλτράρισμα συνολικά _MAX_ εγγραφών)",
        "search": "Αναζήτηση",
        "decimal": ",",
        "thousands": ".",
        "paginate": {
            "first": "Πρώτη",
            "last": "Τελευταία",
            "next": "Επόμενη",
            "previous": "Προηγούμενη"
        },
        "aria": {
            "sortAscending": ": αύξουσα ταξινόμηση",
            "sortDescending": ": φθίνουσα ταξινόμηση"
        }
    }
}