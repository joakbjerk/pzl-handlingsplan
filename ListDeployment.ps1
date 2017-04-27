#Variables
$SiteURL = "https://bjerkpzl.sharepoint.com/sites/handlingsplanroot"
$username = "bjerk@bjerkpzl.onmicrosoft.com"
$psw = ConvertTo-SecureString "FettPassord123" -AsPlainText -Force
$Credenttials = New-Object -TypeName System.Management.Automation.PSCredential -Argumentlist $username, $psw


function ConnectToRootSite() {
Write-Host ""
Write-Host "Logging into " $SiteURL -ForegroundColor Green
Connect-PnPOnline -Url $SiteURL -Credentials $Credenttials
Write-Host "Logged into " $SiteURL -ForegroundColor Green
}



function ApplyTemplateToSubsites() {
$SubwebURLS = Get-PnPSubWebs;
for($index = 0; $index -le $SubwebURLS.Length - 1; $index++) {
   [string]$SubwebConnectionUrl = $SubwebURLS[$index].Url
    Write-Host  "Connecting to" $SubwebConnectionUrl -ForegroundColor Green
    Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials $Credenttials
    Write-Host "Add listitems to Handlingsplan" $SubwebConnectionUrl -ForegroundColor Green
    Apply-PnPProvisioningTemplate -Path .\Handlingsplan.xml
    Write-Host "Application successful" -ForegroundColor Green
   }
}

function AddListItemsToHandlingsplan() {
$SubwebURLS = Get-PnPSubWebs;
$MoneyArray = 50000, 100000, 150000, 200000, 250000, 300000,  350000, 400000, 450000, 500000, 550000, 600000, 650000, 700000,  750000, 800000, 850000, 900000,  950000, 1000000;
$NumbersOfListItems = 2; 
for($index = 0; $index -le $SubwebURLS.Length - 1; $index++) {
    [string]$SubwebConnectionUrl = $SubwebURLS[$index].Url
    Write-Host ""
    Write-Host  "Connecting to" $SubwebConnectionUrl -ForegroundColor Green
    Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials $Credenttials
    for($subIndex = 0; $subIndex -le $NumbersOfListItems; $subIndex++) {
        $MoneyValue = Get-Random -InputObject $MoneyArray;
        [string]$ItemIndex = (($index + 1) + "-" + ($subIndex));
        Write-Host "Adding list item to Handlingsplan " $SubwebConnectionUrl -ForegroundColor Green
        Add-PnPListItem -List "Handlingsplan" -ContentType "Pzl Handlingsplan"  -Values @{"Title" = ($ItemIndex) + " Test Title"; "PZLHP_Ordre" = ($ItemIndex) + " Test Ordre"; "PZLHP_Ordrenummer" = ($ItemIndex) + " Test Ordrenummer"; "PZLHP_Kunde" = ($ItemIndex) + " Test Kunde"; "PZLHP_Kundenummer" = ($ItemIndex) + " Test Kundenummer"; "PZLHP_Ansvarlig" = "Bjerk Pzl"; "PZLHP_Verdi" = ($MoneyValue); "PZLHP_Fremgangsplan" = ($ItemIndex) + " Test Fremgangsplan"}
        Write-Host "List item successfully added" -ForegroundColor Green
        Write-Host ""
    }
  }
}



ConnectToRootSite
#ApplyTemplateToSubsites
AddListItemsToHandlingsplan
Write-Host ""
Write-Host "Done!" -ForegroundColor Green

 