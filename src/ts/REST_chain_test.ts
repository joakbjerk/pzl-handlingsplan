namespace Handlingsplan.RESTChain {

  let embededSubsitesUrlArray = [
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

  let subsiteUrlArray = [];

  interface SubsiteListItem {
    Title: string;
  }

  let subsitesLitItemsArray = [];

  export function init() {
    //getSubsiteUrls();getSubsitesHandlingsplanListItems();postListItemsToHandlingsplaner();
    RESTSearchTest();
  };

  function RESTSearchTest() {
    $.ajax({
      url: `${_spPageContextInfo.webAbsoluteUrl}/_api/search/query?querytext='Handlginsplan'&selectproperties='Title'`,
      type: 'GET',
      success: onSearchSuccess,
      error: onSearchErrror
    });

    function onSearchSuccess(data) {
      console.log(data);
    }

    function onSearchErrror(data, errorMessage, errorCode) {
      console.log(errorMessage);
    }
  }

  //getSubsiteUrls--------------------------------------------------------------------------->

  function getSubsiteUrls() {
    console.log('getSubsiteUrls');
    $.ajax({
      url: _spPageContextInfo.webAbsoluteUrl + '/_api/web/webs',
      type: 'GET',
      async: false,
      headers: { 'Accept': 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose' },
      success: onGETSubsiteSuccess,
      error: onGETSubsiteError
    });

    function onGETSubsiteSuccess(subsitesData) {
      console.log(subsitesData.d.results);
      let subsites = subsitesData.d.results;
      for (let index = 0; index < subsites.length; index++) {
        let subsite = subsites[index];
        subsiteUrlArray.push(subsite.Url);
      }

    }

    function onGETSubsiteError(subsitesData, errorMessage, errorCode) {
      console.log(errorMessage);
    }
  }



  //getSubsitesHandlingsplanListItems()------------------------------------------------>

  function getSubsitesHandlingsplanListItems() {
    console.log('getSubsitesHandlingsplanListItems');
    console.log(subsiteUrlArray.length);
    console.log(subsiteUrlArray);
    for (let index = 0; index < subsiteUrlArray.length; index++) {
      let subsiteUrl = subsiteUrlArray[index];
      $.ajax({
        url: `${subsiteUrl}/_api/web/lists/getByTitle('Handlingsplan')/items`,
        type: 'GET',
        async: false,
        headers: { 'Accept': 'application/json;odata=verbose', 'Content-Type': 'application/json;odata=verbose' },
        success: onGETSubsiteListItemsSuccess,
        error: onGETSubsiteListItemsError
      });
    }
    function onGETSubsiteListItemsSuccess(listItemData) {
      let listItems = listItemData.d.results;
      for (let index = 0; index < listItems.length; index++) {
        let listItem = listItems[index];
        let itemsTest: SubsiteListItem = { Title: listItem.Title };
        subsitesLitItemsArray.push(itemsTest);
      }
    }

    function onGETSubsiteListItemsError(listItemData, errorMessage, errorCode) {
      console.log(errorMessage);
    }
  }


  function postListItemsToHandlingsplaner() {
    console.log(subsitesLitItemsArray);
    for (let index = 0; index < subsitesLitItemsArray.length; index++) {
      let listItem = subsitesLitItemsArray[index];
      console.log(listItem.Title);
      $.ajax({
        url: `${_spPageContextInfo.webAbsoluteUrl}/_api/web/lists/getByTitle('Handlingsplaner')/items`,
        type: 'POST',
        async: false,
        data: { '__metadata': { 'type': 'SP.Data.HandlingsplanerListItem' }, 'Title': listItem.Title },
        headers: { 'accept': 'application/json;odata=verbose', 'content-type': 'application/json;odata=verbose' },
        success: onPOSTListItemsSuccess,
        error: onPOSTListItemsError
      });
    }
    function onPOSTListItemsSuccess(postedData) {
      console.log(postedData);
    }
    function onPOSTListItemsError(postedData, errorMessage, errorCode) {
      console.log(errorMessage);
    }
  }

}