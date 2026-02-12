using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetworkHelper;
using ConsoleTableExt;
namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Hirdetes> tomb = Backend.GET("http://localhost:3000/hirdetes").Send().As<List<Hirdetes>>();
            //6. Az eladott ingatlanok kilistázása, ár, dátum
            var eladott = tomb.Where(x => x.allapot == "eladva")
                .ToList();
            foreach (var item in eladott)
            {
                Console.WriteLine($"{item.ar} {item.datum}");
            }
            //7. Az eladott ingatlanok darabszáma
            var eladottingatlan = tomb.Count(x => x.allapot == "eladva");
            Console.WriteLine($"Eladott ingatlanok száma:{eladottingatlan}");
            var ingatlanok = tomb.GroupBy(x => x.allapot).Select(x => new
            {
              Állapot_neve=x.Key,
              Darabszám=x.Count()
            })
                .OrderByDescending(x=>x.Darabszám)
                .ToList();
            ConsoleTableBuilder.From(ingatlanok).ExportAndWriteLine();
            //9. Ár bekérése, attól olcsóbbak kiírása, ha nincs olyan, írja ki: Nincs találat
            try
            {
                Console.Write("Add meg árt:");
                int megadottar = int.Parse(Console.ReadLine());
                var olcsobbtomb = tomb.Where(x => x.ar < megadottar).ToList();
                if (!olcsobbtomb.Any())
                {
                    Console.WriteLine("Nincs Adat!");
                }
                else
                {
                    ConsoleTableBuilder.From(olcsobbtomb).ExportAndWriteLine();
                   
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Hiba ijjjnye valamit elirtál "+ex.Message);
            }
            //10. Drága ingatlanok fájlba írása: ár, állapot, dátum
            var fajlbairas = tomb.Where(x => x.ar > 100).Select(x=>$"{x.ar},{x.allapot},{x.Datumformatum}");
            List<string> lista = new List<string>();
            File.WriteAllText("Draga.txt", fajlbairas);

           
            Console.ReadKey();

        }

       
    }
}
