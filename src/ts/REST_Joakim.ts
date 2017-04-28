namespace Handlingsplan.SubsiteListItems {

    export function init() {
        $('#REST-Call-Button').on('click', function() {
            console.log('Click');
            $('#target').html('');
            GetSubsiteListItems();
        });
    }

    function GetSubsiteListItems() {
        let contentType = `'ContentType:"Pzl Handlingsplan"'`;
        let selectProperties = `&selectproperties='Title,PZLHPOrdre,PZLHPOrdrenummer,PZLHPKunde,PZLHPKundenummer,PZLHPAnsvarlig,PZLHPVerdi,PZLHPFremgangsplan,Path'`;
        let clientType = `&clienttype='ContentSearchRegular'`;
        let rowLimit = `&rowlimit=100`;
        $.ajax({
            url: `${_spPageContextInfo.webAbsoluteUrl}/_api/search/query?querytext=${contentType}${selectProperties}${rowLimit}`,
            type: 'GET',
            headers: { 'accept': 'application/json;odata=verbose' },
            success: OnSearchSuccess,
            error: OnSearchError

        });

        function OnSearchSuccess(searchData: any) {
            let relevantResults = searchData.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
            console.log(relevantResults);

            for (let index = 0; index < relevantResults.length; index++) {
                let result = relevantResults[index].Cells.results;
                $('#target').append(`
            <div>
             ${result[2].Value} ${result[3].Value} ${result[4].Value} ${result[5].Value} ${result[6].Value} ${result[7].Value} ${result[8].Value} ${result[9].Value} <a href="${result[10].Value}">Link to Item</a>
            </div>
            <br>
          `);
            }
        }

        function OnSearchError(searchData: any, errorMessage: any, errorCode: any) {
            console.log(errorMessage);
        }

    }
}

