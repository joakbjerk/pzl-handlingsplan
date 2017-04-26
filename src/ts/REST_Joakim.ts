namespace Handlingsplan.REST_Joakim {


  let subsitesUrlArray = [
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite1',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite10',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite2',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite3',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite4',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite5',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite6',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite7',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite8',
    'https://pzldev.sharepoint.com/sites/handlingsplanhovedside/subsite9'
  ];

  export function init() {
    //getSubsiteUrls();
    getSubsitesHandlingsplanListItems();
  };


  //getSubsiteUrls--------------------------------------------------------------------------->

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
    console.log('Subsites Length');
    console.log(subsites.length);
    for (let index = 0; index < subsites.length; index++) {
      let subsite = subsites[index];
      subsitesUrlArray[subsitesUrlArray.length] = subsite.Url;
    }
    console.log('Subsites push complete');
    console.log(subsitesUrlArray.length);
  }

  function onGetSubsiteError(data, errorMessage, errorCode) {
    console.log(errorMessage);
  }

  //getSubsitesHandlingsplanListItems()------------------------------------------------>

  function getSubsitesHandlingsplanListItems() {
    console.log('getSubsitesHandlingsplanListItems');
    console.log(subsitesUrlArray);
    console.log(subsitesUrlArray.length);
    for (let index = 0; index < subsitesUrlArray.length; index++) {
      let subsiteUrl = subsitesUrlArray[index];
      console.log('loopityloop');
      $.ajax({
        url: `${subsiteUrl}/_api/web/lists/getByTitle('Handlingsplan')/items`,
        type: 'GET',
        headers: { 'Accept': 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose' },
        success: onGetSubsiteListItemsSuccess,
        error: onGetSubsiteListItemsError
      });
    }
  };

  function onGetSubsiteListItemsSuccess(data) {
    let listItems = data.d.results;
    console.log(listItems);
    for (let index = 0; index < listItems.length; index++) {
      let listItem = listItems[index];
      console.log(listItem.Title);
    }
  }

  function onGetSubsiteListItemsError(data, errorMessage, errorCode) {
    console.log(errorMessage);
  }
}

