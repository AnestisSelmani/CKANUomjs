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
    var a = "";
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

var package_list_endpoint = 'http://data.dai.uom.gr/api/3/action/package_list?callback=?',
    group_list_endpoint = 'http://data.dai.uom.gr/api/3/action/group_list?callback=?',
    tag_list_enpoint = 'http://data.dai.uom.gr/api/3/action/tag_list?callback=?';
var package_show_endpoint = 'http://data.dai.uom.gr/api/3/action/package_show',
    callback = "?callback=?";

function getPackage(packageId) {
    var package;
    var url = package_show_endpoint + callback + "?id=" + packageId;

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