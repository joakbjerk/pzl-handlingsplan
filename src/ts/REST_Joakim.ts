$(document).ready(function () {
  ExecuteOrDelayUntilScriptLoaded(init, 'sp.js');
});


function init() {
  let subsitesUrlArray = [];
  getSubsiteUrls();

  function getSubsiteUrls() {
    console.log('getSubsiteUrls');
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/webs',
      type: 'GET',
      headers: { 'Accept': 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose' },
      success: onGetSubsiteSuccess,
      error: onGetSubsiteError
    });
  }

  function onGetSubsiteSuccess(data) {
    let subsites = data.d.results;
    for (let index = 0; index < subsites.length; index++) {
      let subsite = subsites[index];
      console.log(subsite.Url);
      subsitesUrlArray.push(subsite.Url);
    }
    console.log('Subsites push complete');
    console.log(subsitesUrlArray.length);
    getSubsitesHandlingsplanListItems();
  }

  function onGetSubsiteError(data, errorMessage, errorCode) {
    console.log(errorMessage);
  }

  function getSubsitesHandlingsplanListItems() {
    console.log('getSubsitesHandlingsplanListItems');
    console.log('Url Array Length check');
    console.log(subsitesUrlArray.length);
    for (let index = 0; index < subsitesUrlArray.length; index++) {
      let subsiteUrl = subsitesUrlArray[index];
      $.ajax({
        url: subsiteUrl + '/_api/web/lists',
        type: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose' },
        success: onGetSubsiteListItemsSuccess,
        error: onGetSubsiteListItemsError
      });
    }
  };

  function onGetSubsiteListItemsSuccess(data) {
    console.log(data.d.results);
  }

  function onGetSubsiteListItemsError(data, errorMessage, errorCode) {
    console.log(errorMessage);
  }
}