#Variables
$SiteURL = "https://bjerkpzl.sharepoint.com/sites/handlingsplanroot"

function ConnectToRootSite() {
Write-Host ""
Write-Host "Logging into" $SiteURL -ForegroundColor Green
Connect-PnPOnline -Url $SiteURL -Credentials 'bjerkpzl'
Write-Host "Logged into" $SiteURL -ForegroundColor Green
}



function ApplyTemplateToSubsites() {
$SubwebURLS = Get-PnPSubWebs;
for($index = 0; $index -le $SubwebURLS.Length - 1; $index++) {
   [string]$SubwebConnectionUrl = $SubwebURLS[$index].Url
    Write-Host  "Connecting to" $SubwebConnectionUrl -ForegroundColor Green
    Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials 'bjerkpzl'
    Write-Host "Add listitems to Handlingsplan at" $SubwebConnectionUrl -ForegroundColor Green
    Apply-PnPProvisioningTemplate -Path .\Handlingsplan.xml
    Write-Host "Application successful" -ForegroundColor Green
   }
}

function AddListItemsToHandlingsplan() {
$SubwebURLS = Get-PnPSubWebs;
$MoneyArray = 50000, 100000, 150000, 200000, 250000, 300000,  350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000,  750000, 800000, 850000, 900000,  950000, 1000000;
$NumbersOfListItems = 10; 
for($index = 0; $index -le $SubwebURLS.Length -1; $index++) {
    [string]$SubwebConnectionUrl = $SubwebURLS[$index].Url
    Write-Host ""
    Write-Host  "Connecting to" $SubwebConnectionUrl -ForegroundColor Green
    Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials 'bjerkpzl'
    for($subIndex = 0; $subIndex -le $NumbersOfListItems -1; $subIndex++) {
        $MoneyValue = Get-Random -InputObject $MoneyArray;
        [string]$ItemIndex = "" + ($index + 1)+ "-" + ($subIndex + 1) + "";
        Write-Host "Adding list item to Handlingsplan at" $SubwebConnectionUrl -ForegroundColor Green
        Add-PnPListItem -List "Handlingsplan" -ContentType "Pzl Handlingsplan"  -Values @{"Title" = ($ItemIndex) + " Test Title"; "PZLHP_Ordre" = ($ItemIndex) + " Test Ordre"; "PZLHP_Ordrenummer" = ($ItemIndex) + " Test Ordrenummer"; "PZLHP_Kunde" = ($ItemIndex) + " Test Kunde"; "PZLHP_Kundenummer" = ($ItemIndex) + " Test Kundenummer"; "PZLHP_Ansvarlig" = "Bjerk Pzl"; "PZLHP_Verdi" = ($MoneyValue); "PZLHP_Fremgangsplan" = ($ItemIndex) + " Test Fremgangsplan"}
        Write-Host "List item successfully added" -ForegroundColor Green
        Write-Host ""
    }
  }
}


function CreatSubsites() {
    $NumberOfSubsites = 10;
    for($index = 0; $index -le $NumberOfSubsites -1; $index++) {
        [string]$SubsiteTitle = ("Subsite " + ($index + 1));
        [string]$SubsiteUrl = ("subsite" + ($index + 1));
        Write-Host ""
        Write-Host "Creating subsite" $SubsiteTitle "at" (($SiteURL) + "/" + ($SubsiteUrl)) -ForegroundColor Green
        New-PnPWeb -Url $SubsiteUrl -Title $SubsiteTitle -Template "STS#0" -Locale 1044
        Write-Host ($SubiteTitle) "Successfully created!" -ForegroundColor Green
    }
 }


ConnectToRootSite
CreatSubsites
#ApplyTemplateToSubsites
#AddListItemsToHandlingsplan
Write-Host ""
Write-Host "Done!" -ForegroundColor Green

 