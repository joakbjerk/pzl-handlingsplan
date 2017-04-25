$(document).ready(function () {
  getSubsiteHandlingsplan();
});

function getSubsiteHandlingsplan() {
  let ctx = SP.ClientContext.get_current();
  let web = ctx.get_site().get_rootWeb();
  console.log(ctx);
  console.log(web);
}