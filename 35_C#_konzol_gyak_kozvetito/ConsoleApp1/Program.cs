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
            Console.WriteLine(tomb[0].datum);
            Console.WriteLine(tomb[0].hoNev);
            Console.WriteLine(tomb[0].HonapNeve);
            //6. Az eladott ingatlanok kilistázása, ár, dátum
            var eladott = tomb.Where(x => x.allapot == "eladva");
            foreach (var item in eladott)
            {
                Console.WriteLine($"{item.ar} {item.datum}");
            }
            //7. Az eladott ingatlanok darabszáma
            var eladottingatlan = tomb.Count(x => x.allapot == "eladva");
            Console.WriteLine($"Eladott ingatlanok száma:{eladottingatlan}");
            Console.WriteLine($"Eladott ingatlanok száma:{eladott.Count()}");
            //8.
            var ingatlanok = tomb.GroupBy(x => x.allapot).Select(x => new
            {
              Állapot_neve=x.Key,
              Darabszám=x.Count()
            })
                .OrderByDescending(x=>x.Darabszám)
                .ToList();
            ConsoleTableBuilder.From(ingatlanok).ExportAndWriteLine();

            //8.allapot szerint darab
            var eredmeny8 = tomb.GroupBy(x => x.allapot).OrderByDescending(x=> x.Count());
            foreach (var item in eredmeny8)
            {
                Console.WriteLine($"Kategória: {item.Key}, {item.Count()}");
            }


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
            //9.
            Console.Write("Adj meg egy árat:");
            double beAr = Convert.ToDouble(Console.ReadLine());
            var eredmeny9 = tomb.Where(x => x.ar < beAr);
            if (eredmeny9.Count()==0)
            {
                Console.WriteLine("Nincs találat");
            }
            else
            {
                foreach (var item in eredmeny9)
                {
                    Console.WriteLine(item.ar);
                }
            }



            //10. Drága ingatlanok fájlba írása: ár, állapot, dátum
            var eredmeny10 = tomb.Where(x => x.Kategoria()== "drága").Select(x=>$"{x.ar},{x.allapot},{x.Datumformatum}");
            List<string> lista = new List<string>();
            foreach (var item in eredmeny10)
            {
                lista.Add(item);
            }
            File.WriteAllLines("Draga.txt", lista);

            //11.
            var eredmeny11 = tomb.Where(x => x.allapot == "eladva").OrderByDescending(x=>x.ar).First();
            Console.WriteLine($"{eredmeny11.ar} {eredmeny11.datum}");
            
            //11/2
            var eredmeny112 = tomb.Where(x => x.allapot == "eladva").Max(x => x.ar);
            var eredmenydatum = tomb.Where(x => x.allapot == "eladva").Where(x => x.ar == eredmeny112).First();
            Console.WriteLine($"{eredmeny112} {eredmenydatum.datum}");

            //12
            var eredmeny12 = tomb.Where(x => x.Kategoria() == "drága").GroupBy(x=>x.ingatlanid).Where(x=>x.Count()>=3);
            foreach (var item in eredmeny12)
            {
                Console.WriteLine($"{item.Key} {item.Count()}");
            }

            var eredmeny12Eladva = tomb.Where(x => x.Kategoria() == "drága" && x.allapot == "eladva");
            Console.WriteLine("--------------------------------------");
            var metszet = eredmeny12.Select(x=>x.Key).Intersect(eredmeny12Eladva.Select(x=>x.ingatlanid));

            foreach (var item in metszet)
            {
                Console.WriteLine(item);
            }









            Console.ReadKey();

        }

       
    }
}
