/// <reference path="getlist.ts" />
/// <reference path="../../node_modules/moment/moment.d.ts" />


namespace WikborgRein.TrackRecords {

    var languageNr: number = 0;
    var formatNr: number = 0;
    var titleArrayChamber: string[][] = [];
    var titleArrayLegal: string[][] = [];
    var chamberContentArray: string[] = [];
    var legalContentArray: string[] = [];
    var localizedCrossBorderDealChamber: number[] = [];
    var localizedCrossBorderDealLegal: number[] = [];
    var localizedCrossBorderDealChamberJ: number[] = [];
    var localizedCrossBorderDealLegalJ: number[] = [];
    var customTextLength: number = 0;
    var listData: any;
    var confidentialStringsChamber: number[] = [];
    var confidentialStringsLegal: number[] = [];
    var confidentialStringsChamberClient: number[] = [];

    //triggered from getlist.ts when list data is received. Starting point.
    export function receiveListData(data: any) {
        listData = data.d.results;
        configTitles();
        configContent();
        custCreateHTMLElements();
    }
    export function errorWithListData() {
        //  console.log('Error! Couldn\'t get list');
    }

    //convert null, undefined and invalid to N/A
    export function convertToNA() {
        var i;
        for (i = 0; i < chamberContentArray.length; i++) {
            if (chamberContentArray[i] === null ||
                chamberContentArray[i] === '__deferred' ||
                chamberContentArray[i] === 'Invalid date' ||
                chamberContentArray[i] === undefined) {
                chamberContentArray[i] = 'N/A';
            }
        }
        for (i = 0; i < legalContentArray.length; i++) {
            if (legalContentArray[i] === null ||
                legalContentArray[i] === '__deferred' ||
                legalContentArray[i] === 'Invalid date' ||
                legalContentArray[i] === undefined) {
                legalContentArray[i] = 'N/A';
            }
        }
    }
    //Put list content into arrays
    export function configContent() {
        //  console.log('configContent');
        var i = 0;
        var j = 0;
        var k = 0;

        for (j = 0; j < listData.length; j++) {
            chamberContentArray[i] = listData[j].Title;
            i++;
            chamberContentArray[i] = (listData[j].WRTR_Confidential ? (languageNr === 0 ? 'Konfidensielt' : 'Confidential') : listData[j].WRTR_Client);
            if (listData[j].WRTR_Confidential) {
                confidentialStringsChamberClient[confidentialStringsChamberClient.length] = i;
            }
            i++;
            chamberContentArray[i] = listData[j].WRTR_Description;
            i++;
            chamberContentArray[i] = (listData[j].WRTR_Confidential ? (languageNr === 0 ? 'Konfidensielt' : 'Confidential') : listData[j].WRTR_Value);
            if (listData[j].WRTR_Confidential) {
                confidentialStringsChamber[confidentialStringsChamber.length] = i;
            }
            i++;
            chamberContentArray[i] = listData[j].WRTR_Country;
            localizedCrossBorderDealChamber[localizedCrossBorderDealChamber.length] = i;
            localizedCrossBorderDealChamberJ[localizedCrossBorderDealChamberJ.length] = j;

            i++;
            chamberContentArray[i] = listData[j].WRTR_LeadPartner.Title;
            i++;
            chamberContentArray[i] = WikborgRein.CaseListItems.GetTeamMembersTitle(listData[j].WRTR_Team);
            i++;
            chamberContentArray[i] = listData[j].WRTR_OtherFirmsAdvising;
            i++;
            chamberContentArray[i] = moment(listData[j].WRTR_DateCompleted).format('D/M/YYYY');
            i++;
            chamberContentArray[i] = listData[j].WRTR_ClientContact;
            i++;
            chamberContentArray[i] = listData[j].WRTR_LawArea;
            i++;
            chamberContentArray[i] = listData[j].WRTR_CaseNumber;
            i++;
            chamberContentArray[i] = listData[j].WRTR_MediaLinks;
            i++;
            legalContentArray[k] = (listData[j].WRTR_Confidential ? (languageNr === 0 ? 'Konfidensielt' : 'Confidential') : listData[j].WRTR_Client);
            if (listData[j].WRTR_Confidential) {
                confidentialStringsLegal[confidentialStringsLegal.length] = k;
            }
            k++;
            legalContentArray[k] = '';
            k++;
            legalContentArray[k] = listData[j].Title;
            k++;
            legalContentArray[k] = listData[j].WRTR_Description;
            k++;
            legalContentArray[k] = (listData[j].WRTR_Confidential ? (languageNr === 0 ? 'Konfidensielt' : 'Confidential') : listData[j].WRTR_Value);
            if (listData[j].WRTR_Confidential) {
                confidentialStringsLegal[confidentialStringsLegal.length] = k;
            }
            k++;
            legalContentArray[k] = listData[j].WRTR_LeadPartner.Title;
            k++;
            legalContentArray[k] = WikborgRein.CaseListItems.GetTeamMembersTitle(listData[j].WRTR_Team);
            k++;
            legalContentArray[k] = listData[j].WRTR_OtherFirmsAdvising;
            k++;
            legalContentArray[k] = listData[j].WRTR_Country;
            localizedCrossBorderDealLegal[localizedCrossBorderDealLegal.length] = k;
            localizedCrossBorderDealLegalJ[localizedCrossBorderDealLegalJ.length] = j;


            k++;
            legalContentArray[k] = moment(listData[j].WRTR_DateCompleted).format('D/M/YYYY');
            k++;
            legalContentArray[k] = listData[j].WRTR_ReferenceUsed;
            k++;
            legalContentArray[k] = listData[j].WRTR_ClientContact;
            k++;
            legalContentArray[k] = listData[j].WRTR_LawArea;
            k++;
            legalContentArray[k] = listData[j].WRTR_CaseNumber;
            k++;
            legalContentArray[k] = listData[j].WRTR_MediaLinks;
            k++;
        }
        makeThingsConfidential();
        convertToNA();
        addAdditionalInfo();

    }

    //put list titles into arrays. Edit here to change titles.
    export function configTitles() {
        var i = 0;

        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = '';
        titleArrayChamber[i][1] = '';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D1 Kundenavn – dette vil bli publiserbart. Hvis du ikke kan avsløre kundenavnet, gi en generell beskrivelse.';
        titleArrayChamber[i][1] = 'D1 Name of client – this will be publishable. If you cannot reveal the client name, give a general description.';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D2 Saksoppsummering og departementets rolle - Vennligst si hvorfor denne saken var viktig. I tillegg, fortell oss konkret hvordan din rolle i departementet utspilte seg.';
        titleArrayChamber[i][1] = 'D2 Summary of matter and your department\'s role – Please say why this matter was important. Also, tell us exactly what role your department played.';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D3 Saksverdi – inkluder valuta og beløp';
        titleArrayChamber[i][1] = 'D3 Matter value – include currency and amount in figures';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D4 Er andre land involvert i saken? Hvis ja, vennligst oppgi hvilket jurisdiksjoner som var involvert.';
        titleArrayChamber[i][1] = 'D4 Is this a cross-border matter? If yes, please indicate the jurisdictions involved.';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D5 Ledende partner';
        titleArrayChamber[i][1] = 'D5 Lead partner';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D6 Andre lagmedlemmer';
        titleArrayChamber[i][1] = 'D6 Other team members';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D7 Andre firmaer som bistått på saken og deres rolle(r)';
        titleArrayChamber[i][1] = 'D7 Other firms advising on the matter and their role(s)';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D8 Ferdigstillingsdato eller nåværende status.';
        titleArrayChamber[i][1] = 'D8 Date of completion or current status';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D9 Kundekontakt.';
        titleArrayChamber[i][1] = 'D9 Client contact';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D10 Lovområder';
        titleArrayChamber[i][1] = 'D10 Law area';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D11 Saksnummer';
        titleArrayChamber[i][1] = 'D11 Case number';
        i++;
        titleArrayChamber[i] = [];
        titleArrayChamber[i][0] = 'D12 Annen informasjon om denne saken – f.eks. lenke til pressedekning';
        titleArrayChamber[i][1] = 'D12 Other information about this matter – e.g. link to press coverage';

        i = 0;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Kundenavn';
        titleArrayLegal[i][1] = 'Client name';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Saksbeskrivelse';
        titleArrayLegal[i][1] = 'Description of case';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Saksnavn: ';
        titleArrayLegal[i][1] = 'Name of matter: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Saksoppsumering og firmaets rolle: ';
        titleArrayLegal[i][1] = 'Summary of matter and your firm\'s role: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Saksverdi: ';
        titleArrayLegal[i][1] = 'Matter Value: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Ledende partner: ';
        titleArrayLegal[i][1] = 'Lead partner: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Andre lagmedlemmer: ';
        titleArrayLegal[i][1] = 'Other team members: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Andre departementer i firmaet som er involvert: ';
        titleArrayLegal[i][1] = 'Other departments of the firm involved: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Er andre land involvert? ';
        titleArrayLegal[i][1] = 'Cross-border deal? ';
        //  i++;
        //   titleArrayLegal[i] = [];
        //   titleArrayLegal[i][0] = 'Andre firmaer som bistått på saken og deres rolle(r): ';
        //   titleArrayLegal[i][1] = 'Other firms advising on the matter and their role(s): ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Ferdigstillingsdato eller nåværende status: ';
        titleArrayLegal[i][1] = 'Date of completion or current status: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Er kunden en referanse (på kundereferanseinnleveringen)? ';
        titleArrayLegal[i][1] = 'Client a referee (on your client referee submission)? ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Kundekontakt: ';
        titleArrayLegal[i][1] = 'Client contact: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Lovområder: ';
        titleArrayLegal[i][1] = 'Law area: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Saksnummer: ';
        titleArrayLegal[i][1] = 'Case number: ';
        i++;
        titleArrayLegal[i] = [];
        titleArrayLegal[i][0] = 'Lenke til pressedekning: ';
        titleArrayLegal[i][1] = 'Link to press coverage: ';

    }

    //Makes things confidential when it have to be, with the correct language
    export function makeThingsConfidential() {
        // console.log('makeThingsConfidential');
        var confidentialString: string;
        var confidentialStringClient: string;
        var i;
        switch (languageNr) {
            case 0:
                confidentialString = 'Konfidensielt';
                confidentialStringClient = 'Konfidensielt';
                //'Kundenavn er konfidensielt';
                break;
            case 1:
                confidentialString = 'Confidential';
                confidentialStringClient = 'Confidential';
                //'Name of client is confidential';
                break;
            default:
                confidentialString = 'Confidential';
                confidentialStringClient = 'Confidential';
                //'Name of client is confidential';
                break;
        }
        for (i = 0; i < confidentialStringsChamber.length; i++) {
            chamberContentArray[confidentialStringsChamber[i]] = confidentialString;
        }
        for (i = 0; i < confidentialStringsChamberClient.length; i++) {
            chamberContentArray[confidentialStringsChamberClient[i]] = confidentialStringClient;
        }
        for (i = 0; i < confidentialStringsLegal.length; i++) {
            legalContentArray[confidentialStringsLegal[i]] = confidentialString;
        }
    }

    //Quick-fix for crossBorder deal - additional info
    export function addAdditionalInfo() {
        var i = 0;
        var customTextStart;
        var customTextEnd;

        customTextStart = (languageNr === 0 ? 'Ja, ' : 'Yes, ');
        customTextEnd = (languageNr === 0 ? ` &lt;MÅ FYLLES UT&gt;` : ` &lt;MUST BE COMPLETED&gt`);
        for (i = 0; i < localizedCrossBorderDealLegal.length; i++) {

            if (legalContentArray[localizedCrossBorderDealLegal[i]] !== `N/A`) {
                legalContentArray[localizedCrossBorderDealLegal[i]] = customTextStart + listData[localizedCrossBorderDealLegalJ[i]].WRTR_Country + customTextEnd;
            }
        }
        for (i = 0; i < localizedCrossBorderDealChamber.length; i++) {

            if (chamberContentArray[localizedCrossBorderDealChamber[i]] !== `N/A`) {
                chamberContentArray[localizedCrossBorderDealChamber[i]] = customTextStart + listData[localizedCrossBorderDealChamberJ[i]].WRTR_Country + customTextEnd;
            }
        }
    }

    //Change language
    export function changeLanguage(newLanguageNr: number) {
        languageNr = newLanguageNr;
        addAdditionalInfo();
        makeThingsConfidential();
        (formatNr === 0 ? createChamberElements() : createLegalElements());
        $('#norwegianButton').addClass((languageNr === 0 ? 'buttonSelected' : 'buttonNotSelected'));
        $('#englishButton').addClass((languageNr === 1 ? 'buttonSelected' : 'buttonNotSelected'));
        $('#norwegianButton').removeClass((languageNr === 0 ? 'buttonNotSelected' : 'buttonSelected'));
        $('#englishButton').removeClass((languageNr === 1 ? 'buttonNotSelected' : 'buttonSelected'));
    }

    //change between legal and chamber
    export function changeFormat(newFormatNr: number) {
        formatNr = newFormatNr;
        (formatNr === 0 ? createChamberElements() : createLegalElements());
        $('#chamberButton').addClass((formatNr === 0 ? 'buttonSelected' : 'buttonNotSelected'));
        $('#legalButton').addClass((formatNr === 1 ? 'buttonSelected' : 'buttonNotSelected'));
        $('#chamberButton').removeClass((formatNr === 0 ? 'buttonNotSelected' : 'buttonSelected'));
        $('#legalButton').removeClass((formatNr === 1 ? 'buttonNotSelected' : 'buttonSelected'));
    }

    //export function appendLegalContent(content,size1,size2,onFirstCollumn) {
    //B
    //}
    // export function appendLegalTitle() {
    //B
    // }

    export function createLegalElements() {
        $('#divToCopy').empty();
        var i = 0;
        var j = 0;
        var k = 0;
        for (i = 0; i < legalContentArray.length; i++) {
            if (j === 0) {
                //creating table entry
                $('#divToCopy').append(`
                <table id="legalTable${i}" width="613" cellpadding="7">
                    <colgroup>
                        <col width="177">
                        <col width="406">
                    </colgroup>
                </table>
                `);
                //creating table body
                $('#legalTable' + i).append(`
                    <tbody id="legalTableBody${i}">            
                    </tbody>
                `);
                //creating the different table collumns, and fill all except main collumn with title and content
                $('#legalTableBody' + i).append(`            
                    <tr valign="TOP">
                        <td width="177" bgcolor="#c0c0c0" style="border: 1px solid #00000a; padding-top: 0in; padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                            <p lang="en-GB">
                                <font face="Times New Roman, serif">
                                    <font size="1" style="font-size: 8pt">
                                        <font size="2" style="font-size: 11pt">${titleArrayLegal[0][languageNr]} 
                                        </font>
                                    </font>
                                </font>
                            </p>
                        <p lang="en-GB"><br>
                        </p>
                </td>
                <td width="406" style="border: 1px solid #00000a; padding-top: 0in; padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                    <p lang="en-GB">
                        <font face="Times New Roman, serif">
                            <font size="1" style="font-size: 8pt">
                                <font size="2" style="font-size: 11pt">
                                    <span lang="en-US">${legalContentArray[i]}
                                    </span>
                                </font>
                            </font>
                        </font>
                    </p>
                </td>
                </tr>
                <tr valign="TOP" id="legalTableBodyTr">
                    <td width="177" bgcolor="#c0c0c0" style="border: 1px solid #00000a; padding-top: 0in; padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                        <p lang="en-GB">
                            <font face="Times New Roman, serif">
                                <font size="1" style="font-size: 8pt">
                                    <font size="2" style="font-size: 11pt">${titleArrayLegal[1][languageNr]} </font>
                                </font>
                            </font>
                        </p>
                    </td>
                    <td id="legalTabelMainBody${i}" width="406" style="border: 1px solid #00000a; padding-top: 0in; padding-bottom: 0in; padding-left: 0.08in; padding-right: 0.08in">
                        
                    </td>
                </tr>
                `);
                j++;
                i++;
            } else {
                //creating title and content for main collumn
                $('#legalTabelMainBody' + (i - j)).append(`                                    
                    <p lang="en-GB">
                        <font face="Times New Roman, serif">
                            <font size="1" style="font-size: 8pt">
                                <font size="2" style="font-size: ${(j === 2 ? '12' : '11')}pt">
                                    <b>${titleArrayLegal[j][languageNr]}</b>
                                    ${(j === 2 ? '<b>' : '')}${legalContentArray[i]}${(j === 2 ? '</b>' : '')}
                                </font>
                            </font>
                        </font>
                    <br />
                    </p>            
                `);
            }
            j++;
            //reset the j-counter, so the title entries (and not the content entries) repeats for additional list element.
            if (j >= titleArrayLegal.length) {
                j = 0;
                $('#divToCopy').append(`
                <br /><br /><br />
                `);
            }
        }
    }

    export function createChamberElements() {
        $('#divToCopy').empty();
        var i = 0;
        var j = 0;
        for (i = 0; i < chamberContentArray.length; i++) {
            if (j === 0) {
                //creating table
                $('#divToCopy').append(`        
                    <table id="chamberTable${i}" width="675" cellpadding="2" cellspacing="0" style="page-break-before: always">
                    <colgroup><col width="669">
                    </colgroup>
                `);
                //creating table body
                $('#chamberTable' + i).append(`  
                    <tbody id="chamberTableBody${i}">
                    </tbody>
                `);
                //creating mainHeaderEntry(content)
                $('#chamberTableBody' + i).append(`
                    <tr>
		                <td width="669" bgcolor="#ffffff" style="border: 1px solid #c0c0c0; padding: 0.02in">
			                <p align="CENTER"><a name="_GoBack"></a><font size="4"><b>${chamberContentArray[i]}</b></font></p>
		                </td>
	                </tr>
                `);
            } else {
                //creating titleEntry
                $('#chamberTableBody' + (i - j)).append(`
                    <tr>
		                <td width="669" valign="TOP" bgcolor="#ffffff" style="border: 1px solid #c0c0c0; padding: 0.02in">
			                <p style="page-break-after: avoid"><span lang="en-GB"><font size="2" style="font-size: 11pt">${titleArrayChamber[j][languageNr]}</font></span></p>
		                </td>
	                </tr>
                `);
                //creating contentEntry
                $('#chamberTableBody' + (i - j)).append(`
                    <tr>
		                <td width="669" height="26" valign="TOP" bgcolor="#ccffcc" style="border: 1px solid #c0c0c0; padding: 0.02in">
			                <p lang="en-GB" class="western">
                                <font size="2" style="font-size: 11pt">${chamberContentArray[i]}</font>
			                </p>
		                </td>
	                </tr>
                `);
            }
            j++;
            //reset the j-counter, so the title entries (and not the content entries) repeats for additional list element.
            if (j >= titleArrayChamber.length) {
                j = 0;
                $('#divToCopy').append(`
                <br /><br /><br />
                `);
            }
        }
    }

    export function createCopyAndBackButton() {
        //Copy button is not part of css customButton class
        $('#dialog').append(
            '<button class="btn" style="width:100px;height:47px;margin-bottom:20px;" id="copyButton" data-clipboard-target="#divToCopy" onclick="return false">Copy to clipboard</button>'
            + '<button id="closeButton" class="customButton" onclick="WikborgRein.TrackRecords.goBack(); return false">Back</button>'
        );
    }

    //creating other elements
    export function custCreateHTMLElements() {
        //  console.log('custCreateHTMLElements');
        var i;
        var titleElement = [];
        var contentElement = [];

        $('#dynamicElements').empty();

        $('#dynamicElements').append(
            '<div id="dialog" style="display:block; max-width:300px"></div>'
        );


        $('#dialog').append(
            '<button id="chamberButton" class="buttonSelected customButton" onclick="WikborgRein.TrackRecords.changeFormat(0); return false">Chamber</button>'
            + '<button id="legalButton" class="buttonNotSelected customButton" onclick="WikborgRein.TrackRecords.changeFormat(1); return false" >Legal</button>'
            + '<button id="norwegianButton" class="buttonSelected customButton" onclick="WikborgRein.TrackRecords.changeLanguage(0); return false">Norsk</button>'
            + '<button id="englishButton" class="buttonNotSelected customButton" onclick="WikborgRein.TrackRecords.changeLanguage(1); return false">English</button>'
        );
        //above
        createCopyAndBackButton();
        $('#dialog').append(
            '<div id="divToCopy"></div>'
        );
        (formatNr === 0 ? createChamberElements() : createLegalElements());
        //below
        createCopyAndBackButton();

        //   console.log('custCreateHTMLElementsEND');
    }

    //takes you back to list
    export function goBack() {
        //   console.log('go back called');
        window.location.href = _spPageContextInfo.webAbsoluteUrl + '/Lists/Case List/';
    }
}
