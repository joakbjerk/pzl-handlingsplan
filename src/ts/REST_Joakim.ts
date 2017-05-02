namespace Handlingsplan {

    export function init() {
        $('#REST-Call-Button').on('click', function () {
            console.log('Click');
            $('#target').html('');
            GetSubsiteListItems();
        });
    }


    interface QueryData {
        Title?: string;
        Ordre?: string;
        Ordrenummer?: string;
        Kunde?: string;
        Kundenummer?: string;
        Ansvarlig?: string;
        Verdi?: string;
        Fremgangsplan?: string;
        Path?: string;

    }

    export function GetSubsiteListItems() {
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
                let queryResult: QueryData = {
                    Title: result[2].Value,
                    Ordre: result[3].Value,
                    Ordrenummer: result[4].Value,
                    Kunde: result[5].Value,
                    Kundenummer: result[6].Value,
                    Ansvarlig: result[7].Value,
                    Verdi: result[8].Value,
                    Fremgangsplan: result[9].Value,
                    Path: result[10].Value
                };
                console.log(queryResult);
                return queryResult;
            }
        }

        function OnSearchError(searchData: any, errorMessage: any, errorCode: any) {
            console.log(errorMessage);
        }

    }

}