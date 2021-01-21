#pragma checksum "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ab16ab2696d6687edfc90d10630aa4d84f5fbca7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Pages_ViewDisciplineTurnira), @"mvc.1.0.razor-page", @"/Pages/ViewDisciplineTurnira.cshtml")]
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
#line 2 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
using Server.Pages;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab16ab2696d6687edfc90d10630aa4d84f5fbca7", @"/Pages/ViewDisciplineTurnira.cshtml")]
    public class Pages_ViewDisciplineTurnira : global::Microsoft.AspNetCore.Mvc.RazorPages.Page
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 4 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
  
    Layout="_Layout";
    ViewData["Title"]="Lista disciplina turnira";

#line default
#line hidden
#nullable disable
            DefineSection("Style", async() => {
                WriteLiteral("\r\n    <link rel=\"stylesheet\" href=\"Styles/Stil.css\">\r\n");
            }
            );
            DefineSection("Scripts", async() => {
                WriteLiteral("\r\n    <script src=\"Scripts/ScriptViewDiscipline.js\"></script>\r\n");
            }
            );
            WriteLiteral("<h1>Lista svih disciplina turnira \'");
#nullable restore
#line 14 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
                              Write(Model.Turnir.Naziv);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"'</h1>
<table>
    <tr>
        <th>Naziv</th>
        <th>Lokacija</th>
        <th>Trenutni broj takmičara</th>
        <th>Maksimalni broj takmičara</th>
        <th>Pobednik</th>
        <th>Lista učesnika</th>
        <th>Izmeni</th>
        <th>Obriši</th>
    </tr>
");
#nullable restore
#line 26 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
     for (var i=0; i < Model.Discipline.Count; i++)
    {

#line default
#line hidden
#nullable disable
            WriteLiteral("        <tr>\r\n            <td>");
#nullable restore
#line 29 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
           Write(Model.Discipline[i].Naziv);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n            <td>");
#nullable restore
#line 30 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
           Write(Model.Discipline[i].Lokacija);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n            <td>");
#nullable restore
#line 31 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
           Write(Model.TrenutniBrojUcesnika[i]);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n            <td>");
#nullable restore
#line 32 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
           Write(Model.Discipline[i].MaxUcesnici);

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n            <td>");
#nullable restore
#line 33 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
           Write(Model.VratiPobednika(i));

#line default
#line hidden
#nullable disable
            WriteLiteral("</td>\r\n            <td><a");
            BeginWriteAttribute("href", " href=\"", 986, "\"", 1080, 4);
            WriteAttributeValue("", 993, "./ViewUcesnikeDiscipline?turnirID=", 993, 34, true);
#nullable restore
#line 34 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1027, Model.Turnir.ID, 1027, 16, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1043, "&disciplinaID=", 1043, 14, true);
#nullable restore
#line 34 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1057, Model.Discipline[i].ID, 1057, 23, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">Učesnici</a></td>\r\n            <td><a");
            BeginWriteAttribute("href", " href=\"", 1119, "\"", 1207, 4);
            WriteAttributeValue("", 1126, "./UpdateDisciplina?turnirID=", 1126, 28, true);
#nullable restore
#line 35 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1154, Model.Turnir.ID, 1154, 16, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1170, "&disciplinaID=", 1170, 14, true);
#nullable restore
#line 35 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1184, Model.Discipline[i].ID, 1184, 23, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">Izmenite disciplinu</a></td>\r\n            <td><a");
            BeginWriteAttribute("href", " href=\"", 1257, "\"", 1345, 4);
            WriteAttributeValue("", 1264, "./DeleteDisciplina?turnirID=", 1264, 28, true);
#nullable restore
#line 36 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1292, Model.Turnir.ID, 1292, 16, false);

#line default
#line hidden
#nullable disable
            WriteAttributeValue("", 1308, "&disciplinaID=", 1308, 14, true);
#nullable restore
#line 36 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
WriteAttributeValue("", 1322, Model.Discipline[i].ID, 1322, 23, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(">Obrišite disciplinu</a></td>\r\n        </tr>\r\n");
#nullable restore
#line 38 "C:\Users\stefa\Documents\Faks\III godina\V semestar\Web Programiranje\Projekat\BackEnd\Pages\ViewDisciplineTurnira.cshtml"
    }

#line default
#line hidden
#nullable disable
            WriteLiteral("</table>");
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
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<ViewDisciplineTurniraModel> Html { get; private set; }
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<ViewDisciplineTurniraModel> ViewData => (global::Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<ViewDisciplineTurniraModel>)PageContext?.ViewData;
        public ViewDisciplineTurniraModel Model => ViewData.Model;
    }
}
#pragma warning restore 1591
