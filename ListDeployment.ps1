 #Variables
 $SiteCollectionUrl = "https://bjerkpzl.sharepoint.com/sites/handlingsplanroot"

#----------------------------------------------------------------------------------------------------------------------------------
#Functions Connect to the RootSite and the Subsites
function ConnectToRootSite() {
    Write-Host ""
    Write-Host "Logging into" $SiteCollectionUrl -ForegroundColor Yellow
    Connect-PnPOnline -Url $SiteCollectionUrl -Credentials 'bjerkpzl'
    Write-Host "Logged into" $SiteCollectionUrl -ForegroundColor Green
    Write-Host ""
}

function ConnectToSubsites($index) {
   
        [string]$SubwebConnectionUrl = $SubwebUrls[$index].Url
        
        Write-Host  "Connecting to subsite" $SubwebConnectionUrl -ForegroundColor Yellow
        Connect-PnPOnline -Url $SubwebConnectionUrl -Credentials 'bjerkpzl'
        Write-Host  "Connected to" $SubwebConnectionUrl -ForegroundColor Green
        Write-Host ""
    
    }


#----------------------------------------------------------------------------------------------------------------------------------

#Function that Applyes the template to the subsites
function ApplyListTemplateToSubsites() {
    for($index = 0; $index -lt $SubwebUrls.Length; $index++) {
        
        ConnectToSubsites($index) 
        Write-Host "Apllying list template to" $SubwebConnectionUrl -ForegroundColor Yellow
        Apply-PnPProvisioningTemplate -Path .\Handlingsplan.xml
        Write-Host "List template successfully applied" -ForegroundColor Green
        Write-Host ""
   
   }
}
#----------------------------------------------------------------------------------------------------------------------------------

#Function that adds dummy data to the Handlingsplan lists
function AddListItemsToHandlingsplan($NumbersOfListItems) {

$Money = 
    10000, 25000, 50000, 75000, 
    100000, 125000, 150000, 175000,
    200000, 225000, 250000, 275000, 
    300000, 325000, 350000, 375000, 
    400000, 425000, 450000, 475000, 
    500000, 525000, 550000, 575000, 
    600000, 625000, 650000, 675000, 
    700000, 725000, 750000, 775000, 
    800000, 825000, 850000, 875000, 
    900000, 925000, 950000, 975000, 
    1000000;

for($index = 0; $index -le $SubwebUrls.Length -1; $index++) {
    
    ConnectToSubsites($index) 
    
    for($subIndex = 0; $subIndex -le $NumbersOfListItems -1; $subIndex++) {
        
            $RandomMoneyValue = Get-Random -InputObject $Money;
            [string]$ItemIndex = SubsiteIndexFormatter($index);
           
            Write-Host "Adding list item to Handlingsplan at" $SubwebConnectionUrl -ForegroundColor Yellow
            Add-PnPListItem -List "Handlingsplan" -ContentType "Pzl Handlingsplan"  -Values @{"Title" = ($ItemIndex) + " Test Title"; "PZLHP_Ordre" = ($ItemIndex) + " Test Ordre"; "PZLHP_Ordrenummer" = ($ItemIndex) + " Test Ordrenummer"; "PZLHP_Kunde" = ($ItemIndex) + " Test Kunde"; "PZLHP_Kundenummer" = ($ItemIndex) + " Test Kundenummer"; "PZLHP_Ansvarlig" = "Bjerk Pzl"; "PZLHP_Verdi" = ($RandomMoneyValue); "PZLHP_Fremgangsplan" = ($ItemIndex) + " Test Fremgangsplan"}
            Write-Host "List items successfully added" -ForegroundColor Green
            Write-Host 
         
         }
    }
}
#Generating random money value for the currency field
function GenerateMoney() {
    $Money = 10000;
    for($increment = 25000; $increment -le 1000000; $increment ++) {
        $Money += $increment;
    }
    return $Money
}

#Formats the index, to make sure the dummy data gets added to the correct subsite
function SubsiteIndexFormatter($index) {
   if($index -eq 1) {
        return [string]$ItemIndex = "" + ($index)+ "0-" + ($subIndex + 1) + "";
  
  }if($index -ne 0 -and $index -ne 1) {
        return [string]$ItemIndex = "" + ($index)+ "-" + ($subIndex + 1) + "";
  
  }else{
        return [string]$ItemIndex = "" + ($index + 1)+ "-" + ($subIndex + 1) + "";
       }
}
#----------------------------------------------------------------------------------------------------------------------------------

#Function that creates Subsites
function CreatSubsites($NumberOfSubsites) {
    
    for($index = 0; $index -lt $NumberOfSubsites; $index++) {
        
        [string]$SubsiteTitle = ("Subsite " + ($index + 1));
        [string]$SubsiteUrl = ("subsite" + ($index + 1));
        
        Write-Host "Creating subsite" $SubsiteTitle "at" (($SiteCollectionUrl) + "/" + ($SubsiteUrl)) -ForegroundColor Yellow
        New-PnPWeb -Url $SubsiteUrl -Title $SubsiteTitle -Template "STS#0" -Locale 1044
        Write-Host $SubsiteTitle "Successfully created!" -ForegroundColor Green
        Write-Host ""
    }
 }
#----------------------------------------------------------------------------------------------------------------------------------

#Functions that remove list items from Handlingsplan
function RemoveHandlingsplanListItems() {
    ConnectToSubsites($index)
        
        $ListItemsToRemove = Get-PnPListItem -List "Handlingsplan"
        $ListItem = $ListItemsToRemove[$inedx].ID
        
        Remove-PnPListItem -List "Handlingsplan" -Identity $ListItem
    }
 }

#----------------------------------------------------------------------------------------------------------------------------------


#init function
function init() {
    ConnectToRootSite
    
    $SubwebUrls = Get-PnPSubWebs;
    RemoveHandlingsplanListItems
    #GetListItemsToRemove
    #Connect-PnPOnline -Url (($SiteCollectionUrl) + "/subsite1") -Credentials 'bjerkpzl'
    #CreatSubsites
    #ApplyListTemplateToSubsites
    #AddListItemsToHandlingsplan
    #RemoveHandlingsplanListItems
    #GetListItemsToRemove
    Write-Host ""
    Write-Host "Done!" -ForegroundColor Green
}

init 