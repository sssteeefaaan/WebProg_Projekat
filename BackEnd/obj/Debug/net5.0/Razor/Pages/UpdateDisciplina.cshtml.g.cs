#pragma checksum "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5dc62028bc145a4eb0774cd5e94dcb4c58d865f3"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_UpdateDisciplina), @"mvc.1.0.razor-page", @"/Pages/UpdateDisciplina.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 2 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
using Server.Pages;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5dc62028bc145a4eb0774cd5e94dcb4c58d865f3", @"/Pages/UpdateDisciplina.cshtml")]
    public class Pages_UpdateDisciplina : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 4 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
  
    Layout = "_Layout";
    ViewData["Title"] = "Ažuriraj disciplinu";

#line default
#line hidden
#nullable disable
            DefineSection("Style", async() => {
                WriteLiteral("\r\n    <link rel=\"stylesheet\" href=\"Styles/FormStil.css\">\r\n");
            }
            );
            WriteLiteral("<div class=\"Container\">\r\n    <h1>Unesite podatke o disciplini:</h1>\r\n    <form method=\"POST\">\r\n        ");
#nullable restore
#line 14 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
   Write(Html.AntiForgeryToken());

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n        <p><input type=\"hidden\" name=\"GoBack\"");
            BeginWriteAttribute("value", " value=\"", 388, "\"", 409, 1);
#nullable restore
#line 15 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
WriteAttributeValue("", 396, Model.GoBack, 396, 13, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></p>\r\n        <p><input type=\"text\" name=\"Disciplina.Naziv\"");
            BeginWriteAttribute("value", " value=\"", 470, "\"", 501, 1);
#nullable restore
#line 16 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
WriteAttributeValue("", 478, Model.Disciplina.Naziv, 478, 23, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></p>\r\n        <p><input type=\"text\" name=\"Disciplina.Lokacija\"");
            BeginWriteAttribute("value", " value=\"", 565, "\"", 599, 1);
#nullable restore
#line 17 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
WriteAttributeValue("", 573, Model.Disciplina.Lokacija, 573, 26, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></p>\r\n        <p><input type=\"number\" name=\"Disciplina.MaxUcesnici\"");
            BeginWriteAttribute("value", " value=\"", 668, "\"", 705, 1);
#nullable restore
#line 18 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\UpdateDisciplina.cshtml"
WriteAttributeValue("", 676, Model.Disciplina.MaxUcesnici, 676, 29, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral("></p>\r\n        <p><input type=\"submit\" value=\"Izmeni disciplinu\"></p>\r\n    </form>\r\n</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<UpdateDisciplinaModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<UpdateDisciplinaModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<UpdateDisciplinaModel>)PageContext?.ViewData;
        public UpdateDisciplinaModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
