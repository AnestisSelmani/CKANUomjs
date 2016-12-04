$(document).ready(function () {

    $.extend($.fn.dataTable.defaults, {
        "language": greekInspiniaDataTable()
    });
    $("#packageShow").hide();

    //DisplayLoadingSpinner();

    ckan.getAll(ckan.getActions().PackageList)
    .done(function (result) {
        var packageListTable = createPackageListTable("packageListDiv", result.result);
    }).always(function () {
        //HideLoadingSpinner();
    });
    //var b = $.getJSON('http://data.dai.uom.gr/api/3/action/package_list?callback=?', function (data) {
    //    a = data.result[3];
    //    getPackage(a);
    //});

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

function createPackageListTable(tableDiv, tableData) {
    var table = $("#packageListTable")[0],
        tableBody = $("#packageListTable > tbody")[0];

    for (var x = 0; x < tableData.length; x++) {
        var tr = document.createElement('tr'),
            td = document.createElement('td'),
            a = document.createElement('a'),
            i = document.createElement('i');

        td.className += "align-center";
        i.className += "fa-uom fa fa-info fa-lg";
        i.setAttribute("data-uom-dataset", tableData[x]);
        a.appendChild(i);
        td.appendChild(a);

        tr.appendChild(document.createElement('td'));
        tr.appendChild(td);

        tr.cells[0].appendChild(document.createTextNode(tableData[x]));
        tableBody.appendChild(tr);
    }
    table.appendChild(tableBody);

    $("#packageListTable").DataTable({
        "lengthMenu": [[20, 10, 20, 50, -1], [20, 10, 20, 50, "Σύνολο"]],
        responsive:true
    });

    $(document).on('click', '.fa-uom', function (e) {
        var dataset = $(this).attr('data-uom-dataset');
        ckan.getDataset(ckan.getActions().PackageShow, dataset)
            .done(function (result) {
                createPackageShowTable(result.result);
            }).always(function () {
                //HideLoadingSpinner();
            });
    });
}

function createPackageShowTable(packageShow) {
    var tableRows = $('#packageShowTable > tbody > tr');
    var packageObj = mapPackage(packageShow);

    $.each(packageObj, function (index, value) {
        if (index < 9) {
            removeChildNodes($(tableRows[index]).children()[1]).appendChild(document.createTextNode(value));
        }
        else {
            $($(tableRows[index]).children()[1].children[0]).attr('href', value);
        } 
    });

    $("#packageShow").show();
}
function checkIfNull(par){
    return par != null ? par : '';
}

function mapPackage(p){
    var result = new Array(p.name, p.notes, p.state, p.metadata_modified, p.metadata_created, p.organization.name, p.version, p.author, p.tags, p.resources[0].url);
    $.each(result, function (index, value) {
        if(index == 8 && value != null){
            var tagString;
            if(value.length > 0){
                var tagString = '';
                $.each(value, function(ind, v){
                    tagString += v.display_name + ', ';
                })
            }
            result[index] = tagString.substring(0, tagString.length - 2);;
        }
        else {
            value = checkIfNull(value);
        }   
    });
    return result;
}
function removeChildNodes(el) {
    if (el.childNodes[0]) {
        var childNode = el.childNodes[0];
        el.removeChild(childNode);
    }
    return el;
}
var ckan_Instance = function () {
    var ckan_instance_url = 'http://data.dai.uom.gr',
    ckan_instance_endpoint = 'http://data.dai.uom.gr/api/3/action/',
    id = '?id=',
    callback = "?callback=?";

    var packageTable;

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

    return {
        getActions: function () { return Action_Enum; },
        buildUrl: function (action, typeOfAction) {
            var url = '';
            switch (typeOfAction) {
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
        getAll: function (action) {
            var result;
            var url = this.buildUrl(action, TypeofAction_Enum.GETALL);
            return $.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                contentType: "application/x-www-form-urlencoded",
                crossDomain: true
            }).done(function (result) {
                return result;
            }).error(function (jqXHR, textStatus, errorThrown) {
                return null
            });
        },
        getDataset: function (action, dataset) {
            var result;
            var url = this.buildUrl(action, TypeofAction_Enum.GET) + dataset;
            return $.ajax({
                url: url,
                type: "GET",
                dataType: "jsonp",
                contentType: "application/x-www-form-urlencoded",
                crossDomain: true
            }).done(function (result) {
                return result;
            }).error(function (jqXHR, textStatus, errorThrown) {
                return null
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

//Display Spinner
function DisplayLoadingSpinner() {
    $("#loadingSpinnerModal, #bounceSpinner").css("display", "block");
}

//HideSpinner
function HideLoadingSpinner() {
    $("#loadingSpinnerModal, #bounceSpinner").css("display", "none");
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