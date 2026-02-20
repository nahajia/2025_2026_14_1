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
            List<Kiszallitasok> tomb = Backend.GET("http://localhost:3000/kiszallitasok").Send().As<List<Kiszallitasok>>();
            Console.WriteLine(tomb[0].datum);

            //5. feladat
            var feladat5 = tomb.GroupBy(x => x.partnerid).OrderByDescending(x => x.Count());
            foreach (var item in feladat5)
            {
                Console.WriteLine($"{item.Key} - {item.Count()}");
            }

            //6. Partner azonosítójának bekérése és azok kiírása fájlba, partner id, dátum.Fájl neve: partner_1.txt legyen, _ után a partnerid
            Console.WriteLine("Adj meg egy partner id-t");
            int beKer = int.Parse(Console.ReadLine());
            var feladat6 = tomb.Where(x => x.partnerid == beKer);
            StreamWriter sw = new StreamWriter($"partner_{beKer}.txt");
            foreach (var item in feladat6)
            {
                sw.WriteLine($"{item.partnerid} - {item.datum}");
            }
            sw.Close();

            //7. Gyümölcslevenként mennyi karton lett összesen kiszállítva, gyumleid és összeg, összeg szerint csökkenően
            var feladat7 = tomb.GroupBy(x => x.gyumleid).OrderByDescending(x=>x.Sum(y => y.karton));
            foreach (var item in feladat7)
            {
                Console.WriteLine($"{item.Key} - {item.Sum(x=>x.karton)}");
            }

            //8. A legnagyobb kartonszámban hány kiszállítás történt.  (a legnagyobb 16, de számítás eredménye legyen)
            var feladatSeged = tomb.Max(x => x.karton);
            var feladat8 = tomb.Where(x => x.karton == feladatSeged).Count();
            Console.WriteLine($"{feladat8}");





            Console.ReadKey();
        }
    }
}
