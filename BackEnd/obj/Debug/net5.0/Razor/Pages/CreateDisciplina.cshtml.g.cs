#pragma checksum "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\CreateDisciplina.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ebf243862dde43cf5ae83e6aeedd93ab242787ed"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_CreateDisciplina), @"mvc.1.0.razor-page", @"/Pages/CreateDisciplina.cshtml")]
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
#line 2 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\CreateDisciplina.cshtml"
using Server.Pages;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ebf243862dde43cf5ae83e6aeedd93ab242787ed", @"/Pages/CreateDisciplina.cshtml")]
    public class Pages_CreateDisciplina : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 4 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\CreateDisciplina.cshtml"
  
    Layout = "_Layout";
    ViewData["Title"] = "Kreiraj novu disciplinu";

#line default
#line hidden
#nullable disable
            DefineSection("Style", async() => {
                WriteLiteral("\r\n    <link rel=\"stylesheet\" href=\"Styles/FormStil.css\">\r\n");
            }
            );
            WriteLiteral("<div class=\"Container\">\r\n    <h1>Unesite podatke o novoj disciplini:</h1>\r\n    <form method=\"POST\">\r\n        ");
#nullable restore
#line 14 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\CreateDisciplina.cshtml"
   Write(Html.AntiForgeryToken());

#line default
#line hidden
#nullable disable
            WriteLiteral(@"
        <p><input type=""text"" name=""Disciplina.Naziv"" placeholder=""Naziv discipline""></p>
        <p><input type=""text"" name=""Disciplina.Lokacija"" placeholder=""Lokacija discipline""></p>
        <p><input type=""number"" name=""Disciplina.MaxUcesnici"" placeholder=""Maksimalni broj učesnika""></p>
        <p><input type=""submit"" value=""Dodaj disciplinu""></p>
    </form>
</div>
");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<CreateDisciplinaModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<CreateDisciplinaModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<CreateDisciplinaModel>)PageContext?.ViewData;
        public CreateDisciplinaModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591