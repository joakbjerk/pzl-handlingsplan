#Variables
$SiteURL = "https://pzldev.sharepoint.com/sites/handlingsplanhovedside"
$username = "joakim@pzlDev.onmicrosoft.com"
$psw = ConvertTo-SecureString "Kult1234" -AsPlainText -Force
$Credenttials = New-Object -TypeName System.Management.Automation.PSCredential -Argumentlist $username, $psw


function ConnectToRootSite() {
Write-Host ""
Write-Host "Logging into " $SiteURL -ForegroundColor Green
Connect-PnPOnline -Url $SiteURL -Credentials $Credenttials
Write-Host "Logged into " $SiteURL -ForegroundColor Green
}



Function ApplyTemplateToSubsites() {
$SubwebURLS = Get-PnPSubWebs;
for($index = 0; $index -le $SubwebURLS.Length - 1; $index++) {
    Write-Host ""
    [string]$SubwebConnectionUrl = $SubwebURLS[$index].Url
    Write-Host  "Connecting to" $SubwebConnectionUrl -ForegroundColor Green
    Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials $Credenttials
    Write-Host "Applying template to" $SubwebConnectionUrl -ForegroundColor Green
    Apply-PnPProvisioningTemplate -Path .\Templates\HandlingsplanListTemplate.xml
    Write-Host "Application successful" -ForegroundColor Green
  }

}

 ConnectToRootSite
 ApplyTemplateToSubsites
 Write-Host "Done!" -ForegroundColor Green

