using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NetworkHelper;
using System.IO;


namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            List<Szemely> tomb = Backend.GET("http://localhost:3000/szemely").Send().As<List<Szemely>>();

            Console.WriteLine(tomb[3].nev);
            Console.WriteLine(tomb[3].szoSzamol());
            Console.WriteLine(tomb[15].vanE);

            //5.
            var eredmeny5 = tomb.Where(x => x.elozo == "Liszt Ferenc-díjas");
            foreach (var item in eredmeny5)
            {
                Console.WriteLine($"{item.elozo} {item.nev}");
            }
            Console.WriteLine($"Liszt Ferencdíjasok száma: {eredmeny5.Count()}");

            //7.
            var eredmeny7 = tomb.Where(x => x.nev.Contains("Katalin"));
            foreach (var item in eredmeny7)
            {
                Console.WriteLine($"{item.nev} {item.ev}");
            }
            Console.WriteLine($"Katalinok száma: {eredmeny7.Count()}");

            //9.
            var eredmeny9 = tomb.GroupBy(x => x.ev);
            foreach (var item in eredmeny9)
            {
                Console.WriteLine($"{item.Key} {item.Count()}");
            }


            //10.

            var eredmeny10 = tomb.GroupBy(x => x.elozo).OrderByDescending(x=>x.Count());
            foreach (var item in eredmeny10)
            {
                if(item.Key!="")
                Console.WriteLine($"{item.Key} {item.Count()}");
            }

            //11.
            Console.WriteLine("Adj meg egy évet:");
            int beKer = int.Parse(Console.ReadLine());

            var eredmeny11 = tomb.Where(x => x.ev==beKer).OrderBy(x=>x.elozo);
            if (eredmeny11.Count() == 0)
            {
                Console.WriteLine("Nincs találat.");
            }
            else
            {
                List<string> kiMenet = new List<string>();
                foreach (var item in eredmeny11)
                {
                    kiMenet.Add($"{item.nev}\t {item.ev}\t {item.elozo}");
                }
                File.WriteAllLines(beKer + ".txt", kiMenet);
            }

            //12.
            List<string> feladat12 = new List<string>();
            var eredmeny12 = tomb.Where(x => x.elozo=="").OrderBy(x=>x.nev);
            foreach (var item in eredmeny12)
            {
                feladat12.Add(item.nev);
            }
            File.WriteAllLines("nincsdij.txt", feladat12);

            Console.ReadKey();
        }
    }
}
