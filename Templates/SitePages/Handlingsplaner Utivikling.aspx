<%@ Page language="C#" masterpagefile="~masterurl/default.master" inherits="Microsoft.SharePoint.WebPartPages.WebPartPage,Microsoft.SharePoint,Version=15.0.0.0,Culture=neutral,PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Taxonomy" Namespace="Microsoft.SharePoint.Taxonomy" Assembly="Microsoft.SharePoint.Taxonomy, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Assembly Name="Microsoft.Web.CommandUI, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<asp:Content ID="Content1" ContentPlaceHolderID="PlaceHolderPageTitle" runat="server">
    <sharepoint:encodedliteral runat="server" text="<%$Resources:wss,multipages_homelink_text%>" encodemethod="HtmlEncode" />
    <sharepoint:projectproperty property="Title" runat="server" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageImage" runat="server"><img src="/_layouts/15/images/blank.gif?rev=23" width='1' height='1' alt="" /></asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    <SharePoint:ProjectProperty Property="Title" runat="server"/>
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderTitleAreaClass" runat="server">
    <SharePoint:ProjectProperty Property="Title" runat="server"/>
</asp:Content>
<asp:Content ID="Content5" ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <Sharepoint:CssRegistration ID="MainCss" Name="<% $SPUrl:~SiteCollection/SiteAssets/Handlingsplaner%20Scripts/css/handlingsplaner.css %>" runat="server" />
    <SharePoint:ScriptLink ID="React" Name="~sitecollection/SiteAssets/Handlingsplaner%20Scripts/lib/react.js" Language="javascript" runat="server" />
    <SharePoint:ScriptLink ID="ReactDom" Name="~sitecollection/SiteAssets/Handlingsplaner%20Scripts/lib/react-dom.js" Language="javascript" runat="server" />
    <SharePoint:ScriptLink ID="Moment" Name="~sitecollection/SiteAssets/Handlingsplaner%20Scripts/lib/moment-with-locales.min.js" Language="javascript" runat="server" />
    <link rel="stylesheet" href="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-core/4.1.0/css/fabric.min.css">
</asp:Content>    
<asp:Content ContentPlaceHolderID="PlaceHolderSearchArea" runat="server">
	<SharePoint:DelegateControl runat="server" ControlId="SmallSearchInputBox" />
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderLeftActions" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderPageDescription" runat="server" />
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    Under konstruksjon, venligst benytt Handlingsplaner alle forhandlere for presantasjon!
</asp:Content>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
<div id="Render-Target"></div>
   <script src="../SiteAssets/Handlingsplaner%20Scripts/lib/utvikling.js"></script>
</asp:Content>