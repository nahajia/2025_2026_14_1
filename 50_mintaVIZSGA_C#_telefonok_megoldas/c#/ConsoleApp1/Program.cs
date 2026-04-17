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

            List<Telefon> tomb = Backend.GET("http://localhost:3000/telefonok").Send().As<List<Telefon>>();
            //Console.WriteLine(tomb[0].leiras.Length);
            //Console.WriteLine(tomb[0].SzokozNelkul);
            //Console.WriteLine(tomb[0].SzokozNelkul2);
            //Console.WriteLine(tomb[0].SzokozNelkul3);
            var feladat1 = tomb.Where(x => x.kijelzo_merete < 6 && x.okostelefon==1);
            Console.WriteLine($"1. feladat kompakt okostelefonok");
            foreach (var item in feladat1)
            {
                Console.WriteLine($"\t- {item.modell} ({item.kijelzo_merete} )");
            }
            Console.WriteLine($"2. feladat");
            Console.Write($"Add meg a telefon nevében vagy leírásában keresendő szót:");
            string kerendo = Console.ReadLine().ToLower();
            var feladat2 = tomb.Where(x => x.modell.ToLower().Contains(kerendo) || x.leiras.ToLower().Contains(kerendo));
            if (feladat2.Count()==0)
            {
                Console.WriteLine($"Nincs találat");
            }
            else
            {
                Console.WriteLine($"\t {feladat2.Count()} találat van");
                foreach (var item in feladat2)
                {
                    if (item.okostelefon == 1)
                    {
                        Console.WriteLine($"\t{item.modell} (Okostelefon)");
                        Console.WriteLine($"\t {item.leiras.Substring(0,70)}...");
                        Console.WriteLine($"\t--------------");
                    }
                    else
                    {
                        Console.WriteLine($"\t{item.modell} (Buta telefon)");
                        Console.WriteLine($"\t {item.leiras.Substring(0, 70)}...");
                        Console.WriteLine($"\t--------------");
                    }
     
                }
            }

            Console.WriteLine($"3.feladat Kijelzőméretenként hány telefon van:");
            var feladat3 = tomb.GroupBy(x => x.kijelzo_merete).OrderBy(y => y.Key);
            foreach (var item in feladat3)
            {
                Console.WriteLine($"\t{item.Key} col: {item.Count()}db");
            }
            


            Console.ReadKey();


        }
    }
}
