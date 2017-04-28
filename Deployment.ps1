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
}


#----------------------------------------------------------------------------------------------------------------------------------

#Function that Applyes the template to the subsites
function ApplyListTemplateToSubsites() {
    for($index = 0; $index -lt $SubwebUrls.Length; $index++) {
        
        ConnectToSubsites($index) 
        Apply-PnPProvisioningTemplate -Path .\Handlingsplan.xml
        Write-Host "List template successfully applied" -ForegroundColor Green
        Write-Host ""
   
   
    }
}
#----------------------------------------------------------------------------------------------------------------------------------

#Function that adds dummy data to the Handlingsplan lists
function AddListItemsToHandlingsplan($NumbersOfListItems) {
     $MoneyGenerated = GenerateMoney
     Write-Host $MoneyGenerated 
     for($index = 0; $index -lt $SubwebUrls.Length; $index++) {
    
        ConnectToSubsites($index) 
    
        for($subIndex = 0; $subIndex -lt $NumbersOfListItems; $subIndex++) {
        
            $RandomMoneyValue = Get-Random -InputObject $MoneyGenerated;
            [string]$ItemIndex = SubsiteIndexFormatter($index);
           
            Write-Host "Adding list item to Handlingsplan" -ForegroundColor Yellow
            Add-PnPListItem -List "Handlingsplan" -ContentType "Pzl Handlingsplan"  -Values @{"Title" = ($ItemIndex) + " Test Title"; "PZLHP_Ordre" = ($ItemIndex) + " Test Ordre"; "PZLHP_Ordrenummer" = ($ItemIndex) + " Test Ordrenummer"; "PZLHP_Kunde" = ($ItemIndex) + " Test Kunde"; "PZLHP_Kundenummer" = ($ItemIndex) + " Test Kundenummer"; "PZLHP_Ansvarlig" = "Bjerk Pzl"; "PZLHP_Verdi" = ($RandomMoneyValue); "PZLHP_Fremgangsplan" = ($ItemIndex) + " Test Fremgangsplan"}
            Write-Host "List item successfully added" -ForegroundColor Green
            Write-Host ""
          }
    }
}

#Generating random money value for the currency field
function GenerateMoney() {
    [array]$MoneyArray + 10000;
    for($increment = 25000; $increment -le 1000000; $increment = ($increment + 25000)) {
        [array]$MoneyArray += $increment;
    }
   
   return [array]$MoneyArray
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
    for($index = 0; $index -lt $SubwebUrls.Length; $index++) {
        ConnectToSubsites($index)
        $HandlingsplanListItems = Get-PnPListItem -List "Handlingsplan"
        
        for($listItemsIndex = 0; $listItemsIndex -lt $HandlingsplanListItems.Length; $listItemsIndex++) {
            if($HandlingsplanListItems.Length -eq 0) {
                Write-Host "List is empty"
                Write-Host ""
                return;
            } else {
                Write-Host "Removing" $HandlingsplanListItems[$listItemsIndex].Item('Title') -ForegroundColor Yellow
                Remove-PnPListItem -List "Handlingsplan" -Identity $HandlingsplanListItems[$listItemsIndex].Id -Force
            }
             Write-Host "List items removed" -ForegroundColor Green
        }
    }
 }

#----------------------------------------------------------------------------------------------------------------------------------


#init function
function init() {
    ConnectToRootSite
    
    $SubwebUrls = Get-PnPSubWebs;
    
    #CreatSubsites(number)
    
    #ApplyListTemplateToSubsites
    
    AddListItemsToHandlingsplan(10)
    
    #RemoveHandlingsplanListItems
    
    Write-Host "Done!" -ForegroundColor Green
}

init 