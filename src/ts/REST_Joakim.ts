namespace Handlingsplan.Joakim {

  export function init() {
    $('#REST-Call-Button').on('click', function () {
      console.log('Click');
      $('#target').html('');
      RESTSearchTest();
    });
  }

  function RESTSearchTest() {
    let contentTypeQuery = 'ContentType:"Pzl Handlingsplan"';
    $.ajax({
      url: `${_spPageContextInfo.webAbsoluteUrl}/_api/search/query?querytext='${contentTypeQuery}'&rowlimit=100`,
      type: 'POST',
      headers: { 'accept': 'application/json;odata=verbose' },
      success: onSearchSuccess,
      error: onSearchError

    });

    function onSearchSuccess(searchData) {
      let relevantResults = searchData.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
      console.log(relevantResults);
      for (let index = 0; index < relevantResults.length; index++) {
        let result = relevantResults[index].Cells.results;
        $('#target').append(`
        <div>
          <p>${result[3].Value} - <a href="${result[6].Value}">${result[6].Value}</a></p>
        </div>
      `);
      }

    }

    function onSearchError(searchData, errorMessage, errorCode) {
      console.log(errorMessage);
    }

  }
}