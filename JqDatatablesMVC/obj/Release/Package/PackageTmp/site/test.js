

toastr.options = {
    "closeButton": false,
    "debug": false,
    "positionClass": "toast-top-right",
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}




var TableInit = function () {

    var getDataAll = function () {
        $.ajax({
            url: "Home/GetAll",
            type: "GET",
            success: function (data) {
                var jData = JSON.parse(data);
                initMainTable(jData);
            },
            error: function (xhr) {
                alert('Error: ' + xhr.statusText);
            },
        });
    }

    var initMainTable = function (jData) {

        var table = $('#sample_4');


        function format(d) {

            var rs = "";
            var result = "";

            var xd = "";


            for (var i = 0; i < d.length; i++) {
                //toastr.info(d[i].OrderID);

                if (i == 0) {
                    xd = d[i].CustomerID;
                }

                result += ""
                +'          <tr>'
                + '              <td>' + d[i].OrderID + '</td>'
                + '              <td>' + d[i].CustomerID + '</td>'
                + '              <td>' + d[i].EmployeeID + '</td>'
                + '              <td>' + d[i].OrderDate + '</td>'
                + '              <td>' + d[i].RequiredDate + '</td>'
                + '              <td>' + d[i].ShippedDate + '</td>'
                + '              <td>' + d[i].ShipVia + '</td>'
                + '              <td>' + d[i].Freight + '</td>'
                + '              <td>' + d[i].ShipName + '</td>'
                + '              <td>' + d[i].ShipAddress + '</td>'
                + '              <td>' + d[i].ShipCity + '</td>'
                + '              <td>' + d[i].ShipRegion + '</td>'
                + '              <td>' + d[i].ShipPostalCode + '</td>'
                + '              <td>' + d[i].ShipCountry + '</td>'
                +'          </tr>'
            }

            // `d` is the original data object for the row
            return '<table id="' + xd + '" class="table table-responsive table-striped table-bordered table-hover" style="white-space: nowrap;">'
                +'      <thead>'
                +'          <tr>'
                +'              <th>OrderID</th>'
                +'              <th>CustomerID</th>'
                + '              <th>EmployeeID</th>'
                + '              <th>OrderDate</th>'
                + '              <th>RequiredDate</th>'
                + '              <th>ShippedDate</th>'
                + '              <th>ShipVia</th>'
                + '              <th>Freight</th>'
                + '              <th>ShipName</th>'
                + '              <th>ShipAddress</th>'
                + '              <th>ShipCity</th>'
                + '              <th>ShipRegion</th>'
                + '              <th>ShipPostalCode</th>'
                + '              <th>ShipCountry</th>'
                +'          </tr>'
                +'      </thead>'
                + '      <tbody>'
                + result
                + '      </tbody>'
                +
            '</table>';
        }
        



        // Creates the table
        var oTable = table.dataTable({
            "scrollX": true,
            "columnDefs": [{
                "orderable": false,
                "targets": [0]
            }],
            "order": [
                [1, 'asc']
            ],
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,
            "dom": 'T<"clear">lfrtip',
            "tableTools": {
                "sSwfPath": "Content/DataTables-1.10.2/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "pdf",
                    "sButtonText": "PDF"
                }, {
                    "sExtends": "csv",
                    "sButtonText": "CSV"
                }, {
                    "sExtends": "xls",
                    "sButtonText": "Excel"
                }, {
                    "sExtends": "print",
                    "sButtonText": "Print",
                    "sInfo": 'Please press "CTR+P" to print or "ESC" to quit',
                    "sMessage": "Karl Rocks at Datatables!"
                }]
            },
            "aaData": jData,
          

            "columns": [
                {
                    "class": 'details-control',
                    "orderable": false,
                    "data": null,
                    "defaultContent": '<span class="row-details row-details-close"></span>'
                },
                { "mDataProp": "CustomerID" },
                { "mDataProp": "CompanyName" },
                { "mDataProp": "ContactName" },
                { "mDataProp": "ContactTitle" },
                { "mDataProp": "Address" },
                { "mDataProp": "City" },
                { "mDataProp": "Region" },
                { "mDataProp": "PostalCode" },
                { "mDataProp": "Country" },
                { "mDataProp": "Phone" },
                { "mDataProp": "Fax" }
            ],
            "fnInitComplete": function (oSettings, json) {
                //addPlusMinus();
                //alert(jData);
                //   $('div.DTTT').appendTo('#hey43');
            }
        });




        
        $('#sample_4 tbody').on('click', 'td.details-control', function () {
            var nTr = $(this).parents('tr')[0];

            if ($(this).find('span.row-details').length) {
                if (oTable.fnIsOpen(nTr)) {
                    /* This row is already open - close it */
                    $(this).find('.row-details').addClass("row-details-close").removeClass("row-details-open");
                    oTable.fnClose(nTr);
                } else {
                    /* Open this row */
                    $(this).find('.row-details').addClass("row-details-open").removeClass("row-details-close");

                    $.ajax({
                        url: "Home/GetCustOrders?custId=" + $(this).parent().find('td:nth-child(2)').text(),
                        type: "GET",
                        dataType: 'json',
                        success: function (data) {
                            var jd = JSON.parse(data);
                            oTable.fnOpen(nTr, format(jd), 'details-control');
                            $('#' + jd[0].CustomerID).dataTable();
                            $('#' + jd[0].CustomerID + ' tbody').on('click', 'tr', function () {

                                if ($(this).hasClass('active')) {
                                    $(this).removeClass('active');
                                } else {
                                    $(this).addClass('active');
                                }
                            });
                        },
                        error: function (xhr) {
                            alert('Error: ' + xhr.statusText);
                        },
                    });
                }
            } else {
               // toastr.info('False');
            }
        });

        var tableWrapper = $('#sample_4_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
        var tableColumnToggler = $('#sample_4_column_toggler');

        /* handle show/hide columns*/
        $('input[type="checkbox"]', tableColumnToggler).change(function () {
            /* Get the DataTables object again - this is not a recreation, just a get of the object */
            var iCol = parseInt($(this).attr("data-column"));
            var bVis = oTable.fnSettings().aoColumns[iCol].bVisible;
            oTable.fnSetColumnVis(iCol, (bVis ? false : true));
        });

        

    }




    return {

        init: function () {
            //initMainTable("");
            getDataAll();
        }

    };


}();








$(document).ready(function () {

    TableInit.init();

});