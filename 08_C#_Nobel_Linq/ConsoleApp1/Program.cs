using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace ConsoleApp1
{
    class Program
    {
        static void Main(string[] args)
        {
            string[] fajl = File.ReadAllLines("nobel.csv");
            List<Nobel> nobelLista = new List<Nobel>();
            foreach (var elem in fajl.Skip(1))
            {
                // Console.WriteLine(elem);
                string[] kecske = elem.Split(';');
                nobelLista.Add(new Nobel(int.Parse(kecske[0]), kecske[1], kecske[2], kecske[3]));
            }

            // Console.WriteLine(nobelLista[0].ev);

            //3 feladat
            Console.Write("3. feladat: ");
            var eredmeny3 = nobelLista.Where(x => x.knev == "Arthur B." && x.vnev == "McDonald");
            foreach (var elem in eredmeny3)
            {
                Console.WriteLine(elem.tipus);
            }

            //4 feladat:
            Console.Write("4. feladat: ");
            var eredmeny4 = nobelLista.Where(x => x.ev == 2017 && x.tipus == "irodalmi");
            foreach (var elem in eredmeny4)
            {
                Console.WriteLine($"{elem.knev} {elem.vnev} ");
            }
            // 4 mégegyszer selecttel
            /*Console.WriteLine("4. feladat");
            var eredmeny44 = nobelLista.Where(x => x.ev == 2017 && x.tipus == "irodalmi").Select(x=>$"{x.knev} {x.vnev}").First();
            Console.WriteLine(eredmeny44);*/

            //5. feladat
            Console.WriteLine("5. feladat:");
            var eredmeny5 = nobelLista.Where(x => x.tipus == "béke" && x.vnev == "" && x.ev>=1990);
            foreach (var elem in eredmeny5)
            {
                Console.WriteLine($"\t{elem.ev}: {elem.knev}");
            }

            // 6. feladat
            Console.WriteLine("6. feladat:");
            var eredmeny6 = nobelLista.Where(x => x.vnev.Contains("Curie"));
            foreach (var elem in eredmeny6)
            {
                Console.WriteLine($"{elem.ev}: {elem.knev} {elem.vnev} ({elem.tipus})");
            }

            // 7. feladat:
            Console.WriteLine("7. feladat: ");
            var eredmeny7 = nobelLista.GroupBy(x=> x.tipus);
            foreach (var elem in eredmeny7)
            {
                Console.WriteLine($"{elem.Key,20} {elem.Count(), 20} db.");
            }

            //8. feladat:
            var eredmeny8 = nobelLista.Where(x => x.tipus == "orvosi").OrderBy(x=> x.ev);
            List<string> kimenet = new List<string>();
            foreach (var elem in eredmeny8)
            {
                kimenet.Add($"{elem.ev}:{elem.knev} {elem.vnev}");
            }
            File.WriteAllLines("orvosi.txt", kimenet);
            

            

            Console.ReadKey();
        }
    }
}
